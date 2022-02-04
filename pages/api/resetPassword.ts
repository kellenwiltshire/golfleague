import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

const cors = Cors({
	methods: ['PUT', 'HEAD'],
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

const setNewPass = async (req: NextApiRequest, res: NextApiResponse) => {
	await runMiddleware(req, res, cors);
	const url = process.env.DATABASE_URL;

	const email = req.body;

	try {
		const login = await fetch(`${url}/auth/forgot-password`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email: email }),
		});

		const loginResponse = await login.json();

		res.status(200).json(loginResponse);
	} catch (error) {
		res.status(500).json({ error: 'Error Sending Email', response: error });
	}
};

export default setNewPass;
