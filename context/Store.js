import { createContext, useContext, useState } from 'react';

const UserContext = createContext();
const UpdateUserContext = createContext();

export function useUserContext() {
	return useContext(UserContext);
}
export function useUpdateUserContext() {
	return useContext(UpdateUserContext);
}

const ScoreContext = createContext();
const UpdateScoreContext = createContext();

export function useScoreContext() {
	return useContext(ScoreContext);
}
export function useUpdateScoreContext() {
	return useContext(UpdateScoreContext);
}

const ScheduleContext = createContext();
const UpdateScheduleContext = createContext();

export function useScheduleContext() {
	return useContext(ScheduleContext);
}
export function useUpdateScheduleContext() {
	return useContext(UpdateScheduleContext);
}

const AllUsersContext = createContext();
const UpdateAllUsersContext = createContext();

export function useAllUsersContext() {
	return useContext(AllUsersContext);
}
export function useUpdateAllUsersContext() {
	return useContext(UpdateAllUsersContext);
}

const AllScoresContext = createContext();
const UpdateAllScoresContext = createContext();

export function useAllScoresContext() {
	return useContext(AllScoresContext);
}
export function useUpdateAllScoresContext() {
	return useContext(UpdateAllScoresContext);
}

const CoursesContext = createContext();
const UpdateCoursesContext = createContext();

export function useCoursesContext() {
	return useContext(CoursesContext);
}
export function useUpdateCoursesContext() {
	return useContext(UpdateCoursesContext);
}

const NewsContext = createContext();
const UpdateNewsContext = createContext();

export function useNewsContext() {
	return useContext(NewsContext);
}
export function useUpdateNewsContext() {
	return useContext(UpdateNewsContext);
}

const SpecialContext = createContext();
const UpdateSpecialContext = createContext();

export function useSpecialContext() {
	return useContext(SpecialContext);
}

export function useUpdateSpecialContext() {
	return useContext(UpdateSpecialContext);
}

export function UserProvider({ children }) {
	const [user, setUser] = useState({});

	const updateUser = (userInfo) => {
		setUser(userInfo);
	};

	return (
		<UserContext.Provider value={user}>
			<UpdateUserContext.Provider value={updateUser}>{children}</UpdateUserContext.Provider>
		</UserContext.Provider>
	);
}

export function ScoreProvider({ children }) {
	const [score, setScore] = useState({});

	const updateScore = (scoreInfo) => {
		setScore(scoreInfo);
	};

	return (
		<ScoreContext.Provider value={score}>
			<UpdateScoreContext.Provider value={updateScore}>{children}</UpdateScoreContext.Provider>
		</ScoreContext.Provider>
	);
}

export function ScheduleProvider({ children }) {
	const [schedule, setSchedule] = useState();

	const updateSchedule = (scheduleInfo) => {
		setSchedule(scheduleInfo);
	};

	return (
		<ScheduleContext.Provider value={schedule}>
			<UpdateScheduleContext.Provider value={updateSchedule}>{children}</UpdateScheduleContext.Provider>
		</ScheduleContext.Provider>
	);
}

export function AllUsersProvider({ children }) {
	const [allUsers, setAllUsers] = useState();

	const updateAllUsers = (allUsersInfo) => {
		setAllUsers(allUsersInfo);
	};

	return (
		<AllUsersContext.Provider value={allUsers}>
			<UpdateAllUsersContext.Provider value={updateAllUsers}>{children}</UpdateAllUsersContext.Provider>
		</AllUsersContext.Provider>
	);
}

export function AllScoresProvider({ children }) {
	const [allScores, setAllScores] = useState();

	const updateAllScores = (allScoresInfo) => {
		setAllScores(allScoresInfo);
	};

	return (
		<AllScoresContext.Provider value={allScores}>
			<UpdateAllScoresContext.Provider value={updateAllScores}>{children}</UpdateAllScoresContext.Provider>
		</AllScoresContext.Provider>
	);
}

export function CoursesProvider({ children }) {
	const [courses, setCourses] = useState();

	const updateCourses = (coursesInfo) => {
		setCourses(coursesInfo);
	};

	return (
		<CoursesContext.Provider value={courses}>
			<UpdateCoursesContext.Provider value={updateCourses}>{children}</UpdateCoursesContext.Provider>
		</CoursesContext.Provider>
	);
}

export function NewsProvider({ children }) {
	const [news, setNews] = useState();

	const updateNews = (newsInfo) => {
		setNews(newsInfo);
	};

	return (
		<NewsContext.Provider value={news}>
			<UpdateNewsContext.Provider value={updateNews}>{children}</UpdateNewsContext.Provider>
		</NewsContext.Provider>
	);
}

export function SpecialFunctionProvider({ children }) {
	const [spcialFunctions, setSpecialFunctions] = useState();

	const updateSpecialFunctions = (functionsInfo) => {
		setSpecialFunctions(functionsInfo);
	};

	return (
		<SpecialContext.Provider value={spcialFunctions}>
			<UpdateSpecialContext.Provider value={updateSpecialFunctions}>{children}</UpdateSpecialContext.Provider>
		</SpecialContext.Provider>
	);
}
