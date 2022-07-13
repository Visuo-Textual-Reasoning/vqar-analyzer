import PropTypes from "prop-types"
import { Box, Chip } from '@mui/material'
import React from 'react'

export default function Answer({answer, showMeta=true}) {
    let metaLabel = showMeta ? "Answer: " : ""
  return (
      <Box>
          {metaLabel} <Chip variant="filled" color="warning" label={answer} sx={{fontFamily: "Cascadia Code"}}/>
      </Box>
  )
}

Answer.propTypes = {
    answer: PropTypes.string.isRequired,
}