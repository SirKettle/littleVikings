'use strict';

var angular = require('angular');

module.exports = angular.module('myApp.services.navigationService', [
])
.service('NavigationService', function (
) {
	return {
		getMainNavItems: function () {
			return [
				{
					title: 'Home',
					url: '/#/',
					path: '/'
				},
				// {
				// 	title: 'About',
				// 	url: '/#/about',
				// 	path: '/about'
				// },
				// {
				// 	title: 'Fees',
				// 	url: '/#/fees',
				// 	path: '/fees'
				// },
				// {
				// 	title: 'Policies',
				// 	url: '/#/policies',
				// 	path: '/policies'
				// },
				{
					title: 'Contact',
					url: '/#/contact',
					path: '/contact'
				}
			];
		}
	};
});
