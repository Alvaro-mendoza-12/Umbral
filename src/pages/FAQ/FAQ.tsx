import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../../components/common/Card';
import styles from './FAQ.module.css';
import ProcedureScope from '../../components/common/ProcedureScope';

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
        <ProcedureScope />
        <header className={styles.header}>
          <h1>{t('faq.title')}</h1>
          <p className={styles.description}>{t('faq.description')}</p>
        </header>

        <div className={styles.faqList}>
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <Card key={index} className={styles.faqItem}>
                <h2 className={styles.questionHeading}>
                  <button
                    type="button"
                    className={styles.questionButton}
                    onClick={() => toggleItem(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    id={`faq-question-${index}`}
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
                </h2>
                <div id={`faq-answer-${index}`} aria-labelledby={`faq-question-${index}`} className={styles.answer} hidden={!isOpen}>
                  <p>{item.answer}</p>
                </div>
              </Card>
            );
          })}
        </div>

        <Card variant="highlighted" className={styles.notFound}>
          <h2>{t('faq.notFound.title')}</h2>
          <p>{t('faq.notFound.message')}</p>
        </Card>
      </div>
    </main>
  );
}
