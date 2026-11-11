import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { normalizeLanguage } from '../../../services/i18n';
import { printElement } from '../../../utils/print';
import { getOpportunity, formatDate, opportunityStatusLabelKey, canAct } from '../domain/catalog';
import { routeProgress } from '../domain/myRoute';
import { sources, catalogCountries } from '../data/catalog';
import { useMyRoute } from '../application/routeContext';
import type { Opportunity, RouteEntry } from '../domain/types';
import { OpportunityDates, StatusBadge } from '../components/Shared';
import styles from '../Companion.module.css';

function RouteCard({ opportunity, entry, onFeedback }: { opportunity: Opportunity; entry: RouteEntry; onFeedback: (value: string) => void }) {
  const { t, i18n } = useTranslation();
  const language = normalizeLanguage(i18n.resolvedLanguage);
  const { toggleStep, toggleTask, removeTask, addTask, remove } = useMyRoute();
  const [newTask, setNewTask] = useState('');
  const { completed, total, percent } = routeProgress(entry, opportunity.id);
  const nextStep = opportunity.steps.find(step => !entry.completedStepIds.includes(step.id));
  return <article className={styles.routeCard}>
    <div className={styles.cardMeta}><span>{catalogCountries.find(country => country.code === opportunity.countryCode)?.name[language]} · {t(opportunity.access?.supportType ? `companion.supportTypes.${opportunity.access.supportType}` : `companion.kinds.${opportunity.kind}`)}</span><StatusBadge opportunity={opportunity} /></div>
    <h2><Link to={`/opportunities/${opportunity.id}`}>{opportunity.title[language]}</Link></h2>
    {opportunity.access?.keyCondition && <p className={styles.small}>{opportunity.access.keyCondition[language]}</p>}
    <p className={styles.routeNext}><strong>{t('companion.nextStep')}: </strong>{canAct(opportunity) ? nextStep?.text[language] ?? t('companion.nextPrepared') : t('companion.notAvailable')}</p>
    {opportunity.availability.closesOn && <p className={styles.deadline}>{t('companion.closes')}: {formatDate(opportunity.availability.closesOn, language)}</p>}
    <p>{t('companion.progress', { completed, total })}</p>
    <progress className={styles.progress} value={completed} max={total || 1} aria-label={`${opportunity.title[language]}: ${t('companion.progress', { completed, total })}`}>{percent}%</progress>
    <details className={styles.disclosure} open><summary>{t('companion.routeSteps')}</summary>
      <ul className={styles.taskList}>{opportunity.steps.map(step => <li key={step.id}><label className={styles.task}><input type="checkbox" checked={entry.completedStepIds.includes(step.id)} onChange={() => toggleStep(opportunity.id, step.id)} /><span>{step.text[language]}</span></label></li>)}
        {entry.tasks.map(task => <li key={task.id} className={styles.customTask}><label className={styles.task}><input type="checkbox" checked={task.completed} onChange={() => toggleTask(opportunity.id, task.id)} /><span>{task.title}</span></label><button type="button" className={styles.deleteTask} aria-label={t('companion.removeTask', { title: task.title })} onClick={() => removeTask(opportunity.id, task.id)}>×</button></li>)}
      </ul>
      {entry.tasks.length < 30 ? <form className={styles.taskForm} onSubmit={event => { event.preventDefault(); if (!newTask.trim()) return; addTask(opportunity.id, newTask); setNewTask(''); onFeedback(t('companion.taskAdded')); }}>
        <label htmlFor={`task-${opportunity.id}`}>{t('companion.taskLabel')}</label>
        <input id={`task-${opportunity.id}`} value={newTask} onChange={event => setNewTask(event.target.value)} maxLength={140} required autoComplete="off" aria-describedby={`hint-${opportunity.id}`} />
        <p id={`hint-${opportunity.id}`} className={styles.small}>{t('companion.taskHint')}</p>
        <button type="submit" className={styles.secondary} disabled={!newTask.trim()}>{t('companion.addTask')}</button>
      </form> : <p>{t('companion.taskLimit')}</p>}
    </details>
    <details className={styles.disclosure}><summary>{t('companion.dates')}</summary><OpportunityDates opportunity={opportunity} /></details>
    <div className={styles.routeActions}><Link to={`/opportunities/${opportunity.id}`}>{t('companion.learnMore')}</Link><button type="button" className={styles.textButton} onClick={() => { if (window.confirm(t('companion.confirmRemove'))) { remove(opportunity.id); onFeedback(t('companion.removed')); } }}>{t('companion.remove')}</button></div>
  </article>;
}

export default function MyRoutePage() {
  const { t, i18n } = useTranslation();
  const language = normalizeLanguage(i18n.resolvedLanguage);
  const { route, available } = useMyRoute();
  const [feedback, setFeedback] = useState('');
  const entries = Object.entries(route.entries).flatMap(([id, entry]) => { const opportunity = getOpportunity(id); return opportunity ? [{ opportunity, entry }] : []; });
  const download = () => {
    const lines = [`UMBRAL · ${t('companion.myRoute')}`, t('companion.progressNote'), ''];
    for (const { opportunity, entry } of entries) {
      const progress = routeProgress(entry, opportunity.id);
      lines.push(opportunity.title[language], t(opportunityStatusLabelKey(opportunity)), t('companion.progress', progress), opportunity.availability.description[language]);
      lines.push(t(opportunity.access?.supportType ? `companion.supportTypes.${opportunity.access.supportType}` : `companion.kinds.${opportunity.kind}`));
      if (opportunity.access?.keyCondition) lines.push(opportunity.access.keyCondition[language]);
      for (const step of opportunity.steps) lines.push(`[${entry.completedStepIds.includes(step.id) ? 'x' : ' '}] ${step.text[language]}`);
      for (const task of entry.tasks) lines.push(`[${task.completed ? 'x' : ' '}] ${task.title}`);
      if (!opportunity.availability.dates.length) lines.push(t('companion.noDeadline'));
      for (const date of opportunity.availability.dates) lines.push(`${formatDate(date.date, language)}: ${date.label[language]}`);
      lines.push(t('companion.reviewed', { date: formatDate(opportunity.verification.checkedAt, language) }), t('companion.sources'));
      for (const source of sources.filter(source => opportunity.sourceIds.includes(source.id))) lines.push(`${source.title[language]}: ${source.url}`);
      lines.push('');
    }
    lines.push(t('companion.disclaimer'));
    const url = URL.createObjectURL(new Blob(['\uFEFF', lines.join('\n')], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url; link.download = 'umbral-mi-ruta.txt'; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setFeedback(t('companion.downloaded'));
  };
  return <main id="main-content" className={styles.page}>
    <div className={styles.container}>
      <h1>{t('companion.myRoute')}</h1><p className={styles.lead}>{t('companion.routeIntro')}</p><p className={styles.small}>{t('companion.routeCountries')}</p>
      <p className={styles.notice}>{t('companion.progressNote')}</p><p className={styles.small}>{t('companion.privacy')}</p>
      {!available && <p role="status" className={styles.notice}>{t('companion.storageUnavailable')}</p>}
      <p role="status" aria-live="polite" className={styles.feedback}>{feedback}</p>
      {entries.length ? <>
        <div className={styles.exportActions}><button type="button" className={styles.primary} onClick={download}>{t('companion.download')}</button><button type="button" className={styles.secondary} onClick={() => { if (!printElement('route-preparation', { title: `UMBRAL · ${t('companion.myRoute')}`, language })) setFeedback(t('companion.printError')); }}>{t('companion.print')}</button></div>
        <div className={styles.routeGrid}>{entries.map(({ opportunity, entry }) => <RouteCard key={opportunity.id} opportunity={opportunity} entry={entry} onFeedback={setFeedback} />)}</div>
      </> : <section className={styles.empty}><p>{t('companion.emptyRoute')}</p><Link className={styles.primary} to="/discover">{t('companion.discover')}</Link></section>}
      <div id="route-preparation" hidden>
        <h1>UMBRAL · {t('companion.myRoute')}</h1><p>{t('companion.progressNote')}</p>
        {entries.map(({ opportunity, entry }) => <section key={opportunity.id}>
          <h2>{opportunity.title[language]}</h2><p>{t('companion.progress', routeProgress(entry, opportunity.id))}</p><p>{t('companion.reviewed', { date: formatDate(opportunity.verification.checkedAt, language) })}</p>
          <p>{t(opportunity.access?.supportType ? `companion.supportTypes.${opportunity.access.supportType}` : `companion.kinds.${opportunity.kind}`)}</p>
          {opportunity.access?.keyCondition && <p>{opportunity.access.keyCondition[language]}</p>}
          <ul>{opportunity.steps.map(step => <li key={step.id}>[{t(entry.completedStepIds.includes(step.id) ? 'companion.completed' : 'companion.pending')}] {step.text[language]}</li>)}{entry.tasks.map(task => <li key={task.id}>[{t(task.completed ? 'companion.completed' : 'companion.pending')}] {task.title}</li>)}</ul>
          <h3>{t('companion.dates')}</h3><StatusBadge opportunity={opportunity} /><OpportunityDates opportunity={opportunity} />
          <h3>{t('companion.sources')}</h3><ul>{sources.filter(source => opportunity.sourceIds.includes(source.id)).map(source => <li key={source.id}>{source.title[language]}<p>{source.url}</p></li>)}</ul>
        </section>)}
        <p>{t('companion.disclaimer')}</p>
      </div>
    </div>
  </main>;
}
