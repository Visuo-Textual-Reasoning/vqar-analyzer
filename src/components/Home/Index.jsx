import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import VQAImage from '../../assets/images/vqa-example.png';
import VCRImage from '../../assets/images/vcr-example.png';
import {LocalMCAN, bBox} from '../MCANattention/Local';
import DiscreteSlider from '../MCANattention/DiscreteSlider';


const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			// border: '1px solid red',
			width: '100%',
			display: 'flex',
			justifyContent: 'center',
			minHeight: '100vh',
			alignItems: 'center'
		},
		card: {
			// border: "1px solid red",
			width: 450,
			height: 420,
		},
		myCard: {
			maxWidth: 350,
			height: 450,
			padding: 10,
			display: "flex",
			flexDirection: 'column',
			margin: "0 5px",
			boxShadow: "1px 1px 3px grey",
			
			"& .image": {
				width: "100%",
				height: "200px",
			},

			"& img": {
				width: "100%",
				maxHeight: "100%",
				height: "auto"
			},


			"& h4": {
				fontSize: 21
			}
		}
	};
});
/**
 * @component
 * @returns jsx elements
 */
export default function Home() {
	const classes = useStyles();
	// const isWorking = uuid();
	// let userCookie = getCookie('userId')
	// if (!userCookie){
	// 	const unique_full_id = uuid();
	// 	const unique_id = unique_full_id.slice(0,8)
	// 	setCookie('userId',unique_id);
	// 	userCookie = getCookie('userId')
	// 	console.log("getCookie "+userCookie)
	// }else{
		
	// 	console.log("getCookie "+userCookie)
	// }

	return (
		<>
			{/* <Local/> */}
			{/* <InputSlider/> */}
			{/* <DiscreteSlider onChange={(_, value) => <div>{ var element = document.getElementsByClassName('Image');}</div>}/> */}
			<div className='Image'>

			</div>
			<Box className={classes.wrapper}>
				<VQACard />
				<VCRCard />
			</Box>
			{/* <MCANattention /> */}
			{/* <div>{isWorking}</div> */}
		</>
	);
}
/** 
 * Shows card with VQA details 
 * @component
 */
function VQACard() {
	const classes = useStyles()
	return (
		<div className={classes.myCard}>
			<div className="image">
				<img src={VQAImage} alt="VQA" />
			</div>
			<div className="contents">
				<h4>Visual Question Answering</h4>
				<p>
					In VQA, we present the model with an image and a question in the form of natural language and the
					 model generates an answer again in the form of natural language
				</p>
			</div>
			<div className="actions">
				<Button size="small">Learn More</Button>
			</div>
		</div>
	);
}
/** 
 * Shows Card with VCR information 
 * @coomponent
 */
function VCRCard() {
	const classes = useStyles()
	return (
		<div className={classes.myCard}>
			<div className="image">
				<img src={VCRImage} alt="VCR" />
			</div>
			<div className="contents">
				<h4>Visual Commonsense Reasoning</h4>
				<p>
					In VQA, we present the model with an image and a question in the form of natural language and the
					model generates an answer again in the form of natural language
				</p>
			</div>
			<div className="actions">
				<Button size="small">Learn More</Button>
			</div>
		</div>
	);
}
