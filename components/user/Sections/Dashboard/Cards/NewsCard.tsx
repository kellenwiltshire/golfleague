import { useNewsContext } from '@/context/Store';
import { findMostRecentNews } from '@/utils/sortingFunctions';
import { NewspaperIcon } from '@heroicons/react/outline';
import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

export default function NewsCard(): JSX.Element {
	const news = useNewsContext();

	const recentNews = findMostRecentNews(news);

	const length = 100;
	const shortBody = recentNews.body.substring(0, length) + '...';

	return (
		<Link href='/articles'>
			<a>
				<div className='sm:rounded-bl-lg relative group bg-white p-6 h-full'>
					<div>
						<span className='rounded-lg inline-flex p-3 ring-4 ring-white'>
							<NewspaperIcon className='h-6 w-6' aria-hidden='true' />
						</span>
					</div>
					<div className='mt-8'>
						<h3 className='text-lg font-medium'>
							<span className='inset-0' aria-hidden='true' />
							Recent News
						</h3>
						<p className='mt-2 text-gray-500 text-xl'>{recentNews.title}</p>
						<ReactMarkdown className='mt-2 text-sm text-gray-500'>{shortBody}</ReactMarkdown>
					</div>
				</div>
			</a>
		</Link>
	);
}
