'use strict';

var angular = require('angular');
var $ = require('jquery');

module.exports = angular.module('myApp.filters', [

])
.filter('myInitials', function () {
	
	return function (model) {

		var initials = '';

		if (model && model.name) {
			model.name.split(/ |-/).forEach(function (word) {
				initials = initials + word.charAt(0).toUpperCase();
			});
		}

		return initials;

	};
})
.filter('myArrayPage', function () {

	return function (arrayList, args) {
		var pageNo = args.page || 1;
		var pageCount = args.pages || 1;
		var pagedList = [];
		var itemsPerPage = Math.ceil(arrayList.length/pageCount);

		while (pageCount > 0) {
			pageCount--;
			pagedList.push(new Array());
		}

		arrayList.forEach(function (item, index) {
			var pageIndex = Math.floor(index/itemsPerPage);
			pagedList[pageIndex].push(item);
		});

		return pagedList[pageNo - 1];
	};
});