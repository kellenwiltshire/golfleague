import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';

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

	const code = req.body.code;
	const newPass = req.body.newPass;
	const confirmPass = req.body.confirmPass;

	const body = {
		code: code,
		password: newPass,
		passwordConfirmation: confirmPass,
	};

	axios
		.post(`${url}/auth/reset-password`, {
			code: code,
			password: newPass,
			passwordConfirmation: confirmPass,
		})
		.then((response) => {
			console.log('Password Change Success', response.data);
			const data = response.data;
			console.log(data);

			res.status(200).json(data);
		})
		.catch((error) => {
			console.log('Error Changing Password: ', error);
			res.status(500).json(error);
		});
};

export default setNewPass;
