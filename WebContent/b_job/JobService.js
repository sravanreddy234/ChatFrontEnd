'use strict';

app.factory('JobService', ['$http', '$q', '$rootScope',
    function($http, $q, $rootScope) {
	console.log("JobService...");

		var BASE_URL='http://localhost:8081/Binder'
			return {

			listJobs : function() {
				console.log("-->JobService : calling 'listJobs' method.");
				return $http
							.get(BASE_URL+'/jobs')
							.then(function(response) {
								return response.data;
							},
							function(errResponse) {
								console.error('Error while getting Job list...');
								return $q.reject(errResponse);
							});
			},
			
			createJob : function(job) {
				console.log("-->JobService : calling 'createJob' method.");
				return $http
							.post(BASE_URL+'/job/', job)
							.then(function(response) {
								return response.data;
							},
							function(errResponse) {
								console.error('Error while posting new Job...');
								return $q.reject(errResponse);
							});
			},
			
			updateJob : function(job, id) {
				console.log("-->JobService : calling 'updateJob' method.");
				return $http
							.put(BASE_URL+'/job/'+id)
							.then(function(response) {
								return response.data;
							},
							function(errResponse) {
								console.error("Error while updating job.");
								return $q.reject(errResponse);
							});
			},

			getJob : function(id) {
				console.log("-->JobService : calling 'getJob' method with id : "+id);
				return $http
							.get(BASE_URL+'/job/'+id)
							.then(function(response) {
								$rootScope.selectedJob = response.data;
								return response.data;
							},
							function(errResponse) {
								console.error('Error while getting job details');
								return $q.reject(errResponse);
							});
			},
			
			listJobApplications : function() {
				console.log("-->JobService : calling 'listJobApplications' method");
				return $http
							.get(BASE_URL+'/jobApplications')
							.then(function(response) {
								return response.data;
							},
							function(errResponse) {
								console.error('Error while getting JobApplication list...');
								return $q.reject(errResponse);
							});
			},

			getMyAppliedJobs : function() {
				console.log("-->JobService : calling 'getMyAppliedJobs' method");
				return $http
							.get(BASE_URL+'/getMyAppliedJobs')
							.then(function(response) {
								$rootScope.getAppliedJob = response.data;
								return response.data;
							},
							function(errResponse) {
								console.error('Error while getting all applied jobs...');
								return $q.reject(errResponse);
							});
			},

			callForInterview : function(jobApplication, userId, jobId) {
				console.log("-->JobService : calling 'callForInterview' method with userId : "+userId+" jobId : "+jobId);
				return $http
							.put(BASE_URL+'/callForInterview/'+userId+'/'+jobId)
							.then(function(response) {
								return response.data;
							},
							function(errResponse) {
								console.error('Error while updating Job Application...');
								return $q.reject(errResponse);
							});
			},

			rejectJobApplication : function(jobApplication, userId, jobId) {
				console.log("-->JobService : calling 'rejectJobApplication' method with userId : "+userId+" jobId : "+jobId);
				return $http
							.put(BASE_URL+'/rejectJobApplication/'+userId+'/'+jobId)
							.then(function(response) {
								return response.data;
							},
							function(errResponse) {
								console.error('Error while updating Job Application...');
								return $q.reject(errResponse);
							});
			},
			
			listVacantJobs : function() {
				console.log("-->JobService : calling 'listVacantJobs' method.");
				return $http
							.get(BASE_URL+'/listVacantJobs')
							.then(function(response) {
								return response.data;
							},
							function(errResponse) {
								console.error("Error while getting all vacant jobs.");
								return $q.reject(errResponse);
							});
			},

			applyForJob : function(job) {
				console.log("-->JobService : calling 'applyForJob' method.", self.job);
				return $http
							.post(BASE_URL+'/jobApplied', job)
							.then(function(response) {
								return response.data;
							},
							function(errResponse) {
								console.error('Error while applying for Job...');
								return $q.reject(errResponse);
							});
			}
		};
}]);