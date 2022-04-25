import { Box, Paper, Button, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { getRandomDataPoint } from '../../utils/api_calls';
import { VQA } from '../../utils/apis';

const useStyles = makeStyles((theme) => {
	return {
		imagePanel: {
			display: 'flex',
			flexDirection: 'column',
			margin: '5px auto',
			width: 'fit-content',

			'& button': {
				margin: '12px 3px',
				fontFamily: 'Cascadia Code'
			}
		},

		img: {
			minHeight: 400,
			maxHeight: 650,
			maxWidth: 650,

			[theme.breakpoints.down('md')]: {
				maxHeight: 500,
				maxWidth: 500
			},
			[theme.breakpoints.down('sm')]: {
				maxHeight: 400,
				maxWidth: 400
			}
		},
		textField: {
			display: 'flex',
			flexDirection: 'column',
		}
	};
});

export default function ImagePanel({ maxImages, imageIndex, setImageIndex }) {
	const classes = useStyles();
	const split = 'val';

	// This should handle Issue #2. May be the issue is browser specific.
	function handleImageIndexChange(e) {
		let value = parseInt(e.target.value, 10);
		if (!value) value = 1;

		if (value > maxImages) value = maxImages;
		if (value < 1) value = 1;

		setImageIndex(value);
	}

	async function fetchRandomImage(e) {
		let randomImageIndex = await getRandomDataPoint(split);
		setImageIndex(randomImageIndex);
	}

	return (
		<Box className={classes.imagePanel}>
			<Box>
				<TextField
					id="outlined-number"
					label="Image Index"
					type="number"
					InputLabelProps={{
						shrink: true
					}}
					size="small"
					onChange={handleImageIndexChange}
					value={imageIndex}
					sx={{ mb: 1, mt: 1 }}
					className={classes.textField}
				/>
				<Button color="secondary" variant="contained" size="small">
					Fetch Image
				</Button>
				<Button color="secondary" variant="contained" size="small" onClick={fetchRandomImage}>
					Fetch random Image
				</Button>
			</Box>
			<Paper
				component="img"
				className={classes.img}
				src={`${VQA}/image?imageIndex=${imageIndex}`}
				alt={`Image-${imageIndex}`}
			/>
		</Box>
	);
}

ImagePanel.propTypes = {
	maxImages: PropTypes.number.isRequired,
	imageIndex: PropTypes.number.isRequired,
	setImageIndex: PropTypes.func.isRequired
};
