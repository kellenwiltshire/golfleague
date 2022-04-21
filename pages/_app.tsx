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

const userStore = new UserStore();
const scheduleStore = new ScheduleStore();
const scoreStore = new ScoreStore();

function MyApp({ Component, pageProps }) {
	const [signedIn, setSignedIn] = useState(false);
	return (
		<UserStoreProvider store={userStore}>
			<ScheduleStoreProvider store={scheduleStore}>
				<ScoreStoreProvider store={scoreStore}>
					<Layout signedIn={signedIn} setSignedIn={setSignedIn}>
						<Component
							{...pageProps}
							signedIn={signedIn}
							setSignedIn={setSignedIn}
						/>
					</Layout>
				</ScoreStoreProvider>
			</ScheduleStoreProvider>
		</UserStoreProvider>
	);
}

export default MyApp;
