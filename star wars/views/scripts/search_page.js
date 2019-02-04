var app = angular.module("searchApp" , []);
app.controller("searchController" , function($scope,$timeout , $http,$window){
  $scope.dataContainer = {
    "planetLst"  :  [],
    "namePlanet" : {},
    "planetNameSize" : [],
    "selectedPlanetName" : ""
  };

  $scope.filterPlanetNames = function(data, rowInx){
    if($scope.dataContainer.selectedPlanetName == ""){
      return data;
    }
    if(data.name.indexOf($scope.dataContainer.selectedPlanetName) > -1){
      return data;
    }
  }
  $scope.logout = function(){
    $window.location.href = "/star_wars/logout"
  }
  $scope.loadPlanets = function(){
    $scope.dataContainer.planetLst.map(function(each_ele){
      $scope.dataContainer.namePlanet[each_ele["name"]] = (each_ele["population"] == "unknown") ? 500000 : parseInt(each_ele["population"]);
    });
    var maxValue = Object.values($scope.dataContainer.namePlanet).reduce(function(acc, curr){return acc + curr});
    for(var eachObj in $scope.dataContainer.namePlanet){
      var dict = {};
      var currPSize = ($scope.dataContainer.namePlanet[eachObj] /  maxValue) * 100;
      dict["name"] = eachObj;
      dict["value"] = Math.ceil(currPSize)+10 + 'px';
      $scope.dataContainer.planetNameSize.push(dict);
    }
    // console.log($scope.dataContainer.planetNameSize);
  }
  $scope.loadPlanetsName = function(){
    $http.get("/star_wars/planetNames").then(function(resp){
      $scope.dataContainer.planetLst = resp.data;
      $scope.loadPlanets();
    }).catch(function(err){
      console.log(err);
    });
  }
});
