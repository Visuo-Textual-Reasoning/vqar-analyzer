import React from 'react'
//import { MCAN_HOME_URL, SAAA_HOME_URL, MOCK_API } from '../../utils/apis';
export default function MCANattention() {
  // const jsonUrl = `${apiUrl}/attention_question`;
  const apiUrl = "http://10.5.0.96:5556";
  
  // async function load() {
  //   let url = `${apiUrl}/attention_question`;
  //   let obj = await(await fetch(url)).json();
  //   console.log(obj.values[0]);
  //   return obj.values[0]
  // }
// var val = load();
// let jsonObj = load();

  // function printJson(){
  //   return console.log(jsonUrl.stringify(coordinates, undefined, 4));
  // }

  // function getMoviesFromApiAsync() {
  //   return fetch('https://facebook.github.io/react-native/movies.json')
  //   .then((response) => response.json())
  //   .then((responseJson) => {
  //     return responseJson.movies;
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  // }

  return (
    <div>hi hello {/*getMoviesFromApiAsync()*/}</div>
  )
}

