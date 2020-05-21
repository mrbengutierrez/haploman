

var checkboxIdMap = new Map();


function main() {
	console.log(projectData);
	console.log(projectData.projects);
	var projectArray = projectData.projects;

	/* Fill in random project anchor tag */
	var randomProject = randomChoice(projectArray);
	var randomProjectLink = randomProject.permalink;
	document.querySelector(".random-project").setAttribute("href",randomProjectLink)


	// Put checkboxes on screen for type of project
	var projectTypes = new Set();
	for (var i=0; i<projectArray.length; i++) {
		var projectType = projectArray[i].tags[0];
		projectTypes.add(projectType);
	}
	var checkboxArray = [];
	projectTypes.forEach(function(projectType) {
		var checkboxID = generateCheckboxID(projectType)
		var checkbox = createCheckbox(checkboxID, projectType);
		checkboxIdMap.set(checkboxId, projectType);
		checkboxArray.push(checkbox);
	});
	var checkboxHTML = checkboxArray.join("");
	var checkboxDiv = document.querySelector(".project-types");
	console.log(checkboxHTML);
	checkboxDiv.innerHTML = checkboxHTML;

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

function createCheckbox(checkboxID, tagName) {
	/* Creates checkbox for project types */
	var checkboxHTML = '\
	<input type="checkbox" id="' + checkboxID  + '" name="project-type" value="' + checkboxID  + '">\
	<label for="' + checkboxID  + '">' + capitalizeFirstLetter(tagName)  + '</label>\
	'
	return checkboxHTML;
}

function replaceDeliminator(words,oldDeliminator,newDeliminator) {
	/* Replaces deliminator in a string of words */
	var wordsArray = words.split(oldDeliminator);
	var newString = wordsArray[0];
	for (var i=1; i<wordsArray.length; i++) {
		newString += newDeliminator + wordsArray[i]
	}
	return newString
}

function replaceSpacesWithHyphens(words) {
	/* Replaces spaces with hyphens in a string of words */
	return replaceDeliminator(words," ","-");
}

function capitalizeFirstLetter(wordString) {
	/* Capitalizes the first letter of a string of words */
	var newString = wordString[0].toUpperCase() + wordString.substring(1);
	return newString;
}



























main();