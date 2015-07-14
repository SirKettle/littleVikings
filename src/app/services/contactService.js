'use strict';

var angular = require('angular');

module.exports = angular.module('myApp.services.contactService', [
])
.service('ContactService', function (
	$q
) {
	return {

		getSocialNetworks: function () {
			var deferred = $q.defer();
			var networks = [
				{
					id: 'facebook',
					name: 'Facebook',
					url: 'https://www.facebook.com/vicky.thirkettle'
				}
			];
			
			deferred.resolve(networks);

			return deferred.promise;
		},

		getContactDetails: function () {
			var deferred = $q.defer();
			var details = {
				name: 'Vicky',
				email: 'vickyl24@aol.com',
				telephone: '07886 035 561'
			};
			
			deferred.resolve(details);

			return deferred.promise;

		}
	};
});