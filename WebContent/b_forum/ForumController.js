'use strict';

app.controller('ForumController', [
		'$scope',
		'ForumService',
		'$location',
		'$rootScope',
		function($scope, ForumService, $location, $rootScope) {
			console.log("ForumController...")

			var self = this;
			self.forum = {
				id : '',
				description : '',
				post_date : '',
				userId : '',
				errorCode : '',
				errorMessage : ''
			}
			self.forums = [];
			
			self.forumComment = {
				id : '',
				forumId : '',
				comment : '',
				userId : '',
				commentDate : '',
				errorCode : '',
				errorMessage : ''
			}			
			self.forumComments = [];

			self.getSelectedForum = function(id) {
				console.log("-->ForumController : calling getSelectedForum method with id : " + id);
				ForumService.getSelectedForum(id).then(function(d) {
					self.forum = d;
					
					console.log("test  "+d);
					$location.path('/view_forum');
				}, function(errResponse) {
					console.error('Error while fetching Forum...');
				});
			};

			self.fetchAllForums = function() {
				console.log("-->ForumController : calling fetchAllForums method.");
				ForumService.fetchAllForums().then(function(d) {
					self.forums = d;
				}, function(errResponse) {
					console.error('Error while fetching Forums...');
				});
			};
			
			self.fetchAllForums();
			
			self.fetchAllForumComments = function() {
				console.log("-->ForumController : calling fetchAllForumComments method.");
				ForumService.fetchAllForumComments().then(function(d) {
					self.forumComments = d;
				}, function(errResponse) {
					console.error('Error while fetching ForumComments...');
				});
			};
			
			self.fetchAllForumComments();

			self.createForum = function(forum) {
				console.log("-->ForumController : calling createForum method.");
				ForumService.createForum(forum).then(function(d) {
					self.forum = d;
					alert('Forum Created Successfully...')
				},
						function(errResponse) {
							console.error('Error while creating forum...');
						});
			};
			
			self.createForumComment = function(forumComment) {
				console.log("-->ForumController : calling createForumComment method.");
				ForumService.createForumComment(forumComment).then(function(d) {
					self.forumComment = d;
				},
						function(errResponse) {
							console.error('Error while creating forumComment...');
						});
			};

			self.updateForum = function(forum, id) {
				console.log("-->ForumController : calling updateForum method.");
				ForumService.updateForum(forum).then(self.fetchAllForums,
						function(errResponse) {
							console.error('Error while updating forum...')
						});
			};

			self.deleteForum = function(id) {
				console.log("-->ForumController : calling deleteForum method.");
				ForumService.deleteForum(id).then(self.fetchAllForums,
						function(errResponse) {
							console.error('Error while deleting forum...')
						});
			};

	/*****************************************************************************/
			
			self.submit = function() {
				{
					console.log("-->ForumController : calling submit() method.", self.forum);
					self.createForum(self.forum);
					console.log('Saving new Forum', self.forum);
				}
				self.reset();
			};
			
			self.comment = function() {
				{
					console.log("-->ForumController : calling comment() method.", self.forumComment);
					self.createForumComment(self.forumComment);
					console.log("Saving new Comment", self.forumComment);
				}
				self.resetComment();
			}

			self.edit = function(id) {
				console.log('id to be edited', id);
				for (var i = 0; i < self.forums.length; i++) {
					if (self.forums[i].id === id) {
						self.forum = angular.copy(self.forums[i]);
						break;
					}
				}
			};
			
			/*self.isMatch = function() {
				console.log("isMatch method calling...");
				for(var j = 0; j < self.forums.length; j++){
					for(var k = 0; k < self.forumComments.length; k++){
						if(self.forums[j].id === self.forumComments[k].forumId){
							return self.forumComment;
						}
						else {
							return null;
						}						
					}					
				}
			},*/

			self.remove = function(id) {
				console.log('id to be deleted', id);
				if (self.forum.id === id) {
					self.reset();
				}
				self.deleteForum(id);
			};

			self.reset = function() {
				console.log('submit a new Forum', self.forum);
				self.forum = {
						id : '',
						description : '',
						post_date : '',
						userId : '',
						errorCode : '',
						errorMessage : ''
				};
				$scope.myForm.$setPristine(); // reset form...
			};
			
			self.resetComment = function() {
				console.log('submit a new ForumComment', self.forumComment);
				self.forumComment = {
						id : '',
						forumId : '',
						comment : '',
						userId : '',
						commentDate : '',
						errorCode : '',
						errorMessage : ''
					};
				$scope.myForm.$setPristine(); // reset form...
			};
		} ]);