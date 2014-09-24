angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $location, vpApi) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    
    vpApi.authenticate($scope.loginData, 
      function(data, status){
        // This is the success callback
        window.alert("Success");
        $location.path('/app/playlists');
      },
      function(data, status){
        // This is the error callback
        console.log(data)
        console.log(status)
        window.alert("Fail" + status);

      }
    );


    if (vpApi.user.token !== null){
      $location.path('/playlists');
    } 

  };
})


.controller('PlaylistsCtrl', function($scope, vpApi) {
  
  $scope.playlists = [];

  $scope.fetchSurveySucess = function(data, res){
    console.log("success");
  }
  $scope.fetchSurveyFail = function(data, res){
    console.log("fail");
  }

  vpApi.fetch('survey/survey', {}, $scope.fetchSurveySucess, $scope.fetchSurveyFail);

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
