'use strict';

app.factory('ForumService', ['$http', '$q', '$rootScope',
		function($http, $q, $rootScope) {
			console.log("ForumService...")

			var BASE_URL = 'http://localhost:8081/Binder'
				return {
				
				getSelectedForum : function(id) {
					console.log("-->ForumService : calling getSelectedForum() method with id : " + id);
					return $http
								.get(BASE_URL+'/forum/'+ id)
								.then(function(response) {
									$rootScope.selectedForum = response.data;
									return response.data;
								},
								function(errResponse) {
									console.error('Error while Fetching Forum.');
									return $q.reject(errResponse);
								});
				},
				
				fetchAllForums : function() {
					console.log("-->ForumService : calling 'fetchAllForums' method.");
					return $http
								.get(BASE_URL + '/forums')
								.then(function(response) {
									return response.data;
								}, 
								function(errResponse) {
									console.error('Error while fetching Forums');
									return $q.reject(errResponse);
								});
				},
				
				fetchAllForumComments : function(id) {
					console.log("-->ForumService : calling 'fetchAllForumComments' method for id : " + id);
					return $http
								.get(BASE_URL + '/forumComments/'+id)
								.then(function(response) {
									$rootScope.selectedForumComments = response.data;
									
									return response.data;
								}, 
								function(errResponse) {
									console.error('Error while fetching ForumComments');
									return $q.reject(errResponse);
								});
				},

				createForum : function(forum) {
					console.log("-->ForumService : calling 'createForum' method.");
					return $http
								.post(BASE_URL + '/forum/', forum)
								.then(function(response) {
									return response.data;
								}, 
								function(errResponse) {
									console.error('Error while creating forum');
									return $q.reject(errResponse);
								});
				},
				
				createForumComment : function(forumComment) {
					console.log("-->ForumService : calling 'createForumComment' method.");
					return $http
								.post(BASE_URL + '/forumComment/', forumComment)
								.then(function(response) {
									return response.data;
								}, 
								function(errResponse) {
									console.error('Error while creating forumComment');
									return $q.reject(errResponse);
								});
				},
				
				updateForum : function(forum, id) {
					console.log("-->ForumService : calling 'updateForum' method with id : "+id);
					return $http
								.put(BASE_URL+'/forum/'+id)
								.then(function(response) {
									return response.data;
								},
								function(errResponse) {
									console.error('Error while updating Forum');
									return $q.reject(errResponse);
								});
				},
				
				deleteForum : function(id) {
					console.log("-->ForumService : calling 'deleteForum' method with id : "+id);
					return $http
								.delete(BASE_URL+'/forum/'+id)
								.then(function(response) {
									return response.data;
								},
								function(errResponse) {
									console.log('Error while deleting Forum');
									return $q.reject(errResponse);
								});
				}
				
			};
		} ]);