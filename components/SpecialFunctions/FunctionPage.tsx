import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function FunctionPage({ specialFunction }): JSX.Element {
	const [image, setImage] = useState('/brand/logoNoText.jpg');

	useEffect(() => {
		if (specialFunction.image) {
			setImage(specialFunction.image.url);
		}
	}, []);
	return (
		<div className='bg-white overflow-hidden'>
			<div className='relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8'>
				<div className='mx-auto text-base max-w-prose lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-none'>
					<div>
						<h3 className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-2'>
							{specialFunction.name}
						</h3>
						<p className=' text-gray-700 mb-2'>Date: {specialFunction.date}</p>
					</div>
				</div>
				<div className='mt-8 lg:grid lg:grid-cols-2 lg:gap-8'>
					<div className='relative lg:row-start-1 lg:col-start-2'>
						<img className='rounded-lg shadow-lg w-2/3' src={image} alt='' />
					</div>
					<article className='prose'>
						<ReactMarkdown>{specialFunction.details}</ReactMarkdown>
					</article>
				</div>
			</div>
		</div>
	);
}
