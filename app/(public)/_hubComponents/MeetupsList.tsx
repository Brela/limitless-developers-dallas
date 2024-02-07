'use client';

import { Table, useMantineColorScheme } from '@mantine/core';
import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { useMeetupContext } from '@/app/_contexts/MeetupContext';

const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
];

const MeetupList = () => {
  const { colorScheme } = useMantineColorScheme();

  const { accessToken, fetchAccessToken } = useMeetupContext();

  useEffect(() => {
    // Fetch the access token when the component mounts
    fetchAccessToken();
  }, [fetchAccessToken]);

  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td className="pl-5">{element.position || '-'}</Table.Td>
      <Table.Td className="pl-5 text-slate-700">{element.name || '-'}</Table.Td>
      <Table.Td className="pl-5 text-slate-700">{element.symbol || '-'}</Table.Td>
      <Table.Td className="pl-5 text-slate-700">{element.mass || '-'}</Table.Td>
      <Table.Td className="pl-5 text-slate-700">-</Table.Td>
    </Table.Tr>
  ));

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
        <Table.Tbody className="">{rows}</Table.Tbody>
        <Table.Caption
          className={twMerge(colorScheme === 'light' ? 'bg-white ' : 'bg-black', 'mt-0 pb-2')}
        >
          End of list
        </Table.Caption>
      </Table>
    </div>
  );
};

export default MeetupList;
