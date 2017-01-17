var app = angular.module('app', [
	'ui.router',
	'ngDialog',
	'oc.lazyLoad',
])
.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider){
	$ocLazyLoadProvider.config({
		debug: false,
		events: true,
		modules: [
			{
				name: 'echarts',
				files: [
					'modules/echarts/echarts.simple.min.js',
					// 'modules/echarts/line.js'
				]
			}
		]
	});
}]);