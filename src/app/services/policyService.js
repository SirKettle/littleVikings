'use strict';

var angular = require('angular');
var policies = {
	asthma: {
		title: 'Asthma Policy',
		html: require('../html/policy/asthma.html')
	}
};

module.exports = angular.module('myApp.services.policyService', [])
.service('PolicyService', function (
	$q,
	$rootScope,
	DataService
) {
	return {
		getAvailablePolicies: function () {
			return Object.keys(policies).map(function (key) {
				return {
					key: key,
					title: policies[key].title
				};
			});
		},
		getHtml: function (key) {
			return policies[key] && policies[key].html;
		}
	};
});
