import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import { useState, useEffect } from 'react';
import { useCoursesContext } from '../../context/Store';
import SaveSuccess from '../Notifications/SaveSuccess';
import SaveFail from '../Notifications/SaveFail';
import DeleteCourse from '../Modals/DeleteCourse';
import Modal from '../Modals/Modal';
import AddCourseForm from '../Forms/AddCourseForm';
import EditCourseForm from '../Forms/EditCourseForm';

export default function CoursesTable(): JSX.Element {
	const [editCourseOpen, setEditCourseOpen] = useState(false);
	const [addCourseOpen, setAddCourseOpen] = useState(false);
	const [deleteCourseOpen, setDeleteCourseOpen] = useState(false);
	const [success, setSuccess] = useState(false);
	const [failure, setFailure] = useState(false);
	const [courseSelected, setCourseSelected] = useState();
	const [courses, setCourses] = useState(useCoursesContext());

	useEffect(() => {
		const sortedCourses = courses.sort((a, b) => {
			return a.name.localeCompare(b.name);
		});

		setCourses(sortedCourses);
	}, [courses]);

	return (
		<div className='flex flex-col'>
			{editCourseOpen ? (
				<Modal open={editCourseOpen} setOpen={setEditCourseOpen}>
					<EditCourseForm
						course={courseSelected}
						setSuccess={setSuccess}
						setFailure={setFailure}
						setOpen={setEditCourseOpen}
						setCourses={setCourses}
					/>
				</Modal>
			) : null}
			{addCourseOpen ? (
				<Modal open={addCourseOpen} setOpen={setAddCourseOpen}>
					<AddCourseForm
						setOpen={setAddCourseOpen}
						setSuccess={setSuccess}
						setFailure={setFailure}
						courses={courses}
						setCourses={setCourses}
					/>
				</Modal>
			) : null}

			<SaveSuccess show={success} setShow={setSuccess} />

			<SaveFail show={failure} setShow={setFailure} />

			{deleteCourseOpen ? (
				<DeleteCourse
					open={deleteCourseOpen}
					setOpen={setDeleteCourseOpen}
					course={courseSelected}
					setSuccess={setSuccess}
					setFailure={setFailure}
				/>
			) : null}

			<div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
				<div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
					<button
						onClick={() => setAddCourseOpen(!addCourseOpen)}
						className='inline-flex items-center px-6 py-2 border border-transparent text-sm rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4'
					>
						Add New Course
					</button>
					<div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
						<table className='min-w-full divide-y divide-gray-200'>
							<thead className='bg-gray-50'>
								<tr>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										Name
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										Email
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										Phone
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										Address
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										Interval
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										Time Slots
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										Additional Info
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										Admin Info
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
									>
										Pricing
									</th>
									<th scope='col' className='relative px-6 py-3'>
										<span className='sr-only'>Edit</span>
									</th>
									<th scope='col' className='relative px-6 py-3'>
										<span className='sr-only'>Delete</span>
									</th>
								</tr>
							</thead>
							<tbody>
								{courses.map((course, courseIdx) => (
									<tr key={course.id} className={courseIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{course.name}</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{course.email}</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{course.phone}</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{course.address}</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{course.interval}</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{course.timeslots}</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{course.additionalInfo}</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{course.adminInfo}</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{course.pricing}</td>
										<td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
											<button
												onClick={() => {
													setCourseSelected(course);
													setEditCourseOpen(!editCourseOpen);
												}}
												className='group flex items-center px-3 py-2 text-sm font-medium w-full'
											>
												<PencilIcon
													className='text-gray-400 group-hover:text-gray-500
									 flex-shrink-0 h-6 w-6'
												/>
											</button>
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
											<button
												onClick={() => {
													setCourseSelected(course);
													setDeleteCourseOpen(!deleteCourseOpen);
												}}
												className='group flex items-center px-3 py-2 text-sm font-medium w-full'
											>
												<TrashIcon
													className='text-gray-400 group-hover:text-gray-500
									flex-shrink-0 h-6 w-6'
												/>
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
