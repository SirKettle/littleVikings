
'use strict';

var angular = require('angular');
var angularRoute = require('angular-route');

var filters = require('./filters');
var localisationService = require('./services/localisationService');
var analyticsService = require('./services/analyticsService');

var viewMain = require('./views/main/main');
var viewAbout = require('./views/about/about');
var viewFees = require('./views/fees/fees');
var viewPolicies = require('./views/policies/policies');
var viewPolicyDetail = require('./views/policyDetail/policyDetail');
var viewContact = require('./views/contact/contact');
var viewReferenceDetail = require('./views/referenceDetail/referenceDetail');

angularRoute;

angular.module('myApp', [
	filters.name,
	localisationService.name,
	analyticsService.name,
	viewMain.name,
	viewAbout.name,
	viewFees.name,
	viewPolicies.name,
	viewPolicyDetail.name,
	viewContact.name,
	viewReferenceDetail.name,
	'ngRoute'
])
.config(function (
	$routeProvider, $provide
) {
	// handle pages / routing
	$routeProvider
		.when('/', { template: '<my:view-main></my:view-main>' })
		// .when('/about', { template: '<my:view-about></my:view-about>' })
		// .when('/fees', { template: '<my:view-fees></my:view-fees>' })
		.when('/policies', { template: '<my:view-policies></my:view-policies>' })
		.when('/policies/:key', {
			template: function (params) {
				return '<my:view-policy-detail data-key="' + params.key + '"></my:view-policy-detail>';
			}
		})
		.when('/contact', { template: '<my:view-contact></my:view-contact>' })
		.when('/reference/:key', {
			template: function (params) {
				return '<my:view-reference-detail data-key="' + params.key + '"></my:view-reference-detail>';
			}
		})
		.otherwise({ redirectTo: '/' });

	// decorate the $q service with 'allSettled' which unlike 'all' resolves if a promise fails
	$provide.decorator('$q', function($delegate) {
		var $q = $delegate;
		$q.allSettled = function(promises) {
			return $q.all(promises.map(function(promise) {
				return promise.then(function(value) {
					return { state: 'fulfilled', value: value };
				}, function(reason) {
					return { state: 'rejected', reason: reason };
				});
			}));
		};
		return $q;
	});
})
.run(function (
	$filter,
	LocalisationService,
	AnalyticsService
) {
	LocalisationService.init('en-GB')
		.then(function () {
			var successMsg = $filter('localise')('myApp_localisationInitSuccess');
		})
		.catch(function (err) {
			console.error(err);
		});

	AnalyticsService.init();
});