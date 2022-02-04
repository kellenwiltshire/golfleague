import { useUserContext } from '@/context/Store';
import React from 'react';

export default function UserHeader(): JSX.Element {
	const user = useUserContext();

	return (
		<header className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
			<div className='md:flex md:items-center md:justify-between md:space-x-5'>
				<div className='flex items-start space-x-5'>
					{/*
          Use vertical padding to simulate center alignment when both lines of text are one line,
          but preserve the same layout if the text wraps without making the image jump around.
        */}
					<div className='pt-1.5'>
						<h1 className='text-2xl font-bold text-gray-900'>{`${user.first_name} ${user.last_name}`}</h1>
						<p className='hidden md:block text-sm font-medium text-gray-500'>{user.email}</p>
					</div>
				</div>
			</div>
		</header>
	);
}
