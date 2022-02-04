import React, { useState } from 'react';

export default function EditCourseForm({
	course,
	setSuccess,
	setFailure,
	setOpen,
	setCourses,
}): JSX.Element {
	const [name, setName] = useState(course.name);
	const [address, setAddress] = useState(course.address);
	const [contact, setContact] = useState(course.contact);
	const [phone, setPhone] = useState(course.phone);
	const [email, setEmail] = useState(course.email);
	const [interval, setInterval] = useState(course.interval);
	const [additionalInfo, setadditionalInfo] = useState(course.additionalInfo);
	const [adminInfo, setAdminInfo] = useState(course.adminInfo);
	const [pricing, setPricing] = useState(course.pricing);
	const [timeslots, setTimeslots] = useState(course.timeslots);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const newData = {
			id: course.id,
			data: {
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
			},
		};

		const req = await fetch('/api/editCourse', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newData),
		});

		if (req.status < 300) {
			const req = await fetch('/api/getCourses');
			const response = await req.json();
			setCourses(response);
			setSuccess(true);
			setOpen(false);
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
							Edit Course
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
									value={name}
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
									value={address}
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
									value={contact}
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
									value={phone}
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
									value={email}
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
									value={interval}
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
									value={timeslots}
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
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
									value={additionalInfo}
									placeholder={additionalInfo || 'Additional Info'}
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
									value={adminInfo}
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
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
									value={pricing}
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
								Save
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
