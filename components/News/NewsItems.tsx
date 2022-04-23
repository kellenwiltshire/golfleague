import { News } from '@/utils/interfaces';
import { sortNews } from '@/utils/sortingFunctions';
import NewsCards from './NewsCards';

export default function NewsItems({ news }): JSX.Element {
	const sortedNews = sortNews(news);
	return (
		<div className='relative bg-gray-50 px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28'>
			<div className='absolute inset-0'>
				<div className='h-1/3 bg-white sm:h-2/3' />
			</div>
			<div className='relative mx-auto max-w-7xl'>
				<div className='text-center'>
					<h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>From The Tee</h2>
					<p className='mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4'>
						Highlights from the season of extraordinary shots or events around the courses
					</p>
				</div>
				<div className='mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3'>
					{sortedNews.map((post: News) => (
						<NewsCards key={post.id} post={post} />
					))}
				</div>
			</div>
		</div>
	);
}
