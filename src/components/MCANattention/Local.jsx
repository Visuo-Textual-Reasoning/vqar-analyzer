import React from 'react'
import JsonData from './iatt.json'
import pic from "./mcanAttention.jpeg";
import Boundingbox from "./Boundingbox";
export default function Local() {
    const jsonCoords = (JsonData.coordinates);
    var coordsLength = jsonCoords.length;
    var jsonInput = jsonCoords;
    for(var i=0; i<coordsLength; i++){
        jsonInput[i][2] = jsonInput[i][2]-jsonInput[i][0];
        jsonInput[i][3] = jsonInput[i][3]-jsonInput[i][1];
    }
    
    console.log("Input"+jsonInput[0])
    console.log("Coords"+jsonCoords[0])
    //const jsonInput = [jsonCoords[i][0],jsonCoords[i][1],jsonCoords[i][2]-jsonCoords[i][0],jsonCoords[i][3]-jsonCoords[i][1]]
    const jsonValues = (JsonData.values);
    // function noOfBoundBoxes(n){
    //     for(var i=0;i<n;i++){
    //         bBox(i);
    //     }
    // }
    function bBox(i){
        let str = jsonInput.slice(0,i);
            const params = {
                image:
                  pic,
                boxes: str,
                // boxes: [{coord:[jsonCoords[0][0],jsonCoords[0][1],jsonCoords[0][2],jsonCoords[0][3]], label: jsonValues[0] }],
                options: {
                    colors: {
                      normal: "rgba(255,255,255,0.4)",
                      selected: "rgba(0,225,204,1)",
                      unselected: "rgba(100,100,100,0)"
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

  return (
    <>
    {/* <div>{str}</div> */}
    {/* <img src={pic} /> */}
    {bBox(2)}
    </>
  )
}

