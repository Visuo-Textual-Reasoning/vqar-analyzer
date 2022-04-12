import { Box, Button, TextField } from "@mui/material"
import PropTypes from "prop-types"
import { makeStyles } from "@mui/styles"
import React from 'react'
import {useEvaluate} from "../../contexts/EvaluateProvider"

const useStyles = makeStyles({
  box: {
    width: 650,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    // border: "1px solid red",

    "& input": {
      width: 530,
      height: 20,
      fontFamily: "Cascadia Code",
      fontSize: "14px"
    },
    "& button": {
      height: 40,
      fontFamily: "Cascadia Code",
    }
  }
})

export default function Question({question, questionChangeHandler}) {
  const classes = useStyles()
  const [, setEvalute] = useEvaluate()

  function startEvaluation(e){
    setEvalute(true)
  }

  return (
    <Box className={classes.box}>
      <TextField
        id="filled-basic"
        label="Question"
        color="secondary"
        variant="standard"
        value={question}
        onChange={questionChangeHandler}
        focused
      />
      <Button
        variant="contained"
        color="secondary"
        size="small"
        onClick={startEvaluation}
      >
        Evaluate
      </Button>
    </Box>
  )
}

Question.propTypes = {
  question: PropTypes.string.isRequired,
  questionChangeHandler: PropTypes.func.isRequired,
}