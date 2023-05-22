import { Box, Paper, Button, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { getRandomDataPoint } from '../../utils/api_calls';
import MySnackbar from '../MySnackbar/Index';

const useStyles = makeStyles((theme) => {
	return {
		imagePanel: {
			display: 'flex',
			flexDirection: 'column',
			margin: '5px auto',
			width: 'fit-content',
			justifyContent: 'flex-end',

			'& button': {
				margin: '4px 3px 12px 3px',
				fontFamily: 'Cascadia Code',
				
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

export default function ImagePanel({ maxImages, imageIndex, setImageIndex, apiUrl }) {
	const [ snackbarOpen, setSnackBarOpen ] = useState(false);
	const classes = useStyles();
	const split = 'val';
	const imageUrl = `${apiUrl}/image?imageIndex=${imageIndex}`;

	// This should handle Issue #2. May be the issue is browser specific.

	/**
	 * @function handleImageIndexChange 
	 * @param {*} e 
	 */
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

/**
 * @async
 * @function fetchRandomImage
 */
	async function fetchRandomImage() {
		let randomImageIndex = await getRandomDataPoint(split);
		setImageIndex(randomImageIndex);
	}

/**
 * @function handleSnackbarClose
 */
	function handleSnackbarClose() {
		setSnackBarOpen(false);
	}

	const handleClick = (event) => {
		const image = event.target;
		const rect = image.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		console.log('Image coordinates:', x, y);
	  };

	return (
		<Box className={classes.imagePanel}>
			<MySnackbar
				open={snackbarOpen}
				handleClose={handleSnackbarClose}
				msg={`Image index must lie between ${1} and ${maxImages}`}
			/>
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
				{/* <Button color="secondary" variant="contained" size="small">
					Fetch Image
				</Button> */}
				<Button color="secondary" variant="contained" size="small" onClick={fetchRandomImage}>
					Fetch random Image
				</Button>
			</Box>
			<Paper component="img" className={classes.img} src={imageUrl} alt={`Image-${imageIndex}`} onClick={handleClick} />
		</Box>
	);
}

ImagePanel.propTypes = {
	maxImages: PropTypes.number.isRequired,
	imageIndex: PropTypes.number.isRequired,
	setImageIndex: PropTypes.func.isRequired,
	apiUrl: PropTypes.string.isRequired
};
