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
        $location.path('/app/surveylist');
      },
      function(data, status){
        // This is the error callback
        console.log(data)
        console.log(status)
        window.alert("Fail" + status);
      }
    );
  };

})

.controller('LandingCtrl', function($scope, $location, vpApi) {
  if (vpApi.user.token !== null){
    $location.path('/app/surveylist');
  }
})

.controller('SurveyListCtrl', function($scope, $location, vpApi, Survey) {
  
  if (vpApi.user.token === null){
    $location.path('/app/login');
  }
  $scope.surveys = [];

  $scope.fetchSurveySucess = function(data, status){
    console.log("success");
    $scope.surveys = data;
  }
  
  $scope.fetchSurveyFail = function(data, status){
    console.log("fail");
  }

  vpApi.fetch('survey/survey', {}, $scope.fetchSurveySucess, $scope.fetchSurveyFail);
  //Survey.get({}, $scope.fetchSurveySucess);
})


.controller('SurveyDetailCtrl', function($scope, $stateParams, $ionicModal, Survey, vpApi) {
  console.log('in survey');
  $scope.survey = Survey.get('slug',$stateParams.surveySlug);

  // If there is no survey try reloading.
  if ($scope.survey.length === 0){
    vpApi.fetch('survey/survey', {}, function(data, status){
      $scope.survey = Survey.get('slug',$stateParams.surveySlug);
    },
    function(data, status){
      console.log('error');
    });
  }

  $ionicModal.fromTemplateUrl('templates/question/question_form_modal.html', {
      scope: $scope,
      animation: 'slide-in-down'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function(action) {
    $scope.modal.hide();
    if (action === 'submit'){
      console.log('this is where I would post');
    }
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

  $scope.editQuestion = function(questionId){
    $scope.openModal(questionId);
  }

});
