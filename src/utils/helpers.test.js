import React from "react";
import { fetchMaxImages,fetchPredictionNew, fetchSampleQuestions } from "./helpers";



it("Fetch Max Images", async function() {
    const response = fetchMaxImages("http://10.5.0.96:4444/");
    console.log(await response);
    let data = await response;
    expect(data.max_images).toEqual(10234)
})

it("Fetch Image", async function(){
    const apiURL = "http://10.5.0.96:4444"
    let imageIndex = "233";
    
    
})

it("Fetch Sample Questions", async function(){
    const apiURL = "http://10.5.0.96:4444"
    let imageIndex = "233";
    const response =  fetchSampleQuestions(apiURL,imageIndex);
    let data = await response;
    console.log(data);
})

it("fetch Prediction Data", async function(){
    const apiURL = "http://10.5.0.96:4444"
    let imageIndex = "2";
    let question = "what is the man holding?";
    let model_number = "0";
    let predictionData = {imageIndex, question, model_number}
    //let predictionData = {"imageIndex":"233", "question": "What is the man holding","model_number":"1"};
    const response =  fetchPredictionNew(apiURL,predictionData);
    let data = await response;
    console.log(data.answer);
})



