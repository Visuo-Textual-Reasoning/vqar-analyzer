import React from 'react'
import JsonData from './iatt.json'
//import pic from "./mcanAttention.jpeg";
import Boundingbox from "./Boundingbox";
//import { MCAN_HOME_URL, SAAA_HOME_URL } from '../../utils/apis';
import PropTypes from 'prop-types';
/**
 * 
 * @param {number} n input to generate the number of bounding boxes
 * @param {string} constApiUrl Url to get image
 * @param {number} imageIndex Index of image 
 * @returns 
 */
export default function Local(n,constApiUrl,imageIndex){
    
    /**
     * @type {Array.<number>} Contains the attention values of bounding boxes
     */
    const jsonValues = (JsonData.values);

    /**
     * @type {Array.<Array.<number>>} contains an array coordinates of bounding boxes
     */
    const jsonCoords = (JsonData.coordinates);

    /**
     * @type {number} It contains the number of boundingboxes
     */
    let coordsLength = jsonCoords.length;

    /**
     * @type {Array.<Array.<number>>} A copy of jsonCoords
     */
    let jsonInput = jsonCoords;

    /** converting [xmin,ymin, xmax,ymax] to [xmin, ymax, width, height]
     * where width = xmax - xmin; height = ymax - ymin;
     */
    for(let i=0; i<coordsLength; i++){
        jsonInput[i][2] = Math.abs(jsonInput[i][2]-jsonInput[i][0]);
        jsonInput[i][3] = jsonInput[i][3]-jsonInput[i][1];
    }
    
    /**
     * @type {number} Number of json values
     */
    let len = jsonValues.length;

    /**
     * @type {Array.<number>} Array needed to store sorted index values of bounding boxes Attention 
     */
    let indices = new Array(len);
    /** sorting Index values in acending values */
    for (let i = 0; i < len; ++i) indices[i] = i;
    indices.sort(function (a, b) { return jsonValues[a] < jsonValues[b] ? -1 : jsonValues[a] > jsonValues[b] ? 1 : 0; });
    
    /** Defining an array that is needed to 
     * store sorted coordinates according to values of attention
     */
    let  arraySorted = new Array(len);
    for (let i = 0; i < arraySorted.length; i++) {
        arraySorted[i] = new Array(4);
    }
/** sorting coordinates according to values of attention in acending order*/
    for(let i=0;i<len;i++){
        let j = indices[i];
        for(let k=0;k<4;k++)
            arraySorted[i][k] = jsonInput[j][k];
    }
/** An array to store reverse of arraySorted (decending order) */
    let tempSorted = new Array(len+1);
    arraySorted.push([0,0,0,0])
    for(let i=0;i < len+1;i++){
        tempSorted[i] = arraySorted[len-i];
    }

    /** @type {string} Contains link to Image upon which we draw bounding boxes  */
    const imageUrl = `${constApiUrl}/image?imageIndex=${imageIndex}`;
    
    /** @type {Array.<Array.<number>>} We are slicing the sorted Decending array of Bounding boxes coordinated */
    let str = tempSorted.slice(1,n);

    /** 
     * @constant params It is needed for Input for the bounding boxes
     */
    const params = {
        image:imageUrl,
        boxes: str,
        //boxes[1].label = jsonValues[i]
        //boxes: [{coord:[jsonCoords[0][0],jsonCoords[0][1],jsonCoords[0][2],jsonCoords[0][3]], label: jsonValues[0] }],
        options: {
            colors: {
            //   normal: random_rgba(),
            normal: "rgba(255,0,0,1)"
                //selected: "rgba(0,225,204,1)",
                //unselected: "rgba(100,100,100,0)"
            },
            style: {
                maxWidth: "100%",
                maxHeight: "100%"
            }
            // showLabels: false
        }
    };
    //tags = tags + <Boundingbox image={params.image} boxes={params.boxes} options={params.options} />;    
    return <Boundingbox image={params.image} boxes={params.boxes} options={params.options} />;
}

// Local.propTypes = {
//     constApiUrl: PropTypes.string.isRequired,
//     imageIndex: PropTypes.number.isRequired,
// };

