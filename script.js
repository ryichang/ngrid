//Angular Module, declare dependency on ngResource module, Instagram API
var app = angular.module("switchableGrid", ['ngResource']);

// Create and register the new "instagram" service
app.factory('instagram', function($resource){

	return {
		fetchPopular: function(callback){

			// The ngResource module $resource service.

			var api = $resource('https://api.instagram.com/v1/media/popular?client_id=:client_id&callback=JSON_CALLBACK',{
				client_id: '642176ece1e7445e99244cec26f4de1f'
			},{
				// action which name "fetch". It issues
				// an JSONP request to the URL of the resource. JSONP requires that the
				// callback=JSON_CALLBACK part is added to the URL.

				fetch:{method:'JSONP'}
			});

			api.fetch(function(response){

				// Call the supplied callback function
				callback(response.data);

			});
		}
	}

});

// The controller, include instagram service 

function SwitchableGridController($scope, instagram){

	// Default layout of the app. Clicking the buttons in the toolbar
	// changes this value.

	$scope.layout = 'grid';

	$scope.pics = [];

	// Use the instagram service and fetch a list of the popular pics
	instagram.fetchPopular(function(data){

		// Assigning the pics array will cause the view
		// to be automatically redrawn by Angular.
		$scope.pics = data;
	});

}
