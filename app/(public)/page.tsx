// import useWindowSize from '@/hooks/use-window-size';

import MeetupList from './_hubComponents/MeetupsList';

const Hub = () => (
  // Invoke the useWindowSize hook and destructure its returned properties
  // const { windowSize } = useWindowSize();

  // const isMobile = typeof windowSize?.width === 'number' && windowSize?.width < 768;

  <>
    <div className="w-full text-center lg:text-xl pb-2 text-gray-500 font-semibold">
      YOUR HUB FOR TECH MEETUPS IN DALLAS
    </div>
    <h1 className=" mx-auto text-lg font-bold text-gray-400">Upcoming Meetups in Dallas</h1>
    <div className="grid grid-cols-12 gap-6">
      {' '}
      {/* Initialize grid container with 12 columns and set gap */}
      <section className="col-span-12 lg:col-span-8">
        <div className=" h-[500px] bg-zinc-500 rounded-lg">
          <MeetupList />
        </div>
      </section>
      <section className="col-span-12 lg:col-span-4">
        <div className=" h-[500px] bg-zinc-500 rounded-lg">
          {' '}
          <section className="m-auto w-[200px]">this is the Map</section>
        </div>
      </section>
      {/* Ensure any additional content is placed within a grid item or outside the grid container */}
    </div>
    <section className="mt-10">
      <div>Photos from Past Events</div>
    </section>
  </>
);

export default Hub;
