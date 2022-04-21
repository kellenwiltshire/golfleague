import 'tailwindcss/tailwind.css';
import Layout from '@/components/layout/Layout';
import nProgress from 'nprogress';
import { Router } from 'next/router';
import 'nprogress/nprogress.css';
import { useState } from 'react';

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

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

const userStore = new UserStore();
const scheduleStore = new ScheduleStore();
const scoreStore = new ScoreStore();
const newsStore = new NewsStore();
const specialFunctionsStore = new SpecialFunctionsStore();
const allScoresStore = new AllScoresStore();

function MyApp({ Component, pageProps }) {
	const [signedIn, setSignedIn] = useState(false);
	return (
		<UserStoreProvider store={userStore}>
			<ScheduleStoreProvider store={scheduleStore}>
				<ScoreStoreProvider store={scoreStore}>
					<NewsStoreProvider store={newsStore}>
						<SpecialFunctionsStoreProvider store={specialFunctionsStore}>
							<AllScoresStoreProvider store={allScoresStore}>
								<Layout signedIn={signedIn} setSignedIn={setSignedIn}>
									<Component
										{...pageProps}
										signedIn={signedIn}
										setSignedIn={setSignedIn}
									/>
								</Layout>
							</AllScoresStoreProvider>
						</SpecialFunctionsStoreProvider>
					</NewsStoreProvider>
				</ScoreStoreProvider>
			</ScheduleStoreProvider>
		</UserStoreProvider>
	);
}

export default MyApp;
