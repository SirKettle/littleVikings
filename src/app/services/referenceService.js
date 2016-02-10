'use strict';

var angular = require('angular');
var dataService = require('./dataService');
var utils = require('./utils');

module.exports = angular.module('myApp.services.referenceService', [
	dataService.name
])
.service('ReferenceService', function (
	$q,
	$rootScope,
	DataService
) {
	function ReferenceService () {

		var mURL = DataService.apiRoot() + 'reference';
		var mCache = {
			get: {}
		};
		var self = this;

		function _validateResponse (deferred, data, method) {
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
		}

		function _defaultReferenceSort (a, b) {
			if (a.year === b.year) {
				return 0;
			}

			if (a.year > b.year) {
				return -1;
			}

			return 1;
		}

		function _getReferenceIndex (references, reference) {
			var referenceIndex;

			references.some(function (ref, index) {
					var isMatch = ref.id === reference.id;
					if (isMatch) {
						referenceIndex = index;
					}

					return isMatch;
				});

			return referenceIndex;
		}

		function _getAdjacent (key, isNext) {
			var deferred = $q.defer();
			var useCachedValues = true;
			
			isNext = Boolean(isNext) || false;

			self.get(key, useCachedValues)
				.then(function (current) {
					self.getAll(useCachedValues)
						.then(function (references) {
							var currentIndex;
							var adjacentIndex;

							currentIndex = _getReferenceIndex(references, current);

							if (typeof currentIndex === 'undefined') {
								DataService.reject(deferred, 'no current index!');
								return;
							}

							if (isNext) {
								adjacentIndex = utils.array.getNextIndex(references, currentIndex);
							}
							else {
								adjacentIndex = utils.array.getPreviousIndex(references, currentIndex);
							}

							_validateResponse(deferred, references[adjacentIndex], 'getNext');
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

		this.get = function (key, useCache) {
			var deferred = $q.defer();

			if (Boolean(useCache && mCache.get[key])) {
				_validateResponse(deferred, mCache.get[key], 'get');
			}

			DataService.get(mURL + '/' + key)
				.then(function (data) {
					self.getAll(useCache)
						.then(function (references) {
							var index = _getReferenceIndex(references, data);
							mCache.get[key] = angular.extend({
								info: {
									index: index,
									totalCount: references.length
								}
							}, data);

							_validateResponse(deferred, mCache.get[key], 'get');
						})
						.catch(function (err) {
							DataService.reject(deferred, err);
						});
				})
				.catch(function (err) {
					DataService.reject(deferred, err);
				});

			return deferred.promise;
		};

		this.getAll = function (useCache) {
			var deferred = $q.defer();

			if (Boolean(useCache && mCache.getAll)) {
				_validateResponse(deferred, mCache.getAll, 'getAll');
			}

			DataService.get(mURL)
				.then(function (data) {
					mCache.getAll = data.sort(_defaultReferenceSort);
					_validateResponse(deferred, mCache.getAll, 'getAll');
				})
				.catch(function (err) {
					DataService.reject(deferred, err);
				});

			return deferred.promise;

		};

		this.create = function (data) {
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
		};

		this.update = function (key, data) {
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
		};

		this.delete = function (key) {
			var deferred = $q.defer();

			DataService.delete(mURL + '/' + key)
				.then(function (data) {
					_validateResponse(deferred, data, 'delete');
				})
				.catch(function (err) {
					DataService.reject(deferred, err);
				});

			return deferred.promise;
		};

		this.getPrevious = function (key) {
			var isNext = false;
			return _getAdjacent(key, isNext);
		};

		this.getNext = function (key) {
			var isNext = true;
			return _getAdjacent(key, isNext);
		};

	}

	return new ReferenceService();
});
