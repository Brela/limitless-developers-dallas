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

export default function MeetupList() {
  const { lightMode } = getColorMode();

  const { data: items, isLoading: loading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await fetchAllEvents();
      const data: any = response || [];

      return data;
    },
    staleTime: 300000, // 5 minutes
  }) as UseQueryResult<any[], Error>;

  /*   useEffect(() => {
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
  }, []); */

  return (
    <section
      className={twMerge(
        ' ',
        lightMode ? 'border-gray-100 bg-white' : 'border-gray-600 bg-zinc-700'
      )}
    >
      <div className="px-5 py-10">
        {loading ? (
          <>
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="mb-10">
                <Skeleton height={300} radius="md" width="100%" bg="#f5f5f4" />
              </div>
            ))}
          </>
        ) : (
          <Rows items={items} />
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
          <section
            key={item.id}
            className="flex gap-10 mb-10 border rounded-md p-5 bg-stone-100 overflow-auto"
          >
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
