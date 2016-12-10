'use strict';

app.controller('FriendController', [ 'FriendService', 
                                     'UserService', 
                                     '$scope',	
                                     '$location', 
                                     '$rootScope',
		function(FriendService, UserService, $scope, $location, $rootScope) {
			console.log("FriendController...");

			var self = this;
			self.friend = {
				id : '',
				userId : '',
				friendId : '',
				status : ''
			};
			self.friends = [];

			self.user = {
				errorCode : '',
				errorMessage : '',
				id : '',
				name : '',
				password : '',
				gender : '',
				email : '',
				phone : '',
				role : '',
				isOnline : '',
				image : '',
				photos : ''
			};
			self.users = [];
			
			self.fetchAllUsers = function() {
				console.log("--> FriendController : calling 'fetchAllUsers' method.");
				UserService
							.searchForFriends()
							.then(function(d) {
								self.users = d;
							},
							function(errResponse) {
								console.error("Error while fetching users.");
							});
			};
			self.fetchAllUsers();

			self.getMyFriends = function() {
				console.log("--> FriendController : calling 'getMyFriends' method.");
				FriendService
								.getMyFriends()
								.then(function(d) {
									self.friends = d;
									console.log("Got the Friendlist.");
								},
								function(errResponse) {
									console.error("Error while fetching Friends.");
								});
			};
			self.getMyFriends();
			
			self.getNewFriendRequests = function() {
				console.log("--> FriendController : calling 'getNewFriendRequests' method");
				FriendService
								.getNewFriendRequests()
								.then(function(d) {
									self.friends = d;
									console.log("Got my new friend requests");
								},
								function(errResponse) {
									console.log("Error while fetching new friend requests.");
								});
			};
			self.getNewFriendRequests();
			
			self.getSelectedFriend = function(id) {
				console.log("--> FriendController : calling 'getSelectedFriend' method with id : " +id);
				FriendService
								.getSelectedFriend(id)
								.then(function(d) {
									self.friend = d;
									$location.path('/view_friend');
								},
								function(errResponse) {
									console.log("Error while fetching Friend for id : " + id);
								});
			};
			
			self.sendFriendRequest = function(friendId) {
				console.log("--> FriendController : calling 'sendFriendRequest' method with friendId : " + friendId);
				FriendService
								.sendFriendRequest(friendId)
								.then(function(d) {
									self.friend = d;
									alert("Friend request sent successfully...")
									self.fetchAllUsers();									
								},
								function(errResponse) {
									console.error("Error while fetching friends.");
								});
			};
			
			self.acceptFriend = function(friend, id) {
				console.log("--> FriendController : calling 'acceptFriend' method with id : "+id);
				console.log("--> FriendController",self.friend);
				FriendService
								.acceptFriend(friend, id)
								.then(function(d) {
									self.friend = d;
									alert('friend accepted...');
									self.getNewFriendRequests();
								},
								function(errResponse) {
									console.error("Error while updating friend.");
								});
			};
			
			self.rejectFriend = function(friend, id) {
				console.log("--> FriendController : calling 'rejectFriend' method with id : "+id);
				console.log("--> FriendController",self.friend);
				FriendService
								.rejectFriend(friend, id)
								.then(function(d) {
									self.friend = d;
									alert('friend request rejected successfully...');
									self.getNewFriendRequests();
								},
								function(errResponse) {
									console.error("Error while updating friend.");
								});
			};
			
			self.unFriend = function(friend, id) {
				console.log("--> FriendController : calling 'unFriend' method with id : "+id);
				console.log("--> FriendController",self.friend);
				FriendService
								.unFriend(friend, id)
								.then(function(d) {
									self.friend = d;
									self.getMyFriends();
								},
								function(errResponse) {
									console.error("Error while updating friend.");
								});
			};			
			
		}]);