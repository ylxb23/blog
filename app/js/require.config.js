requirejs.config({
	baseUrl: './js/',
	paths:{
		'$': 'jquery-2.1.4.min',
		'angular': 'angular.min',
		'my': 'script.min'
	}
});

requirejs(['$', 'angular', 'my'], function() {
	console.log('requirejs load successful...');
});