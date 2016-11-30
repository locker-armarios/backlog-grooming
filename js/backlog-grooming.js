console.log("carregou");

var sprintApp = angular.module("sprintApp", []);

sprintApp.controller("reviewController", ["$scope", "$http", function($scope, $http){
	
	$scope.topDeliveries = [];


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
			if (card.idList == "576ae75d73eebc09e3446f07")
			{
				if (isEpic(card.name)) {
					quadro.checklists.forEach(function(checklist){
						if (card.idChecklists == checklist.id){
							//pushar os checkitens
							storiesNestedNames = getStoriesNames(checklist.checkItems);
							$scope.topDeliveries.push({title: card.name, items: storiesNestedNames});
							console.log("scopado", $scope.topDeliveries);
							console.log(storiesNestedNames);
						}
					}); 
				}
				else {
					$scope.topDeliveries.push({title: card.name});
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
function getStoriesNames(checkitems){
	var storiesNames = [];
	for (var i = checkitems.length - 1; i >= 0; i--) {
		storiesNames.push({name: checkitems[i].name});
	}
	return storiesNames;
}