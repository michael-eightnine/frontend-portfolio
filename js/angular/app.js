//APP
var app = angular.module('PortfolioApp', ['ngRoute', 'ngAnimate', 'slick']);

//ROUTING
app.config(function ($routeProvider) {
	$routeProvider
	.when('/', {
		controller: "HomeController",
		templateUrl: "js/angular/views/home-view.html"
	})
	.when('/projects/:projectId', {
		controller: 'ProjectController',
		templateUrl: 'js/angular/views/project-view.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});

//HEADER INIT REGARDLESS OF VIEW LOADED
app.run(function($rootScope) {

});

//FIX INTERPOLATION ERROR
app.config(function ($sceDelegateProvider) {
	$sceDelegateProvider.resourceUrlWhitelist([
		'self',
		'https://player.vimeo.com/**'
	]);
})

//CONTROLLERS
app.controller('HomeController', ['$scope', 'projects', function($scope, projects) {
	projects.success(function(data) {
		$scope.projects = data;
	});

	//Assign page class for animation
	$scope.pageClass = 'home-screen';

	//init function for binding
	function bindListeners() {
		$("header").on("click", ".mobile-toggle", function() {
			$(this).toggleClass("active");
		})

		$("header").on("click", ".nav-link", function(e) {
			e.preventDefault();
			e.stopImmediatePropagation();
			if($(window).width() <= 740)
				$(".mobile-toggle").removeClass("active");

			var anchor = $(this).attr("href");
			$('html, body').animate({
				scrollTop: $(anchor).offset().top - 60
			}, 500);
		})
	}

	//Home page initializations
	angular.element(document).ready(function () {
		bindListeners();
	});
}]);

app.controller('ProjectController', ['$scope', '$routeParams', '$http',
	function($scope, $routeParams, $http, $sce) {
		$scope.video = false;

		$http.get('projects/' + $routeParams.projectId + '.json').success(function(data) {
			$scope.detail = data;
		})
		.error(function(data) {
			console.log("Failed to get data")
		});

		//Assign page class for animation
		$scope.pageClass = 'project-screen project-content';

		//Project page initializations
		//projectLoad();
	}
]);

//SERVICES
app.factory('projects', ['$http', function($http) {
	return $http.get('projects/project-list.json')
	.success(function(data) {
		return data;
	})
	.error(function(data) {
		return data;
		console.log("Failed to get data")
	});
}]);

//FILTERS
app.filter('safe', function($sce) {
	return function(val) {
		return $sce.trustAsHtml(val);
	};
});
