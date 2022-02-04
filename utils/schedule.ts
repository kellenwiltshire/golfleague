const randomizeGolfers = (golfers) => {
	let currentIndex = golfers.length,
		randomIndex;

	//While there remains elements to shuffle
	while (currentIndex !== 0) {
		//Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		//and swap it with the current element
		[golfers[currentIndex], golfers[randomIndex]] = [
			golfers[randomIndex],
			golfers[currentIndex],
		];
	}

	return golfers;
};

const addTimeInterval = (currTime, interval) => {
	let times = [0, 0, 0];
	let max = times.length;

	let a = currTime.split(':');
	let b = interval.split(':');

	//normalize values
	for (let i = 0; i < max; i++) {
		a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i]);
		b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i]);
	}

	//store values
	for (let i = 0; i < max; i++) {
		times[i] = a[i] + b[i];
	}

	let hours = times[0];
	let minutes = times[1];
	let seconds = times[2];

	if (seconds >= 60) {
		let m = (seconds / 60) << 0;
		minutes += m;
		seconds -= 60 * m;
	}

	if (minutes >= 60) {
		let h = (minutes / 60) << 0;
		hours += h;
		minutes -= 60 * h;
	}

	return (
		('0' + hours).slice(-2) +
		':' +
		('0' + minutes).slice(-2) +
		':' +
		('0' + seconds).slice(-2)
	);
};

const testTime = (time) => {
	let times = [0, 0, 0];
	let max = times.length;

	let a = time.split(':');

	//normalize values
	for (let i = 0; i < max; i++) {
		a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i]);
	}

	//store values
	for (let i = 0; i < max; i++) {
		times[i] = a[i];
	}

	let hours = times[0];
	let minutes = times[1];

	if (hours >= 16 && minutes >= 30) {
		return true;
	} else {
		return false;
	}
};

const filterArray = (arr1, arr2) => {
	const filtered = arr1.filter((el) => {
		return arr2.indexOf(el) === -1;
	});
	return filtered;
};

interface Golfer {
	first_name: string;
	last_name: string;
	teeTime: boolean;
	carpool: string;
}

interface Schedule {
	start_time: string;
}

interface Course {
	timeslots: number;
	interval: number;
}

export default function generateSchedule(
	golfers: Golfer[],
	schedule: Schedule,
	course: Course,
) {
	//Deterime Max Golfers
	const maxGolfers = course.timeslots * 4 || 12 * 4;

	//Create initial Variables
	const initialGolfers: Golfer[] = golfers;
	const initialStartTime = schedule.start_time;
	const interval = '00:' + ('0' + course.interval).slice(-2) + ':00';

	//Create the Waiting List and Usuable Golfers Array
	let waitingList: Golfer[] = [];
	let usableGolfers: Golfer[] = [];

	//Create Final Array to be filled
	let finalTeeTimeArray: Group[] = [];

	//More initial variables to be filled and changed
	let currTime = initialStartTime;
	interface Group {
		teeTime: string;
		golfers: Golfer[];
	}
	let group: Group = { teeTime: currTime, golfers: [] };
	let groupNum = 0;

	//Trim the list of golfers if there is more than the max number of golfers
	if (initialGolfers.length > maxGolfers) {
		while (initialGolfers.length > maxGolfers) {
			waitingList.push(initialGolfers[golfers.length - 1]);
			initialGolfers.pop();
		}
		usableGolfers = randomizeGolfers(golfers);
	} else {
		usableGolfers = randomizeGolfers(golfers);
	}

	//Make a first pass of the golfers to filter out those with a tee time restriction
	let teeTimeRestrictions: Golfer[] = [];
	let unrestrictedGolfers: Golfer[] = [];
	usableGolfers.forEach((golfer: Golfer) => {
		golfer.teeTime
			? teeTimeRestrictions.push(golfer)
			: unrestrictedGolfers.push(golfer);
	});

	//Start filling a new Golfer Array with unrestricted golfers until it passes the time restriction
	let timeTestPassed = false;
	let newGolferArray: Golfer[] = [];
	unrestrictedGolfers.forEach((golfer) => {
		if (!timeTestPassed) {
			if (groupNum < 3) {
				newGolferArray.push(golfer);
				groupNum++;
			} else if (groupNum === 3) {
				newGolferArray.push(golfer);
				currTime = addTimeInterval(currTime, interval);
				const timeTest = testTime(currTime);
				if (timeTest) {
					timeTestPassed = true;
					//Once it is passed the time restriction of 4:30 combine the rest of the unrestricted golfers and restricted golfers, then randomize. Then add this one the end of the already scheduled golfers
					const combineArray = teeTimeRestrictions.concat(unrestrictedGolfers);
					const filteredArray = filterArray(combineArray, newGolferArray);
					const randomFilteredArray = randomizeGolfers(filteredArray);
					newGolferArray = newGolferArray.concat(randomFilteredArray);
				} else {
					groupNum = 0;
				}
			}
		}
	});

	//Reset the variables
	groupNum = 0;
	currTime = schedule.start_time;

	//Before setting final tee times will need to iterate through array and look for car pooling people. Once one is found, will need to find the matching person and splice them out of their current position (unless within 1-12 golfers away from original person) and splice them back in at a random interval (1-12) from original golfer to make sure they are within 3 tee times of eachother

	for (let i = 0; i < newGolferArray.length; i++) {
		let name = '';
		if (newGolferArray[i].carpool) {
			name = newGolferArray[i].carpool;
			const golferIndex = newGolferArray.findIndex((obj) => {
				const golferName = `${obj.first_name} ${obj.last_name}`;
				if (golferName === name) {
					return true;
				}

				return false;
			});

			if (golferIndex > i) {
				if (golferIndex > i + 11) {
					const newPosition = Math.floor(Math.random() * 11);
					const golferMoving = newGolferArray[golferIndex];
					newGolferArray.splice(golferIndex, 1);
					newGolferArray.splice(newPosition + i, 0, golferMoving);
				}
			}
		}
	}

	//Finally iterate through the golfer array and place them in their tee time slots.
	newGolferArray.forEach((golfer, i) => {
		if (groupNum < 3) {
			group.golfers.push(golfer);
			groupNum++;
			if (i === newGolferArray.length - 1) {
				finalTeeTimeArray.push(group);
			}
		} else {
			group.golfers.push(golfer);
			currTime = addTimeInterval(currTime, interval);
			finalTeeTimeArray.push(group);
			group = { teeTime: currTime, golfers: [] };
			groupNum = 0;
		}
	});

	const finalSchedule = {
		teeTimeSchedule: finalTeeTimeArray,
		waitingList: waitingList,
	};

	return finalSchedule;
}
