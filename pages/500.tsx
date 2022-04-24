import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Custom500(): JSX.Element {
	useEffect(() => {
		const urlString = document.location.href;
		console.log('404 Error: ', urlString);
	});
	return (
		<div className='flex h-screen w-screen items-center justify-center bg-gray-100'>
			<div className='container flex flex-col items-center justify-center px-5 text-gray-700 md:flex-row'>
				<div className='font-title max-w-md'>
					<div className='font-dark text-5xl font-bold'>500</div>
					<p className='text-2xl font-light leading-normal md:text-3xl'>Sorry we couldn&apos;t find this page.</p>
					<p className='mb-8'>
						Well this is embarassing! If you come across this screen again, please send the Admin an email! For now, try
						to head back to the homepage.
					</p>
					<Link href='/'>
						<a className='focus:shadow-outline-blue inline rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none active:bg-blue-600'>
							back to homepage
						</a>
					</Link>
				</div>
				<div className='max-w-lg'>
					<Image height={512} width={512} src='/500.png' alt='500 Server Error' />
				</div>
			</div>
		</div>
	);
}
