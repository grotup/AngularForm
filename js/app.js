var todo = angular
				.module('todo', ['LocalStorageModule'])
				.controller('todoctrl', [
					'$scope',
					'localStorageService', 
					function ($scope, localStorageService){
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
					}
				])
				.controller('crud', [
					'$scope',
					function($scope){
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
							alert('Test !');
							//$scope.books.push(data);
						};
					}
				]);
