import { Fragment, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useUpdateUserContext, useUserContext } from '@/context/Store';
import { destroyCookie, parseCookies } from 'nookies';
import { useRouter } from 'next/router';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Navbar({ signedIn, setSignedIn }): JSX.Element {
	const cookie = parseCookies();
	const jwt = cookie.jwt;
	const router = useRouter();

	const updateUser = useUpdateUserContext();
	const user = useUserContext();

	const [activeTab, setActiveTab] = useState(1);
	const [userNavUrl, setUserNavUrl] = useState('');
	const picture = '/avatars/avatar.png';

	const [navigation, setNavigation] = useState([
		{ num: 1, name: 'Home', href: '/' },
		{ num: 2, name: 'Sign In', href: '/login' },
	]);

	useEffect(() => {
		const urlString = document.location.href;

		if (urlString.includes('user') || urlString.includes('admin')) {
			setActiveTab(2);
		} else if (urlString.includes('news') || urlString.includes('articles')) {
			setActiveTab(3);
		} else if (urlString.includes('schedule')) {
			setActiveTab(4);
		} else if (urlString.includes('special')) {
			setActiveTab(5);
		} else {
			setActiveTab(1);
		}
	});

	useEffect(() => {
		if (jwt) {
			const fetchUser = async () => {
				const req = await fetch(`/api/getCurrentUser`, {
					method: 'POST',
					body: jwt,
				});
				const user = await req.json();

				updateUser(user);
				if (user.role.type === 'admin') {
					setUserNavUrl(`/admin/${user.id}`);
				} else {
					setUserNavUrl(`/user/${user.id}`);
				}
				setSignedIn(true);
			};

			fetchUser();
		} else {
			setSignedIn(false);
		}
	}, [signedIn]);

	useEffect(() => {
		if (signedIn) {
			setNavigation([
				{ num: 1, name: 'Home', href: '/' },
				{ num: 2, name: 'Dashboard', href: userNavUrl },
				{ num: 3, name: 'News', href: '/articles' },
				{ num: 4, name: 'Schedule', href: '/schedule' },
				{ num: 5, name: 'Special Functions', href: '/specialfunctions' },
			]);
		} else {
			setNavigation([
				{ num: 1, name: 'Home', href: '/' },
				{ num: 2, name: 'Sign In', href: '/login' },
			]);
		}
	}, [signedIn, user]);

	const signOut = () => {
		setSignedIn(false);
		destroyCookie(null, 'jwt');
		router.push('/');
	};

	return (
		<Disclosure as='nav' className='bg-white shadow'>
			{({ open }) => (
				<>
					<div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
						<div className='relative flex justify-between h-16'>
							<div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
								{/* Mobile menu button */}
								<Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
									<span className='sr-only'>Open main menu</span>
									{open ? (
										<XIcon className='block h-6 w-6' aria-hidden='true' />
									) : (
										<MenuIcon className='block h-6 w-6' aria-hidden='true' />
									)}
								</Disclosure.Button>
							</div>
							<div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
								<div className='flex-shrink-0 flex items-center'>
									<Link href='/'>
										<a>Golf League Tracker</a>
									</Link>
								</div>

								<div className='hidden sm:ml-6 sm:flex sm:space-x-8'>
									{/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
									{navigation.map((item) => {
										return (
											<Link href={item.href} key={item.num}>
												<a
													className={classNames(
														activeTab === item.num
															? 'border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
															: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium',
													)}
												>
													{item.name}
												</a>
											</Link>
										);
									})}
								</div>
							</div>
							<div className='absolute z-10 inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
								{/* Profile dropdown */}
								<Menu as='div' className='ml-3 relative'>
									<div>
										<Menu.Button className='bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
											<span className='sr-only'>Open user menu</span>
											<img
												className='h-8 w-8 rounded-full'
												src={picture}
												alt=''
											/>
										</Menu.Button>
									</div>
									<Transition
										as={Fragment}
										enter='transition ease-out duration-200'
										enterFrom='transform opacity-0 scale-95'
										enterTo='transform opacity-100 scale-100'
										leave='transition ease-in duration-75'
										leaveFrom='transform opacity-100 scale-100'
										leaveTo='transform opacity-0 scale-95'
									>
										<Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
											{signedIn ? (
												<>
													<Menu.Item>
														{({ active }) => (
															<Link href={userNavUrl}>
																<a className='hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700'>
																	Your Dashboard
																</a>
															</Link>
														)}
													</Menu.Item>

													<Menu.Item>
														{({ active }) => (
															<button
																onClick={signOut}
																className={classNames(
																	active ? 'bg-gray-100' : '',
																	'block px-4 py-2 text-sm text-gray-700 w-full text-left',
																)}
															>
																Sign Out
															</button>
														)}
													</Menu.Item>
												</>
											) : (
												<Menu.Item>
													{({ active }) => (
														<a
															href='/login'
															className={classNames(
																active ? 'bg-gray-100' : '',
																'block px-4 py-2 text-sm text-gray-700',
															)}
														>
															Login
														</a>
													)}
												</Menu.Item>
											)}
										</Menu.Items>
									</Transition>
								</Menu>
							</div>
						</div>
					</div>

					<Disclosure.Panel className='sm:hidden'>
						<div className='pt-2 pb-4 space-y-1'>
							{navigation.map((item) => {
								return (
									<Link href={item.href} key={item.num}>
										<a
											className={classNames(
												activeTab === item.num
													? 'bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
													: 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium',
											)}
										>
											{item.name}
										</a>
									</Link>
								);
							})}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
