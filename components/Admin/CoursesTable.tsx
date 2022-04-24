import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import { useState, useEffect, FC } from 'react';
import SaveSuccess from '../Notifications/SaveSuccess';
import SaveFail from '../Notifications/SaveFail';
import DeleteCourse from '../Modals/DeleteCourse';
import Modal from '../Modals/Modal';
import AddCourseForm from '../Forms/AddCourseForm';
import EditCourseForm from '../Forms/EditCourseForm';
import { useCoursesStore } from '@/stores/CoursesStore';
import { toJS } from 'mobx';
import { Course } from '@/utils/interfaces';
import { observer } from 'mobx-react-lite';

const CoursesTable: FC = observer(() => {
	const coursesStore = useCoursesStore();

	const [editCourseOpen, setEditCourseOpen] = useState(false);
	const [addCourseOpen, setAddCourseOpen] = useState(false);
	const [deleteCourseOpen, setDeleteCourseOpen] = useState(false);
	const [success, setSuccess] = useState(false);
	const [failure, setFailure] = useState(false);
	const [courseSelected, setCourseSelected] = useState<Course>();
	const [courses, setCourses] = useState<Course[]>(coursesStore.courses.slice());

	useEffect(() => {
		const sortedCourses = courses.sort((a, b) => {
			return a.name.localeCompare(b.name);
		});

		setCourses(sortedCourses);
		coursesStore.updateCourses(sortedCourses);
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
				<div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
					<button
						onClick={() => setAddCourseOpen(!addCourseOpen)}
						className='mb-4 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-2 text-sm text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
					>
						Add New Course
					</button>
					<div className='overflow-hidden border-b border-gray-200 shadow sm:rounded-lg'>
						<table className='min-w-full divide-y divide-gray-200'>
							<thead className='bg-gray-50'>
								<tr>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
									>
										Name
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
									>
										Email
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
									>
										Phone
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
									>
										Address
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
									>
										Interval
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
									>
										Time Slots
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
									>
										Additional Info
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
									>
										Admin Info
									</th>
									<th
										scope='col'
										className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
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
								{courses.map((course, courseIdx) => {
									return (
										<tr key={course.id} className={courseIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
											<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>{course.name}</td>
											<td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900'>{course.email}</td>
											<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>{course.phone}</td>
											<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>{course.address}</td>
											<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>{course.interval}</td>
											<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>{course.timeslots}</td>
											<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>{course.additionalInfo}</td>
											<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>{course.adminInfo}</td>
											<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>{course.pricing}</td>
											<td className='whitespace-nowrap px-6 py-4 text-right text-sm font-medium'>
												<button
													onClick={() => {
														setCourseSelected(course);
														setEditCourseOpen(!editCourseOpen);
													}}
													className='group flex w-full items-center px-3 py-2 text-sm font-medium'
												>
													<PencilIcon
														className='h-6 w-6
									 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
													/>
												</button>
											</td>
											<td className='whitespace-nowrap px-6 py-4 text-right text-sm font-medium'>
												<button
													onClick={() => {
														setCourseSelected(course);
														setDeleteCourseOpen(!deleteCourseOpen);
													}}
													className='group flex w-full items-center px-3 py-2 text-sm font-medium'
												>
													<TrashIcon
														className='h-6 w-6
									flex-shrink-0 text-gray-400 group-hover:text-gray-500'
													/>
												</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
});

export default CoursesTable;
