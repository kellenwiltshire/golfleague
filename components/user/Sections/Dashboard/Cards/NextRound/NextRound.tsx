import React, { useState } from 'react';
import { CalendarIcon } from '@heroicons/react/outline';
import { findNextRound } from '@/utils/sortingFunctions';
import NextRoundInfo from './NextRoundInfo';
import NextRoundForm from './NextRoundForm';
import SaveSuccess from '@/components/Notifications/SaveSuccess';
import SaveFail from '@/components/Notifications/SaveFail';
import { useUserStore } from '@/stores/UserStore';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function NextRound(): JSX.Element {
	const { data: schedule, error: scheduleError } = useSWR('/api/getSchedule', fetcher);

	const user = useUserStore().user;

	const [success, setSuccess] = useState(false);
	const [failure, setFailure] = useState(false);

	if (scheduleError) return <div>Failed to load</div>;
	if (!schedule) return <div>Loading...</div>;

	const nextRound = findNextRound(schedule);

	return (
		<div className='group relative rounded-tl-lg rounded-tr-lg bg-white p-6 sm:rounded-tr-none'>
			{success ? <SaveSuccess show={success} setShow={setSuccess} /> : null}
			{failure ? <SaveFail show={failure} setShow={setFailure} /> : null}
			<div>
				<span className='inline-flex rounded-lg p-3 ring-4 ring-white'>
					<CalendarIcon className='h-6 w-6' aria-hidden='true' />
				</span>
			</div>
			<NextRoundInfo nextRound={nextRound} />
			<NextRoundForm user={user} setSuccess={setSuccess} setFailure={setFailure} nextRound={nextRound} />
		</div>
	);
}
