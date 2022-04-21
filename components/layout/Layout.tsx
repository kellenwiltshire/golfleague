import {
	ScoreProvider,
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

export default function Layout({
	setSignedIn,
	signedIn,
	children,
}): JSX.Element {
	return (
		<AllUsersProvider>
			<CoursesProvider>
				<Navbar setSignedIn={setSignedIn} signedIn={signedIn} />
				<main className='flex justify-center'>{children}</main>
				<Footer />
			</CoursesProvider>
		</AllUsersProvider>
	);
}
