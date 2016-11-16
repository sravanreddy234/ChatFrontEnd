'use strict';

app.controller('HomeController', [ 
        '$scope', 
        '$location',
		'$rootScope', 
		function($scope, $location, $rootScope) {

        	console.log("HomeController...");
        	var self = this;
        	
        	self.getCurrentUser = function() {
				console.log("Loading current user if already logged in");
				console.log("Current User : "+$rootScope.currentUser);
				if(!$rootScope.currentUser) {
					console.log("Usernot logged in");
					$rootScope.currentUser="";
				}
				return $rootScope.currentUser;
			}
        	self.getCurrentUser();
        	
		} ]);