import { makeAutoObservable } from 'mobx';
import { createContext, useContext, FC } from 'react';
import { SpecialFunction } from '@/utils/interfaces';

class SpecialFunctionsStore {
	specialFunctions: Array<SpecialFunction> = [];

	constructor() {
		makeAutoObservable(this);
	}

	updateSpecialFunctions(specialFunctions: Array<SpecialFunction>) {
		this.specialFunctions = specialFunctions;
	}
}

const SpecialFunctionsStoreContext = createContext<SpecialFunctionsStore>(
	new SpecialFunctionsStore(),
);

const SpecialFunctionsStoreProvider: FC<{ store: SpecialFunctionsStore }> = ({
	store,
	children,
}) => {
	return (
		<SpecialFunctionsStoreContext.Provider value={store}>
			{children}
		</SpecialFunctionsStoreContext.Provider>
	);
};

const useSpecialFunctionsStore = () => {
	return useContext(SpecialFunctionsStoreContext);
};

export {
	SpecialFunctionsStore,
	SpecialFunctionsStoreProvider,
	useSpecialFunctionsStore,
};
