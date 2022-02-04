import React from 'react';
import { parseCookies } from 'nookies';
import ScheduleTable from '@/components/Schedule/ScheduleTable';
import { GetServerSideProps } from 'next';

export default function schedule({ schedules }) {
	return (
		<div className='relative pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8'>
			<div className='relative max-w-7xl mx-auto'>
				<div className='text-center'>
					<h2 className='text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl'>Schedule</h2>
				</div>
				<div className='my-5'>
					<ScheduleTable schedules={schedules} />
				</div>
			</div>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async (props) => {
	const cookies = parseCookies(props);
	const jwt = cookies.jwt;

	const req = await fetch(`${process.env.DATABASE_URL}/schedules`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});

	const schedules = await req.json();

	return {
		props: { schedules },
	};
};
