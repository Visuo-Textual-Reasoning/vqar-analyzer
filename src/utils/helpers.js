import { VQA } from './apis';

export function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

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

export async function fetchRandomQuestions(imageIndex, task = 'vqa') {
	let apiUrl;
	if (task === 'vqa') {
		apiUrl = VQA;
	} else {
		apiUrl = 'vcr';
	}
	let response = await fetch(`${apiUrl}/sample_questions?imageIndex=${imageIndex}`);
	let data = await response.json();
	return data.random_questions;
}

export async function sendUserFeedback(apiUrl, data){
	let response = await fetch(`${apiUrl}/feedback`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	return
}

export async function fetchVocabulary(apiUrl) {
	let response = await fetch(`${apiUrl}/vocab`)
	let vocab = await response.json()

	return vocab
}