import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

export default function NewsCards({ post }): JSX.Element {
	const length = 100;
	const shortBody = post.body.substring(0, length) + '...';
	const [image, setImage] = useState('/brand/logoNoText.jpg');

	useEffect(() => {
		if (post.media.length > 0) {
			setImage(post.media[0].url);
		}
	}, []);
	return (
		<div key={post.title} className='flex flex-col overflow-hidden rounded-lg shadow-lg'>
			<div className='aspect-w-3 aspect-h-2 flex w-full justify-center overflow-hidden rounded-lg'>
				<img src={image} className='h-44' />
			</div>
			<div className='flex flex-1 flex-col justify-between bg-white p-6'>
				<div className='flex-1'>
					<Link
						href={{
							pathname: `/news/${post.id}`,
							query: { slug: post.id },
						}}
					>
						<a className='mt-2 block'>
							<p className='text-xl font-semibold text-gray-900'>{post.title}</p>
							<ReactMarkdown className='mt-3 text-base text-gray-500'>{shortBody}</ReactMarkdown>
						</a>
					</Link>
				</div>
			</div>
		</div>
	);
}
