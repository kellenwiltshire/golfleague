import React from 'react';

import { UserStore, UserStoreProvider } from '@/stores/UserStore';

const userStore = new UserStore();

export default function Providers({ children }): JSX.Element {
	return <UserStoreProvider store={userStore}>{children}</UserStoreProvider>;
}
