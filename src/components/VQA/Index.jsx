import { Box } from '@mui/system';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import React, { useState, useEffect } from 'react';
import ImagePanel from '../ImagePanel/Index';
import Question from '../Question/Index';
import { getMaxNoOfImages, getRandomDataPoint } from '../../utils/api_calls';
import VQAModelPanel from '../ModelPanel/VQAPanel';
import { fetchVocabulary } from '../../utils/helpers';
import { MCAN_HOME_URL, SAAA_HOME_URL, MOCK_API } from '../../utils/apis';
import SampleQuestions from '../SampleQuestions/Index';
import { makeStyles } from '@mui/styles';
import { useVocab } from '../../contexts/VocabProvider';
import MySnackbar from '../MySnackbar/Index';

const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center'
		},
		modelPanels: {
			[theme.breakpoints.up('sm')]: {
				display: 'flex',
				width: '100%'
			},
			[theme.breakpoints.down('md')]: {
				flexDirection: 'column'
			}
		}
	};
});

export default function VQA() {
	const classes = useStyles();
	const [ maxImages, setMaxImages ] = useState(0);
	const [ question, setQuestion ] = useState('');
	const [ split ] = useState('val');
	const [ vocab, setVocab ] = useVocab();
	const [ warningOpen, setWarningOpen ] = useState(false);
	const [ warningMessage, setWarningMessage ] = useState('');
	const saaaHomeUrl = process.env.REACT_APP_DEMO ? MOCK_API : SAAA_HOME_URL;
	const mcanHomeUrl = process.env.REACT_APP_DEMO ? MOCK_API : MCAN_HOME_URL;
	const [ imageIndex, setImageIndex ] = useState();

	useEffect(
		() => {
			getMaxNoOfImages(split).then((maxNumber) => {
				setMaxImages(maxNumber);
			});
		},
		[ split ]
	);

	// Fetch vocab from the server
	useEffect(() => {
		fetchVocabulary(saaaHomeUrl).then((v) => {
			setVocab(v);
		});
		getRandomDataPoint(split).then(imid => setImageIndex(imid))
	}, []);

	function validateQuestion(question) {
		if(question[question.length -1] !== " "){
			return []
		}
		let words = question.split(' ');
		let invalidWords = [];
		for (let word of words) {
			if (!vocab.includes(word.toLowerCase())) {
				invalidWords.push(word);
			}
		}

		return invalidWords;
	}

	function questionChangeHandler(e) {
		let invalidWords = validateQuestion(e.target.value);
		// console.log(invalidWords)
		if(invalidWords.length !== 0){
			let msg = `The words [${invalidWords.join()}] are not found in the vocab. They'll be replaced with UNK`;
			setWarningMessage(msg);
			setWarningOpen(true)
		}
		setQuestion(e.target.value);
	}

	function handleWarningClose(event, reason) {
		if (reason === 'clickaway') {
			return;
		}

		setWarningOpen(false);
	}

	return (
		<Box className={classes.wrapper}>
			<ImagePanel
				maxImages={maxImages}
				imageIndex={imageIndex}
				setImageIndex={setImageIndex}
				apiUrl={saaaHomeUrl}
			/>
			<SampleQuestions task="vqa" imageIndex={imageIndex} />
			<Question question={question} questionChangeHandler={questionChangeHandler} />
			<Box className={classes.modelPanels}>
				<VQAModelPanel
					modelName="Show Ask Attend and Answer"
					apiUrl={saaaHomeUrl}
					question={question}
					imageIndex={imageIndex}
				/>
				<VQAModelPanel
					modelName="Deep Modular Co-attention"
					apiUrl={mcanHomeUrl}
					question={question}
					imageIndex={imageIndex}
				/>
			</Box>
			<MySnackbar open={warningOpen} handleClose={handleWarningClose} msg={warningMessage}/>
		</Box>
	);
}
