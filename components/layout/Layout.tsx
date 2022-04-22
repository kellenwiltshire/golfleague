import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

export default function Layout({
	setSignedIn,
	signedIn,
	children,
}): JSX.Element {
	return (
		<div>
			<Navbar setSignedIn={setSignedIn} signedIn={signedIn} />
			<main className='flex justify-center'>{children}</main>
			<Footer />
		</div>
	);
}
