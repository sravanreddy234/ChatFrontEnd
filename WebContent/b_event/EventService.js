'use strict';

app.factory('EventService', [ '$http', '$q', '$rootScope',
		function($http, $q, $rootScope) {
			console.log("EventService...");

			var BASE_URL = 'http://localhost:8081/Binder'
			return {
				
				fetchAllEvents : function() {
					console.log("-->EventService : calling 'fetchAllEvents()' method.");
					return $http
								.get(BASE_URL+'/events')
								.then(function(response) {
									return response.data;
								},
								function(errResponse) {
									console.error("Error while fetching Events.");
									return $q.reject(errResponse);
								});
				},
				
				getSelectedEvent : function(id) {
					console.log("-->EventService : calling 'getSelectedEvent(id)' method with id : "+id);
					return $http
								.get(BASE_URL+'/event/'+id)
								.then(function(response) {
									$rootScope.selectedEvent = response.data;
									return response.data;
								},
								function(errResponse) {
									console.error("Error while fetching Event.");
									return $q.reject(errResponse);
								});
				},
				
				createEvent : function(event) {
					console.log("-->EventService : calling 'createEvent' method.");
					return $http
								.post(BASE_URL + '/event/', event)
								.then(function(response) {
									return response.data;
								}, 
								function(errResponse) {
									console.error('Error while creating event');
									return $q.reject(errResponse);
								});
				},
				
				updateEvent : function(event, id) {
					console.log("-->EventService : calling 'updateEvent(event, id)' method for id : "+id);
					return $http
								.put(BASE_URL+'/event/'+id)
								.then(function(response) {
									return response.data;
								},
								function(errResponse) {
									console.error("Error while updating Event.");
									return $q.reject(errResponse);
								});
				},
				
				deleteEvent : function(id) {
					console.log("-->EventService : calling 'deleteEvent(id)' method for id : "+id);
					return $http
								.delete(BASE_URL+'/event/'+id)
								.then(function(response) {
									return response.data;
								},
								function(errResponse) {
									console.error("Error while deleting Event.");
									return $q.reject(errResponse);
								});
				}
				
			};
		} ]);