import Link from 'next/link';
import Image from 'next/image';

export default function Hero(): JSX.Element {
	return (
		<main className='lg:relative '>
			<div className='mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left'>
				<div className='px-4 lg:w-1/2 sm:px-8 xl:pr-16'>
					<h1 className='text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl'>
						<span className='block xl:inline'>Golf League Tracker</span>
					</h1>
					<p className='mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl'>
						Look out a ball is coming straight for you! Cheating on the next hole Get a new Sand Iron Phil Mickelson
						Pull out your 3-wood and.... Condor Waggle your hips and swing Swing quickly, Start your backswing, take it
						slow. Arnold Palmer While drinking beer Completely missed the ball, oops! And your caddie gets cross. Splash
						shot Pretend nothing just happened and smile. To distract your opponent Get your 5 wood "Get in the hole!".
					</p>
					<p className='mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl'>
						Golf & Membership Group
					</p>

					<div className='mt-10 sm:flex sm:justify-center lg:justify-start'>
						<div className='rounded-md shadow'>
							<Link href='/login'>
								<a className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10'>
									Login
								</a>
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div className='relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full'>
				<img className='w-full h-full object-cover' src='/coverphoto.jpg' alt='Logo' />
			</div>
		</main>
	);
}
