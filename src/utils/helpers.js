import { SAAA_HOME_URL, VQA } from './apis';

/**
 * @function getRandomInt get random number in between min & max
 * @param {number} min 
 * @param {number} max 
 * @returns 
 */
export function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
/**
 * @async
 * @function fetchPrediction fetch prediction data from backend
 * @param {string} apiUrl 
 * @param {object} predictionData 
 * 	@param {number} predictionData.imageIndex
 * 	@param {string} pridictionData.question
 * @returns 
 */
export async function fetchPrediction(apiUrl, predictionData) {
	let response = await fetch(`${apiUrl}/predict`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(predictionData)
	});
	let data = await response.json();
	return data;
}

/**
 * @async
 * @function fetchRandomQuestions We use it to get sample questions from backend 
 * only for vqa as VCR doesn't have 
 * @param {number} imageIndex 
 * @param {string} task 
 * @returns 
 */
export async function fetchRandomQuestions(imageIndex, task = 'vqa') {
	let apiUrl;
	if (task === 'vqa') {
		apiUrl = SAAA_HOME_URL;
	} else {
		apiUrl = 'vcr';
	}
	let response = await fetch(`${apiUrl}/sample_questions?imageIndex=${imageIndex}`);
	let data = await response.json();
	return data.random_questions;
}
/**
 * @async
 * @function sendUserFeedback we set the current time &
 * then we send feedback input to backend
 * @param {string} apiUrl 
 * @param {object} data 
 * 	@param {string} data.cookieUserID
 * 	@param {object} data.feedback
 * 		@param {} data.feedback.answer
 * 		@param {} data.feedback.attention
 * 		@param {number} data.feedback.relevance_score
 * 		@param {string} data.feedback.user_answer
 * 		@param {string} data.feedback.explaination
 * 	@param {number} data.imageIndex
 * 	@param {string} data.question
 * 	@param {string} data.answer
 * 	@returns 
 */
export async function sendUserFeedback(apiUrl, data) {
	console.log("Sending feedback: ")
	console.log(data)

	let today = new Date().toISOString().slice(0, 10)
	let timestamp = {
		date: today,
		time: new Date().toLocaleTimeString(),
		timestamp: Date.now()
	}

	data["timestamp"] = timestamp;
	let response = await fetch(`${apiUrl}/feedback`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	return;
}

/**
 * @async
 * @function fetchVocabulary we use it to get vocab from backend
 * @param {string} apiUrl 
 * @returns 
 */
export async function fetchVocabulary(apiUrl) {
	try {
		let response = await fetch(`${apiUrl}/vocab`);
		let vocab = await response.json();

		return vocab;
	} catch (err) {
		return [];
	}
}
