import React, { useState, useRef, useEffect } from "react";
import "./styles.css";
import { FiPlus } from "react-icons/fi";
import PropTypes from 'prop-types';

// Show question, answer and toggle button
export default function FAQ(ques,ans,tvalue) {
/** used for toggle butrton */
  const [active, setActive] = useState(false);

  const contentRef = useRef(null);

  // useEffect(() => {
  //   contentRef.current.style.maxHeight = active
  //     ? `${contentRef.current.scrollHeight}px`
  //     : "0px";
  // }, [contentRef, active]);

  /** Used to toggle action */
  const toggleAccordion = () => {
    if (active == false) {
      contentRef.current.style.maxHeight =  `${contentRef.current.scrollHeight}px`
    }else{
      contentRef.current.style.maxHeight = '0px'
    }
    setActive(!active);
  };
  
  useEffect(() => {
    setActive(false);
  }, [tvalue]);


  // const toggleIcon = (temp) => {
  //   if (temp == true){
  //     toggleAccordion();
  //   }
  // }

  return (
    <>
      <div className="App">
        <div>
          <button
            className={`question-section ${active}`}
            onClick={toggleAccordion}
          >
            <div>
              <div className="question-align">
                <h4 className="question-style">
                  {ques}
                </h4>
                <FiPlus
                  className={active ? `question-icon rotate` : `question-icon`}
                />
              </div>
              <div
                ref={contentRef}
                className={active ? `answer answer-divider` : `answer`}
              >
                <div>
                  <br/>
                  {ans}
                  <br/>
                  <br/>
                </div> 
              </div>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

FAQ.propTypes = {
	ques: PropTypes.string.isRequired,
	ans: PropTypes.string.isRequired,
  // actBool: PropTypes.bool.isRequired,
};