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
  return data.answer
}
