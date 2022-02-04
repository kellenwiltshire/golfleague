import { CheckCircleIcon } from '@heroicons/react/solid';

export default function FormSuccess(): JSX.Element {
	return (
		<div className='rounded-md bg-green-50 p-4'>
			<div className='flex'>
				<div className='flex-shrink-0'>
					<CheckCircleIcon
						className='h-5 w-5 text-green-400'
						aria-hidden='true'
					/>
				</div>
				<div className='ml-3'>
					<h3 className='text-sm font-medium text-green-800'>Email Sent!</h3>
					<div className='mt-2 text-sm text-green-700'>
						<p>
							Check your inbox for next steps! Please make sure to check your
							Span folder as well.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
