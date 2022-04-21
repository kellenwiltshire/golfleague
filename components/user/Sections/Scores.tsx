import React, { useState } from 'react';
import EnterScore from './Scores/EnterScore';
import ScoresList from './Scores/ScoresList';
import { findLastScheduledRound } from '@/utils/sortingFunctions';
import SaveSuccess from '@/components/Notifications/SaveSuccess';
import SaveFail from '@/components/Notifications/SaveFail';
import { useScheduleStore } from '@/stores/ScheduleStore';
import { useScoreStore } from '@/stores/ScoresStore';
import { useUserStore } from '@/stores/UserStore';
import { toJS } from 'mobx';

export default function Scores(): JSX.Element {
	const schedule = toJS(useScheduleStore().schedule);
	const scores = toJS(useScoreStore().scores);
	// const updateScores = useUpdateScoreContext();
	const user = toJS(useUserStore().user);

	const [success, setSuccess] = useState(false);
	const [failure, setFailure] = useState(false);

	const lastScheduledRound = findLastScheduledRound(schedule);

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
	return (
		<div className='px-4 py-8 sm:px-0'>
			{success ? <SaveSuccess show={success} setShow={setSuccess} /> : null}
			{failure ? <SaveFail show={failure} setShow={setFailure} /> : null}
			{submitSuccess || !lastScheduledRound ? null : (
				<EnterScore
					user={user}
					lastScheduledRound={lastScheduledRound}
					userScores={scores}
					setSuccess={setSuccess}
					setFailure={setFailure}
					setSubmitSuccess={setSubmitSuccess}
				/>
			)}

			<ScoresList scores={scores} />
		</div>
	);
}
