import React, { useEffect, useState } from 'react';
import Siderbar from '@/components/user/Sidebar';
import UserHeader from '@/components/user/UserHeader';
import { CogIcon, HomeIcon, PencilIcon } from '@heroicons/react/outline';
import Dashboard from '@/components/user/Sections/Dashboard';
import Scores from '@/components/user/Sections/Scores';
import Settings from '@/components/user/Sections/Settings';
import { getUserData } from '@/utils/userFetch';
import { GetServerSideProps } from 'next';

import { parseCookies } from 'nookies';
import {
	useUpdateScoreContext,
	useUpdateUserContext,
	useUpdateScheduleContext,
	useUpdateNewsContext,
	useUpdateSpecialContext,
	useUpdateAllScoresContext,
} from '@/context/Store';

const navigation = [
	{ num: 1, name: 'Dashboard', icon: HomeIcon },
	{ num: 2, name: 'Scores', icon: PencilIcon },
	{ num: 3, name: 'Settings', icon: CogIcon },
];

export default function User({ scores, user, schedules, news, specFunctions, allScores }) {
	const updateUser = useUpdateUserContext();
	const updateSchedule = useUpdateScheduleContext();
	const updateScore = useUpdateScoreContext();
	const updateNews = useUpdateNewsContext();
	const updateSpecialFunctions = useUpdateSpecialContext();
	const updateAllScores = useUpdateAllScoresContext();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		updateScore(scores);
		updateUser(user);
		updateSchedule(schedules);
		updateNews(news);
		updateSpecialFunctions(specFunctions);
		updateAllScores(allScores);
		setLoading(false);
	}, []);

	const [openTab, setOpenTab] = useState(1);

	if (loading) {
		return <div>LOADING...</div>;
	} else {
		return (
			<div className='py-10'>
				<UserHeader />
				{/* 3 column wrapper */}
				<div className='flex-grow w-full max-w-7xl mx-auto xl:px-8 lg:flex'>
					{/* 3 column wrapper */}
					<div className='pl-4 pr-6 py-6 sm:pl-6 lg:pl-8 xl:pl-0'>
						<div className='flex items-center justify-between'>
							<div className='flex-1 space-y-8'>
								<div className='space-y-8 sm:space-y-0 sm:flex sm:justify-between sm:items-center xl:block xl:space-y-8'>
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
		);
	}
}

export const getServerSideProps: GetServerSideProps = async (props) => {
	const cookies = parseCookies(props);
	const jwt = cookies.jwt;
	const userData = await getUserData(jwt);

	return {
		props: {
			scores: userData.scores,
			user: userData.user,
			schedules: userData.schedules,
			courses: userData.courses,
			news: userData.news,
			specFunctions: userData.specialFunctions,
			allScores: userData.allScores,
		},
	};
};
