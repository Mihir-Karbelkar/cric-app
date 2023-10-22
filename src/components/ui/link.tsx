import { cn } from '@cric-app/lib/utils';
import OrignalLink, { LinkProps } from 'next/link';
import React from 'react';

const Link = (
  props: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
    LinkProps & {
      children?: React.ReactNode;
    } & React.RefAttributes<HTMLAnchorElement>
) => {
  return (
    <OrignalLink
      {...props}
      className={cn(
        'font-medium text-white-600 dark:text-white-500 hover:underline',
        props?.className
      )}
    />
  );
};
export default Link;
