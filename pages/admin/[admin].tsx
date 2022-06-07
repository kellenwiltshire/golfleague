import React, { useEffect, useState } from 'react';
import Siderbar from '@/components/user/Sidebar';
import UserHeader from '@/components/user/UserHeader';
import { CogIcon, HomeIcon, PencilIcon, UserIcon } from '@heroicons/react/outline';
import Dashboard from '@/components/user/Sections/Dashboard';
import Scores from '@/components/user/Sections/Scores';
import Settings from '@/components/user/Sections/Settings';
import { getAdminData } from '@/utils/userFetch';

import Admin from '@/components/user/Sections/Admin';
import { parseCookies } from 'nookies';
import { useUserStore } from '@/stores/UserStore';

import { useAllScoresStore } from '@/stores/AllScoresStore';
import { useAllUsersStore } from '@/stores/AllUsersStore';
import { useCoursesStore } from '@/stores/CoursesStore';

import { GetServerSideProps } from 'next';

import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((r) => r.json());

const adminNav = [
	{ num: 1, name: 'Dashboard', icon: HomeIcon },
	{ num: 2, name: 'Scores', icon: PencilIcon },
	{ num: 3, name: 'Settings', icon: CogIcon },
	{ num: 4, name: 'Admin', icon: UserIcon },
];

export default function AdminPage({ allScores, allUsers, courses }): JSX.Element {
	const { data: user, error: userError } = useSWR('/api/getUser', fetcher);

	const userStore = useUserStore();
	userStore.updateUser(user);

	const allScoresStore = useAllScoresStore();
	const allUsersStore = useAllUsersStore();
	const coursesStore = useCoursesStore();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		allScoresStore.updateScore(allScores);
		allUsersStore.updateUsers(allUsers);
		coursesStore.updateCourses(courses);

		setLoading(false);
	}, []);

	const [openTab, setOpenTab] = useState(1);

	if (userError) return <div>Failed to load</div>;
	if (!user) return <div>Loading...</div>;

	return (
		<div className='flex w-full flex-row flex-wrap justify-center py-10'>
			<div className='container'>
				<UserHeader />
				<div className='w-full max-w-7xl flex-grow lg:flex xl:px-8'>
					<div className='sm:pl-6 lg:pl-8 xl:pl-0'>
						<div className='flex items-center justify-between'>
							<div className='flex-1 space-y-8'>
								<div className='space-y-8 sm:flex sm:items-center sm:justify-between sm:space-y-0 xl:block xl:space-y-8'>
									<Siderbar openTab={openTab} setOpenTab={setOpenTab} navigation={adminNav} />
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
						<div className={openTab === 4 ? 'block' : 'hidden'}>
							<Admin />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async (props) => {
	const cookies = parseCookies(props);
	const jwt = cookies.jwt;
	const userData = await getAdminData(jwt);

	if (!userData) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		props: {
			scores: userData.scores,
			user: userData.user,
			schedules: userData.schedules,
			courses: userData.courses,
			allScores: userData.allScores,
			allUsers: userData.allUsers,
			news: userData.news,
			specFunctions: userData.specialFunctions,
		},
	};
};
