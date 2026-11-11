import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../../components/common/Card';
import styles from './FAQ.module.css';

export default function FAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = t('faq.items', { returnObjects: true }) as Array<{
    question: string;
    answer: string;
    category: string;
  }>;

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main id="main-content" className={styles.faq}>
      <div className="container">
        <header className={styles.header}>
          <h1>{t('faq.title')}</h1>
          <p className={styles.description}>{t('faq.description')}</p>
        </header>

        <div className={styles.faqList}>
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <Card key={index} className={styles.faqItem}>
                <button
                  className={styles.questionButton}
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.question}>{item.question}</span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`${styles.icon} ${isOpen ? styles.open : ''}`}
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {isOpen && (
                  <div className={styles.answer}>
                    <p>{item.answer}</p>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        <Card variant="highlighted" className={styles.notFound}>
          <h3>{t('faq.notFound.title')}</h3>
          <p>{t('faq.notFound.message')}</p>
        </Card>
      </div>
    </main>
  );
}
