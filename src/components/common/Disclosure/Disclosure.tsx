import type { DetailsHTMLAttributes, ReactNode } from 'react';
import styles from './Disclosure.module.css';

interface DisclosureProps extends Omit<DetailsHTMLAttributes<HTMLDetailsElement>, 'title'> {
  title: string;
  children: ReactNode;
  headingLevel?: 2 | 3;
  summaryLabel?: string;
}

export default function Disclosure({
  title,
  children,
  headingLevel,
  summaryLabel,
  className = '',
  ...props
}: DisclosureProps) {
  const Heading = headingLevel === 2 ? 'h2' : headingLevel === 3 ? 'h3' : 'span';

  return (
    <details className={`${styles.disclosure} ${className}`} {...props}>
      <summary className={styles.summary} aria-label={summaryLabel}>
        <Heading className={styles.title}>{title}</Heading>
        <svg className={styles.icon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </summary>
      <div className={styles.content}>{children}</div>
    </details>
  );
}
