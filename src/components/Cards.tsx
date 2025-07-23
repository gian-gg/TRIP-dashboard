import React from 'react';
import Container from '@/components/ui/Container';
import { type LucideIcon } from 'lucide-react';

const OverviewCards = (props: {
  card: { title: string; icon: LucideIcon; value: string; subtitle: string };
  children?: React.ReactNode;
}) => {
  return (
    <Container className="w-full">
      <div className="flex justify-between">
        <h1 className="text-xs font-medium md:text-sm">{props.card.title}</h1>
        <props.card.icon className="text-muted-foreground h-4 w-4" />
      </div>
      <span className="text-xl font-extrabold md:text-3xl">
        {props.card.value}
      </span>
      <p className="text-muted-foreground text-[10px] md:text-xs">
        {props.card.subtitle}
      </p>
      {props.children && <div className="mt-2">{props.children}</div>}
    </Container>
  );
};

export default OverviewCards;
