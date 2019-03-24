const goalHeading = document.querySelector("#goal");
const generationHeading = document.querySelector("#generation");
const bestWordHeading = document.querySelector("#bestWord");

const charListInput = document.querySelector("#charList");
const goalInput = document.querySelector("#goalInput");
const dataSizeInput = document.querySelector("#dataSize");
const mutationInput = document.querySelector("#mutation");

//Randomly generate a single string
function generateString(chars, length) {
	var str = "";
	
	for (var i = 0; i < length; i++) {
		str += chars[Math.floor(Math.random() * chars.length)];
	}
	
	return str;
}

//Randomly generate a list of strings
function generateData(length) {
	var data = [];
	
	for (var i = 0; i < length; i++) {
		data.push(generateString(charList, goal.length));
	}
	
	return data;
}

//evaluate how close a word is to the goal word
function getFitness(word) {
	fitness = 0;
	for (var i = 0; i < word.length; i++) {
		if (word[i] == goal[i]) {
			fitness++;
		}
	}
	return fitness;
}

//Generate a new word from two parents with some chance of mutation
function generateNewWord(word1, word2, mutate) {
	var newWord = "";
	for (var i = 0; i < word1.length; i++) {
		if (mutate > Math.random()) {
			newWord += charList[Math.floor(Math.random() * charList.length)]
		}
		else if (Math.random() < 0.5) {
			newWord += word1[i];
		}
		else {
			newWord += word2[i];
		}
	}
	return newWord;
}

//Generate a pool sorted by fitness
function generatePool(data) {
	var pool = [];
	var priority
	data.forEach(function (dataPoint) {
		priority = getFitness(dataPoint);
		for (var i = 0; i < priority; i++) {
			pool.push(dataPoint);
		}
	});
	return pool;
}

//Populate a new generation of data based on data from last generation
function newGeneration(data, mutationInput) {
	var pool = generatePool(data);
	var new_data = [];	
	
	var word1;
	var word2;
	for (var i = 0; i < dataSize; i++) {
		word1 = pool[Math.floor(Math.random() * pool.length)];
		word2 = pool[Math.floor(Math.random() * pool.length)];
		new_data.push(generateNewWord(word1, word2, mutationInput));
	}
	
	return new_data;
}

//Find the word with the best fitness score
function findBest(data) {
	var bestFitness = 0;
	var bestWord = "";
	
	var fitness;
	data.forEach(function (word) {
		fitness = getFitness(word);
		if (fitness > bestFitness) {
			bestFitness = fitness;
			bestWord = word;
		}
	});
	
	return bestWord;
}

//Main operation to repeat until goal is reached
function mainLoop() {
	generationHeading.textContent = generation;
	var best = findBest(data);
	bestWordHeading.textContent = best;
	if (best != goal) {
		data = newGeneration(data, mutationAmount);
		generation++;
		window.setTimeout(mainLoop, 100);
	}
}

//I'm sorry for the globals
//Blame Internet Explorer's lack of support for including parameters with callbacks
var data;
var generation;
var charList;
var goal;
var dataSize;
var mutationAmount;

//Initialisation and running of the main operation when start button is pressed
function start() {
	charList = charListInput.value;
	goal = goalInput.value;
	dataSize = dataSizeInput.value;
	mutationAmount = mutationInput.value;
	
	data = generateData(dataSize);
	generation = 0;
	goalHeading.textContent = goal;
	mainLoop();
}