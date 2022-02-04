import React from 'react';
import { parseCookies } from 'nookies';
import { fetchFunction } from '@/utils/userFetch';
import FunctionPage from '@/components/SpecialFunctions/FunctionPage';
import { GetServerSideProps } from 'next';

export default function specialfunctions({ specialFunction }) {
	return <FunctionPage specialFunction={specialFunction} />;
}

export const getServerSideProps: GetServerSideProps = async (props) => {
	const cookies = parseCookies(props);
	const jwt = cookies.jwt;

	const id = props.query.slug;

	const specialFunction = await fetchFunction(jwt, id);

	return {
		props: {
			specialFunction: specialFunction,
		},
	};
};
