import React, { useState } from 'react';
import { LockClosedIcon } from '@heroicons/react/solid';
import Router from 'next/router';
import { setCookie } from 'nookies';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginForm({ setSignedIn }): JSX.Element {
	const [userEmail, setUserEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loginError, setLoginError] = useState(false);

	const submitForm = async (e) => {
		e.preventDefault();
		const loginInfo = {
			identifier: userEmail,
			password: password,
		};

		try {
			const login = await fetch(`/api/submitLogin`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(loginInfo),
			});
			const response = await login.json();
			if (response.jwt) {
				setCookie(null, 'jwt', response.jwt, {
					maxAge: 30 * 24 * 60 * 60,
					path: '/',
				});

				setSignedIn(true);

				if (response.user.role.type === 'admin') {
					Router.push(`/admin/${response.user.id}`);
				} else {
					Router.push(`/user/${response.user.id}`);
				}
			} else {
				setLoginError(true);
				console.log(response);
			}
		} catch (error) {
			setLoginError(true);
			console.log(error);
		}
	};
	return (
		<>
			<div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-md w-full space-y-8'>
					<div className='flex justify-center flex-wrap flex-row'>
						<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
							Sign in to your account
						</h2>
						{loginError ? (
							<p className='mt-2 text-center text-sm text-red-600'>
								Login Error: Your Email or Password is Incorrect
							</p>
						) : null}
						<div className='relative w-full h-64 sm:h-72 md:h-96 lg:w-1/2 lg:h-full'>
							<Image
								src='/brand/logoNoText.jpg'
								alt='logo'
								height={868}
								width={587}
							/>
						</div>
					</div>

					<form className='mt-8 space-y-6' onSubmit={submitForm}>
						<input type='hidden' name='remember' defaultValue='true' />
						<div className='rounded-md shadow-sm -space-y-px'>
							<div>
								<label htmlFor='email-address' className='sr-only'>
									Email address
								</label>
								<input
									id='email-address'
									name='email'
									type='email'
									autoComplete='email'
									required
									onChange={(e) => setUserEmail(e.target.value)}
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
									placeholder='Email address'
								/>
							</div>
							<div>
								<label htmlFor='password' className='sr-only'>
									Password
								</label>
								<input
									id='password'
									name='password'
									type='password'
									autoComplete='current-password'
									required
									onChange={(e) => setPassword(e.target.value)}
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
									placeholder='Password'
								/>
							</div>
						</div>

						<div className='flex items-center justify-between'>
							<div className='text-sm'>
								<Link href='/start-reset-process'>
									<a className='font-medium text-indigo-600 hover:text-indigo-500'>
										Forgot your password?
									</a>
								</Link>
							</div>
						</div>

						<div>
							<button
								type='submit'
								className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
							>
								<span className='absolute left-0 inset-y-0 flex items-center pl-3'>
									<LockClosedIcon
										className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
										aria-hidden='true'
									/>
								</span>
								Sign in
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
