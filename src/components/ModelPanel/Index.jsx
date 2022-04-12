import PropTypes from 'prop-types';
import { Paper, Typography, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Answer from '../Answer/Index';
import { useState } from 'react';
import { fetchPrediction } from '../../utils/helpers';
import { useEvaluate } from '../../contexts/EvaluateProvider';

const useStyles = makeStyles({
	panel: {
		width: '40%',
		padding: 10,
		margin: '20px auto'
	}
});

export default function ModelPanel({ modelName, apiUrl, question, imageIndex }) {
	const classes = useStyles();
	const [ answer, setAnswer ] = useState('');
	const [ evaluate, setEvaluate ] = useEvaluate();
	const [ loading, setLoading ] = useState(false);

	useEffect(
		() => {
			// console.log("Model Panel: ", evaluate, evaluateRef.current);
			if (evaluate) {
				console.log('getting asnwer');
				getAnswer();
				setEvaluate(false);
			}
		},
		[ evaluate ]
	);

	async function getAnswer() {
		let predictionData = { imageIndex, question };

		try {
			setLoading(true);
			let ans = await fetchPrediction(apiUrl, predictionData);
			setLoading(false);
			setAnswer(ans);
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<Paper className={classes.panel} elevation={10}>
			<Typography sx={{ fontFamily: 'Cascadia Code' }}>{modelName}</Typography>
			{loading ? <CircularProgress color="secondary" /> : <Answer answer={answer} />}
		</Paper>
	);
}

ModelPanel.propTypes = {
	modelName: PropTypes.string.isRequired,
	question: PropTypes.string.isRequired,
	apiUrl: PropTypes.string.isRequired,
	imageIndex: PropTypes.number.isRequired
};
