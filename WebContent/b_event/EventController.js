'use strict';

app.controller('EventController', [ 
        '$scope', 
        'EventService', 
        '$location',
		'$rootScope',
		function($scope, EventService, $location, $rootScope) {
			console.log("EventController...")
			
			var self = this;
			self.event = {
					id : '',
					name : '',
					venue : '',
					description : '',
					date : ''
			}
			self.events = [];
			
			self.fetchAllEvents = function() {
				console.log("-->EventController : calling 'fetchAllEvents' method.");
				EventService.fetchAllEvents().then(
						function(d) {
							self.events = d;
						},
						function(errResponse) {
							console.error("Error while fetching Events...")
						});
			};
			
			self.fetchAllEvents();
			
			self.getSelectedEvent = function(id) {
				console.log("-->EventController : calling 'getSelectedEvent' method with id : "+id);
				EventService.getSelectedEvent(id).then(
						function(d) {
							self.event = d;
							$location.path('/view_event');
						},
						function(errResponse) {
							console.error("Error while fetching Event.");
						});
			};
			
			self.createEvent = function(event) {
				console.log("-->EventController : calling createEvent method.");
				EventService.createEvent(event).then(
						function(d) {
							self.events = d;
							alert('Event Created Successfully...')
						},
						function(errResponse) {
							console.error('Error while creating event...');
						});
			};
			
			self.updateEvent = function(event, id) {
				console.log("-->EventController : calling 'updateEvent' method with id : "+id);
				EventService.updateEvent(event, id).then(
						self.fetchAllEvents,
						function(errResponse) {
							console.error("Error while updating Event.");
						});
			};
			
			self.deleteEvent = function(id) {
				console.log("-->EventController : calling 'deleteEvent' method with id : "+id);
				BlogService.deleteEvent(id).then(
						self.fetchAllEvents,
						function(errResponse) {
							console.error("Error while deleting event.");
						});
			};
			
	/**************************************************************************/
			
			self.submit = function() {
				{
					console.log("-->EventController : calling 'submit' method.", self.event);
					self.createEvent(self.event);
					console.log("Saving new event", self.event);
				}
				self.reset();
			};
			
			self.edit = function(id) {
				console.log("id to be edited : "+id);
				for(var i = 0; i < self.events.length; i++) {
					if(self.events[i].id === id) {
						self.event = angular.copy(self.events[i]);
						break;
					}
				}
			};
			
			self.remove = function(id) {
				console.log("id to be deleted : "+id);
				if (self.event.id === id) {
					self.reset();
				}
				self.deleteEvent(id);
			};
			
			self.reset = function() {
				console.log('submit a new Event', self.event);
				self.event = {
						id : '',
						name : '',
						venue : '',
						description : '',
						date : ''
				};
				$scope.myForm.$setPristine(); // reset form...
			};
			
		}]);