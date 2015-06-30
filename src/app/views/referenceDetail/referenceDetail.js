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
	$sce,
	$scope,
	$routeParams,
	ReferenceService
) {
	var ReferenceDetail = this;

	ReferenceDetail.getTestimonialHtml = function () {
		var testimonial = ReferenceDetail.model && ReferenceDetail.model.testimonial;

		if (!testimonial) {
			return null;
		}

		return $sce.trustAsHtml(testimonial.fullHtml);
	};

	ReferenceDetail.getDetails = function (id) {
		return ReferenceService.get(id)
			.then(function (data) {
				ReferenceDetail.model = data;
			})
			.catch(function (err) {
				console.warn('getDetails error', id, err);
			});
	};

	ReferenceDetail.key = $routeParams.key;
	ReferenceDetail.getDetails(ReferenceDetail.key);
});