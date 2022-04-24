import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Articles({ news }): JSX.Element {
	const [image, setImage] = useState('/brand/logoNoText.jpg');

	useEffect(() => {
		if (news.media.length > 0) {
			setImage(news.media[0].url);
		}
	}, []);
	return (
		<div className='overflow-hidden bg-white'>
			<div className='relative mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8'>
				<div className='mx-auto max-w-prose text-base lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-8'>
					<div>
						<h3 className='mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl'>
							{news.title}
						</h3>
					</div>
				</div>
				<div className='mt-8 lg:grid lg:grid-cols-2 lg:gap-8'>
					<div className='relative lg:col-start-2 lg:row-start-1'>
						<img className='w-2/3 rounded-lg shadow-lg' src={image} alt='' />
					</div>
					<article className='prose'>
						<ReactMarkdown>{news.body}</ReactMarkdown>
					</article>
				</div>
			</div>
		</div>
	);
}
