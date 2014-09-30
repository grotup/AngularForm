var app = angular.module('app', ['LocalStorageModule', 'ngRoute', 'ngSanitize']);

app.config(function($routeProvider){
	$routeProvider
		.when('/todo', {
			templateUrl	: 'partials/todo.html',
			controller  : 'todoctrl'
		})
		.when('/crud', {
			templateUrl : 'partials/crud.html',
			controller : 'crud'
		})
		.when('/weather',{
			templateUrl : 'partials/weather.html',
			controller : 'weather'
		})
		.when('/pocket', {
			templateUrl : 'partials/pocket.html',
			controller : 'pocket'
		})
		.otherwise({
			redirectTo : '/todo'
		});
});

app.controller('todoctrl', ['$scope','localStorageService', function ($scope, localStorageService){
	$scope.title = 'My Todo List';

	if(!localStorageService.get('tasks')){
		$scope.tasks = [];
	}else{
		$scope.tasks = localStorageService.get('tasks');
	}

	$scope.users = [
			{"username" : "Sylvain"}, 
			{"username": "Anastasia"},
			{"username" : "Jean Michel"}
		];

	// pour éviter une valeur vide dans les filtres, on définit une valeur à l'utilisateur 
	// @see http://stackoverflow.com/questions/12654631/why-does-angularjs-include-an-empty-option-in-select
	if(!localStorageService.get('user_selected')){
		$scope.filter = {user : $scope.users[0]};
	}else{
		$scope.filter = {user : localStorageService.get('user_selected')};
	}
	
	$scope.add_task = function(){
		$scope.tasks.push(
			{
				'title' : $scope.todo_lb,
				'done'  : false,
				"user"  : $scope.filter.user
			});
		$scope.todo_lb = '';
		localStorageService.set('tasks',$scope.tasks);
	}
	
	$scope.archiver = function(data){
		if(!data){
			return;
		}
		
		data.done = true;
		localStorageService.set('tasks',$scope.tasks);
	}
	
	$scope.supprimer_tache = function(index){
		if(index < 0){
			return;
		}
		$scope.tasks.splice(index,1);
		localStorageService.set('tasks',$scope.tasks);
	}
	
	$scope.delete_all_tasks = function(){
		$scope.tasks = [];
		localStorageService.set('tasks',$scope.tasks);
	}

	$scope.update_user = function(){
		localStorageService.set('user_selected',$scope.filter.user);	
	}
}]);

app.controller('crud', ['$scope',function($scope){
	$scope.title = 'Mon test CRUD';

	$scope.books = [
		{
			"title" : "L'alchimiste",
			"author": "Paulo Coelho",
			"year"  : "1997"
		},
		{
			"title" : "Bouquin de test",
			"author": "Jean Michel",
			"year"  : "2014"
		}
	];

	$scope.add_book = function(){
		$scope.books.push({
			"title" : $scope.book_title,
			"author": $scope.book_author,
			"year"	: $scope.book_year
		});
	};
}]);

app.controller('weather', ['$scope', '$http', '$sce', function($scope, $http){
	var endpoint = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"

	var test;

	$http({
		method : 'GET',
		url : endpoint,
	}).success(function(data, status, headers, config){
		$scope.test = data.query.results.channel.item.description;
	}).error(function(data, status, headers, config){
		alert('Error !');
	});
}]);

app.controller('pocket', ['$scope', '$http', function($scope, $http){
	var consumerKey = '22620-675c1afa5e4a09ea03092d2d';
	var request_token_endpoint = 'https://getpocket.com/v3/oauth/request/';
	var redirect_uri = '/#pocket';

	$scope.auth = function(){
		$http({
			method  : 'POST',
			url 	: request_token_endpoint,
			headers : {
				"Content-Type" : "application/json; charset=UTF-8",
				"X-Accept" : "application/json"
			},
			data : {
				"consumer_key" : consumerKey,
				"redirect_uri" : redirect_uri
			}
		}).success(function(data, status, headers, config){
			$scope.data = data;
			console.log(data);
		}).error(function(data, status, headers, config){
			alert(headers);
		});
	};

}]);