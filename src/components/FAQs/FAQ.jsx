import React, { useState, useRef, useEffect } from "react";
import "./styles.css";
import { FiPlus } from "react-icons/fi";
import PropTypes from 'prop-types';


export default function FAQ(ques,ans) {

  const [active, setActive] = useState(false);

  const contentRef = useRef(null);

  useEffect(() => {
    contentRef.current.style.maxHeight = active
      ? `${contentRef.current.scrollHeight}px`
      : "0px";
  }, [contentRef, active]);

  const toggleAccordion = () => {
    setActive(!active);
  };

  // const toggleIcon = (temp) => {
  //   if (temp == true){
  //     toggleAccordion();
  //   }
  // }

  //let actBool = false;
  // if(actBool == true){
  //   const toggleAccordion = () => {
  //     setActive(!active);
  //   };
  // } else {
  //   const toggleAccordion = () => {
  //     setActive(actbool);
  //   };
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
                <p>
                 {ans}
                </p> 
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