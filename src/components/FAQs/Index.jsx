import React from 'react'
import Box from '@mui/material/Box';
// import FAQ from './FAQ'
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
import FullWidthTabs from './FullWidthTabs';

export default function FAQs() {
  
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <Box sx={{ alignItems: 'center',display:'flex',flexDirection: 'column',textAlign: 'center', width: "80%",margin:'auto'}}>
      <h1 style={{margin:"15px 0px 10px 0px"}}>FAQs</h1>
      <h3 style={{margin:"5px 0px 10px 0px"}}>Frequently Asked Questions</h3>
      <h4 style={{margin:"5px 0px 20px 0px"}}>Here are some commonly asked questions about our VQA and VCR models</h4>      
      <FullWidthTabs/>

    </Box>
  )
}



