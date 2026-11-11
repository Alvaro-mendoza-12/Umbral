import { HTMLAttributes, ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'interactive' | 'highlighted';
  children: ReactNode;
}

export default function Card({
  variant = 'default',
  children,
  className = '',
  ...props
}: CardProps) {
  const classNames = [
    styles.card,
    variant === 'interactive' && styles.interactive,
    variant === 'highlighted' && styles.highlighted,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
}
