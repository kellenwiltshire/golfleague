import 'tailwindcss/tailwind.css';
import Layout from '@/components/layout/Layout';
import nProgress from 'nprogress';
import { Router } from 'next/router';
import 'nprogress/nprogress.css';
import { useState } from 'react';
import Providers from '@/components/layout/Providers';

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

function MyApp({ Component, pageProps }) {
	const [signedIn, setSignedIn] = useState(false);
	return (
		<Providers>
			<Layout signedIn={signedIn} setSignedIn={setSignedIn}>
				<Component
					{...pageProps}
					signedIn={signedIn}
					setSignedIn={setSignedIn}
				/>
			</Layout>
		</Providers>
	);
}

export default MyApp;
