import { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import useLocalStorage from '../../hooks/useLocalStorage';
import { StorageKeys } from '../../utils/storage';
import styles from './Guide.module.css';

const TOTAL_STEPS = 5;

export default function Guide() {
  const { t } = useTranslation();
  const { step: stepParam } = useParams<{ step?: string }>();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useLocalStorage<number>(
    StorageKeys.CURRENT_STEP,
    1
  );

  const step = stepParam ? parseInt(stepParam, 10) : currentStep;

  useEffect(() => {
    if (step < 1 || step > TOTAL_STEPS) {
      navigate('/guide/1');
    } else if (step !== currentStep) {
      setCurrentStep(step);
    }
  }, [step, currentStep, setCurrentStep, navigate]);

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
                aria-valuenow={step}
                aria-valuemin={1}
                aria-valuemax={TOTAL_STEPS}
              />
            </div>
          </div>
        </header>

        <div className={styles.content}>
          {/* Sidebar with steps */}
          <aside className={styles.sidebar}>
            <nav aria-label="Guide steps">
              <ul className={styles.stepList}>
                {Array.from({ length: TOTAL_STEPS }, (_, i) => {
                  const stepNum = i + 1;
                  const stepTitle = t(`guide.steps.${i}.title`);
                  const isActive = stepNum === step;
                  const isCompleted = stepNum < step;

                  return (
                    <li key={stepNum}>
                      <button
                        onClick={() => navigate(`/guide/${stepNum}`)}
                        className={`${styles.stepButton} ${
                          isActive ? styles.active : ''
                        } ${isCompleted ? styles.completed : ''}`}
                        aria-current={isActive ? 'step' : undefined}
                      >
                        <span className={styles.stepNumber}>{stepNum}</span>
                        <span className={styles.stepTitle}>{stepTitle}</span>
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
                <h2>{stepData.title}</h2>
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
            <nav className={styles.navigation} aria-label="Step navigation">
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
                  <Link to="/checklist">
                    <Button>{t('guide.completion.actions.checklist')}</Button>
                  </Link>
                  <Link to="/faq">
                    <Button variant="secondary">
                      {t('guide.completion.actions.faq')}
                    </Button>
                  </Link>
                  <Link to="/resources">
                    <Button variant="ghost">
                      {t('guide.completion.actions.resources')}
                    </Button>
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
