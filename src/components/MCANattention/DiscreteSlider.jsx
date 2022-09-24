import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import JsonData from './iatt.json'
// import { padding } from '@mui/system';
// import VQAModelPanel from '../ModelPanel/VQAPanel';
import  Local  from './Local';
// import ReactDOM from 'react-dom'
// import  { div } from "react";
// import { render } from 'react-dom';
import PropTypes from 'prop-types';


// const DynamicComponent = React.lazy(() => import("./Local"));
// const DynamicComponent = () => {
//    render() Local(1);
//  }



export default function DiscreteSlider({constApiUrl,imageIndex}) {
  console.log("constApiUrl  "+constApiUrl)
    const [loadDynamicComp, setLoadDynamicComp] = React.useState(1);
    var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
    //   function getJSONP(url, success) {

    //     var ud = '_' + +new Date,
    //         script = document.createElement('script'),
    //         head = document.getElementsByTagName('head')[0] 
    //                || document.documentElement;
    
    //     window[ud] = function(data) {
    //         head.removeChild(script);
    //         success && success(data);
    //     };
    
    //     script.src = url.replace('callback=?', 'callback=' + ud);
    //     head.appendChild(script);
    
    // }
    
    // getJSONP(qatt, function(data){
    //     console.log(data);
    // });  

const jsonCoords = (JsonData.coordinates);
let coordsLength = jsonCoords.length;
const jsonValues = (JsonData.values);
let test = jsonValues;
let len = jsonValues.length;
//console.log("Value.lenght"+len);
let indices = new Array(len);
for (let i = 0; i < len; ++i) indices[i] = i;
indices.sort(function (a, b) { return test[a] < test[b] ? -1 : test[a] > test[b] ? 1 : 0; });

function displayAttValues(i){
  let attValue = [];
  let j=0
  for( j=2; j<=i; j++){
    attValue[(j-1)] = test[indices[len-j+1]]
    if (attValue[j-1] != null){
      attValue[j-1] = attValue[j-1].toFixed(3)
    }
  }
  // return attValue.map((attValue) => <div style={{color: colorArray[i-2]}}>&nbsp;{attValue},&nbsp;</div>);
  return attValue.map((attValue) => <div>&nbsp;{attValue},&nbsp;</div>);
};



  return (
    <>
    {loadDynamicComp ? (
                <div>
                <div fallback={<div>Local(1)</div>}>
                {Local(loadDynamicComp,constApiUrl,imageIndex)}
                </div> 
                {/* <div style={{ display: "flex","flex-wrap": "wrap"}}>Attention:&nbsp; {displayAttValues(loadDynamicComp)}</div> */}
                </div>
            ) : null
    }
    <Box style={{ display: "flex", "alignItems": "center", "justifyContent": "center", margin: "0px" }} sx={{ width: "95%" }}>
          <span style={{ flex: "1", padding: "1px 15px 1px 2px" }}>Boundingbox</span>
          <Slider
              aria-label="Temperature"
              defaultValue={1}
              //getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              step={1}
              marks={true}
              min={1}
              max={Math.floor((coordsLength+1)/4)}
              onChange={(e,val) => setLoadDynamicComp(val)} 
              />
      </Box>
      {loadDynamicComp ? (
                <div>
                {/* <div fallback={<div>Local(1)</div>}>
                {Local(loadDynamicComp)}
                </div>  */}
                <div style={{ display: "flex","flex-wrap": "wrap"}}>Attention:&nbsp; {displayAttValues(loadDynamicComp)}</div>
                </div>
            ) : null
    }
      </>
  );
}
DiscreteSlider.propTypes = {
	constApiUrl: PropTypes.string.isRequired,
	imageIndex: PropTypes.number.isRequired,
};