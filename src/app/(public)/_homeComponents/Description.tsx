'use client';

import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button, Popover, Text } from '@mantine/core';
import getColorMode from '../../utils/getColorMode';

interface Props {
  description: string;
}

const Description = ({ description }: Props) => {
  const { lightMode } = getColorMode();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const charLimit = 300;

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
                  'pl-1 pb-[1px] text-md inline font-bold text-orange-500'
                  // darkMode ? 'text-[#90ee90] ' : 'text-[#5fcf5f]'
                )}
              >
                more...
              </Button>
            </Popover.Target>
            <Popover.Dropdown
              className="bg-gray-500 ml-[15vw]"
              bg={lightMode ? '#e7e5e4' : '#3f3f46'}
              w="70vw"
            >
              <Text size="lg">{description}</Text>
            </Popover.Dropdown>
          </Popover>
          {/*  <span className="inline">
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
          </span> */}
        </>
      )}
    </p>
  );
};

export default Description;
