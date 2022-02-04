import React, { useState } from 'react';
import Image from 'next/image';
import { LockClosedIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import FormFailure from '../Modals/FormFailure';

export default function ResetPasswordForm({ setSignedIn }): JSX.Element {
	const [newPass, setNewPass] = useState('');
	const [confirmPass, setConfirmPass] = useState('');
	const [failure, setFailure] = useState(false);
	const router = useRouter();

	const pattern = new RegExp(
		'^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?()]).+$',
	);

	const [passMatchError, setPassMatchError] = useState(false);
	const [complexError, setComplexError] = useState(false);

	const submitForm = async (e) => {
		e.preventDefault();

		const query = router.query;
		const code = query.code;

		if (newPass !== confirmPass) {
			setPassMatchError(true);
		}

		if (newPass.length >= 8 && pattern.test(newPass)) {
			if (newPass === confirmPass) {
				const loginInfo = {
					code: code,
					newPass: newPass,
					confirmPass: confirmPass,
				};
				const req = await fetch('/api/setNewPass', {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(loginInfo),
				});

				if (req.status < 300) {
					const loginResponse = await req.json();

					setCookie(null, 'jwt', loginResponse.jwt, {
						maxAge: 30 * 24 * 60 * 60,
						path: '/',
					});

					setSignedIn(true);

					if (loginResponse.user.role.type === 'admin') {
						router.push(`/admin/${loginResponse.user.id}`);
					} else {
						router.push(`/user/${loginResponse.user.id}`);
					}
				} else {
					const loginResponse = await req.json();
					console.log(loginResponse);
					setFailure(true);
				}
			} else {
				setPassMatchError(true);
			}
		} else {
			setComplexError(true);
		}
	};
	if (failure) {
		return <FormFailure />;
	} else {
		return (
			<>
				<div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
					<div className='max-w-md w-full space-y-8'>
						<div className='flex justify-center flex-wrap flex-row'>
							<div className='relative w-full h-64 sm:h-72 md:h-96 lg:w-1/2 lg:h-full'>
								<Image
									src='/brand/logoNoText.jpg'
									alt='logo'
									height={868}
									width={587}
								/>
							</div>
							<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
								Create New Password
							</h2>

							{passMatchError ? (
								<div>
									<p className='mt-2 text-center text-sm text-red-600'>
										Error: New Password does not match Confirm Password
									</p>
								</div>
							) : null}
						</div>

						<form className='mt-8 space-y-6' onSubmit={submitForm}>
							<input type='hidden' name='remember' defaultValue='true' />
							<div className='rounded-md shadow-sm -space-y-px'>
								<div>
									{complexError ? (
										<p className='mt-2 text-center text-sm text-red-600 mb-2'>
											Error: New Password must be at least 8 characters with 1
											capital, 1 number, and 1 symbol
										</p>
									) : (
										<p className='text-xs mb-2 mt-2'>
											Password must be at least 8 characters with 1 capital, 1
											number, and 1 symbol
										</p>
									)}
									<label htmlFor='new-password' className='sr-only'>
										New Password
									</label>
									<input
										id='new-password'
										name='new-password'
										type='password'
										required
										onChange={(e) => setNewPass(e.target.value)}
										className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
										placeholder='New Password'
									/>
								</div>
								<div>
									<label htmlFor='confirm-new-password' className='sr-only'>
										Confirm New Password
									</label>
									<input
										id='confirm-new-password'
										name='confirm-new-password'
										type='password'
										required
										onChange={(e) => setConfirmPass(e.target.value)}
										className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
										placeholder='Confirm New Password'
									/>
								</div>
							</div>

							<div>
								<button
									type='submit'
									disabled
									className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
								>
									<span className='absolute left-0 inset-y-0 flex items-center pl-3'>
										<LockClosedIcon
											className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
											aria-hidden='true'
										/>
									</span>
									Change Password
								</button>
							</div>
						</form>
					</div>
				</div>
			</>
		);
	}
}
