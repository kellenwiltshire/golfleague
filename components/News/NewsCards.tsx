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
		<div key={post.title} className='flex flex-col rounded-lg shadow-lg overflow-hidden'>
			<div className='w-full aspect-w-3 aspect-h-2 rounded-lg overflow-hidden flex justify-center'>
				<img src={image} className='h-44' />
			</div>
			<div className='flex-1 bg-white p-6 flex flex-col justify-between'>
				<div className='flex-1'>
					<Link
						href={{
							pathname: `/news/${post.id}`,
							query: { slug: post.id },
						}}
					>
						<a className='block mt-2'>
							<p className='text-xl font-semibold text-gray-900'>{post.title}</p>
							<ReactMarkdown children={shortBody} className='mt-3 text-base text-gray-500' />
						</a>
					</Link>
				</div>
			</div>
		</div>
	);
}
