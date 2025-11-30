import * as React from 'react';
import { cn } from '../../lib/utils';

const alertVariants = {
  default: 'border border-border bg-secondary text-secondary-foreground',
  success: 'border border-green-500/40 bg-green-500/10 text-green-700',
  error: 'border border-destructive/40 bg-destructive/10 text-black',
  info: 'border border-primary/40 bg-primary/10 text-primary',
};

type AlertVariant = keyof typeof alertVariants;

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(({ className, variant = 'default', ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn('w-full rounded-md px-4 py-3 text-sm', alertVariants[variant], className)}
    {...props}
  />
));
Alert.displayName = 'Alert';

export { Alert };
