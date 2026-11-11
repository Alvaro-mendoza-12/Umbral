import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import useLocalStorage from '../../hooks/useLocalStorage';
import { StorageKeys } from '../../utils/storage';
import { checklistItems } from '../../data/checklistItems';
import { ChecklistState } from '../../types';
import styles from './Checklist.module.css';

export default function Checklist() {
  const { t, i18n } = useTranslation();
  const [checklist, setChecklist] = useLocalStorage<ChecklistState>(
    StorageKeys.CHECKLIST,
    {}
  );

  const toggleItem = (itemId: string) => {
    setChecklist(prev => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const resetChecklist = () => {
    if (window.confirm(t('checklist.resetConfirm'))) {
      setChecklist({});
    }
  };

  const completedCount = useMemo(
    () => Object.values(checklist).filter(Boolean).length,
    [checklist]
  );

  const categories = useMemo(() => {
    const categoryMap = new Map<string, typeof checklistItems>();
    checklistItems.forEach(item => {
      const categoryName = item.category[i18n.language as 'es' | 'en'];
      if (!categoryMap.has(categoryName)) {
        categoryMap.set(categoryName, []);
      }
      categoryMap.get(categoryName)!.push(item);
    });
    return categoryMap;
  }, [i18n.language]);

  return (
    <main id="main-content" className={styles.checklist}>
      <div className="container">
        <header className={styles.header}>
          <h1>{t('checklist.title')}</h1>
          <p className={styles.description}>{t('checklist.description')}</p>
        </header>

        <div className={styles.progress}>
          <Card variant="highlighted">
            <div className={styles.progressContent}>
              <div className={styles.progressText}>
                <span className={styles.progressLabel}>{t('checklist.progress', {
                  completed: completedCount,
                  total: checklistItems.length,
                })}</span>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{
                      width: `${(completedCount / checklistItems.length) * 100}%`,
                    }}
                    role="progressbar"
                    aria-valuenow={completedCount}
                    aria-valuemin={0}
                    aria-valuemax={checklistItems.length}
                  />
                </div>
              </div>
              <Button variant="secondary" size="sm" onClick={resetChecklist}>
                {t('checklist.resetButton')}
              </Button>
            </div>
          </Card>
        </div>

        {Array.from(categories.entries()).map(([category, items]) => (
          <section key={category} className={styles.section}>
            <h2 className={styles.categoryTitle}>{category}</h2>
            <Card>
              <ul className={styles.itemList}>
                {items.map(item => (
                  <li key={item.id} className={styles.item}>
                    <label className={styles.itemLabel}>
                      <input
                        type="checkbox"
                        checked={checklist[item.id] || false}
                        onChange={() => toggleItem(item.id)}
                        className={styles.checkbox}
                      />
                      <div className={styles.itemContent}>
                        <span className={styles.itemTitle}>
                          {item.item[i18n.language as 'es' | 'en']}
                          {item.required && (
                            <span className={styles.required}> *</span>
                          )}
                        </span>
                        {item.description && (
                          <span className={styles.itemDescription}>
                            {item.description[i18n.language as 'es' | 'en']}
                          </span>
                        )}
                      </div>
                    </label>
                  </li>
                ))}
              </ul>
            </Card>
          </section>
        ))}

        {completedCount === 0 && (
          <Card className={styles.emptyState}>
            <div className={styles.emptyContent}>
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
              </svg>
              <h3>{t('checklist.emptyState.title')}</h3>
              <p>{t('checklist.emptyState.message')}</p>
            </div>
          </Card>
        )}
      </div>
    </main>
  );
}
