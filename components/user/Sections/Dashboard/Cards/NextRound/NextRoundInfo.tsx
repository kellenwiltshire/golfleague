import React from 'react';

export default function NextRoundInfo({ nextRound }): JSX.Element {
	if (nextRound && nextRound.course) {
		let game = '';
		if (nextRound.game) {
			game = nextRound.game.replaceAll('_', ' ');
		}
		return (
			<div className='mt-8'>
				<h3 className='text-lg font-medium'>
					<span className='inset-0' aria-hidden='true' />
					Next Round Information
				</h3>
				<p className='mt-2 text-sm text-gray-500'>Course: {nextRound.course.name}</p>
				<p className='mt-2 text-sm text-gray-500'>Address: {nextRound.course.address}</p>
				<p className='mt-2 text-sm text-gray-500'>Course Phone Number: {nextRound.course.phone}</p>
				<p className='mt-2 text-sm text-gray-500'>Date: {nextRound.date}</p>
				<p className='mt-2 text-sm text-gray-500'>Start Time: {nextRound.start_time}</p>
				<p className='mt-2 text-sm text-gray-500'>Game: {game}</p>
			</div>
		);
	} else {
		return (
			<div className='mt-8'>
				<h3 className='text-lg font-medium'>
					<span className='inset-0' aria-hidden='true' />
					Next Round Information
				</h3>
				<p className='mt-2 text-sm text-gray-500'>Next Round Not Scheduled Yet</p>
			</div>
		);
	}
}
