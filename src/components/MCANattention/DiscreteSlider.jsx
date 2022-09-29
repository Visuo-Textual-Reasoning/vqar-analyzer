import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import JsonData from './iatt.json'
// import { padding } from '@mui/system';
import  Local  from './Local';
// import ReactDOM from 'react-dom'
// import  { div } from "react";
// import { render } from 'react-dom';
import PropTypes from 'prop-types';



/**
 * 
 * @param {string} constApiUrl contains the MCAN URL
 * @param {number} imageIndex contains the index of the image
 * 
 * @returns Local(), Slider, Displays attention values
 */
export default function DiscreteSlider({constApiUrl,imageIndex}) {
  //console.log("constApiUrl  "+constApiUrl)
    const [loadDynamicComp, setLoadDynamicComp] = React.useState(1);
    
    /**
     * An array containg random Hex color codes
     * @type {array<string>}
     */
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
    
/**
 * @type {Array.<Array.<number>>} A 2d array containing coordinates of bounding boxes
 */
const jsonCoords = (JsonData.coordinates);

/**
 * @type {number} Variable containg the number of coordinates
 */
let coordsLength = jsonCoords.length;

/**
 * @type {Array.<number>} contains the Bounding boxes attention
 */
const jsonValues = (JsonData.values);

/**
 * @type {number} Containing the number of bounding boxes
 */
let len = jsonValues.length;
//console.log("Value.lenght"+len);

/**
 * @type {Array.<number>} Array that contains the indices of sorted json values in acending order 
 */
let indices = new Array(len);

/** It sorts the indices jsonValues in to  */
for (let i = 0; i < len; ++i) indices[i] = i;
indices.sort(function (a, b) { return jsonValues[a] < jsonValues[b] ? -1 : jsonValues[a] > jsonValues[b] ? 1 : 0; });

/**
 * @function displayAttValues
 * This Function displays the number of attention values based on the value given in input
 * @param {number} i The number of attention values that need to be displayed
 * @returns an Array of jsx elements containing Attention values of the bounding boxes
 */
function displayAttValues(i){
  let attValue = [];
  let j=0
  for( j=2; j<=i; j++){
    attValue[(j-1)] = jsonValues[indices[len-j+1]]
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
                <div fallback={<div>Local(1)</div>}>
                {
                /**
                 * Function imported from Local.jsx
                 * @param {number} loadDynamicComp contains value of Discreet slider
                 * @param {string} constApiUrl contains the MCAN URL
                 * @param {number} imageIndex  contains index of the image
                 */
                Local(loadDynamicComp,constApiUrl,imageIndex)
                }
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
                <div style={{ display: "flex","flexWrap": "wrap"}}>Attention:&nbsp; {displayAttValues(loadDynamicComp)}</div>
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