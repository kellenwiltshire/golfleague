import Link from 'next/link';
import Image from 'next/image';

export default function Hero(): JSX.Element {
	return (
		<div className='container flex justify-center lg:relative'>
			<div className='w-full max-w-7xl pt-16 pb-20 text-center lg:py-48 lg:text-left'>
				<div className='px-4 sm:px-8 lg:w-1/2 xl:pr-16'>
					<h1 className='text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl'>
						<span className='block xl:inline'>Golf League Tracker</span>
					</h1>
					<p className='mx-auto mt-3 max-w-md text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl'>
						Look out a ball is coming straight for you! Cheating on the next hole Get a new Sand Iron Phil Mickelson
						Pull out your 3-wood and.... Condor Waggle your hips and swing Swing quickly, Start your backswing, take it
						slow. Arnold Palmer While drinking beer Completely missed the ball, oops! And your caddie gets cross. Splash
						shot Pretend nothing just happened and smile. To distract your opponent Get your 5 wood &quot;Get in the
						hole!&quot;.
					</p>
					<p className='mx-auto mt-3 max-w-md text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl'>
						Golf & Membership Group
					</p>

					<div className='mt-10 sm:flex sm:justify-center lg:justify-start'>
						<div className='rounded-md shadow'>
							<Link href='/login'>
								<a className='flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg'>
									Login
								</a>
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div className='relative h-64 w-full sm:h-72 md:h-96 lg:absolute lg:inset-y-20 lg:right-0 lg:h-5/6 lg:w-1/2'>
				<Image className='object-cover' src='/coverphoto.jpg' layout='fill' alt='Logo' />
			</div>
		</div>
	);
}
