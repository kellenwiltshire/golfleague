import NewsCard from './Cards/NewsCard';
import NextRound from './Cards/NextRound/NextRound';
import PriorRound from './Cards/PriorRound';
import SpecialCard from './Cards/SpecialCard';

export default function DashboardCards(): JSX.Element {
	return (
		<div className='rounded-lg bg-gray-200 shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px'>
			<NextRound />
			<PriorRound />
			<NewsCard />
			<SpecialCard />
		</div>
	);
}
