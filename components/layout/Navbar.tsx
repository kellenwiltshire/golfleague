import { Fragment, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { destroyCookie, parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import { useUserStore } from '@/stores/UserStore';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Navbar({ signedIn, setSignedIn }): JSX.Element {
	const cookie = parseCookies();
	const jwt = cookie.jwt;
	const router = useRouter();

	const userStore = useUserStore();

	const user = userStore.user;

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

				userStore.updateUser(user);
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
					<div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
						<div className='relative flex h-16 justify-between'>
							<div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
								{/* Mobile menu button */}
								<Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
									<span className='sr-only'>Open main menu</span>
									{open ? (
										<XIcon className='block h-6 w-6' aria-hidden='true' />
									) : (
										<MenuIcon className='block h-6 w-6' aria-hidden='true' />
									)}
								</Disclosure.Button>
							</div>
							<div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
								<div className='flex flex-shrink-0 items-center'>
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
															? 'inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900'
															: 'inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700',
													)}
												>
													{item.name}
												</a>
											</Link>
										);
									})}
								</div>
							</div>
							<div className='absolute inset-y-0 right-0 z-10 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
								{/* Profile dropdown */}
								<Menu as='div' className='relative ml-3'>
									<div>
										<Menu.Button className='flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
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
										<Menu.Items className='absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
											{signedIn ? (
												<>
													<Menu.Item>
														{({ active }) => (
															<Link href={userNavUrl}>
																<a className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
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
																	'block w-full px-4 py-2 text-left text-sm text-gray-700',
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
						<div className='space-y-1 pt-2 pb-4'>
							{navigation.map((item) => {
								return (
									<Link href={item.href} key={item.num}>
										<a
											className={classNames(
												activeTab === item.num
													? 'block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700'
													: 'block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700',
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
