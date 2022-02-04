import CoursesTable from '@/components/Admin/CoursesTable';
import React, { useState } from 'react';
import AdminTabs from '@/components/Admin/AdminTabs';
import NextRoundTable from '@/components/Admin/NextRoundTable';
import UserScores from '@/components/Admin/UserScores';
import UserTable from '@/components/Admin/UserTable';
import ResultsTable from '@/components/Admin/ResultsTable';
import WeekendAwayTable from '@/components/Admin/WeekendAwayTable';
import YearEndTable from '@/components/Admin/YearEndTable';

export default function Admin(): JSX.Element {
	const [adminTab, setAdminTab] = useState(1);
	return (
		<>
			<div className='px-4 py-8 sm:px-0'>
				<AdminTabs adminTab={adminTab} setAdminTab={setAdminTab} />
			</div>
			<div className='bg-white lg:min-w-0 lg:flex-1'>
				<div className={adminTab === 1 ? 'block' : 'hidden'}>
					<UserTable />
				</div>
				<div className={adminTab === 2 ? 'block' : 'hidden'}>
					<NextRoundTable />
				</div>
				<div className={adminTab === 3 ? 'block' : 'hidden'}>
					<UserScores />
				</div>
				<div className={adminTab === 4 ? 'block' : 'hidden'}>
					<CoursesTable />
				</div>
				<div className={adminTab === 5 ? 'block' : 'hidden'}>
					<ResultsTable />
				</div>
				<div className={adminTab === 6 ? 'block' : 'hidden'}>
					<WeekendAwayTable />
				</div>
				<div className={adminTab === 7 ? 'block' : 'hidden'}>
					<YearEndTable />
				</div>
			</div>
		</>
	);
}
