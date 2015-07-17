'use strict';

var angular = require('angular');

module.exports = angular.module('myApp.filters.yearsOld', [
])
.constant('YEAR_MILLISECONDS', 31556925216)
.filter('myYearsOld', function (
	YEAR_MILLISECONDS
) {

	function isValidDate(d) {
		if (Object.prototype.toString.call(d) !== '[object Date]') {
			return false;
		}
		return !isNaN(d.getTime());
	}

	return function (dateString) {
		var birthDate;

		if (!dateString) {
			window.console.warn('No date string passed in');
			return;
		}

		birthDate = new Date(dateString);

		if (!isValidDate(birthDate)) {
			window.console.warn('Invalid date string passed in', dateString);
			return;
		}

		return Math.floor((Date.now() - birthDate.getTime()) / YEAR_MILLISECONDS);

	};
});