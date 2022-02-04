import FunctionCards from './FunctionCards';

export default function FunctionItems({ specialFunctions }): JSX.Element {
	return (
		<div className='bg-gray-50'>
			<div className='max-w-2xl mx-auto px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8'>
				{/* Details section */}
				<section aria-labelledby='details-heading'>
					<div className='flex flex-col items-center text-center'>
						<h2 id='details-heading' className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
							Special Functions
						</h2>
						<p className='mt-3 max-w-3xl text-lg text-gray-600'>
							{`Mark your calendar for these upcoming events. You don't want to miss out!`}
						</p>
					</div>

					<div className='mt-16 grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-8'>
						{specialFunctions.map((details) => {
							return <FunctionCards key={details.id} details={details} />;
						})}
					</div>
				</section>
			</div>
		</div>
	);
}
