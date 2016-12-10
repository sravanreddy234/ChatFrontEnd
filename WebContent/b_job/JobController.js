'use strict'

app.controller('JobController', ['JobService', '$scope', '$location', '$rootScope',
	function(JobService, $scope, $location, $rootScope) {
		console.log('JobController...');

		var self = this;
		self.job = {
			id : '', 
			companyName : '', 
			location : '', 
			description : '',
			date : '', 
			status : '', 
			noOfApplicants : '',
			errorCode : '',
			errorMessage : ''
		};

		self.jobs = [];
		
		self.jobApplication = {
				id : '',
				userId : '',
				jobId : '',
				status : '',
				remarks : ''
		};
		
		self.jobApplications = [];
		
		self.listJobs = function() {
			console.log("-->JobController : calling 'listJobs' method.");
			JobService
						.listJobs()
						.then(function(d) {
							self.jobs = d;
						},
						function(errResponse) {
							console.error("Error while getting job list.")
						});
		};		
		self.listJobs();
		
		self.createJob = function(job) {
			console.log("-->JobController : calling 'createJob' method.");
			JobService
						.createJob(job)
						.then(function(d) {
							self.jobs = d;
							alert('Job posted successfully...')
						},
						function(errResponse) {
							console.error('Error while posting new Job...');
						});
		};
		
		self.updateJob = function(job, id) {
			console.log("-->JobController : calling 'updateJob' method with id : "+id);
			JobService
						.updateJob(job, id)
						.then(self.listJobs,
						function(errResponse) {
							console.error("Error while updating job.")
						});
		};
		
		self.getJob = function(id) {
			console.log("-->JobController : calling 'getJob' method with id : "+id);
			JobService
						.getJob(id)
						.then(function(d) {
							self.job = d;
							$location.path('/view_job_details');
						},
						function(errResponse) {
							console.error('Error while fetching job details...')
						});
		};
		
		self.listJobApplications = function() {
			console.log("-->JobController : calling 'listJobApplications' method.");
			JobService
						.listJobApplications()
						.then(function(d) {
							self.jobApplications = d;
						},
						function(errResponse) {
							console.error("Error while getting jobApplication list.")
						});
		};
		
		self.listJobApplications();

		self.getMyAppliedJobs = function() {
			console.log("-->JobController : calling 'getMyAppliedJobs' method.");
			JobService
						.getMyAppliedJobs()
						.then(self.listJobApplications,
						function(errResponse) {
							console.error('Error while fetching all applied jobs...');
						});
		};
		self.getMyAppliedJobs();

		self.callForInterview = function(jobApplication, userId, jobId) {
			console.log("-->JobController : calling 'callForInterview' method with userId : "+ userId +" and jobId : "+ jobId);
			//var jobId = $rootScope.selectedJob.id;
			JobService
						.callForInterview(jobApplication, userId, jobId)
						.then(function(d) {
							self.jobApplication = d;
							alert('Application status changed as C(CallForInterview)...')
						},
						function(errResponse) {
							console.error('Error while changing the status...')
						});
		};

		self.rejectJobApplication = function(jobApplication, userId, jobId) {
			console.log("-->JobController : calling 'rejectJobApplication' method with userId : "+userId+" and jobId : "+jobId);
			//var jobId = $rootScope.selectedJob.id;
			JobService
						.rejectJobApplication(jobApplication, userId, jobId)
						.then(function(d) {
							self.jobApplication = d;
							alert('Application status changed as R(Reject)...')
						},
						function(errResponse) {
							console.error("Error while changing the status...");
						});
		};
		
		self.listVacantJobs = function() {
			console.log("-->JobController : calling 'listVacantJobs' method.");
			JobService
						.listVacantJobs()
						.then(self.listJobs,
						function(errResponse) {
							console.log("Error while getting list of vacant jobs.");
						});
		};

		self.applyForJob = function(job) {
			console.log("-->JobController : calling 'applyForJob' method.");
			var currentUser = $rootScope.currentUser
			if (typeof currentUser == 'undefined') {
				alert("Please Login to apply for a Job...")
				console.log('User not logged in , can not apply for job...');
				$location.path('/login');
			};
			JobService
						.applyForJob(job)
						.then(function(d) {
							self.jobApplication = d;
							alert("You have successfully applied for the job...");
							self.listJobs();
							console.log("-->JObController : ", self.jobApplication);
							console.log("-->JObController : ", self.job);
						},
						function(errResponse) {
							console.error('Error while applying for job...')
						});

		};
	
		/*****************************************************************************/
		
		self.submit = function() {
			{
				console.log("-->JobController : calling 'submit()' method.", self.job);
				self.createJob(self.job);
				console.log('Saving new Job', self.job);
			}
			self.reset();
		};
		
		self.apply = function() {
			console.log("-->JobController : calling 'apply()' method.", self.job);
			self.applyForJob(job);
			console.log('Job applied successfully...', job);
		};
		
		self.reset = function() {
			console.log('submit a new job', self.job);
			self.job = {
					id : '', 
					companyName : '', 
					location : '', 
					description : '',
					date : '', 
					status : '', 
					noOfApplicants : '',
					errorCode : '', 
					errorMessage : ''
			};
			$scope.myForm.$setPristine();	//reset form...
		};

	}]);