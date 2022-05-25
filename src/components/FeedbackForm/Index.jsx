import * as React from 'react';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import Box from '@mui/material/Box';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

// import { useFeedbackFormOpenStatus } from '../../contexts/FeedbackFormOpenStatusProvider';
import { Paper, } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  contents: {
    display: "flex",
    flexDirection: 'column',
    fontSize: "14px",

    "& > div": {
        // border: "1px solid red",
        display: "flex",
        alignItems: "center"
    },

    "& button": {
        margin: "0 auto"
    }
  }
})

export default function FeedbackForm({ handleRadioChange, sendFeedback, feedback }) {
//   const [open, _setOpen] = useFeedbackFormOpenStatus()
  const classes = useStyles()

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const handleChange = (e, field) => {
    let value = e.target.value
    handleRadioChange(field, value)
  }

  const handleClose = (e) => {
    sendFeedback(e)
  }

  return (
    // <Box style={{ display: `${open ? "flex" : "none"}` }}>
    <Box style={{ display: `${true ? "flex" : "none"}` }}>
      <Paper
        elevation={5}
        sx={{ padding: 1, fontFamily: "Cascadia Code"}}

      >
        <Box className={classes.contents}>
          <Box>
            Is the answer corect?: 
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-answer-group"
              value={feedback["answer"]}
              onChange={(e) => handleChange(e, "answer")}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
            {/* <Checkbox {...label} color="success" onChange={(e) => handleCheckboxChange("answer")} /> */}
          </Box>
          <Box>
            Is the attention corect?: 
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-attention-group"
              onChange={(e) => handleChange(e, "attention")}
              value={feedback["attention"]}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
            {/* <Checkbox {...label} color="success" onChange={(e) => handleRadioChange("attention")} /> */}
          </Box>
          <Box className='buttons'>
            <Button onClick={handleClose} size="small" variant="contained">Done</Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}