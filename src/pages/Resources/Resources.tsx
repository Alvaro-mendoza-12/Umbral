import { useTranslation } from 'react-i18next';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Disclosure from '../../components/common/Disclosure/Disclosure';
import { officialSources, uleChiclayoInfo, ULE_DIRECTORY_URL } from '../../data/sources';
import { checklistItems } from '../../data/checklistItems';
import { printElement } from '../../utils/print';
import styles from './Resources.module.css';
import ProcedureScope from '../../components/common/ProcedureScope';
import { peCseProcedure } from '../../content';

function PrintParagraph({ text }: { text: string }) {
  if (text.startsWith('**') && text.endsWith('**')) {
    return <h4>{text.slice(2, -2)}</h4>;
  }
  const lines = text.split('\n');
  if (lines.every(line => line.startsWith('- '))) {
    return <ul>{lines.map((line, index) => <li key={index}>{line.slice(2)}</li>)}</ul>;
  }
  if (lines.every(line => /^\d+\. /.test(line))) {
    return <ol>{lines.map((line, index) => <li key={index}>{line.replace(/^\d+\. /, '')}</li>)}</ol>;
  }
  return <p>{text}</p>;
}

export default function Resources() {
  const { t, i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage ?? i18n.language).startsWith('en') ? 'en' : 'es';
  const steps = t('guide.steps', { returnObjects: true }) as Array<{
    title: string;
    content: string;
  }>;

  const handlePrint = () => {
    printElement('prep-sheet', {
      language: lang,
      title: `${t('common.appName')} - ${t('resources.prepSheet.title')}`,
    });
  };

  return (
    <main id="main-content" className={styles.resources}>
      <div className="container">
        <ProcedureScope />
        <h1>{t('resources.title')}</h1>
        <p className={styles.description}>{t('resources.description')}</p>

        {/* The complete preparation sheet stays one action away. */}
        <section className={styles.section}>
          <h2>{t('resources.prepSheet.title')}</h2>
          <Card>
            <p className={styles.prepDescription}>
              {t('resources.prepSheet.description')}
            </p>
            <div className={styles.prepActions}>
              <Button onClick={handlePrint}>
                {t('resources.prepSheet.printButton')}
              </Button>
            </div>
          </Card>
        </section>

        {/* Official Sources */}
        <section className={styles.section}>
          <h2>{t('resources.officialSources.title')}</h2>
          <div className={styles.sourcesList}>
            {officialSources.map(source => (
              <Card key={source.id}>
                <h3 className={styles.sourceName}>{source.name[lang]}</h3>
                {source.url && (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.sourceLink}
                  >
                    {source.url}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                )}
                <p className={styles.verifiedDate}>
                  {source.isVerified
                    ? t('resources.officialSources.verifiedDate', {
                        date: source.verifiedDate,
                      })
                    : t('resources.officialSources.pending')}
                </p>
                {source.description && (
                  <Disclosure
                    className={styles.sourceDetails}
                    title={t('resources.sourceDetails', { defaultValue: lang === 'en' ? 'Content and certainty' : 'Contenido y certeza' })}
                    summaryLabel={t('resources.sourceDetailsLabel', {
                      source: source.name[lang],
                      defaultValue: lang === 'en' ? 'Content and certainty: {{source}}' : 'Contenido y certeza: {{source}}',
                    })}
                  >
                    <p className={styles.sourceDescription}>{source.description[lang]}</p>
                  </Disclosure>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Office details apply only to this local jurisdiction. */}
        <section className={styles.section}>
          <Disclosure title={t('resources.localOrientation', {
            defaultValue: lang === 'en' ? 'Local guidance: Chiclayo district' : 'Orientación local: distrito de Chiclayo',
          })} headingLevel={2}>
            <h3>{t('resources.uleTitle')}</h3>
            <p className={styles.uleNote}>{t('resources.uleNote')}</p>
            <p>{uleChiclayoInfo.address?.[lang]}</p>
            <p>{uleChiclayoInfo.hours?.[lang]}</p>
            <p className={styles.verifiedDate}>{uleChiclayoInfo.notes[lang]}</p>
            <div className={styles.uleContact}>
              <h3>{t('resources.uleContact.title')}</h3>
              <p>{t('resources.uleContact.description')}</p>
              <a href={ULE_DIRECTORY_URL} target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>
                {t('resources.uleContact.directoryLink')}
              </a>
            </div>
          </Disclosure>
        </section>

        {/* Disclaimer */}
        <section className={styles.disclaimer}>
          <Card variant="highlighted">
            <h3>{t('resources.disclaimer.title')}</h3>
            <p>{t('resources.disclaimer.content')}</p>
          </Card>
        </section>
      </div>

      {/* Hidden content for printing */}
      <div id="prep-sheet" style={{ display: 'none' }}>
        <h1>{t('common.appName')} - {t('resources.prepSheet.title')}</h1>
        <p>{peCseProcedure.displayName[lang]}</p>
        <p>{t('common.tagline')}</p>
        
        <h2>{t('guide.title')}</h2>
        {steps.map((step, i) => (
            <div key={i}>
              <h3>{t('resources.prepSheet.stepTitle', { number: i + 1, title: step.title })}</h3>
              {step.content.split('\n\n').map((paragraph, index) => (
                <PrintParagraph key={index} text={paragraph} />
              ))}
            </div>
        ))}

        <h2>{t('checklist.title')}</h2>
        <p>{t('checklist.description')}</p>
        <div>
          {checklistItems.map(item => (
              <div className="checklist-item" key={item.id}>
                <div className="checkbox" aria-hidden="true"></div>
                <div className="item-text">
                  <div className="item-label">{item.item[lang]}</div>
                  <div className="item-desc">{item.description?.[lang]}</div>
                </div>
              </div>
          ))}
        </div>

        <h2>{t('resources.uleTitle')}</h2>
        <p>{t('resources.uleNote')}</p>
        <p>{uleChiclayoInfo.address?.[lang]}</p>
        <p>{uleChiclayoInfo.hours?.[lang]}</p>
        <p>{uleChiclayoInfo.notes[lang]}</p>
        <p>{t('resources.uleContact.description')}</p>

        <h2>{t('resources.officialSources.title')}</h2>
        <p>{t('resources.description')}</p>
        {officialSources.map(source => (
          <div key={source.id}>
            <h3>{source.name[lang]}</h3>
            <p>{source.description?.[lang]}</p>
            <p>{t('resources.officialSources.verifiedDate', { date: source.verifiedDate })}</p>
            <p>{source.url && <a href={source.url}>{source.url}</a>}</p>
          </div>
        ))}

        <div className="footer">
          <p>{t('resources.disclaimer.content')}</p>
          <p>{t('footer.credits')}</p>
        </div>
      </div>
    </main>
  );
}
