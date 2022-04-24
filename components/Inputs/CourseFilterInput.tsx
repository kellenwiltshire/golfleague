import { Course } from '@/utils/interfaces';

export default function CourseFilterInput({ inputName, courses, inputChange }): JSX.Element {
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
				<option>Courses</option>
				{courses.map((course: Course) => {
					return <option key={course.id}>{course.name}</option>;
				})}
			</select>
		</div>
	);
}
