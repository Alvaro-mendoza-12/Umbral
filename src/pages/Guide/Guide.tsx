import { useEffect } from 'react';
import { Link, Navigate, useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import useLocalStorage from '../../hooks/useLocalStorage';
import { StorageKeys } from '../../utils/storage';
import styles from './Guide.module.css';
import buttonStyles from '../../components/common/Button/Button.module.css';

const TOTAL_STEPS = 5;

export default function Guide() {
  const { t } = useTranslation();
  const { step: stepParam } = useParams<{ step?: string }>();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useLocalStorage<number>(
    StorageKeys.CURRENT_STEP,
    1
  );

  const isValidStep = typeof stepParam === 'string' && /^[1-5]$/.test(stepParam);
  const step = isValidStep ? Number(stepParam) : 1;

  useEffect(() => {
    if (isValidStep && step !== currentStep) {
      setCurrentStep(step);
    }
  }, [step, isValidStep, currentStep, setCurrentStep]);

  if (!isValidStep) return <Navigate to="/guide/1" replace />;

  const stepData = t(`guide.steps.${step - 1}`, { returnObjects: true }) as {
    title: string;
    content: string;
  };

  const goToPreviousStep = () => {
    if (step > 1) {
      navigate(`/guide/${step - 1}`);
    }
  };

  const goToNextStep = () => {
    if (step < TOTAL_STEPS) {
      navigate(`/guide/${step + 1}`);
    }
  };

  const isCompleted = step === TOTAL_STEPS;

  return (
    <main id="main-content" className={styles.guide}>
      <div className="container">
        <header className={styles.header}>
          <h1>{t('guide.title')}</h1>
          <div className={styles.progressBar}>
            <div className={styles.progressLabel}>
              {t('guide.progress', { current: step, total: TOTAL_STEPS })}
            </div>
            <div className={styles.progressTrack}>
              <div
                className={styles.progressFill}
                style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                role="progressbar"
                aria-label={t('guide.progressLabel')}
                aria-valuenow={step}
                aria-valuemin={0}
                aria-valuemax={TOTAL_STEPS}
                aria-valuetext={t('guide.progress', { current: step, total: TOTAL_STEPS })}
              />
            </div>
          </div>
        </header>

        <div className={styles.content}>
          {/* Sidebar with steps */}
          <aside className={styles.sidebar}>
            <nav aria-label={t('guide.stepsNavigation')}>
              <ul className={styles.stepList}>
                {Array.from({ length: TOTAL_STEPS }, (_, i) => {
                  const stepNum = i + 1;
                  const stepTitle = t(`guide.steps.${i}.title`);
                  const isActive = stepNum === step;
                  const isPrevious = stepNum < step;

                  return (
                    <li key={stepNum}>
                      <button
                        type="button"
                        onClick={() => navigate(`/guide/${stepNum}`)}
                        aria-label={`${stepNum}. ${t(`threshold.shortSteps.${i}`)}: ${stepTitle}`}
                        data-journey-state={isActive ? 'current' : isPrevious ? 'previous' : 'upcoming'}
                        className={`${styles.stepButton} ${
                          isActive ? styles.active : ''
                        } ${isPrevious ? styles.previous : ''}`}
                        aria-current={isActive ? 'step' : undefined}
                      >
                        <span className={styles.stepNumber} aria-hidden="true">{stepNum}</span>
                        <span className={styles.stepTitle} aria-hidden="true">{stepTitle}</span>
                        <span className={styles.shortTitle} aria-hidden="true">{t(`threshold.shortSteps.${i}`)}</span>
                        {isActive && <span className={styles.currentLabel} aria-hidden="true">{t('threshold.current')}</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          {/* Main content */}
          <div className={styles.mainContent}>
            <Card>
              <article className={styles.article}>
                <h2 data-route-focus tabIndex={-1}>{stepData.title}</h2>
                <div className={styles.stepContent}>
                  {stepData.content.split('\n\n').map((paragraph, index) => {
                    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                      return (
                        <h3 key={index} className={styles.subheading}>
                          {paragraph.replace(/\*\*/g, '')}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith('-')) {
                      const items = paragraph
                        .split('\n')
                        .filter(line => line.trim().startsWith('-'))
                        .map(line => line.trim().substring(2));
                      return (
                        <ul key={index} className={styles.contentList}>
                          {items.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      );
                    }
                    const numberedLines = paragraph.split('\n');
                    if (numberedLines.every(line => /^\d+\. /.test(line))) {
                      return (
                        <ol key={index} className={styles.contentList}>
                          {numberedLines.map((line, itemIndex) => (
                            <li key={itemIndex}>{line.replace(/^\d+\. /, '')}</li>
                          ))}
                        </ol>
                      );
                    }
                    return (
                      <p key={index} className={styles.paragraph}>
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </article>
            </Card>

            {/* Navigation */}
            <nav className={styles.navigation} aria-label={t('guide.stepNavigation')}>
              <Button
                variant="secondary"
                onClick={goToPreviousStep}
                disabled={step === 1}
              >
                ← {t('guide.navigation.previous')}
              </Button>
              
              {!isCompleted ? (
                <Button onClick={goToNextStep}>
                  {t('guide.navigation.next')} →
                </Button>
              ) : (
                <Button onClick={() => navigate('/checklist')}>
                  {t('guide.navigation.finish')}
                </Button>
              )}
            </nav>

            {/* Completion message */}
            {isCompleted && (
              <Card variant="highlighted" className={styles.completion}>
                <h3>{t('guide.completion.title')}</h3>
                <p>{t('guide.completion.message')}</p>
                <div className={styles.completionActions}>
                  <Link to="/checklist" className={`${buttonStyles.button} ${buttonStyles.primary} ${buttonStyles.md}`}>
                    {t('guide.completion.actions.checklist')}
                  </Link>
                  <Link to="/faq" className={`${buttonStyles.button} ${buttonStyles.secondary} ${buttonStyles.md}`}>
                    {t('guide.completion.actions.faq')}
                  </Link>
                  <Link to="/resources" className={`${buttonStyles.button} ${buttonStyles.ghost} ${buttonStyles.md}`}>
                    {t('guide.completion.actions.resources')}
                  </Link>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
