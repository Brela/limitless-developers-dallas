import React from 'react';

const AboutPage = () => {
  const keywords = [
    'AWS',
    'JavaScript',
    'Web Development',
    'Java',
    'System Design',
    'Kubernetes',
    'Docker',
    'Java',
    'Azure',
    'Splunk',
    'Sales Force',
    'Software',
  ];

  return (
    <div className="mx-auto w-[90vw] lg:w-[70vw] flex flex-col gap-5 text-lg">
      <p>
        <span className="font-bold text-xl">Limitless Developers Dallas</span> is a hub that
        provides you with a list of upcoming tech events, local to Dallas. It was created to help
        developers and tech enthusiasts gather at local meetups more frequently. Meeting up in
        person is a great way to learn and share experiences as well as get out of the office (or
        house) for a breather.
      </p>
      <p>
        {`    We found it difficult to find all the upcoming tech meetups on Meetup.com since you may have
        to search very specific keywords to find all the hidden gems, and sometimes you don't know
        what those keywords are.`}
      </p>
      <div>
        {
          ' Our list of upcoming events uses the Meetup.com API, and gets events for these keywords:'
        }
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
          {keywords.map((keyword) => (
            <div key={keyword} className="p-2 bg-zinc-700 text-white rounded-lg">
              {keyword}
            </div>
          ))}
        </div>
      </div>
      <section className="mt-5">
        <div>Questions, Comments, or Recommendations?</div>
        <div>
          Contact Clay at{' '}
          <a
            className="text-white/88 font-semibold custom-underline"
            href="mailto:ClayBreland1@gmail.com"
          >
            ClayBreland1@gmail.com
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
