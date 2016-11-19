var app = angular.module('myApp', [ 'ngRoute', 'ngCookies' ]);

app.config(function($routeProvider) {

	$routeProvider

	/**
	 * Home page mapping
	 */
	.when('/', {
		templateUrl : 'b_home/home.html',
		controller : 'HomeController as ctrl'
	})

	/**
	 * User login and register mapping
	 */

	.when('/login', {
		templateUrl : 'b_user/login.html',
		controller : 'UserController as ctrl'
	})

	.when('/register', {
		templateUrl : 'b_user/register.html',
		controller : 'UserController as ctrl'
	})

	/**
	 * Blog related mapping
	 */

	.when('/create_blog', {
		templateUrl : 'b_blog/create_blog.html',
		controller : 'BlogController as ctrl'
	})

	.when('/list_blog', {
		templateUrl : 'b_blog/list_blogs.html',
		controller : 'BlogController as ctrl'
	})

	.when('/view_blog', {
		templateUrl : 'b_blog/view_blog.html',
		controller : 'BlogController as ctrl'
	})

	/**
	 * Forum related mapping
	 */

	.when('/create_forum', {
		templateUrl : 'b_forum/create_forum.html',
		controller : 'ForumController as ctrl'
	})

	.when('/list_forum', {
		templateUrl : 'b_forum/list_forums.html',
		controller : 'ForumController as ctrl'
	})

	.when('/view_forum', {
		templateUrl : 'b_forum/view_forum.html',
		controller : 'ForumController as ctrl'
	})

	/**
	 * Friend related mapping
	 */

	.when('/search_friend', {
		templateUrl : 'b_friend/search_friend.html',
		controller : 'FriendController as ctrl'
	})

	.when('/new_request_list', {
		templateUrl : 'b_friend/new_request_list.html',
		controller : 'FriendController as ctrl'
	})

	.when('/view_friend', {
		templateUrl : 'b_friend/view_friend.html',
		controller : 'FriendController as ctrl'
	})

	/**
	 * Job related mapping
	 */

	.when('/post_job', {
		templateUrl : 'b_job/post_job.html',
		controller : 'JobController as ctrl'
	})

	.when('/search_job', {
		templateUrl : 'b_job/search_job.html',
		controller : 'JobController as ctrl'
	})

	.when('/view_applied_jobs', {
		templateUrl : 'b_job/view_applied_jobs.html',
		controller : 'JobController as ctrl'
	})

	.when('/view_job_details', {
		templateUrl : 'b_job/view_job_details.html',
		controller : 'JobController as ctrl'
	})

	/**
	 * About related mapping
	 */

	.when('/about', {
		templateUrl : 'b_about/about.html',
		controller : 'AboutController as ctrl'
	})

	/**
	 * Chat related mapping
	 */
	.when('/chat', {
		templateUrl : 'b_chat/chat.html',
		controller : 'ChatController'
	})

	/**
	 * Event related mapping
	 */
	.when('/list_event', {
		templateUrl : 'b_event/list_events.html',
		controller : 'EventController as ctrl'
	})

	.when('/create_event', {
		templateUrl : 'b_event/create_event.html',
		controller : 'EventController as ctrl'
	})
	
	.when('/view_event', {
		templateUrl : 'b_event/view_event.html',
		controller : 'EventController as ctrl'
	})
	
	/**
	 * If anything goes wrong then this mapping will handle the request...
	 */

	.otherwise({
		redirectTo : '/'
	});
});
app.run(function($rootScope, $location, $cookieStore, $http) {
	console.log("--> app : entered app.run");

	$rootScope.$on('$locationChangeStart', function(event, next, current) {
		console.log("--> $rootScope.$on <--");
		// redirect to login page if try to access a restricted page
		var restrictedPage = $.inArray($location.path(), [ '/', 
		                                                   '/login', 
		                                                   '/logout', 
		                                                   '/register', 
		                                                   '/list_blog', 
		                                                   '/view_blog', 
		                                                   '/about', 
		                                                   '/list_event',
		                                                   '/view_event', 
		                                                   '/list_forum', 
		                                                   '/view_forum', 
		                                                   '/search_job', 
		                                                   '/view_job_details',
		                                                   '/chat']) === -1;

		console.log("restrictedPage : " + restrictedPage);
		var loggedIn = $rootScope.currentUser.id;

		console.log("loggedIn : " + loggedIn);
		if (restrictedPage && !loggedIn) {
			console.log("Navigating to login page.");
			$location.path('/login');
		}
	});

	// keep user logged in after page refresh...
	/*
	 * $rootScope.currentUser = $cookieStore.get('currentUser') || {}; if
	 * ($rootScope.currentUser) { $http.defaults.header.common['Authorization'] =
	 * 'Basic' + $rootScope.currentUser; }
	 */
});
