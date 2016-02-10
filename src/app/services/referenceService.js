'use strict';

var angular = require('angular');
var dataService = require('./dataService');

module.exports = angular.module('myApp.services.referenceService', [
	dataService.name
])
.service('ReferenceService', function (
	$q,
	$rootScope,
	DataService
) {

	var mURL = DataService.apiRoot() + 'reference';

	var _validateResponse = function (deferred, data, method) {
		// validation
		if (angular.isObject(data)) {
			DataService.resolve(deferred, data);
		}
		else {
			DataService.reject(deferred, {
				message: 'invalid data',
				data: data
			});
		}
	};

	return {
		get: function (key) {
			var deferred = $q.defer();

			DataService.get(mURL + '/' + key)
				.then(function (data) {
					_validateResponse(deferred, data, 'get');
				})
				.catch(function (err) {
					DataService.reject(deferred, err);
				});

			return deferred.promise;
		},
		getAll: function (params) {
			var deferred = $q.defer();

			DataService.get(mURL, params)
				.then(function (data) {
					_validateResponse(deferred, data, 'getAll');
				})
				.catch(function (err) {
					DataService.reject(deferred, err);
				});

			return deferred.promise;

		},
		create: function (data) {
			var deferred = $q.defer();

			// TODO: validate data before publishing

			DataService.create(mURL, data)
				.then(function (data) {
					_validateResponse(deferred, data, 'create');
				})
				.catch(function (err) {
					DataService.reject(deferred, err);
				});

			return deferred.promise;
		},
		update: function (key, data) {
			var deferred = $q.defer();

			// TODO: validate data before publishing

			DataService.update(mURL + '/' + key, data)
				.then(function (data) {
					_validateResponse(deferred, data, 'update');
				})
				.catch(function (err) {
					DataService.reject(deferred, err);
				});

			return deferred.promise;
		},
		delete: function (key) {
			var deferred = $q.defer();

			DataService.delete(mURL + '/' + key)
				.then(function (data) {
					_validateResponse(deferred, data, 'delete');
				})
				.catch(function (err) {
					DataService.reject(deferred, err);
				});

			return deferred.promise;
		},
		getNext: function (key) {
			var self = this;
			var deferred = $q.defer();
			
			self.get(key)
				.then(function (current) {
					self.getAll()
						.then(function (references) {
							var currentIndex;

							references.some(function (ref, index) {
								var isMatch = ref.id === current.id;
								if (isMatch) {
									currentIndex = index;
								}

								return isMatch
							});

							if (typeof currentIndex === 'undefined') {
								DataService.reject(deferred, 'no current index!');
								return;
							}

							var nextIndex = currentIndex + 1;

							if (!references[nextIndex]) {
								nextIndex = 0;
							}

							_validateResponse(deferred, references[nextIndex], 'getNext');
						})
						.catch(function (err) {
							DataService.reject(deferred, err);
						});
				})
				.catch(function (err) {
					DataService.reject(deferred, err);
				});

			return deferred.promise;
		}
	};
});
