import PropTypes from 'prop-types';
import { Paper, Typography, CircularProgress, Switch } from '@mui/material';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Answer from '../Answer/Index';
import { useState } from 'react';
import { fetchPrediction, sendUserFeedback } from '../../utils/helpers';
import { useEvaluate } from '../../contexts/EvaluateProvider';
import { useAuth } from '../../contexts/AuthProvider';
import FeedbackForm from '../FeedbackForm/Index';
import MySnackbar from '../MySnackbar/Index';

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
			height: 'fit-content'
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
	const [ showFeedback, setShowFeedback ] = useState(false);
	// const [ warningOpen, setWarningOpen ] = useState(false);
	const [ feedback, setFeedback ] = React.useState({
		answer: null,
		attention: null,
		relevance_score: -1,
		user_answer: '',
		explanation: ''
	});
	const [ auth, setAuth ] = useAuth();
	const [ attMapID, setAttMapID ] = useState(null);
	const [ attMapUrl, setAttMapUrl ] = useState(null);
	// let warningMessage = 'Please Provide Feedback';
	const [warningMessage, setWarningMessage] = useState("");

	useEffect(
		() => {
			// console.log("Model Panel: ", evaluate, evaluateRef.current);
			if (evaluate) {
				// console.log('getting asnwer');
				getAnswer();
				setEvaluate(false);
				setShowFeedback(true);
			}
		},
		[ evaluate ]
	);

	useEffect(
		() => {
			setAttMapUrl(`${apiUrl}/attention-maps?imageIndex=${attMapID}`);
		},
		[ attMapID ]
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
			setAttMapID(data.att_map_id);
		} catch (err) {
			console.error(err);
		}
	}

	function handleRadioChange(name, value) {
		setFeedback({ ...feedback, [name]: value });
		// console.log({ feedback });
		setWarningMessage("")
	}

	function handleWarningClose(event, reason) {
		if (reason === 'clickaway') {
			return;
		}

		// setWarningOpen(false)
		setWarningMessage("")
	}

	async function sendFeedback() {
		console.log(feedback);
		// if (!feedback.answer || !feedback.attention) {
		if (!feedback.answer || !feedback.relevance_score) {
			console.log('You have to pick something!');
			setWarningMessage('Please Provide Feedback');
			return false;
		}

		// If the answer is wrong, then user answer is required!!
		if (feedback.answer === 'no' && !feedback.user_answer) {
			setWarningMessage('Please provide the actual answer.');
			return false;
		}

		if(feedback.relevance_score === -1){
			setWarningMessage('Relevance score must be between 0 and 4 (Inclusive)');
			return false;
		}

		console.log(feedback);

		sendUserFeedback(apiUrl, { auth, feedback, imageIndex, question, answer });

		setFeedback({
			answer: null,
			attention: null,
			relevance_score: -1,
			user_answer: '',
			explaination: ''
		});
		setShowFeedback(false);
	}

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

			{modelActive &&
			showFeedback && (
				<FeedbackForm handleRadioChange={handleRadioChange} sendFeedback={sendFeedback} feedback={feedback} />
			)}

			{/* {(attMapUrl && modelActive) && <Paper component="img" src={attMapUrl} alt={`Attention Map`} sx={{mt: 2, width: "100%", height: "auto"}}/>} */}

			<MySnackbar open={warningMessage !== ""} handleClose={handleWarningClose} msg={warningMessage} />
		</Paper>
	);
}

VQAModelPanel.propTypes = {
	modelName: PropTypes.string.isRequired,
	question: PropTypes.string.isRequired,
	apiUrl: PropTypes.string.isRequired,
	imageIndex: PropTypes.number.isRequired
};
