const url = process.env.DATABASE_URL;

export const fetchNews = async (jwt) => {
	const request = await fetch(`${url}/news-items`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});

	const response = await request.json();

	return response;
};

export const fetchArticle = async (jwt, id) => {
	const request = await fetch(`${url}/news-items/${id}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});

	const response = await request.json();

	return response;
};

export const fetchSpecialFunctions = async (jwt) => {
	const request = await fetch(`${url}/special-functions`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});

	const response = await request.json();

	return response;
};

export const fetchFunction = async (jwt, id) => {
	const request = await fetch(`${url}/special-functions/${id}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});

	const response = await request.json();

	return response;
};
