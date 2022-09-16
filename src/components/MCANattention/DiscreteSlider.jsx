import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import JsonData from './iatt.json'

import  Local  from './Local';


const jsonCoords = (JsonData.coordinates);
var coordsLength = jsonCoords.length;

export default function DiscreteSlider() {
    const [loadDynamicComp, setLoadDynamicComp] = React.useState(1);

  return (
    <>
    {loadDynamicComp ? (
                <div fallback={<div>Local(1)</div>}>
                {Local(loadDynamicComp)}
                </div>
            ) : null
    }
    <Box style={{ display: "flex", "alignItems": "center", "justifyContent": "center", margin: "0px" }} sx={{ width: "80%" }}>
          <span style={{ flex: "1", padding: "1px 20px 1px 2px" }}>Boundingbox</span>
          <Slider
              aria-label="Temperature"
              defaultValue={1}
              //getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              step={1}
              marks={true}
              min={1}
              max={coordsLength}
              onChange={(e,val) => setLoadDynamicComp(val)} 
              />
              

      </Box>
      </>
  );
}
