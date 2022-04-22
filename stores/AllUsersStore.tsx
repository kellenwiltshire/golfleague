import { makeAutoObservable } from 'mobx';
import { createContext, useContext, FC } from 'react';
import { User } from '@/utils/interfaces';

class AllUsersStore {
	allUsers: Array<User> = [];

	constructor() {
		makeAutoObservable(this);
	}

	get usersInfo() {
		return this.allUsers;
	}

	updateUsers(allUsers: Array<User>) {
		this.allUsers = allUsers;
	}
}

const AllUsersStoreContext = createContext<AllUsersStore>(new AllUsersStore());

const AllUsersStoreProvider: FC<{ store: AllUsersStore }> = ({
	store,
	children,
}) => {
	return (
		<AllUsersStoreContext.Provider value={store}>
			{children}
		</AllUsersStoreContext.Provider>
	);
};

const useAllUsersStore = () => {
	return useContext(AllUsersStoreContext);
};

export { AllUsersStore, AllUsersStoreProvider, useAllUsersStore };
