'use client';

import { Skeleton, Table, useMantineColorScheme } from '@mantine/core';
import React, { Suspense, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { getEventById, getEventsBySlug, getSelf } from '@/src/api/meetup';
import getColorMode from '../../utils/getColorMode';

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
            <Table.Th className="pl-5">Meetup</Table.Th>
            <Table.Th className="pl-5">Location</Table.Th>
            <Table.Th className="pl-5">Going</Table.Th>
            <Table.Th className="pl-5">Date</Table.Th>
            <Table.Th className="pl-5">Link</Table.Th>
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
    async function fetchSample() {
      try {
        // const data = await getEventById('299001096');
        const data = await getEventsBySlug('AWS-Dallas');
        console.log(data);
        // setTodos(data)
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      } finally {
        setLoading(false); // Set loading to false when fetching is complete
      }
    }

    fetchSample();
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

  return (
    <>
      {Array.isArray(items) ? (
        items.map((todo: any) => (
          <Table.Tr key={todo.id}>
            <Table.Td className="pl-5">{todo.title}</Table.Td>
            <Table.Td className="pl-5">-</Table.Td>
            <Table.Td className="pl-5">-</Table.Td>
            <Table.Td className="pl-5">-</Table.Td>
            <Table.Td className="pl-5">-</Table.Td>
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
