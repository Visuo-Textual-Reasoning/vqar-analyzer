import { Box, Card, CardContent, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { fetchRandomQuestions } from '../../utils/helpers';

const styles = {
	marign: '5px auto',
	textAlign: 'center',
	padding: '15px',
	fontFamily: 'Cascadia Code',
	fontSize: '7px 14px',
    boxShadow: "inset 1px 1px 6px gray",
    maxWidth: 600,
    width: 600,
};

export default function SampleQuestions({ task, imageIndex }) {
	const [ sampleQuestions, setSampleQuestions ] = useState([]);

	useEffect(() => {
		fetchRandomQuestions(imageIndex, task).then(setSampleQuestions);
	}, [imageIndex]);

	return (
		<Card sx={styles}>
			<CardContent sx={{ color: '#2345b0', fontWeight: 'bold', textAlign: 'left' }}>
				<Typography gutterBotton variant="h6" component="div">
					Sample Questions
				</Typography>
			</CardContent>
			<Box sx={{ color: '#118834' }}>
				{sampleQuestions.map((q) => {
					return <div key={q}>{q}</div>;
				})}
			</Box>
		</Card>
	);
}
