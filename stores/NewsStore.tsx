import { makeAutoObservable } from 'mobx';
import { createContext, useContext, FC } from 'react';
import { News } from '@/utils/interfaces';

class NewsStore {
	news: Array<News> = [];

	constructor() {
		makeAutoObservable(this);
	}

	updateNews(news: Array<News>) {
		this.news = news;
	}
}

const NewsStoreContext = createContext<NewsStore>(new NewsStore());

const NewsScoreProvider: FC<{ store: NewsStore }> = ({ store, children }) => {
	return (
		<NewsStoreContext.Provider value={store}>
			{children}
		</NewsStoreContext.Provider>
	);
};

const useNewsStore = () => {
	return useContext(NewsStoreContext);
};

export { NewsStore, NewsScoreProvider, useNewsStore };
