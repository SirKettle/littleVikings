'use strict';

var angular = require('angular');

module.exports = angular.module('myApp.services.socialNetworksService', [
])
.service('SocialNetworksService', function (
	$q
) {
	return {

		getSocialNetworks: function () {
			var deferred = $q.defer();
			var networks = [
				{
					id: 'facebook',
					name: 'Facebook',
					url: 'https://facebook.com'
				}
			];
			
			deferred.resolve(networks);

			return deferred.promise;
		}
	};
});