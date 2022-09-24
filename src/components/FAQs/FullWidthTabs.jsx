import * as React from 'react';
import PropTypes from 'prop-types';
//import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FAQ from './FAQ'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {

  let q1 = "What is VQA task?";
  let a1 = "Visual question answering(vqa) is a multi modal task involving computer vision and NLP. We show an image to model, ask questions about that image to the model and model answers it.";
  let q2 = "What am I supposed to do?";
  let a2 = "In VQA, after fetching the image, you are supposed to ask a question about the image and hit evaluate, the 2 models answers to your question, upon which you are supposed to fill the feedback form about the model performance. For better understanding, the attention maps of the model will be displayed, as in where the model is focusing.";
  let q3 = "What is relevance score?";
  let a3 = "It is about how relevant is model's answer/approach to the question, even when the model is wrong, there could be very good reason why model answered that wrong even with a correct approach, probably due to the visual similarity between the answer by model and original answer. Example is model thinking dog with hair as lion,Similarly when model gives correct answer, but it is not focusing on correct areas, then the relevance is less.";
  let q4 = "What are answer and explanation fields in the form?";
  let a4 = "Give the correct answer in the answer field (one word) and explanation is what you think about model's answer. Explanation could be you explaining about relevance, model's attention etc.";

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Visual Question Answering" {...a11yProps(0)} />
          <Tab label="Visual Commonsense Reasoning" {...a11yProps(1)} />
          {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
        </Tabs>
      </AppBar>
      {/* <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      > */}
        <TabPanel value={value} index={0} dir={theme.direction}>
          {FAQ(q1,a1)}
          {FAQ(q2,a2)}
          {FAQ(q3,a3)}
          {FAQ(q4,a4)}

        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        VCR Questions and Answers
          
        </TabPanel>
        {/* <TabPanel value={value} index={2} dir={theme.direction}>
          Item Three
        </TabPanel> */}
      {/* </SwipeableViews> */}
    </Box>
  );
}
