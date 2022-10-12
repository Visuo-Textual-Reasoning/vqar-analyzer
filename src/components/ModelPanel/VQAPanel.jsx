// @flow

import PropTypes from 'prop-types';
import { Paper, Typography, CircularProgress, Switch } from '@mui/material';
//import JsonData from './qatt.json'
// import Snackbar from '@mui/material/Snackbar';
// import Alert from '@mui/material/Alert';
import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Answer from '../Answer/Index';
import { useState } from 'react';
import { fetchPrediction, fetchWordAtt, sendUserFeedback, fetchBoundingBoxAtt } from '../../utils/helpers';
import { useEvaluate } from '../../contexts/EvaluateProvider';
import { useAuth } from '../../contexts/AuthProvider';
import FeedbackForm from '../FeedbackForm/Index';
import MySnackbar from '../MySnackbar/Index';
// import Local from '../MCANattention/Local';
import DiscreteSlider from '../MCANattention/DiscreteSlider';
import { useCookies } from 'react-cookie';

const useStyles = makeStyles((theme) => {
	//console.log(theme);
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

// interface I_VQA_Feedback {
// 	answer: null | Boolean,
// 	attention: null | Boolean,
// 	relevance_score: Number,
// 	user_answer: string,
// 	explanation: string

// }

/**
 * @component
 * @param {string} modelName
 * @param {string} apiUrl
 * @param {string} question
 * @param {number} imageIndex
 * @param {boolean} mcan
 * @returns 
 */
export default function VQAModelPanel({ modelName, apiUrl, question, imageIndex,mcan }) {
	//const imageUrl = `${apiUrl}/image?imageIndex=${imageIndex}`;
	/** @type {string} Url attention image of SAAA model */
	const [imageUrl, setImageUrl] = useState('')
	useEffect(() => {
		setImageUrl(`${apiUrl}/attention-maps?imageIndex=${imageIndex}`);
	},[])

	/** @type {string} Url to get Json values of the bounding boxes */
	const iattUrl = `http://10.5.0.96:5556/attention_image`
	/** @type {string} Url to get word attention values */
	const qattUrl = `http://10.5.0.96:5556/attention_question`
	const classes = useStyles();
	const [ answer, setAnswer ] = useState('');
	const [ evaluate, setEvaluate ] = useEvaluate();
	const [ loading, setLoading ] = useState(false);
	const [ timeTaken, setTimeTaken ] = useState(null);
	const [ modelActive, setModelActive ] = useState(true);
	const [ showFeedback, setShowFeedback ] = useState(false);
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
	const [warningMessage, setWarningMessage] = useState("");
	const [cookies, setCookie] = useCookies(['user']);
	const [qattData, setQattData] = useState({})
	const [jsonArray, setJsonArray] = useState({});
	const [flag,setFlag] = useState(0)
	const [iattData, setIattData] = useState({});
	const [tempImageIndex, setTempImageIndex] = useState(0)


	/** @type {string} contains User id cookie */
	let cookieUserID = cookies.userID;

	useEffect(
		() => {
			// console.log("Model Panel: ", evaluate, evaluateRef.current);
			if (evaluate) {
				// console.log('getting asnwer');
				getAnswer();
				// isMCAN(mcan);
				setEvaluate(false);
				// setShowFeedback(true);
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
/**
 * @async 
 * @function getAnswer get and set answer
 * @returns 
 */
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
			setShowFeedback(true);
			setImageUrl(`${apiUrl}/attention-maps?imageIndex=${imageIndex}`);
			setAnswer(data.answer);
			assignImageData();
			if (mcan){assigndata();}
			setAttMapID(data.att_map_id);
			//console.log(attMapID);
		} catch (err) {
			console.error(err);
		}
	}

	/**
	 * @function handleRadioChange Function that handles radio button
	 * @param {string} name 
	 * @param {number} value 
	 */
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
/**
 * @function sendFeedback get the input from user else warning message
 * @returns 
 */
	async function sendFeedback() {
		console.log(feedback);
		// if (!feedback.answer || !feedback.attention) {
		if (!feedback.answer || feedback.relevance_score === -1) {
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

		// setAuth(cookieUserID);
		// console.log("auth: "+ auth);


/**
 * @async
 * @function sendUserFeedback we set the current time &
 * then we send feedback input to backend
 * @param {string} apiUrl 
 * @param {object} data 
 * 	@param {string} cookieUserID
 * 	@param {object} feedback
 * 		@param {} feedback.answer
 * 		@param {} feedback.attention
 * 		@param {number} feedback.relevance_score
 * 		@param {string} feedback.user_answer
 * 		@param {string} feedback.explaination
 * 	@param {number} imageIndex
 * 	@param {string} question
 * 	@param {string} answer
 * 	@returns 
 */
		sendUserFeedback(apiUrl, { cookieUserID, feedback, imageIndex, question, answer });

		setFeedback({
			answer: null,
			attention: null,
			relevance_score: -1,
			user_answer: '',
			explaination: ''
		});
		setShowFeedback(false);
	}


	async function assigndata(){
		if (mcan)
		setQattData( await fetchWordAtt(apiUrl));
	}


	useEffect(() => {
		if( qattData.question_values != undefined){
			//console.log( qattData.question_values);
			setJsonArray([...qattData.question_values])
			//console.log ("Json Array: " + jsonArray)
		}
	},[qattData,evaluate ])


	
	/**
	 * 
	 * @param {string} currentelement 
	 * @param {number} index 
	 * @returns 
	 */
	function setFontColor(currentelement,index){
		//var colorArray = ['red', 'green', 'blue', 'orange', 'yellow'];
		// const jsonArray = qattData.question_values;
		var colorG = (jsonArray[index]*1)+0.1;
		var colorGrad = colorG.toFixed(2);
		let rgbaColor = "rgba(237,108,3,"+colorGrad+")";
		// let finalColor = '"'+rgbaColor+'"'
		// let tempColor = "rgba(255,0,0,0.13)"
		//wconsole.log(index);
		return <div key= {index} style={{ color: rgbaColor,"flex":"0 1 auto" }}>{currentelement}&nbsp;</div>;

	}
/**
 * @function questionAtt Assigns word attention to question 
 * @param {string} question 
 * @returns 
 */
	function questionAtt(question){
		var myarray = question.split(' ');
		// let result = myarray.map( (currentelement, index) => <div style={{ color: '${setfontColor(index)}',"flex":"0 1 auto" }}>{currentelement}&nbsp;</div>);
		let result = myarray.map( (currentelement, index) => setFontColor(currentelement,index));
		return result;
	}


	async function assignImageData(){
		setTempImageIndex(imageIndex);
        setIattData( await fetchBoundingBoxAtt("http://10.5.0.96:5556" ));
      }
      
	// useEffect(() => {
	// console.log(iattData)
	// },[iattData])

	/**
	 * @function isMCAN Displays slider in MCAN model panel
	 * @param {boolean} bool returns jsx slider 
	 * @returns 
	 */
	function isMCAN(bool){
		if(bool){

		return (
			<div>
				{/* <div className='mcanAttImg'>{Local(1)}</div> */}
				{/* <DiscreteSlider constApiUrl="http://10.5.0.96:5556" imageIndex={imageIndex} data = {iattData}/> */}
				{/* {DiscreteSlider("http://10.5.0.96:5002",20)} */}
			</div>
		)
		}
	}

	// const handleChange = (e,val) => {
    //     //console.log(val);
    //     ReactDOM.render(<h1>hey</h1>, document.getElementsByClassName('mcanAttImg'));
    // }

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

			{(answer && modelActive && isMCAN(mcan)) &&
			<span>
				<div style={{"display":"flex","flexDirection":"row"}}>{questionAtt(question)}</div>
				{/* <MCANattention/> */}
			</span>
			}

			<Typography sx={{ fontFamily: 'Cascadia Code', fontSize: '12px' }}>
				{!loading && timeTaken && `Took ${(timeTaken / 1000).toFixed(2)}`}
			</Typography>

			{modelActive &&
			showFeedback && (
				<FeedbackForm handleRadioChange={handleRadioChange} sendFeedback={sendFeedback} feedback={feedback} />
			)}

			{(answer && modelActive && mcan==false) && <Paper component="img" className={classes.img} src={imageUrl} alt={`Image-${imageIndex}`} sx={{mt: 2, width: "100%", height: "auto"}}  />}

			{(answer && modelActive && mcan==true && iattData!="undefined" && tempImageIndex!= 0) && <DiscreteSlider constApiUrl="http://10.5.0.96:5556" imageIndex={tempImageIndex} data = {iattData}/>}

			{/* {(answer && modelActive && mcan==true) && <div>Hello macha {qa}</div>} */}

			<MySnackbar open={warningMessage !== ""} handleClose={handleWarningClose} msg={warningMessage} />
		</Paper>
	);
}
{/* {(attMapUrl && modelActive) && <Paper component="img" src={attMapUrl} alt={`Attention Map`} sx={{mt: 2, width: "100%", height: "auto"}}/>} */}
VQAModelPanel.propTypes = {
	modelName: PropTypes.string.isRequired,
	question: PropTypes.string.isRequired,
	apiUrl: PropTypes.string.isRequired,
	imageIndex: PropTypes.number.isRequired,
	mcan:PropTypes.bool.isRequired
};
