'use client';

import { Skeleton, Table, useMantineColorScheme } from '@mantine/core';
import React, { Suspense, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useMeetupContext } from '@/src/contexts/MeetupContext';
import { TodoFetch, getTodos } from '@/src/api/getTodos';

const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
];

export default function MeetupList() {
  const { colorScheme } = useMantineColorScheme();

  return (
    <div className="border rounded-md" style={{ maxHeight: '500px', overflowY: 'scroll' }}>
      <Table
        verticalSpacing="sm"
        stickyHeader
        stickyHeaderOffset={0}
        className={twMerge(colorScheme === 'light' ? 'bg-white ' : 'bg-black', 'border')}
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
            <Rows />
          </Suspense>
        </Table.Tbody>
        <Table.Caption
          className={twMerge(colorScheme === 'light' ? 'bg-white ' : 'bg-black', 'mt-0 pb-2')}
        >
          End of list
        </Table.Caption>
      </Table>
    </div>
  );
}

function Rows() {
  const [todos, setTodos] = useState<TodoFetch[]>([]);
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    async function fetchTodos() {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      } finally {
        setLoading(false); // Set loading to false when fetching is complete
      }
    }

    fetchTodos();
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
      {todos.map((todo) => (
        <Table.Tr key={todo.id}>
          <Table.Td className="pl-5">{todo.title}</Table.Td>
          <Table.Td className="pl-5">-</Table.Td>
          <Table.Td className="pl-5">-</Table.Td>
          <Table.Td className="pl-5">-</Table.Td>
          <Table.Td className="pl-5">-</Table.Td>
        </Table.Tr>
      ))}
    </>
  );
}
