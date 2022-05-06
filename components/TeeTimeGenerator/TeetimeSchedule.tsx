import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import CloseSchedule from '../Modals/CloseSchedule';
import ScheduleCards from './ScheduleCards';

export default function TeetimeSchedule({ teeTimes, nextRound, setScheduleOpen }): JSX.Element {
	const [scheduledRound, setScheduledRound] = useState(teeTimes.teeTimeSchedule);
	const waitingList = teeTimes.waitingList;
	const [warningOpen, setWarningOpen] = useState(false);
	const game = nextRound.game.replaceAll('_', ' ');

	const componentRef = useRef(null);

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});
	return (
		<div className='mb-5'>
			{warningOpen ? (
				<CloseSchedule open={warningOpen} setOpen={setWarningOpen} setScheduleOpen={setScheduleOpen} />
			) : null}
			<div ref={componentRef}>
				<style type='text/css' media='print'>
					{
						'\
					{ html,body{height:100%;width:100%;margin:2cm;padding:2cm;} @page { size: A4 landscape; max-height:100%; max-width:100%  }\
'
					}
				</style>
				<div className='mt-3 flex flex-row flex-wrap justify-center'>
					<h2 className='mt-2 text-lg font-medium uppercase tracking-wide'>
						{nextRound.course.name} - {nextRound.date} - {nextRound.start_time} - {game}
					</h2>
					<ScheduleCards schedule={scheduledRound} waitingList={waitingList} setScheduledRound={setScheduledRound} />
				</div>
			</div>
			<div className='col-span-4 my-2 flex flex-row gap-1'>
				<button
					onClick={handlePrint}
					className='inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
				>
					PRINT
				</button>
				<button
					onClick={() => setWarningOpen(!warningOpen)}
					className='inline-flex items-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
				>
					CANCEL
				</button>
			</div>
		</div>
	);
}
