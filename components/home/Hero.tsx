import Link from 'next/link';
import Image from 'next/image';

export default function Hero(): JSX.Element {
	return (
		<div className='container flex flex-row flex-wrap justify-center lg:relative'>
			<div className='w-full max-w-7xl pt-16 pb-20 text-center lg:py-48 lg:text-left'>
				<div className='px-4 sm:px-8 lg:w-1/2 xl:pr-16'>
					<h1 className='text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl'>
						<span className='block xl:inline'>Golf League Tracker</span>
					</h1>
					<div>
						<p className='mx-auto mt-3 max-w-md text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl'>
					Custom Web App for a Golf League. This site allows it&apos;s users to enter their score and set their availability for the following week. The Admin&apos;s are able to generate a schedule and post news for its members.</p>

					<p className='mx-auto mt-3 max-w-md text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl'>
						This Site was created for a Golf group from Toronto, Ontario.
					</p>
					<p className='mx-auto mt-3 max-w-md text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl'>
						This Site can be customized to meet your League&apos;s needs!
					</p>
					</div>


<div className='mx-auto mt-3 max-w-md text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl'>
	<p>

Admin Account Login
	</p>
<p>
email: Admin@admin.com
</p>
<p>
password: Admin1234
</p>

 </div>
<div className='mx-auto mt-3 max-w-md text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl'>
	<p>

User Account Login
	</p>
	<p>
	email: email1@email.com
	</p>
	<p>

 password: Test1234
	</p>

					</div>

					<p className='mx-auto mt-3 max-w-md text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl'>Try it out!</p>

					<div className='mt-10 sm:flex sm:justify-center lg:justify-start space-y-2 md:space-y-0 md:space-x-2'>
						<div className='rounded-md shadow'>
							<Link href='/login'>
								<a className='flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg'>
									Login
								</a>
							</Link>
						</div>
						<div className='rounded-md shadow'>
							<Link href='https://kellenwiltshire.com/projects/golfleague'>
								<a className='flex w-full items-center justify-center rounded-md border border-transparent text-indigo-600 px-8 py-3 text-base font-medium border-indigo-600 hover:text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg'>
									Learn More
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
