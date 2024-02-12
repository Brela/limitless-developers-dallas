'use client';

import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import getColorMode from '../../utils/getColorMode';

interface Props {
  description: string;
}

const Description = ({ description }: Props) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const charLimit = 250;

  const { darkMode } = getColorMode();

  return (
    <p className=" inline">
      {showFullDescription || description.length <= charLimit
        ? description
        : `${description.substring(0, charLimit)} `}
      {description.length > charLimit && (
        <span className="text-blue-500 inline">
          {!showFullDescription ? (
            <button
              type="button"
              onClick={() => setShowFullDescription(true)}
              className={twMerge(
                'text-cyan-200 inline font-semibold ',
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
                'text-cyan-200 inline font-semibold',
                darkMode ? 'text-[#90ee90] ' : 'text-[#5fcf5f]'
              )}
            >
              ...less
            </button>
          )}
        </span>
      )}
    </p>
  );
};

export default Description;
