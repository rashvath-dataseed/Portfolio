interface BadgeProps {
  children: string;
  variant?: 'default' | 'outline';
}

export default function Badge({ children, variant = 'default' }: BadgeProps) {
  const base = 'inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium transition-colors';

  const styles = {
    default: 'bg-neutral-800 text-neutral-300',
    outline: 'border border-neutral-700 text-neutral-400',
  };

  return <span className={`${base} ${styles[variant]}`}>{children}</span>;
}
