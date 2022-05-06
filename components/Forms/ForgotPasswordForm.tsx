import React, { useState } from 'react';
import Image from 'next/image';
import { LockClosedIcon } from '@heroicons/react/outline';
import FormSuccess from '../Modals/FormSuccess';
import FormFailure from '../Modals/FormFailure';

export default function ForgotPasswordForm(): JSX.Element {
	const [email, setEmail] = useState('');
	const [success, setSuccess] = useState(false);
	const [failure, setFailure] = useState(false);

	const submitForm = async (e: React.FormEvent) => {
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
				<div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
					<div className='w-full max-w-md space-y-8'>
						<div className='flex flex-row flex-wrap justify-center'>
							<div className='relative h-64 w-full sm:h-72 md:h-96 lg:h-full lg:w-1/2'>
								<Image src='/brand/logoNoText.jpg' alt='logo' height={868} width={587} />
							</div>
							<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Reset Your Password</h2>
						</div>

						<form className='mt-8 space-y-6' onSubmit={submitForm}>
							<input type='hidden' name='remember' defaultValue='true' />
							<div className='-space-y-px rounded-md shadow-sm'>
								<div>
									<span className='text-xs'>
										Forgot or Resetting your password? Enter your email below to begin the process
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
										className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
										placeholder='Email'
									/>
								</div>
							</div>

							{/* <div>
								<button
									type='submit'
									disabled
									className='group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
								>
									<span className='absolute inset-y-0 left-0 flex items-center pl-3'>
										<LockClosedIcon
											className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
											aria-hidden='true'
										/>
									</span>
									Send Email Link
								</button>
							</div> */}
						</form>
					</div>
				</div>
			</>
		);
	}
}
