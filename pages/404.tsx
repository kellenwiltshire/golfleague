import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Custom404(): JSX.Element {
	useEffect(() => {
		const urlString = document.location.href;
		console.log('404 Error: ', urlString);
	});
	return (
		<div className='flex h-screen w-screen items-center justify-center bg-gray-100'>
			<div className='container flex flex-col items-center justify-center px-5 text-gray-700 md:flex-row'>
				<div className='font-title max-w-md'>
					<div className='font-dark text-5xl font-bold'>404</div>
					<p className='text-2xl font-light leading-normal md:text-3xl'>Sorry we couldn&apos;t find this page.</p>
					<p className='mb-8'>
						You thought you hit a hole in one but in the end you&apos;re looking in the weeds for it! Let&apos;s try to
						head back to the homepage and Tee Off again!
					</p>
					<Link href='/'>
						<a className='focus:shadow-outline-blue inline rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none active:bg-blue-600'>
							back to homepage
						</a>
					</Link>
				</div>
				<div className='max-w-lg'>
					<Image width={512} height={512} src='/404.png' alt='404 Page Not Found' />
				</div>
			</div>
		</div>
	);
}
