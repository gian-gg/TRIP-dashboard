import React from 'react';
import clsx from 'clsx';

const Container = (
  props: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }
) => {
  const { children, className, ...rest } = props;
  return (
    <div
      {...rest}
      className={clsx(
        'border-border bg-card text-accent-foreground rounded-lg border-1 p-4 md:p-6',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
