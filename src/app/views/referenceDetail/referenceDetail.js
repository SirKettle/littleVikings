'use strict';

var angular = require('angular');
var template = require('./referenceDetail.html');
// services
var referenceService = require('../../services/referenceService');

// sub components
var headerComponent = require('../../components/header/header');
var footerComponent = require('../../components/footer/footer');

module.exports = angular.module('myApp.views.referenceDetail', [
	referenceService.name,
	headerComponent.name,
	footerComponent.name
])
.directive('myViewReferenceDetail', function (
) {
	return {
		restrict: 'E',
		template: template,
		controller: 'MyViewReferenceDetailCtrl as ReferenceDetail',
		replace: true,
		scope: {
			key: '='
		},
		link: function (scope, elem, attrs, controller) {
		}
	};
})
.controller('MyViewReferenceDetailCtrl', function (
	$location,
	$sce,
	$scope,
	$routeParams,
	ReferenceService
) {
	var ReferenceDetail = this;

	function _initialise () {
		ReferenceDetail.key = $routeParams.key;
		_getDetails(ReferenceDetail.key);
		_getNext(ReferenceDetail.key);
		_getPrevious(ReferenceDetail.key);
	}

	function _getDetails (id) {
		return ReferenceService.get(id)
			.then(function (data) {
				ReferenceDetail.model = data;
			})
			.catch(function (err) {
				console.warn('get error', id, err);
			});
	}

	function _getNext (id) {
		return ReferenceService.getNext(id)
			.then(function (data) {
				ReferenceDetail.next = data;
			})
			.catch(function (err) {
				console.warn('get next error', id, err);
			});
	}

	function _getPrevious (id) {
		return ReferenceService.getPrevious(id)
			.then(function (data) {
				ReferenceDetail.previous = data;
			})
			.catch(function (err) {
				console.warn('get previous error', id, err);
			});
	}

	ReferenceDetail.getTestimonialHtml = function () {
		var testimonial = ReferenceDetail.model && ReferenceDetail.model.testimonial;

		if (!testimonial) {
			return null;
		}

		return $sce.trustAsHtml(testimonial.quoteHtml);
	};

	ReferenceDetail.onPreviousClicked = function () {
		$location.path('reference/' + ReferenceDetail.previous.id);
	};

	ReferenceDetail.onNextClicked = function () {
		$location.path('reference/' + ReferenceDetail.next.id);
	};

	_initialise();
});