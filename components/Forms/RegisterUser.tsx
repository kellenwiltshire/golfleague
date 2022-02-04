import React, { useState } from 'react';
import ToggleSwitch from '../Buttons/Toggle';

export default function RegisterUserForm({
	setSuccess,
	setFailure,
	setOpen,
	setUsers,
}): JSX.Element {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [conditions, setConditions] = useState('');
	const [teeTimeCondition, setTeeTimeCondition] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const info = {
			first_name: firstName,
			last_name: lastName,
			email: email,
			username: email,
			password: 'Womenonpar2022',
			phone: phone,
			conditions: conditions,
		};

		const req = await fetch('/api/addUser', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(info),
		});

		if (req.status < 300) {
			const req = await fetch('/api/getAllUsers');
			if (req.status < 300) {
				const response = await req.json();
				setUsers(response);
				setSuccess(true);
				setOpen(false);
			} else {
				setFailure(true);
				setOpen(false);
				console.log(req);
			}
		} else {
			setFailure(true);
			setOpen(false);
			console.log(req);
		}
	};
	return (
		<>
			<div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-md w-full space-y-8'>
					<div>
						<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
							Add Golfer
						</h2>
					</div>
					<form className='mt-8 space-y-6' onSubmit={handleSubmit}>
						<input type='hidden' name='remember' defaultValue='true' />
						<div className='rounded-md shadow-sm -space-y-px'>
							<div>
								<label htmlFor='last-name' className='sr-only'>
									First Name
								</label>
								<input
									onChange={(e) => setFirstName(e.target.value)}
									id='first-name'
									name='first-name'
									type='first-name'
									required
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
									placeholder='First Name'
								/>
							</div>
							<div>
								<label htmlFor='last-name' className='sr-only'>
									Last Name
								</label>
								<input
									onChange={(e) => setLastName(e.target.value)}
									id='last-name'
									name='last-name'
									type='last-name'
									required
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
									placeholder='Last Name'
								/>
							</div>
							<div>
								<label htmlFor='phone-number' className='sr-only'>
									Phone Number
								</label>
								<input
									id='phone-number'
									name='phone-number'
									type='text'
									onChange={(e) => setPhone(e.target.value)}
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
									placeholder='Phone Number'
								/>
							</div>
							<div>
								<label htmlFor='email-address' className='sr-only'>
									Email address
								</label>
								<input
									onChange={(e) => setEmail(e.target.value)}
									id='email-address'
									name='email'
									type='email'
									autoComplete='email'
									required
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
									placeholder='Email'
								/>
							</div>

							<div>
								<label htmlFor='conditions' className='sr-only'>
									Car Pool
								</label>
								<textarea
									id='conditions'
									name='conditions'
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
									placeholder='Car Pool Information'
									onChange={(e) => setConditions(e.target.value)}
								/>
							</div>

							<div className='flex flex-row py-3 justify-between px-3'>
								<label
									htmlFor='teeTime'
									className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
								>
									Only Tee Times After 4:30?
								</label>
								<div className='mt-1 sm:mt-0 sm:col-span-2 flex flex-row space-x-2'>
									<span> No </span>
									<div className='max-w-lg flex'>
										<ToggleSwitch
											enabled={teeTimeCondition}
											setEnabled={setTeeTimeCondition}
										/>
									</div>
									<span> Yes </span>
								</div>
							</div>
						</div>

						<div>
							<button
								type='submit'
								disabled
								className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
							>
								<span className='absolute left-0 inset-y-0 flex items-center pl-3'></span>
								Add Golfer
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
