import React from 'react'
import JsonData from './iatt.json'
import pic from "./mcanAttention.jpeg";
import Boundingbox from "./Boundingbox";

    const jsonValues = (JsonData.values);
    const jsonCoords = (JsonData.coordinates);
    var coordsLength = jsonCoords.length;
    var jsonInput = jsonCoords;
    for(var i=0; i<coordsLength; i++){
        jsonInput[i][2] = jsonInput[i][2]-jsonInput[i][0];
        jsonInput[i][3] = jsonInput[i][3]-jsonInput[i][1];
    }

    export default function Local(i){
        
        function random_rgba() {
            var o = Math.round, r = Math.random, s = 255;
            return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + '0.9'+ ')';
        }
        
        let str = jsonInput.slice(0,i);
            const params = {
                image:
                  pic,
                boxes: str,
                //boxes[1].label = jsonValues[i]
                //boxes: [{coord:[jsonCoords[0][0],jsonCoords[0][1],jsonCoords[0][2],jsonCoords[0][3]], label: jsonValues[0] }],
                options: {
                    colors: {
                      normal: random_rgba(),
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

 