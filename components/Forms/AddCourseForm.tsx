import React, { useState } from 'react';

export default function AddCourseForm({
	setOpen,
	setSuccess,
	setFailure,
	courses,
	setCourses,
}): JSX.Element {
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

	const handleSubmit = async (e) => {
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
			setSuccess(true);
			setOpen(false);
			const response = await req.json();
			setCourses([...courses, response]);
		} else {
			setFailure(true);
			setOpen(false);
		}
	};
	return (
		<>
			<div className='min-h-full flex items-center justify-center mb-2 pt-12 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-md w-full space-y-8'>
					<div>
						<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
							Add Course
						</h2>
					</div>
					<form className='mt-8 space-y-6' onSubmit={handleSubmit}>
						<input type='hidden' name='remember' defaultValue='true' />
						<div className='rounded-md shadow-sm -space-y-px'>
							<div>
								<label htmlFor='name' className='sr-only'>
									Name
								</label>
								<input
									id='name'
									name='name'
									type='name'
									required
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
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
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
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
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
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
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
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
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
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
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
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
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
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
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
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
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
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
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
									placeholder='Pricing Info'
									onChange={(e) => setPricing(e.target.value)}
								/>
							</div>
						</div>

						<div>
							<button
								type='submit'
								disabled
								className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
							>
								<span className='absolute left-0 inset-y-0 flex items-center pl-3'></span>
								Add Course
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
