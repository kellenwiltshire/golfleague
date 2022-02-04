import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

export default function FunctionCards({ details }): JSX.Element {
	const [image, setImage] = useState('/brand/logoNoText.jpg');
	const length = 100;
	const shortBody = details.details.substring(0, length) + '...';

	useEffect(() => {
		if (details.image) {
			setImage(details.image.url);
		}
	}, []);
	return (
		<div>
			<Link
				href={{
					pathname: `/special/${details.id}`,
					query: { slug: details.id },
				}}
			>
				<a>
					<h1 className='text-3xl font-semibold text-gray-900 mb-2 text-center'>{details.name}</h1>
					<p className=' text-gray-700 mb-2 text-center'>{details.date}</p>
					<div className='w-full aspect-w-3 aspect-h-2 rounded-lg overflow-hidden flex justify-center'>
						<img src={image} className='h-44' />
					</div>
					<p className='mt-8 text-base text-gray-500'>
						<ReactMarkdown>{shortBody}</ReactMarkdown>
					</p>
				</a>
			</Link>
		</div>
	);
}
