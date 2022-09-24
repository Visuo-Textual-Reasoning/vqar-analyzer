import React from 'react'
import JsonData from './iatt.json'
import pic from "./mcanAttention.jpeg";
import Boundingbox from "./Boundingbox";
import { MCAN_HOME_URL, SAAA_HOME_URL } from '../../utils/apis';
import PropTypes from 'prop-types';

    export default function Local(n,constApiUrl,imageIndex){

        const jsonValues = (JsonData.values);
        const jsonCoords = (JsonData.coordinates);
        let coordsLength = jsonCoords.length;
        let jsonInput = jsonCoords;
        for(let i=0; i<coordsLength; i++){
            jsonInput[i][2] = Math.abs(jsonInput[i][2]-jsonInput[i][0]);
            jsonInput[i][3] = jsonInput[i][3]-jsonInput[i][1];
        }
        
        //Sort the indeces of json values
        let test = jsonValues;
        let len = jsonValues.length;
        // console.log("Value.lenght"+len);
        let indices = new Array(len);
        for (let i = 0; i < len; ++i) indices[i] = i;
        indices.sort(function (a, b) { return test[a] < test[b] ? -1 : test[a] > test[b] ? 1 : 0; });
        // console.log(indices);
        // console.log(jsonValues);
        
        //define Sorted array
        let  arraySorted = new Array(len);
        for (let i = 0; i < arraySorted.length; i++) {
        arraySorted[i] = new Array(4);
        }
    
        for(let i=0;i<len;i++){
            let j = indices[i];
            for(let k=0;k<4;k++)
                arraySorted[i][k] = jsonInput[j][k];
        }
        let tempSorted = new Array(len+1);
        arraySorted.push([0,0,0,0])
        for(let i=0;i < len+1;i++){
            tempSorted[i] = arraySorted[len-i];
        }
    
    
        const imageUrl = `${constApiUrl}/image?imageIndex=${imageIndex}`;
        // function random_rgba() {
        //     var o = Math.round, r = Math.random, s = 255;
        //     return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + '0.9'+ ')';
        // }

        //let strTemp = str
        // console.log(arraySorted);
        // let str1 = arraySorted.slice(-1)
        // console.log(str1)

        // let str = reverseArr(arraySorted);
        // str = str.slice(0,n);
        
        let str = tempSorted.slice(1,n)
        // console.log("str box coords");
        // console.log(str);
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

    Local.propTypes = {
        constApiUrl: PropTypes.string.isRequired,
        imageIndex: PropTypes.number.isRequired,
    };

