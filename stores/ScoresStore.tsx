import { makeAutoObservable } from 'mobx';
import { createContext, useContext, FC } from 'react';
import { Score } from '@/utils/interfaces';

class ScoreStore {
	scores: Array<Score> = [];

	constructor() {
		makeAutoObservable(this);
	}

	get getScores() {
		return this.scores;
	}

	updateScore(score: Array<Score>) {
		this.scores = score;
	}
}

const ScoreStoreContext = createContext<ScoreStore>(new ScoreStore());

const ScoreStoreProvider: FC<{ store: ScoreStore }> = ({ store, children }) => {
	return (
		<ScoreStoreContext.Provider value={store}>
			{children}
		</ScoreStoreContext.Provider>
	);
};

const useScoreStore = () => {
	return useContext(ScoreStoreContext);
};

export { ScoreStore, ScoreStoreProvider, useScoreStore };
