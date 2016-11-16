'use strict';

app.controller('UserController', [
		'$http',
		'$cookieStore',
		'$scope',
		'UserService',
		'$location',
		'$rootScope',
		function($http, $cookieStore, $scope, UserService, $location, $rootScope) {
			console.log("UserController....")
			var self = this;
			self.user = {
				errorCode: '',
				errorMessage: '',
				id: '',
				name: '',
				password: '',
				gender: '',
				email: '',
				phone: '',
				role: '',
				isOnline: '',
				image: '',
				photos: ''
			};
			self.users = [];

			self.fetchAllUsers = function() {
				console.log("--> UserController : calling fetchAllUsers method.");
				UserService.fetchAllUsers().then(function(d) {
					self.users = d;
				}, function(errResponse) {
					console.error('Error while fetching Users...');
				});
			};

			self.createUser = function(user) {
				console.log("--> UserController : calling createUser method.");
				UserService.createUser(user).then(self.fetchAllUsers,
						function(errResponse) {
							console.error('Error while creating User...');
						});
			};

			self.updateUser = function(user, id) {
				console.log("--> UserController : calling updateUser method.");
				UserService.updateUser(user, id).then(self.fetchAllUsers,
						function(errResponse) {
							console.error('Error while updating User...');
						});
			};

			self.authenticate = function(user) {
				console.log("--> UserController : calling authenticate method.");
				UserService.authenticate(user).then(function(d) {
					self.user = d;
					console.log("user.errorCode : "+self.user.errorCode);
					if(self.user.errorCode == "404") {
						alert("Invalid Credentials. Please try again.")
						
						self.user.id = "";
						self.user.password = "";
					} else {
						console.log("Valid Credentials. Navigating to home page.");
						$http.defaults.headers.common['Authorization'] = 'Basic' + $rootScope.currentUser;
						$cookieStore.put('currentUser', $rootScope.currentUser);
						$location.path('/');
					}
				}, 
				function(errResponse) {
					console.error('Error while authenticate User...');
				});
			};
			
			self.logout = function() {
				console.log("--> UserController : calling logout method.");
				$rootScope.currentUser = {};
				$cookieStore.remove('currentUser');
				UserService.logout();
				console.log("-->UserController : User Logged out.");
				$location.path('/');
			}

			self.deleteUser = function(id) {
				console.log("--> UserController : calling deleteUser function.");
				UserService.deleteUser(id).then(self.fetchAllUsers,
						function(errResponse) {
							console.error('Error while deleting User...');
						});
			};

			self.fetchAllUsers();

			self.login = function() {
				{
					console.log('login validation ??????????', self.user);
					self.authenticate(self.user);
				}
			};

			self.register = function() {
				{
					console.log("--> UserController : calling register() method.", self.user);
					self.createUser(self.user);
					console.log('Saving new user...');
				}
				$location.path('/login');
				self.reset();
			};
			
			self.reset = function() {
				self.user = {
						id : '',
						name : '',
						password : '',
						email : '',
						phone : '',
						role : '',
						errorMessage : ''
				};
				$scope.myForm.$setPristine();
			};

		} ]);