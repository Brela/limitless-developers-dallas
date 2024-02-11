import React from 'react';
import MeetupList from '../_homeComponents/MeetupsList';

const SideBySideGridSection = () => (
  <div className="grid grid-cols-12 gap-6">
    {/*  ------ MEETUP LIST SECTION ------ */}
    <section className="col-span-12 lg:col-span-4">
      <div className="w-full h-0 lg:h-auto text-center lg:text-xl pb-2 text-gray-500 font-semibold">
        Our Next Meetup
      </div>
      <div className=" h-[500px] bg-white border border-gray-200 rounded-lg">
        {' '}
        <section className="">
          <div>Our Meetup</div>
        </section>
      </div>
    </section>
    <section className="col-span-12 lg:col-span-8">
      <div className="w-full text-center lg:text-xl pb-2 text-gray-500 font-semibold">
        Upcoming Tech Meetups in Dallas
      </div>
      <div className=" h-[500px] bg-zinc-200 rounded-lg">
        <MeetupList />
      </div>
    </section>
  </div>
);

export default SideBySideGridSection;
