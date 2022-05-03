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
		}
	};
});

export default function Home() {
	const classes = useStyles();
	return (
		<Box className={classes.wrapper}>
			<VQACard />
			<VCRCard />
		</Box>
	);
}

function VQACard() {
	const classes = useStyles()
	return (
		<Card sx={{ maxWidth: 345, height: 'fit-content', margin: '0 10px' }} elevation={7} className={classes.card}>
			<CardMedia component="img" alt="VQA Example" image={VQAImage}/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					Visual Question Answering
				</Typography>
				<Typography variant="body2" color="text.secondary">
					In VQA, we present the model with an image and a question in the form of natural language and the
					model generates an answer again in the form of natural language
				</Typography>
			</CardContent>
			<CardActions>
				{/* <Button size="small">Share</Button> */}
				<Button size="small" sx={{marginBottom: "-110px"}}>Learn More</Button>
			</CardActions>
		</Card>
	);
}

function VCRCard() {
	const classes = useStyles()
	return (
		<Card sx={{ maxWidth: 345, height: 'fit-content', margin: '0 10px' }} elevation={7} className={classes.card}>
			<CardMedia component="img" alt="VCR Example" image={VCRImage} />
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					Visual Question Answering
				</Typography>
				<Typography variant="body2" color="text.secondary">
					In VQA, we present the model with an image and a question in the form of natural language and the
					model generates an answer again in the form of natural language
				</Typography>
			</CardContent>
			<CardActions>
				{/* <Button size="small">Share</Button> */}
				<Button size="small">Learn More</Button>
			</CardActions>
		</Card>
	);
}
