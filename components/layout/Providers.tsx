import React from 'react';

import { UserStore, UserStoreProvider } from '@/stores/UserStore';
import { ScheduleStore, ScheduleStoreProvider } from '@/stores/ScheduleStore';
import { ScoreStore, ScoreStoreProvider } from '@/stores/ScoresStore';
import { NewsStore, NewsStoreProvider } from '@/stores/NewsStore';
import {
	SpecialFunctionsStore,
	SpecialFunctionsStoreProvider,
} from '@/stores/SpecialFunctionsStore';
import {
	AllScoresStore,
	AllScoresStoreProvider,
} from '@/stores/AllScoresStore';
import { AllUsersStore, AllUsersStoreProvider } from '@/stores/AllUsersStore';
import { CoursesStore, CoursesStoreProvider } from '@/stores/CoursesStore';

const userStore = new UserStore();
const scheduleStore = new ScheduleStore();
const scoreStore = new ScoreStore();
const newsStore = new NewsStore();
const specialFunctionsStore = new SpecialFunctionsStore();
const allScoresStore = new AllScoresStore();
const allUsersStore = new AllUsersStore();
const coursesStore = new CoursesStore();

export default function Providers({ children }): JSX.Element {
	return (
		<UserStoreProvider store={userStore}>
			<ScheduleStoreProvider store={scheduleStore}>
				<ScoreStoreProvider store={scoreStore}>
					<NewsStoreProvider store={newsStore}>
						<SpecialFunctionsStoreProvider store={specialFunctionsStore}>
							<AllScoresStoreProvider store={allScoresStore}>
								<AllUsersStoreProvider store={allUsersStore}>
									<CoursesStoreProvider store={coursesStore}>
										{children}
									</CoursesStoreProvider>
								</AllUsersStoreProvider>
							</AllScoresStoreProvider>
						</SpecialFunctionsStoreProvider>
					</NewsStoreProvider>
				</ScoreStoreProvider>
			</ScheduleStoreProvider>
		</UserStoreProvider>
	);
}
