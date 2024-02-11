'use client';

import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import getColorMode from '@/src/app/utils/getColorMode';

const Header2 = ({ children, className }: { children: ReactNode; className?: string }) => {
  const { lightMode } = getColorMode();

  return (
    <h2
      className={twMerge(
        'w-full text-center lg:text-xl pb-2  font-semibold',
        lightMode ? 'text-gray-500' : 'text-gray-200',
        className
      )}
    >
      {children}
    </h2>
  );
};

export default Header2;
