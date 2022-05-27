export function findNextRound(schedules) {
	const currDate = new Date();

	if (schedules.length) {
		const futureRoundsSorted = schedules
			.filter((round) => {
				const date = new Date(round.date);
				if (date > currDate) {
					return round;
				}
			})
			.sort((a, b) => {
				const aDate = Date.parse(a.date);
				const bDate = Date.parse(b.date);

				return aDate - bDate;
			});

		const nextRound = futureRoundsSorted[0];

		return nextRound;
	} else {
		const nextRound = {};
		return nextRound;
	}
}

export function findPriorRound(scores) {
	const data = [...scores];
	const scoresSorted = data.sort((a, b) => {
		const aDate = Date.parse(a.date);
		const bDate = Date.parse(b.date);

		return bDate - aDate;
	});

	const priorRound = scoresSorted[0];

	return priorRound;
}

export function findPriorRoundResults(allScores, date) {
	const priorRoundScores = allScores.filter((score) => {
		const scoreDate = Date.parse(score.date);
		const roundDate = Date.parse(date);

		if (scoreDate === roundDate) {
			return score;
		}
	});

	return priorRoundScores;
}

export function findPriorRoundWinner(scores, round) {
	if (round.game) {
		if (
			round.game.toLowerCase() === 'count_the_hazards' ||
			round.game.toLowerCase() === 'best_poker_hand' ||
			round.game.toLowerCase() === 'winner_of_the_green_nine_max' ||
			round.game.toLowerCase() === 'five_points_on_the_fairway_subtract_your_putts' ||
			round.game.toLowerCase() === 'first_on_the_green_and_two_points'
		) {
			const winningGolfer = scores.sort((a, b) => b.score - a.score);

			return winningGolfer[0];
		} else {
			const winningGolfer = scores.sort((a, b) => a.score - b.score);

			return winningGolfer[0];
		}
	} else {
		return scores[0];
	}
}

export function getUserScores(user, allScores) {
	const userScores = allScores.filter((score) => {
		if (score.user.email === user.email) {
			return score;
		}
	});

	return userScores;
}

export function completedSchedule(schedule) {
	const currDate = new Date();

	const completedRounds = schedule.filter((round) => {
		const roundDate = new Date(round.date);

		return roundDate < currDate;
	});

	return completedRounds;
}

export function findLastScheduledRound(schedules) {
	const currDate = new Date();

	if (schedules.length) {
		const lastRoundsSorted = schedules
			.filter((round) => {
				const date = new Date(round.date);
				if (date < currDate) {
					return round;
				}
			})
			.sort((a, b) => {
				const aDate = Date.parse(a.date);
				const bDate = Date.parse(b.date);

				return bDate - aDate;
			});

		const lastRound = lastRoundsSorted[0];

		return lastRound;
	} else {
		const lastRound = {};
		return lastRound;
	}
}

export function findMostRecentNews(news) {
	const newsSorted = news.sort((a, b) => {
		const aDate = Date.parse(a.created_at);
		const bDate = Date.parse(b.created_at);

		return bDate - aDate;
	});

	const recentNews = newsSorted[0];

	return recentNews;
}

export function sortNews(news) {
	const newsSorted = news.sort((a, b) => {
		const aDate = Date.parse(a.created_at);
		const bDate = Date.parse(b.created_at);

		return bDate - aDate;
	});

	return newsSorted;
}

export function findNextSpecialEvent(events) {
	const currDate = new Date();

	const eventsSorted = events
		.filter((event) => {
			const date = new Date(event.date);
			if (date > currDate) {
				return event;
			}
		})
		.sort((a, b) => {
			const aDate = Date.parse(a.created_at);
			const bDate = Date.parse(b.created_at);

			return bDate - aDate;
		});

	return eventsSorted[0];
}

export function sortSchedule(schedule) {
	const scheduleSorted = schedule.sort((a, b) => {
		const aDate = Date.parse(a.date);
		const bDate = Date.parse(b.date);

		return aDate - bDate;
	});

	return scheduleSorted;
}
