import React, {useState} from 'react'
import {Box} from "@mui/material"
import { makeStyles } from '@mui/styles';
import ImagePanel from "../ImagePanel/Index"
import { VQA } from '../../utils/apis';
import VCRInput from '../VCRInput/Index';

const useStyles = makeStyles((theme) => {
  return {
    wrapper: {

    }
  }
})

export default function VCR() {
  const [imageIndex, setImageIndex] = useState(1)
  const [maxImages, setMaxImages] = useState(0)
  const [data, setData] = useState({
    question: "",
    answers: ["", "", "", ""],
    rationales: ["", "", "", ""],
  })

  return (
    <Box>
      <ImagePanel maxImages={maxImages} imageIndex={imageIndex} setImageIndex={setImageIndex} apiUrl={VQA}/>
      <VCRInput data={data} setData={setData}/>
    </Box>
  )
}
