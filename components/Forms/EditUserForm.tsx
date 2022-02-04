import React, { useState } from 'react';
import ToggleSwitch from '../Buttons/Toggle';

export default function EditUserForm({
	user,
	setSuccess,
	setFailure,
	setOpen,
}): JSX.Element {
	const [firstName, setFirstName] = useState(user.first_name);
	const [lastName, setLastName] = useState(user.last_name);
	const [email, setEmail] = useState(user.email);
	const [phone, setPhone] = useState(user.phone);
	const [carpool, setCarpool] = useState(user.carpool);
	const [teeTimeCondition, setTeeTimeCondition] = useState(user.teeTime);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = {
			id: user.id,
			data: {
				first_name: firstName,
				last_name: lastName,
				email: email,
				phone: phone,
				carpool: carpool,
				teeTime: teeTimeCondition,
			},
		};

		const req = await fetch('/api/editUser', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (req.status < 300) {
			setSuccess(true);
			setOpen(false);
		} else {
			setFailure(true);
			setOpen(false);
		}
	};
	return (
		<>
			<div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-md w-full space-y-8'>
					<div>
						<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
							Edit User
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
									id='first-name'
									name='first-name'
									type='first-name'
									value={firstName}
									required
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
									placeholder={firstName}
									onChange={(e) => setFirstName(e.target.value)}
								/>
							</div>
							<div>
								<label htmlFor='last-name' className='sr-only'>
									Last Name
								</label>
								<input
									id='last-name'
									name='last-name'
									type='last-name'
									value={lastName}
									required
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
									placeholder={lastName}
									onChange={(e) => setLastName(e.target.value)}
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
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
									placeholder={phone || 'Phone Number'}
								/>
							</div>
							<div>
								<label htmlFor='email-address' className='sr-only'>
									Email address
								</label>
								<input
									id='email-address'
									name='email'
									type='email'
									autoComplete='email'
									value={email}
									required
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
									placeholder={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>

							<div>
								<label htmlFor='carpool' className='sr-only'>
									Car Pool
								</label>
								<textarea
									id='carpool'
									name='carpool'
									value={carpool}
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
									placeholder={carpool || 'Car Pool Information'}
									onChange={(e) => setCarpool(e.target.value)}
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
								Update
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
