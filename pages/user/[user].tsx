import React, { useEffect, useState } from 'react';
import Siderbar from '@/components/user/Sidebar';
import UserHeader from '@/components/user/UserHeader';
import { CogIcon, HomeIcon, PencilIcon } from '@heroicons/react/outline';
import Dashboard from '@/components/user/Sections/Dashboard';
import Scores from '@/components/user/Sections/Scores';
import Settings from '@/components/user/Sections/Settings';
import { fetchUser } from '@/utils/userFetch';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { useUserStore } from '@/stores/UserStore';
import useSWR from 'swr';

const navigation = [
	{ num: 1, name: 'Dashboard', icon: HomeIcon },
	{ num: 2, name: 'Scores', icon: PencilIcon },
	{ num: 3, name: 'Settings', icon: CogIcon },
];

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function User() {
	const { data: user, error: userError } = useSWR('/api/getUser', fetcher);

	const userStore = useUserStore();
	userStore.updateUser(user);

	const [openTab, setOpenTab] = useState(1);

	if (userError) return <div>Failed to load</div>;
	if (!user) return <div>Loading...</div>;

	return (
		<div className='flex w-full flex-row flex-wrap justify-center py-10'>
			<div className='container'>
				<UserHeader />
				{/* 3 column wrapper */}
				<div className='mx-auto w-full max-w-7xl flex-grow lg:flex xl:px-8'>
					{/* 3 column wrapper */}
					<div className='py-6 pl-4 pr-6 sm:pl-6 lg:pl-8 xl:pl-0'>
						<div className='flex items-center justify-between'>
							<div className='flex-1 space-y-8'>
								<div className='space-y-8 sm:flex sm:items-center sm:justify-between sm:space-y-0 xl:block xl:space-y-8'>
									<Siderbar openTab={openTab} setOpenTab={setOpenTab} navigation={navigation} />
								</div>
							</div>
						</div>
					</div>
					<div className='bg-white lg:min-w-0 lg:flex-1'>
						<div className={openTab === 1 ? 'block' : 'hidden'}>
							<Dashboard />
						</div>
						<div className={openTab === 2 ? 'block' : 'hidden'}>
							<Scores />
						</div>
						<div className={openTab === 3 ? 'block' : 'hidden'}>
							<Settings />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
