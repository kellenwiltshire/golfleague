import ToggleSwitch from '@/components/Buttons/Toggle';
import FormSuccess from '@/components/Modals/FormSuccess';
import Modal from '@/components/Modals/Modal';
import SaveFail from '@/components/Notifications/SaveFail';
import SaveSuccess from '@/components/Notifications/SaveSuccess';
import { useUserStore } from '@/stores/UserStore';
import React, { useState } from 'react';
import { mutate } from 'swr';

export default function SettingsPage(): JSX.Element {
	const userStore = useUserStore();
	const user = userStore.user;

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
			mutate('/api/getUser').catch((err) => console.log(err));
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
						<h3 className='text-lg font-medium leading-6 text-gray-900'>User Information</h3>
					</div>

					<div className='mt-6 space-y-6 sm:mt-5 sm:space-y-5'>
						<div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
							<label htmlFor='firstName' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
								First Name
							</label>
							<div className='mt-1 sm:col-span-2 sm:mt-0'>
								<div className='flex max-w-lg rounded-md shadow-sm'>
									<input
										type='name'
										name='firstName'
										id='firstName'
										onChange={(e) => setFirstName(e.target.value)}
										value={firstName}
										className='block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
										placeholder={firstName}
									/>
								</div>
							</div>
						</div>
						<div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
							<label htmlFor='lastName' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
								Last Name
							</label>
							<div className='mt-1 sm:col-span-2 sm:mt-0'>
								<div className='flex max-w-lg rounded-md shadow-sm'>
									<input
										type='name'
										name='lastName'
										id='lastName'
										onChange={(e) => setLastName(e.target.value)}
										value={lastName}
										className='block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
										placeholder={lastName}
									/>
								</div>
							</div>
						</div>

						<div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
							<label htmlFor='email' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
								Email
							</label>
							<div className='mt-1 sm:col-span-2 sm:mt-0'>
								<div className='flex max-w-lg rounded-md shadow-sm'>
									<input
										type='email'
										name='email'
										id='email'
										onChange={(e) => setEmail(e.target.value)}
										value={email}
										className='block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
										placeholder={email}
									/>
								</div>
							</div>
						</div>
						<div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
							<label htmlFor='phone' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
								Phone Number
							</label>
							<div className='mt-1 sm:col-span-2 sm:mt-0'>
								<div className='flex max-w-lg rounded-md shadow-sm'>
									<input
										type='phone'
										name='phone'
										id='phone'
										onChange={(e) => setPhone(e.target.value)}
										value={phone}
										className='block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
										placeholder={phone}
									/>
								</div>
							</div>
						</div>

						<div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
							<label htmlFor='carpool' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
								Car Pool
							</label>
							<div className='mt-1 sm:col-span-2 sm:mt-0'>
								<div className='flex max-w-lg rounded-md shadow-sm'>
									<input
										type='text'
										name='carpool'
										id='carpool'
										onChange={(e) => setCarpool(e.target.value)}
										value={carpool}
										className='block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
										placeholder={carpool || 'Indicate the first and last name of the person you car pool with.'}
									/>
								</div>
							</div>
						</div>

						<div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
							<label htmlFor='teeTime' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
								Only Tee Times After 4:30?
							</label>
							<div className='mt-1 flex flex-row space-x-2 sm:col-span-2 sm:mt-0'>
								<span> No </span>
								<div className='flex max-w-lg rounded-md shadow-sm'>
									<ToggleSwitch enabled={teeTimeCondition} setEnabled={setTeeTimeCondition} />
								</div>
								<span> Yes </span>
							</div>
						</div>

						<div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
							<label htmlFor='weekendAway' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
								Weekend Away Attendance
							</label>
							<div className='mt-1 flex flex-row space-x-2 sm:col-span-2 sm:mt-0'>
								<span> No </span>
								<div className='flex max-w-lg rounded-md shadow-sm'>
									<ToggleSwitch enabled={weekendAway} setEnabled={setWeekendAway} />
								</div>
								<span> Yes </span>
							</div>
						</div>

						<div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
							<label htmlFor='yearend' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
								Year End Banquet Attendance
							</label>
							<div className='mt-1 flex flex-row space-x-2 sm:col-span-2 sm:mt-0'>
								<span> No </span>
								<div className='flex max-w-lg rounded-md shadow-sm'>
									<ToggleSwitch enabled={yearEnd} setEnabled={setYearEnd} />
								</div>
								<span> Yes </span>
							</div>
						</div>

						<div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
							<label htmlFor='password' className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
								Password
							</label>
							<div className='mt-1 sm:col-span-2 sm:mt-0'>
								<button
									onClick={resetPassword}
									type='button'
									className='rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
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
						className='ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-8 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
					>
						Save
					</button>
				</div>
			</div>
		</form>
	);
}
