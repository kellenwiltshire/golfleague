import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
const { parseCookies } = require('nookies');

const cors = Cors({
	methods: ['POST', 'HEAD'],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
	return new Promise((resolve, reject) => {
		fn(req, res, (result) => {
			if (result instanceof Error) {
				return reject(result);
			}

			return resolve(result);
		});
	});
}

const submitScore = async (req: NextApiRequest, res: NextApiResponse) => {
	await runMiddleware(req, res, cors);
	const url = process.env.DATABASE_URL;

	const score = { ...req.body.score };
	const cookies = parseCookies({ req });
	const jwt = cookies.jwt;

	try {
		const request = await fetch(`${url}/scores`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${jwt}`,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(score),
		});

		const response = await request.json();

		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Error Submitting Score', response: error });
	}
};

export default submitScore;
