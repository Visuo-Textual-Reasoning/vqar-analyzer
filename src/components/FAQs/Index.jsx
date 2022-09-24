import React from 'react'
import Box from '@mui/material/Box';
import FAQ from './FAQ'
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FullWidthTabs from './FullWidthTabs';

export default function FAQs() {
  // let q1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  // let a1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  
  
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <Box sx={{ alignItems: 'center',display:'flex',flexDirection: 'column',textAlign: 'center', width: "80%",margin:'auto'}}>
      <h1>FAQs</h1>
      <h3>Frequently Asked Questions</h3>
      <h4>Here are some commonly asked questions about our VQA and VCR models</h4>
      {/* <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Visual Question Answering" />
        <Tab label="Visual Commonsense Reasoning" />
      </Tabs> */}
      <FullWidthTabs/>
      {/* <div>FAQ()</div> */}
    </Box>
  )
}



