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

export interface Availability {
	date: string;
	available: boolean;
}
export interface User {
	additionalInfo: string;
	availability: Array<Availability>;
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

interface MediaFormat {
	ext: string;
	hash: string;
	height: number;
	mime: string;
	name: string;
	path: string;
	provider_metadata: {
		public_id: string;
		resource_type: string;
	};
	size: number;
	url: string;
	width: number;
}
export interface Media {
	alternativeText: string;
	caption: string;
	created_at: string;
	ext: string;
	formats: {
		large: MediaFormat;
		medium: MediaFormat;
		small: MediaFormat;
		thumbnail: MediaFormat;
	};
	hash: string;
	height: number;
	id: number;
	mime: string;
	name: string;
	previewUrl: string;
	provider: string;
	provider_metadata: {
		public_id: string;
		resource_type: string;
	};
	size: number;
	updated_at: string;
	url: string;
	width: number;
}
export interface News {
	body: string;
	created_at: string;
	id: number;
	media: Array<Media>;
	published_at: string;
	title: string;
	updated_at: string;
}

export interface SpecialFunction {
	created_at: string;
	date: string;
	details: string;
	image: {
		alternativeText: string;
		caption: string;
		created_at: string;
		ext: string;
		formats: {
			large: MediaFormat;
			medium: MediaFormat;
			small: MediaFormat;
			thumbnail: MediaFormat;
		};
		hash: string;
		height: number;
		id: number;
		mime: string;
		name: string;
		previewUrl: string;
		provider: string;
		provider_metadata: {
			public_id: string;
			resource_type: string;
		};
		size: number;
		updated_at: string;
		url: string;
		width: number;
	};
	name: string;
	updated_at: string;
}

export interface TeeTime {
	golfers: Array<User>;
	teeTime: string;
}
