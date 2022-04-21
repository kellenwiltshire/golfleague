import { makeAutoObservable } from 'mobx';
import { createContext, useContext, FC } from 'react';
import { User } from '@/utils/interfaces';

class UserStore {
	user: User;

	constructor() {
		makeAutoObservable(this);
	}

	get userInfo() {
		return this.user;
	}

	updateUser(user: User) {
		this.user = user;
	}
}

const UserStoreContext = createContext<UserStore>(new UserStore());

const UserStoreProvider: FC<{ store: UserStore }> = ({ store, children }) => {
	return (
		<UserStoreContext.Provider value={store}>
			{children}
		</UserStoreContext.Provider>
	);
};

const useUserStore = () => {
	return useContext(UserStoreContext);
};

export { UserStore, UserStoreProvider, useUserStore };
