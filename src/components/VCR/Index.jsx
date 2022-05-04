import React, { useState } from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ImagePanel from '../ImagePanel/Index';
import { R2C_HOME_URL, VQA } from '../../utils/apis';
import VCRInput from '../VCRInput/Index';
import VCRModelPanel from '../ModelPanel/VCRPanel';

const useStyles = makeStyles((theme) => {
	return {
		wrapper: {}
	};
});

export default function VCR() {
	const [ imageIndex, setImageIndex ] = useState(1);
  // 40469, 4054
	const [ maxImages, setMaxImages ] = useState(0);
	const [ data, setData ] = useState({
		question: '',
		answers: [ '', '', '', '' ],
		rationales: [ '', '', '', '' ]
	});
	const vcrMode = 'QA_R';

	return (
		<Box>
			<ImagePanel maxImages={maxImages} imageIndex={imageIndex} setImageIndex={setImageIndex} apiUrl={R2C_HOME_URL} />
			<VCRInput data={data} setData={setData} />
			<Box>
				<VCRModelPanel
					modelName={'From Recognition to Cognition'}
					apiUrl={R2C_HOME_URL}
					data={data}
					imageIndex={imageIndex}
					vcrMode={vcrMode}
				/>
			</Box>
		</Box>
	);
}
