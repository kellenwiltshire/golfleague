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
import { useUserStore } from '@/stores/UserStore';
import { useScheduleStore } from '@/stores/ScheduleStore';
import { useScoreStore } from '@/stores/ScoresStore';
import { useNewsStore } from '@/stores/NewsStore';
import { useSpecialFunctionsStore } from '@/stores/SpecialFunctionsStore';
import { useAllScoresStore } from '@/stores/AllScoresStore';

const navigation = [
	{ num: 1, name: 'Dashboard', icon: HomeIcon },
	{ num: 2, name: 'Scores', icon: PencilIcon },
	{ num: 3, name: 'Settings', icon: CogIcon },
];

export default function User({
	scores,
	user,
	schedules,
	news,
	specFunctions,
	allScores,
}) {
	const userStore = useUserStore();
	const scheduleStore = useScheduleStore();
	const scoreStore = useScoreStore();
	const newsStore = useNewsStore();
	const specialFunctionsStore = useSpecialFunctionsStore();
	const allScoresStore = useAllScoresStore();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(false);

		userStore.updateUser(user);
		scheduleStore.updateSchedule(schedules);
		scoreStore.updateScore(scores);
		newsStore.updateNews(news);
		specialFunctionsStore.updateSpecialFunctions(specFunctions);
		allScoresStore.updateScore(allScores);
	}, []);

	const [openTab, setOpenTab] = useState(1);

	if (loading) {
		return <div>LOADING...</div>;
	} else {
		return (
			<div className='py-10'>
				<UserHeader />
				{/* 3 column wrapper */}
				<div className='mx-auto w-full max-w-7xl flex-grow lg:flex xl:px-8'>
					{/* 3 column wrapper */}
					<div className='py-6 pl-4 pr-6 sm:pl-6 lg:pl-8 xl:pl-0'>
						<div className='flex items-center justify-between'>
							<div className='flex-1 space-y-8'>
								<div className='space-y-8 sm:flex sm:items-center sm:justify-between sm:space-y-0 xl:block xl:space-y-8'>
									<Siderbar
										openTab={openTab}
										setOpenTab={setOpenTab}
										navigation={navigation}
									/>
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
