import { SAAA_HOME_URL, VQA } from './apis';

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
		apiUrl = SAAA_HOME_URL;
	} else {
		apiUrl = 'vcr';
	}
	let response = await fetch(`${apiUrl}/sample_questions?imageIndex=${imageIndex}`);
	let data = await response.json();
	return data.random_questions;
}

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

export async function fetchVocabulary(apiUrl) {
	try {
		let response = await fetch(`${apiUrl}/vocab`);
		let vocab = await response.json();

		return vocab;
	} catch (err) {
		return [];
	}
}
