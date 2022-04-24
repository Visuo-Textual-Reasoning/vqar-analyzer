import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import ImagePanel from '../ImagePanel/Index';
import Question from '../Question/Index';
import { getMaxNoOfImages } from '../../utils/api_calls';
import ModelPanel from '../ModelPanel/Index';
import { MCAN_HOME_URL, SAAA_HOME_URL } from '../../utils/apis';
import SampleQuestions from '../SampleQuestions/Index';

export default function VQA() {
	const [ maxImages, setMaxImages ] = useState(10);
	const [ imageIndex, setImageIndex ] = useState(5163);
	const [ question, setQuestion ] = useState('');
	const [ split ] = useState('val');

	useEffect(
		() => {
			getMaxNoOfImages(split).then((maxNumber) => {
				setMaxImages(maxNumber);
			});
		},
		[ split ]
	);

	function questionChangeHandler(e) {
		setQuestion(e.target.value);
	}

	return (
		<Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
			<ImagePanel maxImages={maxImages} imageIndex={imageIndex} setImageIndex={setImageIndex} />
			<SampleQuestions task="vqa" imageIndex={imageIndex}/>
			<Question question={question} questionChangeHandler={questionChangeHandler} />
			<Box sx={{ display: 'flex' }}>
				<ModelPanel
					modelName="Show Ask Attend and Answer"
					apiUrl={SAAA_HOME_URL}
					question={question}
					imageIndex={imageIndex}
				/>
				<ModelPanel
					modelName="Deep Modular Co-attention"
					apiUrl={MCAN_HOME_URL}
					question={question}
					imageIndex={imageIndex}
				/>
			</Box>
		</Box>
	);
}
