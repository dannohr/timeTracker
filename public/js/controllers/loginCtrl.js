
app.controller("NavCtrl", function($rootScope, $scope, $http, $location, $state) {
    $scope.logout = function() {
      $http.post("/logout")
        .success(function() {
          $rootScope.currentUser = null;
          console.log("Logged user out")
          $state.go("login");
        });
    }
  });
  
  app.controller("SignUpCtrl", function($scope, $http, $rootScope, $location, $state) {
    $scope.signup = function(user) {
  
      if (user.password == user.password2) {
        console.log(user);
        $http.post('/signup', user)
          .success(function(user) {
            $rootScope.currentUser = user;
            $state.go("home");
          });
      }
    }
  });
  
  app.controller("LoginCtrl", function($location, $scope, $http, $rootScope, $state) {
    $scope.login = function(user) {
      $http.post('/login', user)
        .success(function(response) {
          $rootScope.currentUser = response;
          console.log("Logged is as ", $rootScope.currentUser.username)
          $state.go("home");
        });
    }
  });