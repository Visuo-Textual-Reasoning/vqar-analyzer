import { Box, Paper, Button, TextField, Snackbar, Alert } from '@mui/material';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
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
			flexDirection: 'column'
		}
	};
});

export default function ImagePanel({ maxImages, imageIndex, setImageIndex }) {
	const [ snackbarOpen, setSnackBarOpen ] = useState(false);
	const classes = useStyles();
	const split = 'val';

	// This should handle Issue #2. May be the issue is browser specific.
	function handleImageIndexChange(e) {
		let value = parseInt(e.target.value, 10);
		if (!value) {
			setSnackBarOpen(true);
			value = 1;
		}

		if (value > maxImages) {
			setSnackBarOpen(true);
			value = maxImages;
		}
		if (value < 1) {
			setSnackBarOpen(true);
			value = 1;
		}

		setImageIndex(value);
	}

	async function fetchRandomImage(e) {
		let randomImageIndex = await getRandomDataPoint(split);
		setImageIndex(randomImageIndex);
	}

	function handleSnackbarClose(e) {
		setSnackBarOpen(false);
	}

	return (
		<Box className={classes.imagePanel}>
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={2000}
				onClose={handleSnackbarClose}
				//   action={action}
			>
				<Alert onClose={handleSnackbarClose} severity="warning" sx={{ width: '100%' }}>
					{`Image index must lie between ${1} and ${maxImages}`}
				</Alert>
			</Snackbar>
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
