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

const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
];

export default function MeetupList() {
  const { lightMode } = getColorMode();
  const [items, setItems] = useState<any>([]);

  return (
    <div
      className={twMerge('border rounded-md', lightMode ? 'border-gray-100' : 'border-gray-600')}
      style={{ maxHeight: '500px', overflowY: 'scroll' }}
    >
      <Table
        verticalSpacing="sm"
        stickyHeader
        stickyHeaderOffset={0}
        className={twMerge(lightMode ? 'bg-white ' : 'bg-zinc-500', 'border')}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th className="pl-5 text-gray-500" />
            <Table.Th className="pl-5 text-gray-500">Details</Table.Th>
            <Table.Th className="pl-5 text-gray-500">Desc.</Table.Th>

            <Table.Th className="pl-5 text-gray-500">Link</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody className="">
          <Suspense
            fallback={
              <>
                {Array.from({ length: 10 }).map((_, i) => (
                  <Table.Tr key={i}>
                    <Table.Td colSpan={5} className="">
                      <Skeleton height={40} radius="md" width="100%" />
                    </Table.Td>
                  </Table.Tr>
                ))}
              </>
            }
          >
            <Rows items={items} setItems={setItems} />
          </Suspense>
        </Table.Tbody>
        {items.length > 0 && (
          <Table.Caption className={twMerge(lightMode ? 'bg-white ' : 'bg-zinc-700', 'mt-0 pb-2')}>
            End of list
          </Table.Caption>
        )}
      </Table>
    </div>
  );
}

function Rows({ items, setItems }: { items: any; setItems: any }) {
  const [loading, setLoading] = useState(true); // Initialize loading state

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
          <Table.Tr key={i}>
            <Table.Td colSpan={5}>
              <Skeleton height={40} radius="md" width="100%" />
            </Table.Td>
          </Table.Tr>
        ))}
      </>
    );
  }
  console.log(items);
  return (
    <>
      {items ? (
        items.map((item: any) => (
          <Table.Tr key={item.id}>
            <Table.Td className="pl-5">
              {' '}
              <img src={item.imageUrl} alt={item.title} className="min-w-[280px] min-h-[50px]" />
            </Table.Td>
            <Table.Td className="pl-5 w-[20%]">
              <div className="font-semibold text-lg mb-5">{item.title}</div>
              <div>
                <DateTimeComponent dateTime={item.dateTime} />
              </div>
            </Table.Td>
            <Table.Td className="pl-5 w-[30%]">
              <Description description={item.description} />
            </Table.Td>

            <Table.Td className="pl-5">
              <a
                className="underline whitespace-nowrap xl:basis-1/3 rounded-sm text-sm font-medium py-1  hover:text-cyan-200 hover:border-accent-green"
                // style={{ boxShadow: "1px 1px 10px rgba(220, 222, 224, .8)" }}
                href={item.groupLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>
                  <IconExternalLink size={20} className="text-gray-700" />
                </Button>
              </a>
            </Table.Td>
          </Table.Tr>
        ))
      ) : (
        <Table.Tr h={500}>
          <Table.Td colSpan={5} className="mx-auto">
            <div className="flex justify-center items-start h-[20px]">No items found</div>
          </Table.Td>
        </Table.Tr>
      )}
    </>
  );
}
