'use strict';

(function(){
	var app = angular.module("mySite",[]);
	app.directive ('testTemplate', function(){
		return {
			restrict: 'E',
			templateUrl: 'templates/test.html',
			controller: ["$http", function($http){
				this.employees = {};
				var thisCtrl = this;
				$http.get('data/someName.json').success(
					function(data){
						thisCtrl.employees=data;
					});
			}],
			controllerAs: "test"
		};
	});
})()