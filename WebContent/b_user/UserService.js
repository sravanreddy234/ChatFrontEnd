'use strict'

app.factory('UserService', ['$http', '$q', '$rootScope',
	function($http, $q, $rootScope) {
		console.log('UserService...');

		var BASE_URL = 'http://localhost:8081/Binder'
		return {
			
			fetchAllUsers : function() {
				console.log("--> UserService : calling 'fetchAllUsers' method.");
				return $http
							.get(BASE_URL+'/users')
							.then(function(response) {
								return response.data;
							},
							function(errResponse) {
								console.error('Error while fetching UserDetails...');
								return $q.reject(errResponse);
							});
			},
			
			searchForFriends : function() {
				console.log("--> UserService : calling 'fetchAllUsers' method.");
				return $http
							.get(BASE_URL+'/searchForFriends')
							.then(function(response) {
								return response.data;
							},
							function(errResponse) {
								console.error('Error while fetching UserDetails...');
								return $q.reject(errResponse);
							});
			},

			createUser : function(user) {
				console.log("--> UserService : calling 'createUser' method.");
				return $http
							.post(BASE_URL+'/user/', user)
							.then(function(response) {
								return response.data;
							},
							function(errResponse) {
								console.error('Error while creating User...');
								return $q.reject(errResponse);
							});
			},

			updateUser : function(user, id) {
				console.log("--> UserService : calling 'updateUser' method.");
				return $http
							.put(BASE_URL+'/user/'+id)
							.then(function(response) {
								return response.data;
							},
							function(errResponse) {
								console.error('Error while updating User...');
								return $q.reject(errResponse);
							});
			},

			deleteUser : function(id) {
				console.log("--> UserService : calling 'deleteUser' method.");
				return $http
							.delete(BASE_URL+'/user/'+id)
							.then(function(response) {
								return response.data;
							},
							function(errResponse) {
								console.error('Error while deleting User...');
								return $q.reject(errResponse);
							});
			},

			authenticate : function(user) {
				console.log("--> UserService : calling 'authenticate' method.");
				return $http
							.post(BASE_URL+'/user/login', user)
							.then(function(response) {
								if (response.data.errorMessage!="") {
									$rootScope.currentUser = {
											name: response.data.name,
											id: response.data.id,
											role: response.data.role,
											email:response.data.email,
											phone:response.data.phone,
											gender:response.data.gender
									};
								}
								return response.data;
							},
							function(errResponse) {
								console.error('Error while authenticate User...');
								return $q.reject(errResponse);
							});
			},
			
			logout: function() {
				console.log("--> UserService : calling 'logout' method.");
				return $http
							.get(BASE_URL+'/user/logout')
							.then(function(response) {
								return response.data;
							},
							function(errResponse) {
								console.error('Error while logging out.');
								return $q.reject(errResponse);
							}
						);
			}
		};

	}]);