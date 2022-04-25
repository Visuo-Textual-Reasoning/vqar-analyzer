import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Card,
	CardContent,
	Paper,
	Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { fetchRandomQuestions } from '../../utils/helpers';

const styles = {
	marign: '5px auto',
	textAlign: 'center',
	padding: '15px',
	fontFamily: 'Cascadia Code',
	fontSize: '7px 14px',
	boxShadow: 'inset 1px 1px 6px gray',
	maxWidth: 600,
	width: 600
};

export default function SampleQuestions({ task, imageIndex }) {
	const [ sampleQuestions, setSampleQuestions ] = useState([]);

	useEffect(
		() => {
			fetchRandomQuestions(imageIndex, task).then(setSampleQuestions);
		},
		[ imageIndex ]
	);

	return (
		<Box sx={styles}>
			<Typography variant="h6" sx={{fontFamily: "Cascadia Code"}}>Sample Questions</Typography>
			{sampleQuestions.map((q) => {
				return (
					<Accordion>
						<AccordionSummary sx={{ color: '#118834' }}>{q}</AccordionSummary>
						<AccordionDetails sx={{ color: '#2345b0', fontWeight: 'bold', textAlign: 'left' }}>
							Answer
						</AccordionDetails>
					</Accordion>
				);
			})}
		</Box>
	);
}
