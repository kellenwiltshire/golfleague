import { makeAutoObservable } from 'mobx';
import { createContext, useContext, FC } from 'react';
import { Score } from '@/utils/interfaces';

class AllScoresStore {
	allScores: Array<Score> = [];

	constructor() {
		makeAutoObservable(this);
	}

	get ScoresInfo() {
		return this.allScores;
	}

	updateScore(allScores: Array<Score>) {
		this.allScores = allScores;
	}
}

const AllScoresStoreContext = createContext<AllScoresStore>(
	new AllScoresStore(),
);

const AllScoresStoreProvider: FC<{ store: AllScoresStore }> = ({
	store,
	children,
}) => {
	return (
		<AllScoresStoreContext.Provider value={store}>
			{children}
		</AllScoresStoreContext.Provider>
	);
};

const useAllScoresStore = () => {
	return useContext(AllScoresStoreContext);
};

export { AllScoresStore, AllScoresStoreProvider, useAllScoresStore };
