// Button.jsx
import React from 'react';
import { Button as ShadcnButton } from '@/components/ui/button';

const Button = React.forwardRef(({ className, variant, size, children, ...props }, ref) => {
  return (
    <ShadcnButton
      ref={ref}
      className={className}
      variant={variant}
      size={size}
      {...props}
    >
      {children}
    </ShadcnButton>
  );
});

Button.displayName = 'Button';

export { Button };  // Named export
