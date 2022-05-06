import { ArrowSmDownIcon } from '@heroicons/react/solid';
import React from 'react';

function DownButton({ handleClick, golfer }) {
	return (
		<button
			type='button'
			className='inline-flex items-center border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 print:hidden'
			onClick={() => handleClick(golfer)}
		>
			<ArrowSmDownIcon className='h-5 w-5' aria-hidden='true' />
		</button>
	);
}

export default DownButton;
