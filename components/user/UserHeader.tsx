import { useUserStore } from '@/stores/UserStore';
import React from 'react';

export default function UserHeader(): JSX.Element {
	const userStore = useUserStore();

	const user = userStore.user;

	return (
		<header className='mx-2 w-full max-w-7xl flex-grow lg:flex xl:mx-0 xl:px-8'>
			<div className='md:flex md:items-center md:justify-between md:space-x-5'>
				<div className='flex items-start space-x-5'>
					<div className='pt-1.5'>
						<h1 className='text-2xl font-bold text-gray-900'>{`${user.first_name} ${user.last_name}`}</h1>
						<p className='hidden text-sm font-medium text-gray-500 md:block'>{user.email}</p>
					</div>
				</div>
			</div>
		</header>
	);
}
