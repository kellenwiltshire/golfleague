import CoursesTable from '@/components/Admin/CoursesTable';
import React, { useState } from 'react';
import AdminTabs from '@/components/Admin/AdminTabs';
import NextRoundTable from '@/components/Admin/NextRoundTable';
import UserScores from '@/components/Admin/UserScores';
import UserTable from '@/components/Admin/UserTable';
import ResultsTable from '@/components/Admin/ResultsTable';
import WeekendAwayTable from '@/components/Admin/WeekendAwayTable';
import YearEndTable from '@/components/Admin/YearEndTable';
import useSWR from 'swr';
import TableLoading from '@/components/LoadingModals/TableLoading';

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Admin(): JSX.Element {
	const { data: allUsers, error: allUsersError } = useSWR('/api/getAllUsers', fetcher);
	const { data: schedule, error: scheduleError } = useSWR('/api/getSchedule', fetcher);
	const { data: allScores, error: scoresError } = useSWR('/api/getScores', fetcher);
	const { data: courses, error: coursesError } = useSWR('/api/getCourses', fetcher);

	const [adminTab, setAdminTab] = useState(1);

	if (allUsersError || scheduleError || scoresError || coursesError) return <div>Failed to load</div>;
	if (!allUsers || !schedule || !allScores || !courses) return <TableLoading />;

	return (
		<>
			<div className='px-4 py-8 sm:px-0'>
				<AdminTabs adminTab={adminTab} setAdminTab={setAdminTab} />
			</div>
			<div className='bg-white lg:min-w-0 lg:flex-1'>
				<div className={adminTab === 1 ? 'block' : 'hidden'}>
					<UserTable initialUsers={allUsers} allScores={allScores} />
				</div>
				<div className={adminTab === 2 ? 'block' : 'hidden'}>
					<NextRoundTable users={allUsers} schedule={schedule} />
				</div>
				<div className={adminTab === 3 ? 'block' : 'hidden'}>
					<UserScores allScores={allScores} schedule={schedule} courses={courses} />
				</div>
				<div className={adminTab === 4 ? 'block' : 'hidden'}>
					<CoursesTable initialCourses={courses} />
				</div>
				<div className={adminTab === 5 ? 'block' : 'hidden'}>
					<ResultsTable allScores={allScores} schedule={schedule} />
				</div>
				<div className={adminTab === 6 ? 'block' : 'hidden'}>
					<WeekendAwayTable allUsers={allUsers} />
				</div>
				<div className={adminTab === 7 ? 'block' : 'hidden'}>
					<YearEndTable allUsers={allUsers} />
				</div>
			</div>
		</>
	);
}
