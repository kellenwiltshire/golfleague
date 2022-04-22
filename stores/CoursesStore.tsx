import { makeAutoObservable } from 'mobx';
import { createContext, useContext, FC } from 'react';
import { Course } from '@/utils/interfaces';

class CoursesStore {
	courses: Array<Course> = [];

	constructor() {
		makeAutoObservable(this);
	}

	get courseInfo() {
		return this.courses;
	}

	updateCourses(courses: Array<Course>) {
		this.courses = courses;
	}
}

const CoursesStoreContext = createContext<CoursesStore>(new CoursesStore());

const CoursesStoreProvider: FC<{ store: CoursesStore }> = ({
	store,
	children,
}) => {
	return (
		<CoursesStoreContext.Provider value={store}>
			{children}
		</CoursesStoreContext.Provider>
	);
};

const useCoursesStore = () => {
	return useContext(CoursesStoreContext);
};

export { CoursesStore, CoursesStoreProvider, useCoursesStore };
