var app = angular.module('myApp', [ 'ngRoute', 'ngCookies' ]);		//we need to include 'ngRoute' and 'ngCookies' as dependency in the application module.

app.config(function($routeProvider) {		//We can use config() block to inject only providers and constants in our AngularJS application.
										//The providers basically create new instances, but only once for each provider.
	$routeProvider				//With the $routeProvider we can define what page to display when a user clicks a link.

	/**
	 * Home page mapping
	 */
	.when('/', {							//when(path, route) where path is string type and route is object type
		templateUrl : 'b_home/home.html',			//'templateUrl' is used to specify the path of the view file that will load 
		controller : 'HomeController as ctrl'		//'controller' is used to specify the particular controller for this 'path' or view.
	})

	/**
	 * User login and register mapping
	 */

	.when('/login', {							//pathName  :  /login
		templateUrl : 'b_user/login.html',			//login.html will load when user wants to go to '/login' path.
		controller : 'UserController as ctrl'		//UserController will take control of '/login' path
	})

	.when('/register', {
		templateUrl : 'b_user/register.html',
		controller : 'UserController as ctrl'
	})
	
	.when('/myprofile', {
		templateUrl : 'b_user/myprofile.html',
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

	.otherwise({			//If none of the above link has been clicked, then 'otherwise' method get called.
		redirectTo : '/'		// otherwise method redirects to '/' path if path given in wrong way
	});
});
app.run(function($rootScope, $location, $cookieStore, $http) {		//run() block gives us facility to inject any instance and constants in our application.
	console.log("--> app : entered app.run");

	$rootScope.$on('$locationChangeStart', function(event, next, current) {		//The $locationChangeStart event can be used to prevent a location change going forward.
		console.log("--> $rootScope.$on <--");
		// redirect to login page if try to access any other page rather than the restricted pages
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
		                                                   '/chat',
		                                                   '/myprofile']) === -1;

		console.log("restrictedPage : " + restrictedPage);
		var loggedIn = $rootScope.currentUser.id;		//taking currentUser.id in $rootScope as 'loggedIn' so that we can use it throughout the session. 

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
