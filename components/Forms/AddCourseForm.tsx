import React, { useState } from 'react';
import { mutate } from 'swr';

export default function AddCourseForm({ setOpen, setSuccess, setFailure }): JSX.Element {
	const [name, setName] = useState('');
	const [address, setAddress] = useState('');
	const [contact, setContact] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [interval, setInterval] = useState('');
	const [additionalInfo, setadditionalInfo] = useState('');
	const [adminInfo, setAdminInfo] = useState('');
	const [pricing, setPricing] = useState('');
	const [timeslots, setTimeslots] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const data = {
			name: name,
			email: email,
			phone: phone,
			address: address,
			interval: interval,
			additionalInfo: additionalInfo,
			adminInfo: adminInfo,
			pricing: pricing,
			contact: contact,
			timeslots: timeslots,
		};

		const req = await fetch('/api/addCourse', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (req.status < 300) {
			mutate('/api/getCourses', () => {
				setSuccess(true);
				setOpen(false);
			}).catch((err) => {
				setFailure(true);
				setOpen(false);
				console.log(err);
			});
		} else {
			setFailure(true);
			setOpen(false);
		}
	};
	return (
		<>
			<div className='mb-2 flex min-h-full items-center justify-center px-4 pt-12 sm:px-6 lg:px-8'>
				<div className='w-full max-w-md space-y-8'>
					<div>
						<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Add Course</h2>
					</div>
					<form className='mt-8 space-y-6' onSubmit={handleSubmit}>
						<input type='hidden' name='remember' defaultValue='true' />
						<div className='-space-y-px rounded-md shadow-sm'>
							<div>
								<label htmlFor='name' className='sr-only'>
									Name
								</label>
								<input
									id='name'
									name='name'
									type='name'
									required
									className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
									placeholder='Course Name'
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div>
								<label htmlFor='address' className='sr-only'>
									Address
								</label>
								<input
									id='address'
									name='address'
									type='text'
									required
									className='relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500  focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
									placeholder='Address'
									onChange={(e) => setAddress(e.target.value)}
								/>
							</div>
							<div>
								<label htmlFor='contact-person' className='sr-only'>
									Contact Person
								</label>
								<input
									id='contact-person'
									name='contact-person'
									type='text'
									required
									className='relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500  focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
									placeholder='Contact Person'
									onChange={(e) => setContact(e.target.value)}
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
									required
									className='relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500  focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
									placeholder='Phone Number'
									onChange={(e) => setPhone(e.target.value)}
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
									required
									className='relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500  focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
									placeholder='Email'
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div>
								<label htmlFor='interval' className='sr-only'>
									Interval
								</label>
								<input
									id='interval'
									name='interval'
									type='number'
									required
									className='relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
									placeholder='Tee Time Interval'
									onChange={(e) => setInterval(e.target.value)}
								/>
							</div>
							<div>
								<label htmlFor='timeslots' className='sr-only'>
									Time Slots
								</label>
								<input
									id='timeslots'
									name='timeslots'
									type='number'
									required
									className='relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
									placeholder='Time Slots'
									onChange={(e) => setTimeslots(e.target.value)}
								/>
							</div>
							<div>
								<label htmlFor='additional-info' className='sr-only'>
									Additional Info
								</label>
								<textarea
									id='additional-info'
									name='additonal-info'
									rows={4}
									required
									className='relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500  focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
									placeholder='Additional Info'
									onChange={(e) => setadditionalInfo(e.target.value)}
								/>
							</div>
							<div>
								<label htmlFor='admin-info' className='sr-only'>
									Admin Info
								</label>
								<textarea
									id='admin-info'
									name='admin-info'
									rows={4}
									required
									className='relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500  focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
									placeholder='Admin Only Info'
									onChange={(e) => setAdminInfo(e.target.value)}
								/>
							</div>
							<div>
								<label htmlFor='pricing-info' className='sr-only'>
									Pricing Info
								</label>
								<textarea
									id='pricing-info'
									name='pricing-info'
									rows={4}
									required
									className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
									placeholder='Pricing Info'
									onChange={(e) => setPricing(e.target.value)}
								/>
							</div>
						</div>

						<div>
							<button
								type='submit'
								className='group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
							>
								<span className='absolute inset-y-0 left-0 flex items-center pl-3'></span>
								Add Course
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
