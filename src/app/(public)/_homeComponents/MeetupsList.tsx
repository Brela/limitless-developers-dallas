'use client';

import { Button, Skeleton, Table, useMantineColorScheme } from '@mantine/core';
import React, { Suspense, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import { IconExternalLink } from '@tabler/icons-react';
import { fetchAllEvents } from '@/src/api/meetup';
import getColorMode from '../../utils/getColorMode';
import Description from './Description';
import { DateTimeComponent } from './DateTime';
import useWindowSize from '../../hooks/use-window-size';

export default function MeetupList() {
  const { lightMode } = getColorMode();
  const [items, setItems] = useState<any>([]);

  return (
    <section
      className={twMerge(
        'border rounded-md ',
        lightMode ? 'border-gray-100 bg-white' : 'border-gray-600 bg-zinc-700'
      )}
      // style={{ maxHeight: '500px', overflowY: 'scroll' }}
    >
      <div className="px-5 py-10">
        <Suspense
          fallback={
            <>
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i}>
                  <Skeleton height={40} radius="md" width="100%" />
                </div>
              ))}
            </>
          }
        >
          <Rows items={items} setItems={setItems} />
        </Suspense>
      </div>
    </section>
  );
}

function Rows({ items, setItems }: { items: any; setItems: any }) {
  const { lightMode } = getColorMode();
  const [loading, setLoading] = useState(true); // Initialize loading state
  const { isMobile, isDesktop } = useWindowSize();

  useEffect(() => {
    async function getEvents() {
      try {
        const data = await fetchAllEvents();

        setItems(data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    }

    getEvents();
  }, []);

  if (loading) {
    return (
      <>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="mb-10">
            <Skeleton height={300} radius="md" width="100%" bg="#D8D8D8" />
          </div>
        ))}
      </>
    );
  }

  function ImgComp({ item }: { item: any }) {
    return (
      //  <Image src={item.imageUrl} alt={item.title} height={400} width={600} />
      <img
        src={item.imageUrl}
        alt={item.title}
        className="min-w-[280px] w-[30vw] max-w-[800px] min-h-[50px] max-h-[200px] lg:max-h-[400px]"
      />
    );
  }

  console.log(items);
  return (
    <>
      {items ? (
        items.map((item: any, index: number) => (
          <section
            key={item.id}
            // className={twMerge('flex  mb-20', index % 2 !== 0 ? 'flex-row-reverse' : 'flex-row')}
            className="flex gap-10 mb-20"
          >
            {/* <Image src={item.imageUrl} alt={item.title} height={400} width={600} /> */}
            <section>
              <div className=" pb-5">
                <div className="font-semibold text-lg ">{item.title}</div>
                <div>
                  <DateTimeComponent dateTime={item.dateTime} />
                </div>
              </div>
              {isMobile && (
                <div className="w-[50%]">
                  <ImgComp item={item} />
                </div>
              )}
              <div className="">
                <Description description={item.description} />
              </div>

              <a
                className={twMerge(
                  'underline whitespace-nowrap ',
                  lightMode ? 'text-gray-800' : 'text-white'
                )}
                // style={{ boxShadow: "1px 1px 10px rgba(220, 222, 224, .8)" }}
                href={item.groupLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className={twMerge('pl-0', lightMode ? 'text-gray-800' : 'text-white')}>
                  <span className="pr-2">Attend</span>
                  <IconExternalLink
                    size={20}
                    className={twMerge('pl-0', lightMode ? 'text-gray-800' : 'text-white')}
                  />
                </Button>
              </a>
            </section>
            {isDesktop && (
              <div className="w-[50%]">
                <ImgComp item={item} />
              </div>
            )}
          </section>
        ))
      ) : (
        <section className="h-[500px]">
          <div className="mx-auto">
            <div className="flex justify-center items-start h-[20px]">No items found</div>
          </div>
        </section>
      )}
    </>
  );
}
