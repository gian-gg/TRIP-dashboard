import React from 'react';
import { LoaderCircle } from 'lucide-react';

const Loading = () => {
  return (
    <div className="flex min-h-screen min-w-screen items-center justify-center">
      <LoaderCircle className="animate-spin" />
    </div>
  );
};

export default React.memo(Loading);
