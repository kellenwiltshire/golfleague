import ToggleSwitch from '@/components/Buttons/Toggle';
import FormSuccess from '@/components/Modals/FormSuccess';
import Modal from '@/components/Modals/Modal';
import SaveFail from '@/components/Notifications/SaveFail';
import SaveSuccess from '@/components/Notifications/SaveSuccess';
import { useUserContext } from '@/context/Store';
import React, { useState } from 'react';

export default function SettingsPage(): JSX.Element {
	const user = useUserContext();
	const [firstName, setFirstName] = useState(user.first_name);
	const [lastName, setLastName] = useState(user.last_name);
	const [email, setEmail] = useState(user.email);
	const [success, setSuccess] = useState(false);
	const [failure, setFailure] = useState(false);
	const [phone, setPhone] = useState(user.phone);
	const [carpool, setCarpool] = useState(user.carpool);
	const [open, setOpen] = useState(false);
	const [teeTimeCondition, setTeeTimeCondition] = useState(user.teeTime);

	const [weekendAway, setWeekendAway] = useState(user.weekendaway);
	const [yearEnd, setYearEnd] = useState(user.yearend);

	const submitChange = async (e) => {
		e.preventDefault();

		const info = {
			id: user.id,
			data: {
				username: email,
				first_name: firstName,
				last_name: lastName,
				email: email,
				phone: phone,
				carpool: carpool,
				teeTime: teeTimeCondition,
				weekendaway: weekendAway,
				yearend: yearEnd,
			},
		};

		const res = await fetch('/api/editUser', {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(info),
		});

		if (res.status < 300) {
			setSuccess(true);
		} else {
			console.log(res);
			setFailure(true);
		}
	};

	const resetPassword = async () => {
		const req = await fetch('/api/resetPassword', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(email),
		});

		if (req.status < 300) {
			setOpen(true);
		} else {
			setFailure(true);
		}
	};

	return (
		<form onSubmit={submitChange} className='space-y-8 divide-y divide-gray-200'>
			{success ? <SaveSuccess show={success} setShow={setSuccess} /> : null}
			{failure ? <SaveFail show={failure} setShow={setFailure} /> : null}

			{open ? (
				<Modal open={open} setOpen={setOpen}>
					<FormSuccess />
				</Modal>
			) : null}
			<div className='space-y-8 divide-y divide-gray-200 sm:space-y-5'>
				<div>
					<div>
						<h3 className='text-lg leading-6 font-medium text-gray-900'>User Information</h3>
					</div>

					<div className='mt-6 sm:mt-5 space-y-6 sm:space-y-5'>
						<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
							<label htmlFor='firstName' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
								First Name
							</label>
							<div className='mt-1 sm:mt-0 sm:col-span-2'>
								<div className='max-w-lg flex rounded-md shadow-sm'>
									<input
										type='name'
										name='firstName'
										id='firstName'
										onChange={(e) => setFirstName(e.target.value)}
										value={firstName}
										className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3'
										placeholder={firstName}
									/>
								</div>
							</div>
						</div>
						<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
							<label htmlFor='lastName' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
								Last Name
							</label>
							<div className='mt-1 sm:mt-0 sm:col-span-2'>
								<div className='max-w-lg flex rounded-md shadow-sm'>
									<input
										type='name'
										name='lastName'
										id='lastName'
										onChange={(e) => setLastName(e.target.value)}
										value={lastName}
										className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3'
										placeholder={lastName}
									/>
								</div>
							</div>
						</div>

						<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
							<label htmlFor='email' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
								Email
							</label>
							<div className='mt-1 sm:mt-0 sm:col-span-2'>
								<div className='max-w-lg flex rounded-md shadow-sm'>
									<input
										type='email'
										name='email'
										id='email'
										onChange={(e) => setEmail(e.target.value)}
										value={email}
										className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3'
										placeholder={email}
									/>
								</div>
							</div>
						</div>
						<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
							<label htmlFor='phone' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
								Phone Number
							</label>
							<div className='mt-1 sm:mt-0 sm:col-span-2'>
								<div className='max-w-lg flex rounded-md shadow-sm'>
									<input
										type='phone'
										name='phone'
										id='phone'
										onChange={(e) => setPhone(e.target.value)}
										value={phone}
										className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3'
										placeholder={phone}
									/>
								</div>
							</div>
						</div>

						<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
							<label htmlFor='carpool' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
								Car Pool
							</label>
							<div className='mt-1 sm:mt-0 sm:col-span-2'>
								<div className='max-w-lg flex rounded-md shadow-sm'>
									<input
										type='text'
										name='carpool'
										id='carpool'
										onChange={(e) => setCarpool(e.target.value)}
										value={carpool}
										className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3'
										placeholder={carpool || 'Indicate the first and last name of the person you car pool with.'}
									/>
								</div>
							</div>
						</div>

						<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
							<label htmlFor='teeTime' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
								Only Tee Times After 4:30?
							</label>
							<div className='mt-1 sm:mt-0 sm:col-span-2 flex flex-row space-x-2'>
								<span> No </span>
								<div className='max-w-lg flex rounded-md shadow-sm'>
									<ToggleSwitch enabled={teeTimeCondition} setEnabled={setTeeTimeCondition} />
								</div>
								<span> Yes </span>
							</div>
						</div>

						<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
							<label htmlFor='weekendAway' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
								Weekend Away Attendance
							</label>
							<div className='mt-1 sm:mt-0 sm:col-span-2 flex flex-row space-x-2'>
								<span> No </span>
								<div className='max-w-lg flex rounded-md shadow-sm'>
									<ToggleSwitch enabled={weekendAway} setEnabled={setWeekendAway} />
								</div>
								<span> Yes </span>
							</div>
						</div>

						<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
							<label htmlFor='yearend' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
								Year End Banquet Attendance
							</label>
							<div className='mt-1 sm:mt-0 sm:col-span-2 flex flex-row space-x-2'>
								<span> No </span>
								<div className='max-w-lg flex rounded-md shadow-sm'>
									<ToggleSwitch enabled={yearEnd} setEnabled={setYearEnd} />
								</div>
								<span> Yes </span>
							</div>
						</div>

						<div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
							<label htmlFor='password' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
								Password
							</label>
							<div className='mt-1 sm:mt-0 sm:col-span-2'>
								<button
									onClick={resetPassword}
									type='button'
									className='bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
								>
									Change/Reset Password
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='pt-5'>
				<div className='flex justify-end'>
					<button
						type='submit'
						className='ml-3 inline-flex justify-center py-2 px-8 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
					>
						Save
					</button>
				</div>
			</div>
		</form>
	);
}
