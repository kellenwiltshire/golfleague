export default function SearchInput({ inputName, inputChange }): JSX.Element {
	return (
		<div className='m-2'>
			<label htmlFor='search' className='block text-sm font-medium text-gray-700'>
				{inputName}
			</label>
			<div className='mt-1'>
				<input
					type='text'
					name='search'
					id='search'
					className='mt-1 block w-2/3  md:w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
					onChange={inputChange}
				/>
			</div>
		</div>
	);
}
