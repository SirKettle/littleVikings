'use strict';

var angular = require('angular');
var template = require('./referenceQuote.html');

module.exports = angular.module('myApp.components.referenceQuote', [
])
.directive('myReferenceQuote', function (
	$sce,
	$location
) {
	return {
		restrict: 'E',
		template: template,
		controller: 'MyReferenceQuoteCtrl as ReferenceQuote',
		replace: true,
		scope: {
			model: '='
		},
		link: function (scope, elem, attrs, controller) {

			scope._onLinkClicked = function () {
				$location.path('reference/' + scope.model.id);
			};

			scope._getQuoteHtml = function () {
				return $sce.trustAsHtml(scope.model && scope.model.testimonial && scope.model.testimonial.quoteHtml || '');
			};
		}
	};
})
.controller('MyReferenceQuoteCtrl', function (
) {
	var ReferenceQuote = this;
});