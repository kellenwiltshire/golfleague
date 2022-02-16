import React from 'react';

export default function Footer(): JSX.Element {
	return (
		<footer className='text-gray-600 body-font'>
			<div className='container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col justify-center'>
				<a className='flex title-font font-medium items-center md:justify-start justify-center text-gray-900'>
					<span className='ml-3 text-xl'>© Golf League Tracker</span>
				</a>
				<div className='text-sm sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4 flex flex-row flex-wrap'>
					<p className='w-full text-center'>Created By:</p>
					<a
						href='https://kellenwiltshire.com/projects/golfleague'
						className=' ml-1 w-full text-center'
						rel='noopener noreferrer'
						target='_blank'
					>
						Kellen Wiltshire Web Development
					</a>
				</div>
			</div>
		</footer>
	);
}
