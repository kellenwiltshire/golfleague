import { makeAutoObservable } from 'mobx';
import { createContext, useContext, FC } from 'react';
import { Schedule } from '@/utils/interfaces';

class ScheduleStore {
	schedule: Array<Schedule> = [];

	constructor() {
		makeAutoObservable(this);
	}

	updateSchedule(schedule: Array<Schedule>) {
		this.schedule = schedule;
	}
}

const ScheduleStoreContext = createContext<ScheduleStore>(new ScheduleStore());

const ScheduleStoreProvider: FC<{ store: ScheduleStore }> = ({
	store,
	children,
}) => {
	return (
		<ScheduleStoreContext.Provider value={store}>
			{children}
		</ScheduleStoreContext.Provider>
	);
};

const useScheduleStore = () => {
	return useContext(ScheduleStoreContext);
};

export { ScheduleStore, ScheduleStoreProvider, useScheduleStore };
