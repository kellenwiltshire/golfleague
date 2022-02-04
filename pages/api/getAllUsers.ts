import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
import { parseCookies } from 'nookies';

const cors = Cors({
	methods: ['GET', 'HEAD'],
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

const getCurrentUser = async (req: NextApiRequest, res: NextApiResponse) => {
	await runMiddleware(req, res, cors);
	const url = process.env.DATABASE_URL;

	const cookies = parseCookies({ req });
	const jwt = cookies.jwt;

	try {
		const request = await fetch(`${url}/users`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		});

		const response = await request.json();

		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Error Getting Users', response: error });
	}
};

export default getCurrentUser;
