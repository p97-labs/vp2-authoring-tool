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
        $location.path('/app/formstacks');
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
    $location.path('/app/formstacks');
  }
})

.controller('FormStackListCtrl', function($scope, $location, vpApi, FormStack) {
  
  if (vpApi.user.token === null){
    $location.path('/app/login');
  }
  $scope.formstacks = [];
  
  FormStack.load(function(data, status){
    $scope.formstacks = data;
  });
  

  // $scope.fetchFormStackSucess = function(data, status){
  //   console.log("success");
  //   $scope.surveys = data;
  // }
  
  // $scope.fetchFormStackFail = function(data, status){
  //   console.log("fail");
  // }

  //vpApi.fetch('survey/survey', {}, $scope.fetchFormStackSucess, $scope.fetchFormStackFail);
  //FormStack.get({}, $scope.fetchFormStackSucess);
})


.controller('FormStackDetailCtrl', function($scope, $stateParams, $ionicModal, $location, FormStack, vpApi) {
  $scope.modal = null;
  $scope.formstack = FormStack.get('slug',$stateParams.formstackSlug);

  // If there is no formstacks go to the list page.
  if ($scope.formstack.length === 0){
    $location.path('/app/formstacks')
  }


  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function(command) {
    /*
    Inputs:
    - command: [String] a '-' seperated string containing an action and an object.
                i.e. submit-question, submit-form
    */
    $scope.modal.hide();
    action = command.split('-')[0]
    obj = command.split('-')[1]
    if (object === 'question'){
      console.log('this is where I would post a question');
    } else if (obj==='form'){
      console.log('this is where I would post a form');
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


  $scope.editCallback = function(obj, objId){
    /*
    Inputs:
    - obj: [String] A string indicating the object type to edit, i.e. question, form, block
    - objId: [Integer] If if is present the form will be preloaded with the data, else it
              opens a blank form.
    */
    template = 'templates/'+obj+'/'+obj+'_edit_modal.html'
    $ionicModal.fromTemplateUrl(template, {
      scope: $scope,
      animation: 'slide-in-down'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.openModal(objId);
    });
    
  }



  // $scope.editQuestion = function(questionId){
  //   $ionicModal.fromTemplateUrl('templates/question/question_form_modal.html', {
  //     scope: $scope,
  //     animation: 'slide-in-down'
  //   }).then(function(modal) {
  //     $scope.modal = modal;
  //     $scope.openModal(questionId);
  //   });
    
  // }

  // $scope.editForm = function(questionId){
  //   $ionicModal.fromTemplateUrl('templates/question/form_form_modal.html', {
  //     scope: $scope,
  //     animation: 'slide-in-down'
  //   }).then(function(modal) {
  //     $scope.modal = modal;
  //     $scope.openModal(questionId);
  //   });
  // }

});
