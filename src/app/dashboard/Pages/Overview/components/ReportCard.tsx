import React from 'react';
import clsx from 'clsx';

import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardAction,
} from '@/components/ui/card';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const ReportCard = (props: {
  header: { title: string; description: string };
  link: string;
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <Card className={clsx('h-full w-full', props.className)}>
      <CardHeader className="relative flex translate-x-0 flex-col">
        <CardTitle className="text-base">{props.header.title}</CardTitle>
        <CardDescription className="text-xs">
          {props.header.description}
        </CardDescription>
        <CardAction className="absolute top-0 right-4 text-xs">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <Link to={props.link} className="text-muted-foreground ml-1">
                  <ExternalLink />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>See Full Report</p>
            </TooltipContent>
          </Tooltip>
        </CardAction>
        <CardContent className="h-full w-full p-2">
          {props.children}
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default React.memo(ReportCard);
