import React, { useState } from 'react';
import Image from 'next/image';
import { LockClosedIcon } from '@heroicons/react/outline';
import FormSuccess from '../Modals/FormSuccess';
import FormFailure from '../Modals/FormFailure';

export default function ForgotPasswordForm(): JSX.Element {
	const [email, setEmail] = useState('');
	const [success, setSuccess] = useState(false);
	const [failure, setFailure] = useState(false);

	const submitForm = async (e) => {
		e.preventDefault();

		const req = await fetch('/api/resetPassword', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(email),
		});

		if (req.status < 300) {
			setSuccess(true);
		} else {
			setFailure(true);
		}
	};
	if (success) {
		return <FormSuccess />;
	} else if (failure) {
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
								Reset Your Password
							</h2>
						</div>

						<form className='mt-8 space-y-6' onSubmit={submitForm}>
							<input type='hidden' name='remember' defaultValue='true' />
							<div className='rounded-md shadow-sm -space-y-px'>
								<div>
									<span className='text-xs'>
										Forgot or Resetting your password? Enter your email below to
										begin the process
									</span>

									<label htmlFor='email' className='sr-only'>
										email
									</label>
									<input
										id='email'
										name='email'
										type='email'
										required
										onChange={(e) => setEmail(e.target.value)}
										className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
										placeholder='Email'
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
									Send Email Link
								</button>
							</div>
						</form>
					</div>
				</div>
			</>
		);
	}
}
