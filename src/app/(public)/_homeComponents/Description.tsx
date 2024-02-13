'use client';

import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button, Popover, Text } from '@mantine/core';
import getColorMode from '../../utils/getColorMode';

interface Props {
  description: string;
}

const Description = ({ description }: Props) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const charLimit = 250;

  const { darkMode } = getColorMode();

  return (
    <p className="">
      {showFullDescription || description.length <= charLimit
        ? description
        : `${description.substring(0, charLimit)} `}
      {description.length > charLimit && (
        <>
          <Popover width={200} position="bottom" withArrow shadow="md">
            <Popover.Target>
              <Button
                className={twMerge(
                  ' font-semibold ',
                  darkMode ? 'text-[#90ee90] ' : 'text-[#5fcf5f]'
                )}
              >
                more...
              </Button>
            </Popover.Target>
            <Popover.Dropdown className="bg-gray-500" bg="#90ee90" w="70vw">
              <Text size="lg">{description}</Text>
            </Popover.Dropdown>
          </Popover>
          <span className="inline">
            {!showFullDescription ? (
              <button
                type="button"
                onClick={() => setShowFullDescription(true)}
                className={twMerge(
                  'text-cyan-200  font-semibold ',
                  darkMode ? 'text-[#90ee90] ' : 'text-[#5fcf5f]'
                )}
              >
                more...
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowFullDescription(false)}
                className={twMerge(
                  'text-cyan-200 font-semibold',
                  darkMode ? 'text-[#90ee90] ' : 'text-[#5fcf5f]'
                )}
              >
                ...less
              </button>
            )}
          </span>
        </>
      )}
    </p>
  );
};

export default Description;
