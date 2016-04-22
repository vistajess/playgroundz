var app = angular.module('basic',[])
.controller('TodoCtrl',function($scope){
	$scope.todoList = [];

	$scope.addItem = function(item) {
		$scope.todoList.push(item);
		$scope.task = '';
	}

	$scope.removeItem = function(index) {
		var filteredTodoList = $scope.todoList.filter(function(todo) {
			return todo !== index;
		});
		$scope.todoList = filteredTodoList;
	}
});

app.directive('customDirective', function() {
	return {
		template: "<h1>Custom Directive</h1>"
	}
});
