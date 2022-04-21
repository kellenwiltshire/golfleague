import { makeAutoObservable } from 'mobx';
import { createContext, useContext, FC } from 'react';

interface User {
	additionalInfo: string;
	availability: [];
	blocked: boolean;
	carpool: string;
	confirmed: boolean;
	created_at: string;
	email: string;
	first_name: string;
	id: number;
	last_name: string;
	initialLogin: false;
	phone: string;
	picture: string;
	provider: string;
	role: {
		id: number;
		name: string;
		description: string;
		type: string;
	};
	teeTime: boolean;
	updated_at: string;
	username: string;
	weekendaway: boolean;
	yearend: boolean;
}

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
