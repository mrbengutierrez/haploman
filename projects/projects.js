












var checkboxIDMap = new Map();
var radioIDs = ["althabetical-sort","date-sort","project-type-sort"];
var radioTexts = ["Althabetical","Date","Project Type"];
var compareProjectFunctions = [compareProjectAlphabetical,compareProjectDate,compareProjectProjectType];
var projectsOnScreen = [];

function main() {
	console.log(projectData);
	console.log(projectData.projects);
	var projectArray = projectData.projects;

	/* Fill in random project anchor tag */
	var randomProject = randomChoice(projectArray);
	var randomProjectLink = randomProject.permalink;
	document.querySelector(".random-project").setAttribute("href",randomProjectLink);

	/* Get all tags (contains duplicate tags) */
	var tagNames = [];
	for (var i=0; i<projectArray.length; i++) {
		var projectTags = projectArray[i].tags;
		tagNames = tagNames.concat(projectTags);
	}

	/* Sort tags to get unique sorted tags based on frequency */
	var sortedTags = sortByFrequency(tagNames); 

	// Keep only most popular tags
	var numberOfTags = 3;
	var remainingTags = [];
	if (numberOfTags >= sortedTags.length) {
		remainingTags = sortedTags;
	} else {
		for (var i=0; i<numberOfTags; i++) {
			var tagName = sortedTags[i];
			remainingTags.push(tagName);
		}
	}

	// BYPASS TAG SORTING
	// uncomment to get normal top numberOfTags
	remainingTags = ["software engineering", "electrical engineering", "mechanical engineering"];

	// Create ids for checkboxes
	remainingTags.forEach(function(tagName) {
		var checkboxID = generateCheckboxID(tagName);
		checkboxIDMap.set(checkboxID,tagName);
	});

	// Generate checkboxes into array
	var checkboxes = [];
	var checkboxClass = "project-type";
	checkboxIDMap.forEach(function(tagName,checkboxID) {
		var checkbox =  createCheckbox(checkboxID, tagName, checkboxClass);
		checkboxes.push(checkbox);
	});

	// join checkbox array into a single string of html
	var checkboxHTML = checkboxes.join("");

	// display checkboxes on screen
	var checkboxDiv = document.querySelector(".project-types-container");
	checkboxDiv.innerHTML = checkboxHTML;

	// make sure checkboxes are checked and add event listeners
	checkboxIDMap.forEach(function(tagName, checkboxID) {
		var checkboxElement = document.getElementById(checkboxID);
		checkboxElement .checked = true;
		checkboxElement.addEventListener( 'change', filterProjects );
	});

	// create radio buttons
	var radioName = "project-sorting-name";
	var radiosHTML = "";
	var radioClassName = "radio-button";
	for (var i=0; i<radioIDs.length; i++) {
		var radioID = radioIDs[i];
		var radioText = radioTexts[i];
		var radioHTML = createRadio(radioID, radioName, radioText, radioClassName);
		radiosHTML += radioHTML;
	}

	// display radio inputs on screen
	var radioDiv = document.querySelector(".project-sorting");
	radioDiv.innerHTML = radiosHTML;	

	// select radio button
	document.getElementById("date-sort").checked = true;

	// add event listeners to radio buttons
	radioIDs.forEach(function(radioID) {
		var radioElement = document.getElementById(radioID);
		radioElement.addEventListener("change", filterProjects);
	}); 

	filterProjects();




}


function filterProjects() {
	/* filters projects shown on screen based on which checkboxes are checked */
	var tagsAllowed = [];
	checkboxIDMap.forEach(function(tag,checkboxID) {
		var checkboxElement = document.getElementById(checkboxID);
		if (checkboxElement.checked === true) {
			tagsAllowed.push(tag);
		}
	});

	// get projects with tag
	projectsOnScreen = []; // make sure to empty projects on screen
	var projectArray = projectData.projects;
	projectArray.forEach(function(project) {
		var currentTags = project.tags;
		if (isCommonArrayElement(tagsAllowed, currentTags)) {
			projectsOnScreen.push(project);
		}
	});
	sortProjects();
}

function sortProjects() {
	/* Sorts projects on screen based on which radio button is checked */
	for (var i=0; i<radioIDs.length; i++) {
		var radioID = radioIDs[i];
		var radioButton = document.getElementById(radioID);
		if (radioButton.checked === true) {
			console.log(radioButton);
			var compareProjectFunction = compareProjectFunctions[i];
			projectsOnScreen.sort(compareProjectFunction);
		}
	}

	displayProjects();
}

function displayProjects() {
	/* displays the projects on screen located in projectsOnScreen */
	// generate project buttons
	var projectButtonsHTML = "";
	var projectButtonClass = "project-button";
	projectsOnScreen.forEach(function(project) {
		// Display project
		var buttonText = capitalizeFirstLetters(project.name);
		var buttonLink = project.permalink;
		var projectButtonHTML = createProjectButton(buttonText,buttonLink, projectButtonClass);
		projectButtonsHTML += projectButtonHTML;
	});


	// display projects on screen with matching tags
	var projectButtonsDiv = document.querySelector(".project-list");
	projectButtonsDiv.innerHTML = projectButtonsHTML;	
}




function compareProjectAlphabetical(a, b) {
	/* Compares projects based on name alphabetically */
	var firstValue = b.name;
	var secondValue = a.name;
	return compareStrings(firstValue, secondValue);
}

function compareProjectProjectType(a, b) {
	/* Compares projects based on project type alphabetically */
	var firstValue = a.tags[0];
	var secondValue = b.tags[0];
	return compareStrings(firstValue, secondValue);
}

function compareProjectDate(a, b) {
	/* Compares projects based on project date completion */
	var firstValue = a.date;
	var secondValue = b.date;
	return compareStrings(firstValue, secondValue);
}

function compareStrings(firstValue,secondValue) {
	/* Compares strings. Returns 0 if equal, 1 if secondValue greater, else -1 */
	if (secondValue === firstValue) {
		return 0;
	}

	var comparison = secondValue > firstValue;
	if (comparison === true) {
		return 1;
	}
	return -1;	
}

function createProjectButton(buttonText, buttonLink, buttonClass) {
	/* Returns the html for a project button */
	var buttonLinkWrapped = "'" + buttonLink + "'";
	var projectButton = '<button type=\"button\" class=\"btn btn-outline-dark ' + buttonClass + '\" onclick=\"window.location.href=\'' + buttonLink + '\';\">' + buttonText + '</button>';
	return projectButton;
}



/**
 * @description determine if an array contains one or more items from another array.
 * @param {array} haystack the array to search.
 * @param {array} arr the array providing items to check for in the haystack.
 * @return {boolean} true|false if haystack contains at least one item from arr.
 */
 var isCommonArrayElement = function (haystack, arr) {
 	return arr.some(function (v) {
 		return haystack.indexOf(v) >= 0;
 	});
 };



// <input type="radio" id="date" name="sorting" value="date">
// 				<label for="date">Date</label><br>
// 				<input type="radio" id="alphabetical" name="sorting" value="alphabetical">
// 				<label for="alphabetical">Althabetical</label><br>
// 				<input type="radio" id="project-type" name="sorting" value="project-type">
// 				<label for="project-type">Project Type</label>



function createRadio(radioID, name, radioText, className) {
	var radioButton = '<div class="' + className + '">\
	<input type="radio" id="' + radioID  + '" name="' + name  + '" value="' + radioID  + '"><label for="' + radioID  + '">' + radioText  + '</label><br>\
	</div>';
	return radioButton;
	
}

function sortByFrequency(arrayToSort) {
	/* Returns a sorted unique element array based on frequency

	Parameters:
	arrayToSort (array): array to be sorted

	Returns:
	(array): a sorted unique element array based on the frequency
			of elements contained in arrayToSort
			*/


	/* Create frequency map of the arrayToSort */
	var frequencyMap = new Map();
	arrayToSort.forEach(function(element) {
		if (frequencyMap.has(element)) {
			var newCount = frequencyMap.get(element) + 1;
			frequencyMap.set(element,newCount);
		} else {
			frequencyMap.set(element,1);
		}
	});

	var uniqueElementArray = mapKeysToArray(frequencyMap);

	function compareFrequency(a, b) {
		return frequencyMap.get(b) - frequencyMap.get(a);
	}

	var sortedArray = uniqueElementArray.sort(compareFrequency);
	return sortedArray;
}

function mapKeysToArray(map) {
	/* Returns an array of the keys in a map */
	var keyArray = [];
	map.forEach(function(value,key) {
		keyArray.push(key);
	});
	return keyArray;
}


function rollDice(numSides) {
	/*
	 Rolls a dice with number of sides

	Parameters:
	numSides (number): natural number representing number of sides on dice

	Returns:
	(number): random integer in [1:numSides]
	*/
	var diceRoll = Math.floor(numSides*Math.random()) + 1;
	return diceRoll;
}

function randomChoice(dataArray) {
	/* Return a random element from the array dataArray 

	Requires helper function: rollDice(numSides)
	*/
	var randomIndex = rollDice(dataArray.length) - 1;
	var choice = dataArray[randomIndex];
	return choice;
}

function generateCheckboxID(tagName) {
	/* example converts "mechanical engineering" to "mechanical-engineering-type" */
	var hyphenTagName = replaceSpacesWithHyphens(tagName);
	var projectType = hyphenTagName + "-type";
	return projectType;
}

function createCheckbox(checkboxID, tagName, className) {
	/* Creates checkbox for project types */
	var checkboxHTML = '\
	<div class="' + className + '">\
	<input type="checkbox" id="' + checkboxID  + '" name="project-type" value="' + checkboxID  + '">\
	<label for="' + checkboxID  + '">' + capitalizeFirstLetters(tagName)  + '</label>\
	</div>\
	';
	return checkboxHTML;
}

function replaceDeliminator(words,oldDeliminator,newDeliminator) {
	/* Replaces deliminator in a string of words */
	var wordsArray = words.split(oldDeliminator);
	var newString = wordsArray[0];
	for (var i=1; i<wordsArray.length; i++) {
		newString += newDeliminator + wordsArray[i];
	}
	return newString;
}

function replaceSpacesWithHyphens(words) {
	/* Replaces spaces with hyphens in a string of words */
	return replaceDeliminator(words," ","-");
}

function capitalizeFirstLetter(wordString) {
	/* Capitalizes the first letter of a string of of a single word */
	var newString = wordString[0].toUpperCase() + wordString.substring(1);
	return newString;
}

function capitalizeFirstLetters(wordString) {
	/* Capitalizes the first letter of a string of words */
	var wordArray = wordString.split(" ");
	for (var i=0; i<wordArray.length; i++) {
		var word = wordArray[i];
		var capitalWord = capitalizeFirstLetter(word);
		wordArray[i] = capitalWord;
	}
	var capitalWords = wordArray.join(" ");
	return capitalWords;
}


























main();