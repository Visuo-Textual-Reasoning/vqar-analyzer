import PropTypes from 'prop-types';
import { Paper, Typography, CircularProgress, Switch } from '@mui/material';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Answer from '../Answer/Index';
import { useState } from 'react';
import { fetchPrediction } from '../../utils/helpers';
import { useEvaluate } from '../../contexts/EvaluateProvider';
import FeedbackForm from '../FeedbackForm/Index';

const useStyles = makeStyles((theme) => {
	console.log(theme);
	return {
		panel: {
			[theme.breakpoints.down('md')]: {
				width: '55%'
			},
			[theme.breakpoints.down('sm')]: {
				width: '100%'
			},
			width: '35%',
			margin: '20px auto',
			padding: 10,
			height: "fit-content"
		},
		switch: {
			float: 'right'
		}
	};
});

export default function VQAModelPanel({ modelName, apiUrl, question, imageIndex }) {
	const classes = useStyles();
	const [ answer, setAnswer ] = useState('');
	const [ evaluate, setEvaluate ] = useEvaluate();
	const [ loading, setLoading ] = useState(false);
	const [ timeTaken, setTimeTaken ] = useState(null);
	const [ modelActive, setModelActive ] = useState(true);

	const [ warningOpen, setWarningOpen ] = useState(false);
	const [ feedback, setFeedback ] = React.useState({
		answer: null,
		attention: null
	});
	useEffect(
		() => {
			// console.log("Model Panel: ", evaluate, evaluateRef.current);
			if (evaluate) {
				// console.log('getting asnwer');
				getAnswer();
				setEvaluate(false);
			}
		},
		[ evaluate ]
	);

	async function getAnswer() {
		if (!modelActive) {
			return;
		}
		let predictionData = { imageIndex, question };

		try {
			setLoading(true);
			let startTime = performance.now();
			let data = await fetchPrediction(apiUrl, predictionData);
			let endTime = performance.now();
			setTimeTaken(endTime - startTime);
			setLoading(false);
			setAnswer(data.answer);
		} catch (err) {
			console.error(err);
		}
	}

	const handleRadioChange = (name, value) => {
		setFeedback({ ...feedback, [name]: value });
		console.log({ feedback });
	};

	const handleWarningClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setWarningOpen(false);
	};

	const sendFeedback = async () => {
		if (!feedback.answer || !feedback.attention) {
			console.log('You have to pick something!');
			setWarningOpen(true);
			return false;
		}

		setFeedback({
			answer: null,
			attention: null
		});
	};

	return (
		<Paper
			className={classes.panel}
			elevation={modelActive ? 10 : 3}
			sx={{ backgroundColor: modelActive ? 'white' : '#eeeeee' }}
		>
			<Switch
				className={classes.switch}
				checked={modelActive}
				onChange={(e) => {
					setModelActive(!modelActive);
				}}
				inputProps={{ 'aria-label': 'controlled' }}
				color="primary"
			/>
			<Typography sx={{ fontFamily: 'Cascadia Code' }}>{modelName}</Typography>
			{loading ? <CircularProgress color="secondary" /> : <Answer answer={answer} />}
			<Typography sx={{ fontFamily: 'Cascadia Code', fontSize: '12px' }}>
				{!loading && timeTaken && `Took ${(timeTaken / 1000).toFixed(2)}s`}
			</Typography>

			{modelActive && <FeedbackForm
				handleRadioChange={handleRadioChange}
				sendFeedback={sendFeedback}
				feedback={feedback}
			/>}

			<Snackbar open={warningOpen} autoHideDuration={6000} onClose={handleWarningClose}>
				<Alert onClose={handleWarningClose} severity="warning" sx={{ width: '100%' }}>
					Please provide complete feedback!
				</Alert>
			</Snackbar>
		</Paper>
	);
}

VQAModelPanel.propTypes = {
	modelName: PropTypes.string.isRequired,
	question: PropTypes.string.isRequired,
	apiUrl: PropTypes.string.isRequired,
	imageIndex: PropTypes.number.isRequired
};
