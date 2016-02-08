'use strict';

var angular = require('angular');
var policies = {
	accidents_incidents_and_emergencies: {
		title: 'Accident/Incident and Emergencies Policy',
		html: require('../html/policy/accidents_incidents_and_emergencies.html')
	},
	bullying: {
		title: 'Bullying Policy',
		html: require('../html/policy/bullying.html')
	},
	asthma: {
		title: 'Asthma Policy',
		html: require('../html/policy/asthma.html')
	},
	admissions: {
		title: 'Admissions Policy',
		html: require('../html/policy/admissions.html')
	},
	alcohol_and_drugs: {
		title: 'Alcohol and Drugs Policy',
		html: require('../html/policy/alcohol_and_drugs.html')
	},
	care_learning_and_play: {
		title: 'Care, Learning and Play Policy',
		html: require('../html/policy/care_learning_and_play.html')
	},
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
			}).sort(function (a, b) {
				return a.title > b.title ? 1 : -1;
			});
		},
		getPolicy: function (key) {
			return angular.extend({
				key: key
			}, policies[key]);
		},
		getHtml: function (key) {
			return policies[key] && policies[key].html;
		}
	};
});
