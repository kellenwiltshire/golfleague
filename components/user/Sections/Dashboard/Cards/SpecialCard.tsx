import { useSpecialContext } from '@/context/Store';
import { findNextSpecialEvent } from '@/utils/sortingFunctions';
import { NewspaperIcon } from '@heroicons/react/outline';
import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

export default function SpecialCard(): JSX.Element {
	const specialFunctions = useSpecialContext();

	const recentSpecialFunction = findNextSpecialEvent(specialFunctions);

	if (recentSpecialFunction) {
		const length = 100;
		const shortBody = recentSpecialFunction.details.substring(0, length) + '...';

		return (
			<Link href='/specialfunctions'>
				<a>
					<div className='sm:rounded-br-lg relative group bg-white p-6 h-full'>
						<div>
							<span className='rounded-lg inline-flex p-3 ring-4 ring-white'>
								<NewspaperIcon className='h-6 w-6' aria-hidden='true' />
							</span>
						</div>
						<div className='mt-8'>
							<h3 className='text-lg font-medium'>
								<span className='inset-0' aria-hidden='true' />
								Special Functions
							</h3>
							<p className='mt-2 text-gray-500 text-xl'>{recentSpecialFunction.name}</p>
							<ReactMarkdown className='mt-2 text-sm text-gray-500'>{shortBody}</ReactMarkdown>
						</div>
					</div>
				</a>
			</Link>
		);
	} else {
		return (
			<div className='sm:rounded-br-lg relative group bg-white p-6 h-full'>
				<div>
					<span className='rounded-lg inline-flex p-3 ring-4 ring-white'>
						<NewspaperIcon className='h-6 w-6' aria-hidden='true' />
					</span>
				</div>
				<div className='mt-8'>
					<h3 className='text-lg font-medium'>
						<span className='inset-0' aria-hidden='true' />
						Special Functions
					</h3>
					<p className='mt-2 text-gray-500 text-xl'>No Upcoming Special Functions</p>
				</div>
			</div>
		);
	}
}
