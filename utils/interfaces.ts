export interface Course {
	additionalInfo: string;
	address: string;
	adminInfo: string;
	contact: string;
	created_at: string;
	email: string;
	id: number;
	interval: number;
	name: string;
	phone: string;
	pricing: string;
	timeslots: number;
	updated_at: string;
}

export interface Schedule {
	course: Course;
	created_at: string;
	date: string;
	game: string;
	id: number;
	start_time: string;
	updated_at: string;
}

export interface User {
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

export interface Hole {
	birdie: boolean;
	chip: boolean;
	hole: number;
	id: number;
}
export interface Score {
	course: Course;
	created_at: string;
	date: string;
	holes: Array<Hole>;
	id: number;
	published_at: string;
	score: number;
	updated_at: string;
	user: User;
}
