// import { TeeTime, User } from '@/utils/interfaces';
import React from 'react';
import DownButton from '../Buttons/DownButton';
import UpButton from '../Buttons/UpButton';

export default function ScheduleCards({ schedule, waitingList, setScheduledRound }): JSX.Element {
	const handleMoveDown = (golfer) => {
		const changeSchedule = schedule;

		const currentTeeTime = changeSchedule.find((teeTime) => teeTime.golfers.find((player) => player.id === golfer.id));
		const currentTeeIndex = changeSchedule.findIndex((teeTime) => teeTime.teeTime === currentTeeTime.teeTime);
		const movingPlayerIndex = currentTeeTime.golfers.findIndex((player) => player.id === golfer.id);

		//check if movingPlayer is last golfer in the Array
		if (movingPlayerIndex >= currentTeeTime.golfers.length - 1) {
			if (currentTeeIndex != changeSchedule.length - 1) {
				//current player being moved
				const movingPlayer = currentTeeTime.golfers[movingPlayerIndex];
				//if the next tee time has less than 4 people in it we just need to add the player and not switch them (such as to make a single player into a twosome or threesome)
				if (changeSchedule[currentTeeIndex + 1].golfers.length < 4) {
					changeSchedule[currentTeeIndex].golfers.splice(movingPlayerIndex, 1);
					changeSchedule[currentTeeIndex + 1].golfers.splice(0, 0, movingPlayer);
				} else {
					//if the next array is also full then we switch the first person in that array with the moving player
					//nextPlayer is the first player in the tee time array after the current tee time
					const nextPlayer = changeSchedule[currentTeeIndex + 1].golfers[0];
					//current player being moved
					const movingPlayer = currentTeeTime.golfers[movingPlayerIndex];

					//replace next tee time player with player being moved
					changeSchedule[currentTeeIndex + 1].golfers.splice(0, 1);
					changeSchedule[currentTeeIndex + 1].golfers.splice(0, 0, movingPlayer);

					//move replaced player to where player being moved was
					changeSchedule[currentTeeIndex].golfers.splice(movingPlayerIndex, 1);
					changeSchedule[currentTeeIndex].golfers.splice(movingPlayerIndex, 0, nextPlayer);
				}
			}
		} else {
			//if they aren't the last golfer in the array then we just switch within the array
			const movingPlayer = currentTeeTime.golfers[movingPlayerIndex];
			currentTeeTime.golfers.splice(movingPlayerIndex, 1);
			currentTeeTime.golfers.splice(movingPlayerIndex + 1, 0, movingPlayer);
		}

		setScheduledRound([...changeSchedule]);
	};

	const handleMoveUp = (golfer) => {
		const changeSchedule = schedule;

		const currentTeeTime = changeSchedule.find((teeTime) => teeTime.golfers.find((player) => player.id === golfer.id));
		const currentTeeTimeIndex = changeSchedule.findIndex((teeTime) => teeTime.teeTime === currentTeeTime.teeTime);
		const movingPlayerIndex = currentTeeTime.golfers.findIndex((player) => player.id === golfer.id);

		//check if the moving player is the first player in the array
		if (movingPlayerIndex === 0) {
			//check to see if they are already the 1st player in the 1st tee time
			if (currentTeeTimeIndex != 0) {
				//Find player from the tee time before the current tee time
				const prevArrayLength = changeSchedule[currentTeeTimeIndex - 1].golfers.length;
				const nextPlayer = changeSchedule[currentTeeTimeIndex - 1].golfers[prevArrayLength - 1];
				//current player being moved
				const movingPlayer = currentTeeTime.golfers[movingPlayerIndex];

				//if the array player is moving to has less than 4 people in, then we just add and don't switch
				if (prevArrayLength < 4) {
					changeSchedule[currentTeeTimeIndex].golfers.splice(movingPlayerIndex, 1);
					changeSchedule[currentTeeTimeIndex - 1].golfers.splice(prevArrayLength, 0, movingPlayer);
				} else {
					//else we make the switch
					//replace next tee time player with player being moved
					changeSchedule[currentTeeTimeIndex - 1].golfers.splice(3, 1);
					changeSchedule[currentTeeTimeIndex - 1].golfers.splice(3, 0, movingPlayer);
					//move replaced player to where player being moved was
					changeSchedule[currentTeeTimeIndex].golfers.splice(0, 1);
					changeSchedule[currentTeeTimeIndex].golfers.splice(0, 0, nextPlayer);
				}
			}
		} else {
			//if they aren't the first golfer then just make the switch within the array
			const movingPlayer = currentTeeTime.golfers[movingPlayerIndex];
			currentTeeTime.golfers.splice(movingPlayerIndex, 1);
			currentTeeTime.golfers.splice(movingPlayerIndex - 1, 0, movingPlayer);
		}

		setScheduledRound([...changeSchedule]);
	};

	return (
		<div className='flex w-full flex-row flex-wrap justify-center'>
			{schedule.map((teeTime) => {
				return (
					<div key={teeTime.teeTime} className='m-2 flex w-1/4 rounded-md shadow-sm'>
						<div className='flex w-16 flex-shrink-0 flex-col items-center justify-center rounded-l-md border text-sm font-medium text-black'>
							<p>{teeTime.teeTime}</p>
						</div>
						<ul className='flex flex-1 flex-col justify-center truncate rounded-r-md border border-gray-200 bg-white'>
							{teeTime.golfers.map((golfer) => {
								return (
									<li key={golfer.id}>
										{golfer.first_name} {golfer.last_name} <UpButton handleClick={handleMoveUp} golfer={golfer} />{' '}
										<DownButton handleClick={handleMoveDown} golfer={golfer} />
										{/* {golfer.carpool ? <p className='mx-1 text-xs text-gray-400'>carpool: {golfer.carpool}</p> : null} */}
									</li>
								);
							})}
						</ul>
					</div>
				);
			})}
			<div className='col-span-1 m-2 flex w-1/4 rounded-md shadow-sm'>
				<div className='flex w-16 flex-shrink-0 flex-col items-center justify-center rounded-l-md border text-sm font-medium text-black'>
					<p>Waiting List</p>
				</div>
				<ul className='flex flex-1 flex-col justify-center truncate rounded-r-md border border-gray-200 bg-white'>
					{waitingList.map((golfer) => {
						return (
							<li key={golfer.first_name} className='mx-1'>
								{golfer.first_name} {golfer.last_name}
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
