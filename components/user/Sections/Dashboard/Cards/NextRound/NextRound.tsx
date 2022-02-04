import React, { useState } from 'react';
import { CalendarIcon } from '@heroicons/react/outline';
import { findNextRound } from '@/utils/sortingFunctions';
import NextRoundInfo from './NextRoundInfo';
import NextRoundForm from './NextRoundForm';
import { useScheduleContext, useUserContext } from '@/context/Store';
import SaveSuccess from '@/components/Notifications/SaveSuccess';
import SaveFail from '@/components/Notifications/SaveFail';

export default function NextRound(): JSX.Element {
	const user = useUserContext();
	const schedule = useScheduleContext();

	const [success, setSuccess] = useState(false);
	const [failure, setFailure] = useState(false);

	const nextRound = findNextRound(schedule);
	if (nextRound) {
		return (
			<div className='rounded-tl-lg rounded-tr-lg sm:rounded-tr-none relative group bg-white p-6'>
				{success ? <SaveSuccess show={success} setShow={setSuccess} /> : null}
				{failure ? <SaveFail show={failure} setShow={setFailure} /> : null}
				<div>
					<span className='rounded-lg inline-flex p-3 ring-4 ring-white'>
						<CalendarIcon className='h-6 w-6' aria-hidden='true' />
					</span>
				</div>
				<NextRoundInfo nextRound={nextRound} />
				<NextRoundForm user={user} setSuccess={setSuccess} setFailure={setFailure} />
			</div>
		);
	} else {
		return <div></div>;
	}
}
