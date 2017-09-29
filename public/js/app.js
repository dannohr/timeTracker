
var app = angular.module("timeTrackerApp", ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      templateUrl: 'views/home.html'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    })

    .state('signup', {
      templateUrl: 'views/signup.html',
      controller: 'SignUpCtrl'
    })

    .state('profile', {
      url:'/profile',
      templateUrl: 'views/profile.html',
      resolve: {
        logincheck: checkLoggedin
      }
    })

    .state('view2',{
      url: '/view2/',
      templateUrl: "../views/view2.html",
      controller: 'view2Ctrl',
      resolve: {
        logincheck: checkLoggedin
      }
    })

    .state('view3',{
        url:'/view3',
        templateUrl: "../views/view3.html",
        resolve: {
          logincheck: checkLoggedin
        }
        // controller: 'view3Ctrl'
    })
    .state('admin',{
        url:'/admin',
        templateUrl: "../views/admin.html",
        resolve: {
          logincheck: checkLoggedin
        }
        // controller: 'adminCtrl'
    })

    .state('reports',{
        url:'/reports',
        templateUrl: "../views/reports.html",
        resolve: {
          logincheck: checkLoggedin
        }
        // controller: 'reportsCtrl'
    })

    .state('projects',{
        url:'/projects',
        templateUrl: "../views/projects.html",
        resolve: {
          logincheck: checkLoggedin
        }
        // controller: 'projectsCtrl'
    })

    .state('users',{
        url:'/users',
        templateUrl: "../views/users.html",
        resolve: {
          logincheck: checkLoggedin
        }
        // controller: 'usersCtrl'
    })

    $urlRouterProvider
    .otherwise('login');

});



var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
  var deferred = $q.defer();

  $http.get('/loggedin').success(function(user) {
    $rootScope.errorMessage = null;
    //User is Authenticated
    if (user !== '0') {
      $rootScope.currentUser = user;
      deferred.resolve();
    } else { //User is not Authenticated
      $rootScope.errorMessage = 'You need to log in.';
      console.log("Not Logged in")
      deferred.reject();
      $location.url('/login');
    }
  });
  return deferred.promise;
}



$(document).ready(function () {
  
          // Change Highlight On Nav menu, based on what was clicked
          $(".nav a").on("click", function(){
              $(".nav").find(".active").removeClass("active");
              $(this).parent().addClass("active");
          });
  
  
          // Collapse mobile menu after selection
          $(".nav-item-colapse").click(function(event) {
              $(".navbar-collapse").collapse('hide');
            });
  
        
  
  
          
  });
  