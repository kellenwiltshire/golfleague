import {
	ScoreProvider,
	UserProvider,
	ScheduleProvider,
	AllScoresProvider,
	AllUsersProvider,
	CoursesProvider,
	NewsProvider,
	SpecialFunctionProvider,
} from '@/context/Store';
import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

export default function Layout({ setSignedIn, signedIn, children }): JSX.Element {
	return (
		<UserProvider>
			<ScoreProvider>
				<ScheduleProvider>
					<AllUsersProvider>
						<AllScoresProvider>
							<CoursesProvider>
								<NewsProvider>
									<SpecialFunctionProvider>
										<Navbar setSignedIn={setSignedIn} signedIn={signedIn} />
										<div>{children}</div>
										<Footer />
									</SpecialFunctionProvider>
								</NewsProvider>
							</CoursesProvider>
						</AllScoresProvider>
					</AllUsersProvider>
				</ScheduleProvider>
			</ScoreProvider>
		</UserProvider>
	);
}
