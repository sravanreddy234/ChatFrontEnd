'use strict';

app.factory('FriendService', ['$http', '$q', '$rootScope',
		function($http, $q, $rootScope) {
			console.log("FriendService...");

			var BASE_URL = 'http://localhost:8081/Binder/user'
			return {
				
				getSelectedFriend : function(id) {
					console.log("-->FriendService : calling 'getSelectedFriend' method with id : " + id);
					return $http
								.get(BASE_URL+'/friend/'+ id)
								.then(function(response) {
									$rootScope.selectedFriend = response.data;
									return response.data;
								},
								function(errResponse) {
									console.error("Error while fetching friend.");
									return $q.reject(errResponse);
								});
				},
				
				getMyFriends : function() {
					console.log("--> FriendService : calling 'getMyFriends' method.");
					return $http.get(BASE_URL + '/myFriends').then(
							function(response) {
								return response.data;
							}, function(errResponse) {
								console.error("-->FriendService : Error while fetching all my friends.)");
								return $q.reject(errResponse);
							});
				},
				
				getNewFriendRequests : function() {
					console.log("--> FriendService : calling 'getNewFriendRequests' method.");
					return $http.get(BASE_URL+'/newFriendRequests').then(
							function(response) {
								$rootScope.newRequest = response.data;
								return response.data;
							},
							function(errResponse) {
								console.error("-->FriendService : Error while fetching new friend requests.");
								return $q.reject(errResponse);
							});
				},
				
				sendFriendRequest : function(friendId) {
					console.log("--> FriendService : calling 'sendFriendRequest' method.");
					return $http.post(BASE_URL + '/addFriend/' + friendId).then(
							function(response) {
								return response.data;
							},
							function(errResponse) {
								console.error("-->FriendService : Error while sending friend request.")
								return $q.reject(errResponse);
							});
				},
				
				acceptFriend : function(friend, id) {
					console.log("--> FriendService : calling 'acceptFriend' method with id : "+id);
					return $http.put(BASE_URL+'/acceptFriend/'+id, friend).then(
							function(response) {
								return response.data;
							},
							function(errResponse) {
								console.error("-->FriendService : Error while unFriend existing friend.")
							});
				},
				
				rejectFriend : function(friend, id) {
					console.log("--> FriendService : calling 'rejectFriend' method with id : "+id);
					return $http.put(BASE_URL+'/rejectFriend/'+id, friend).then(
							function(response) {
								return response.data;
							},
							function(errResponse) {
								console.error("-->FriendService : Error while unFriend existing friend.")
							});
				},
				
				unFriend : function(friend, id) {
					console.log("--> FriendService : calling 'unFriend' method with id : "+id);
					return $http.put(BASE_URL+'/unFriend/'+id, friend).then(
							function(response) {
								return response.data;
							},
							function(errResponse) {
								console.error("-->FriendService : Error while unFriend existing friend.")
							});
				}
			};
		}]);