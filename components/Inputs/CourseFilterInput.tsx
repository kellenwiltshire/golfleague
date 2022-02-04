export default function CourseFilterInput({ inputName, courses, inputChange }): JSX.Element {
	return (
		<div className='m-2'>
			<label htmlFor='dropdown' className='block text-sm font-medium text-gray-700'>
				{inputName}
			</label>
			<select
				id='dropdown'
				name='dropdown'
				className='mt-1 block w-2/3 md:w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
				onChange={inputChange}
			>
				<option>Courses</option>
				{courses.map((course) => {
					return <option key={course.id}>{course.name}</option>;
				})}
			</select>
		</div>
	);
}
