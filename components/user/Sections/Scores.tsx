import React, { useState } from 'react';
import EnterScore from './Scores/EnterScore';
import ScoresList from './Scores/ScoresList';
import { findLastScheduledRound, getUserScores } from '@/utils/sortingFunctions';
import SaveSuccess from '@/components/Notifications/SaveSuccess';
import SaveFail from '@/components/Notifications/SaveFail';
import { useUserStore } from '@/stores/UserStore';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Scores(): JSX.Element {
	const { data: schedule, error: scheduleError } = useSWR('/api/getSchedule', fetcher);
	const { data: scores, error: scoresError } = useSWR('/api/getScores', fetcher);

	const userStore = useUserStore();
	const user = userStore.user;

	const [success, setSuccess] = useState(false);
	const [failure, setFailure] = useState(false);

	const getInitialSuccess = () => {
		if (scores && lastScheduledRound) {
			for (let i = 0; i < scores.length; i++) {
				if (scores[i].date === lastScheduledRound.date) {
					return true;
				}
			}
		}
		return false;
	};
	const [submitSuccess, setSubmitSuccess] = useState(getInitialSuccess());

	if (scoresError) return <div>Failed to load Scores</div>;
	if (scheduleError) return <div>Failed to load Schedule Info</div>;

	if (!scores || !schedule) return <div>Loading...</div>;

	const lastScheduledRound = findLastScheduledRound(schedule);

	const userScores = getUserScores(user, scores);

	return (
		<div className='px-4 py-8 sm:px-0'>
			{success ? <SaveSuccess show={success} setShow={setSuccess} /> : null}
			{failure ? <SaveFail show={failure} setShow={setFailure} /> : null}
			{submitSuccess || !lastScheduledRound ? null : (
				<EnterScore
					user={user}
					lastScheduledRound={lastScheduledRound}
					userScores={userScores}
					setSuccess={setSuccess}
					setFailure={setFailure}
					setSubmitSuccess={setSubmitSuccess}
				/>
			)}

			<ScoresList scores={userScores} />
		</div>
	);
}
