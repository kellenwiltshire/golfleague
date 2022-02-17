import React, { useEffect } from 'react';
import Link from 'next/link';

export default function Custom404(): JSX.Element {
	useEffect(() => {
		const urlString = document.location.href;
		console.log('404 Error: ', urlString);
	});
	return (
		<div className='h-screen w-screen bg-gray-100 flex items-center justify-center'>
			<div className='container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700'>
				<div className='max-w-md font-title'>
					<div className='text-5xl font-dark font-bold'>404</div>
					<p className='text-2xl md:text-3xl font-light leading-normal'>Sorry we couldn&apos;t find this page.</p>
					<p className='mb-8'>
						You thought you hit a hole in one but in the end you&apos;re looking in the weeds for it! Let&apos;s try to
						head back to the homepage and Tee Off again!
					</p>
					<Link href='/'>
						<a className='px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700'>
							back to homepage
						</a>
					</Link>
				</div>
				<div className='max-w-lg'>
					<img src='/404.png' alt='404 Page Not Found' />
				</div>
			</div>
		</div>
	);
}
