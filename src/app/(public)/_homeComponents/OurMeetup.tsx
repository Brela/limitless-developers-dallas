'use client';

import { Button, Skeleton, Table, useMantineColorScheme } from '@mantine/core';
import React, { Suspense, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { IconExternalLink } from '@tabler/icons-react';
import { fetchAllEvents } from '@/src/api/meetup';
import getColorMode from '../../utils/getColorMode';
import Description from './Description';
import { DateTimeComponent } from './DateTime';
import useWindowSize from '../../hooks/use-window-size';

export default function OurMeetup() {
  const { lightMode } = getColorMode();

  // const slugs = ['limitless-developers-dallas'];
  const slugs = ['limitless-developers-of-frisco'];

  const { data: items, isLoading: loading } = useQuery({
    queryKey: ['ourEvent'],
    queryFn: async () => {
      const response = await fetchAllEvents(slugs);
      // const response = await fetchAllEvents();
      // const data: any = response || [];
      const data: any = [];

      return data;
    },
    staleTime: 300000, // 5 minutes
  }) as UseQueryResult<any[], Error>;

  return (
    <section>
      <div className="px-5 py-2 lg:py-5">
        {loading ? (
          <>
            {Array.from({ length: 1 }).map((_, i) => (
              <div key={i} className="">
                <Skeleton height={100} radius="md" width="100%" bg="#f5f5f4" />
              </div>
            ))}
          </>
        ) : (
          <>
            {items && items.length > 0 && <Rows items={items} />}
            {items && items.length === 0 && (
              <div
                className={twMerge(
                  'flex flex-col items-center gap-5 rounded-md p-5 overflow-auto',
                  lightMode ? 'bg-slate-200' : 'bg-slate-700'
                )}
              >
                <p className="lg:text-lg font-semibold">
                  Limitless Developers of Dallas was created to bring the tech community together.
                  Once we post our next meetup, it will appear here. Check out some other meetups
                  below in the meantime and join our group on Meetup.com!
                </p>
                <a
                  className={twMerge(
                    'underline whitespace-nowrap ',
                    lightMode ? 'text-gray-800' : 'text-white'
                  )}
                  href="https://www.meetup.com/limitless-developers-of-frisco/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="filled"
                    className={twMerge(
                      ' bg-orange-500 text-lg',
                      // lightMode ? 'text-gray-800' : 'text-white'
                      'text-white'
                    )}
                  >
                    <span className="pr-2">Join</span>
                    <IconExternalLink size={20} className={twMerge('pl-0', 'text-white')} />
                  </Button>
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function Rows({ items }: { items: any }) {
  const { lightMode } = getColorMode();
  const { isMobile, isDesktop } = useWindowSize();

  function ImgComp({ item, imgClassName }: { item: any; imgClassName?: string }) {
    return (
      //  <Image src={item.imageUrl} alt={item.title} height={400} width={600} />
      <img src={item.imageUrl} alt={item.title} className={twMerge('', imgClassName)} />
    );
  }

  console.log(items);
  return (
    <>
      {items ? (
        items.map((item: any, index: number) => (
          <section key={item.id}>
            {isDesktop && (
              <div className="">
                <ImgComp item={item} imgClassName="min-w-[300px]" />
              </div>
            )}
            <section className="w-full">
              <div className="pb-5">
                <div className="font-semibold text-lg break-words">{item.title}</div>
                <div>
                  <DateTimeComponent dateTime={item.dateTime} />
                </div>
              </div>
              {isMobile && (
                <div className="">
                  <ImgComp item={item} imgClassName="max-w-[90%] py-5 mx-auto" />
                </div>
              )}
              <div className="break-words">
                <Description description={item.description} />
              </div>

              <a
                className={twMerge(
                  'underline whitespace-nowrap ',
                  lightMode ? 'text-gray-800' : 'text-white'
                )}
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
