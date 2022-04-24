import { TeeTime, User } from '@/utils/interfaces';
import React from 'react';

export default function ScheduleCards({ schedule, waitingList }): JSX.Element {
	const newWaitingList = waitingList.reverse();
	return (
		<div className='flex w-full flex-row flex-wrap justify-center'>
			{schedule.map((teeTime: TeeTime) => {
				return (
					<div key={teeTime.teeTime} className='m-2 flex w-1/4 rounded-md shadow-sm'>
						<div className='flex w-16 flex-shrink-0 flex-col items-center justify-center rounded-l-md border text-sm font-medium text-black'>
							<p>{teeTime.teeTime}</p>
						</div>
						<div className='flex flex-1 flex-col justify-center truncate rounded-r-md border border-gray-200 bg-white'>
							{teeTime.golfers.map((golfer: User) => {
								return (
									<p key={golfer.first_name} className='mx-1'>
										{golfer.first_name} {golfer.last_name}
									</p>
								);
							})}
						</div>
					</div>
				);
			})}
			<div className='col-span-1 m-2 flex w-1/4 rounded-md shadow-sm'>
				<div className='flex w-16 flex-shrink-0 flex-col items-center justify-center rounded-l-md border text-sm font-medium text-black'>
					<p>Waiting List</p>
				</div>
				<div className='flex flex-1 flex-col justify-center truncate rounded-r-md border border-gray-200 bg-white'>
					{newWaitingList.map((golfer: User) => {
						return (
							<p key={golfer.first_name} className='mx-1'>
								{golfer.first_name} {golfer.last_name}
							</p>
						);
					})}
				</div>
			</div>
		</div>
	);
}
