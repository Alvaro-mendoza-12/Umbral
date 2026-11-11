import { useTranslation } from 'react-i18next';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { officialSources } from '../../data/sources';
import { printElement } from '../../utils/print';
import styles from './Resources.module.css';

export default function Resources() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'es' | 'en';

  const handlePrint = () => {
    printElement('prep-sheet');
  };

  return (
    <main id="main-content" className={styles.resources}>
      <div className="container">
        <h1>{t('resources.title')}</h1>
        <p className={styles.description}>{t('resources.description')}</p>

        {/* ULE Chiclayo Info */}
        <section className={styles.section}>
          <h2>{t('resources.uleTitle')}</h2>
          <Card variant="highlighted">
            <p className={styles.uleNote}>{t('resources.uleNote')}</p>
            <div className={styles.uleContact}>
              <h3>{t('resources.uleContact.title')}</h3>
              <p>{t('resources.uleContact.description')}</p>
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
                {source.description && (
                  <p className={styles.sourceDescription}>
                    {source.description[lang]}
                  </p>
                )}
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
              </Card>
            ))}
          </div>
        </section>

        {/* Preparation Sheet */}
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
        <p>{t('common.tagline')}</p>
        
        <h2>{t('guide.title')}</h2>
        {Array.from({ length: 5 }, (_, i) => {
          const step = t(`guide.steps.${i}`, { returnObjects: true }) as {
            title: string;
            content: string;
          };
          return (
            <div key={i}>
              <h3>Paso {i + 1}: {step.title}</h3>
              <p>{step.content.split('\n\n')[0]}</p>
            </div>
          );
        })}

        <h2>{t('checklist.title')}</h2>
        <div>
          {Array.from({ length: 11 }, (_, i) => {
            const itemKey = Object.keys(t('checklist.items', { returnObjects: true }))[i];
            const item = t(`checklist.items.${itemKey}`, { returnObjects: true }) as {
              label: string;
              description: string;
            };
            return (
              <div className="checklist-item" key={i}>
                <div className="checkbox"></div>
                <div className="item-text">
                  <div className="item-label">{item.label}</div>
                  <div className="item-desc">{item.description}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="footer">
          <p>{t('footer.disclaimer')}</p>
          <p>{t('footer.credits')}</p>
        </div>
      </div>
    </main>
  );
}
