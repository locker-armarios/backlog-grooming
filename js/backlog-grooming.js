console.log("carregou");

var sprintApp = angular.module("sprintApp", []);

sprintApp.controller("reviewController", ["$scope", "$http", function($scope, $http){
	
	$scope.topDeliveries = [];
	$scope.schoolStories = [];
	$scope.companyStories = [];


	//Pegue deste address para mim https://trello.com/b/o9YfxrIj.json

	var sprintDoneCards = []; 

	$http.get("https://trello.com/b/o9YfxrIj.json")
	.success(function(quadro) {
		console.log("Olha o quadro", quadro);
		$scope.titleWeekReview = (quadro.lists[11].name).substring(8,10);
		quadro.cards.forEach(function(card){

			//Sprint 57079ef1b8b39c2443769dc3
			//Doing 57079f06cce9731681c74564
			//Sprint Done 57c98b47dfbcbfea5e898ef5
			if (card.closed) 				
				return;

			//Se estiver na coluna Top Deliveries
			if (card.idList == "576ae75d73eebc09e3446f07" || card.idList == "57079ef1b8b39c2443769dc3" 
				|| card.idList == "57079f06cce9731681c74564" || card.idList == "57c98b47dfbcbfea5e898ef5")
			{
				var storyType = findingProject(card.name);
				if (storyType != 0) {
				console.log(storyType)
				if (storyType == 1) {
					$scope.schoolStories.push({title: card.name}); //tipo escola
					console.log("sou escola");
				}
				else if (storyType == 2) {
					$scope.companyStories.push({title: card.name}); //tipo empresa
				}
				else if (storyType == 3){
					$scope.schoolStories.push({title: card.name}); //tipo escola E empresa
					$scope.companyStories.push({title: card.name});
					console.log("somos amboss");
				}
				
				if (isEpic(card.name) || isTheme(card.name)) {
					quadro.checklists.forEach(function(checklist){
						if (card.idChecklists == checklist.id){
							//pushar os checkitens
							storiesNestedNames = getStoriesNames(checklist.checkItems);
							$scope.topDeliveries.push({title: card.name, items: storiesNestedNames});
						}
					}); 
				}
				else {
					$scope.topDeliveries.push({title: card.name});
				}
			}
				
			}
			
		});


	});


}]);

function sumPoints(cardname) {
	var cutCardName = (cardname).substring((cardname).indexOf("(")+1,(cardname).indexOf(")"));
	var intCutCardName = parseFloat(cutCardName);
	if (!isNaN(intCutCardName)) {
		return intCutCardName;
	}
	else {
		return 0;
	}
}
function isEpic(cardname) {
	var cutCardName = (cardname).substring((cardname).indexOf("(")+1,(cardname).indexOf(")"));
	if (cutCardName == "Epic") {
		return true;
	}
}
function isTheme(cardname) {
	var cutCardName = (cardname).substring((cardname).indexOf("(")+1,(cardname).indexOf(")"));
	if (cutCardName == "Theme") {
		return true;
	}
}
function getStoriesNames(checkitems){
	var storiesNames = [];
	for (var i = checkitems.length - 1; i >= 0; i--) {
		storiesNames.push({name: checkitems[i].name});
	}
	return storiesNames;
}

function findingProject(cardname) {
	var cutCardName = (cardname).substring((cardname).indexOf("[")+1,(cardname).indexOf("]"));
	isSchool = cutCardName.indexOf("Escola"); //+1
	isCompany = cutCardName.indexOf("Empresa"); //+2
	var points = 0;

	if (isSchool != -1) {
		points+= 1;
		console.log("escola");
	}
	if (isCompany != -1) {
		points+= 2;
		console.log("empresa");
	}
	return points;
}

function openStories() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}