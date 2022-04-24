import { Schedule } from '@/utils/interfaces';

export default function DateFilterInput({ inputName, schedules, inputChange }): JSX.Element {
	const orderDates = schedules.sort((a: Schedule, b: Schedule) => {
		const aDate = Date.parse(a.date);
		const bDate = Date.parse(b.date);

		return aDate - bDate;
	});
	return (
		<div className='m-2'>
			<label htmlFor='dropdown' className='block text-sm font-medium text-gray-700'>
				{inputName}
			</label>
			<select
				id='dropdown'
				name='dropdown'
				className='mt-1 block w-2/3 rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm md:w-full'
				onChange={inputChange}
			>
				<option>Date</option>
				{orderDates.map((schedule: Schedule) => {
					return <option key={schedule.id}>{schedule.date}</option>;
				})}
			</select>
		</div>
	);
}
