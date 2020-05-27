
function main() {
  // Put project name on site
  var projectArray = projectData.projects;
  console.log(randomProject(projectArray));
  var currentProject = getProjectFromCurrentURL(projectArray);

  // Put current project name on screen
  var topHeadingHTML = document.querySelector(".top-heading");
  console.log("---");
  console.log(currentProject);
  console.log(topHeadingHTML);
  var projectName = capitalizeFirstLetters(currentProject.name);
  topHeadingHTML.innerHTML = projectName;

  // Put project completion date on screen
  var dateString = getProjectDateString(currentProject);
  var dateHTML = document.querySelector(".project-date");
  dateHTML.innerHTML = "Project Completed: " + dateString; 
}

function randomProject(projectArray){
  return projectArray[0];
}


/**
 * Returns the project based on the current url
 * @param  {projectData.projects} projectArray Array of projects
 * @return {projectData.projects[i]}       project matching permalink
 */
function getProjectFromCurrentURL(projectArray) {
  // Returns the project based on the current url
  var currentURL = window.location.href;
  var splittedURL = currentURL.split("/");
  console.log("splittedURL: ");
  console.log(splittedURL);
  var permalink = splittedURL[splittedURL.length-1];
  if (permalink === "index.html" || permalink === "") {
    permalink = splittedURL[splittedURL.length-2];
  }

  for (var i=0; i<projectArray.length; i++) {
    var project = projectArray[i];
    if (project.permalink === permalink) {
      return project;
    }
  }
}


/**
 * Returns the project date in format: "January 1, 2020"
 * @param  {projectData.projects[i]} project project to get date from
 * @return {String}       date string
 */
function getProjectDateString(project) {
  var projectDate = project.date;
  var splittedDate = projectDate.split("-");
  console.log(splittedDate);
  var projectYearInt = splittedDate[0];
  var projectMonthInt = splittedDate[1];
  var projectDayInt = splittedDate[2];
  console.log(projectMonthInt);
  console.log(typeof projectMonthInt);

  var intToDate = new Map();
  intToDate.set("01","January");
  intToDate.set("02","February");
  intToDate.set("03","March");
  intToDate.set("04","April");
  intToDate.set("05","May");
  intToDate.set("06","June");
  intToDate.set("07","July");
  intToDate.set("08","August");
  intToDate.set("09","September");
  intToDate.set("10","October");
  intToDate.set("11","November");
  intToDate.set("12","December");

  var projectMonthString = intToDate.get(projectMonthInt);
  var dateString = projectMonthString + " " + projectDayInt + ", " + projectYearInt;
  return dateString;

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