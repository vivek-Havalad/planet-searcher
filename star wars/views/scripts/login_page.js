var app = angular.module("loginApp" , []);
app.controller("loginController" , function($scope,$timeout , $http,$window){
  $scope.hideController = {
    "showError" : false,
    "user_name" : "",
    "user_password" : ""
  };
  $scope.submitCntrl= function(){
    var sendObj = {
      "userName" : $scope.hideController.user_name,
      "password" : $scope.hideController.user_password
    };
    $http.post("/star_wars/login_user" , sendObj).then(function(resp){
      if(resp.status == 200){
        console.log(resp);
        $window.location.href = "/star_wars/search_planets";
      }else{
        $scope.hideController.showError = true;
        $timeout(function(){
          $scope.hideController.showError = false;
        },5000)
      }
    }).catch(function(err){
      $scope.hideController.showError = true;
      $timeout(function(){
        $scope.hideController.showError = false;
      },5000)
      console.log(err)
    });
  }
});
