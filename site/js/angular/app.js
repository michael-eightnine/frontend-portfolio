//APP
var app = angular.module('PortfolioApp', ['ngRoute', 'slick']);

//ROUTING
app.config(function ($routeProvider) {
	"ngInject";
	$routeProvider
	.when('/', {
		controller: "HomeController",
		templateUrl: "js/angular/views/home-view.html"
	})
	.when('/work/:projectId', {
		controller: 'ProjectController',
		templateUrl: 'js/angular/views/project-view.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});

//CONTROLLERS
app.controller('HomeController', ['$scope', 'projects', function($scope, projects) {
	"ngInject";
	projects.success(function(data) {
		$scope.projects = data;
	});

	//init function for binding
	function bindListeners() {
		$("header").on("click", ".mobile-toggle", function() {
			$(this).toggleClass("active");
		})

		$("header, .about").on("click", ".nav-link", function(e) {
			e.preventDefault();
			e.stopImmediatePropagation();
			if($(window).width() <= 740)
				$(".mobile-toggle").removeClass("active");

			var anchor = $(this).attr("href");
			$('html, body').animate({
				scrollTop: $(anchor).offset().top - 70
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
		"ngInject";
		$scope.video = false;

		$http.get('projects/' + $routeParams.projectId + '.json').success(function(data) {
			$scope.detail = data;
		})
		.error(function(data) {
			console.log("Failed to get data")
		});
	}
]);

//SERVICES
app.factory('projects', ['$http', function($http) {
	"ngInject";
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
	"ngInject";
	return function(val) {
		return $sce.trustAsHtml(val);
	};
});
