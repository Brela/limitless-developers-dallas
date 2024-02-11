'use client';

import { twMerge } from 'tailwind-merge';
import MeetupList from './_homeComponents/MeetupsList';
import SectionMain from './_homeComponents/wrappers/SectionMain';
import H2 from './_homeComponents/wrappers/H2';
import getColorMode from '../utils/getColorMode';

const Hub = () => {
  const { lightMode, darkMode } = getColorMode();
  // const isMobile = typeof windowSize?.width === 'number' && windowSize?.width < 768;

  return (
    <>
      {/*  ------ OUR MEETUP ------ */}
      <section className="h-[100px] mt-5 mb-10 ">
        {/* <H2>Purpose</H2> */}
        {/* <div className={twMerge('  rounded-lg', lightMode ? 'bg-zinc-200' : 'bg-zinc-500')}> */}
        <div className={twMerge(darkMode ? 'text-gray-600' : 'text-gray-600')}>
          <p className=" rounded py-2 px-4 text-center font-semibold text-lg lg:text-2xl w-full lg:w-[75%] max-w-[700px] mx-auto my-auto h-full">
            LDD brings the tech community together with casual meetups where we can learn from each
            other and grow.
          </p>
        </div>
      </section>

      {/*  ------ OUR NEXT EVENT ------ */}
      <SectionMain>
        <H2>Our Next Event</H2>
        <div
          className={twMerge(' h-[300px]  rounded-lg', lightMode ? 'bg-zinc-200' : 'bg-zinc-500')}
        >
          <MeetupList />
        </div>
      </SectionMain>

      {/*  ------ MEETUP LIST SECTION ------ */}
      <SectionMain>
        <H2>Upcoming Tech Meetups in Dallas</H2>
        <div
          className={twMerge(' h-[500px]  rounded-lg', lightMode ? 'bg-zinc-200' : 'bg-zinc-500')}
        >
          <MeetupList />
        </div>
      </SectionMain>

      {/*  ------ OTHER ------ */}
      <SectionMain>
        <H2>Why you should go to meetups</H2>
      </SectionMain>
    </>
  );
};
export default Hub;
