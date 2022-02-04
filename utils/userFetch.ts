const url = process.env.DATABASE_URL;

const fetchCourses = async (jwt) => {
	const request = await fetch(`${url}/courses`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});

	const response = await request.json();

	return response;
};

export const fetchUser = async (jwt) => {
	const request = await fetch(`${url}/users/me`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});

	const response = await request.json();

	return response;
};

const fetchScores = async (user, jwt) => {
	const request = await fetch(`${url}/scores`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});

	const scores = await request.json();

	if (scores.length) {
		const filteredScores = scores.filter((score) => {
			return score.user?.username === user.username;
		});

		return filteredScores;
	} else {
		const filteredScores = [];
		return filteredScores;
	}
};

const fetchSchedule = async (jwt) => {
	const request = await fetch(`${url}/schedules`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});

	const response = await request.json();

	return response;
};

const fetchAllScores = async (jwt) => {
	const request = await fetch(`${url}/scores`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});

	const response = await request.json();

	return response;
};

const fetchAllUsers = async (jwt) => {
	const request = await fetch(`${url}/users`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});

	const response = await request.json();

	return response;
};

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

export async function getAdminData(jwt) {
	const user = await fetchUser(jwt);

	const scores = await fetchScores(user, jwt);

	const schedules = await fetchSchedule(jwt);

	const courses = await fetchCourses(jwt);

	const allScores = await fetchAllScores(jwt);

	const allUsers = await fetchAllUsers(jwt);

	const news = await fetchNews(jwt);

	const specialFunctions = await fetchSpecialFunctions(jwt);

	const userData = {
		user,
		scores,
		schedules,
		courses,
		allScores,
		allUsers,
		news,
		specialFunctions,
	};

	return userData;
}

export async function getUserData(jwt) {
	const user = await fetchUser(jwt);

	const scores = await fetchScores(user, jwt);

	const allScores = await fetchAllScores(jwt);

	const schedules = await fetchSchedule(jwt);

	const courses = await fetchCourses(jwt);

	const news = await fetchNews(jwt);

	const specialFunctions = await fetchSpecialFunctions(jwt);

	const userData = { user, scores, schedules, courses, news, specialFunctions, allScores };

	return userData;
}
