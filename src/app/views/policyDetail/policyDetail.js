'use strict';

var angular = require('angular');
var template = require('./policyDetail.html');
// services
var policyService = require('../../services/policyService');

// sub components
var headerComponent = require('../../components/header/header');
var footerComponent = require('../../components/footer/footer');

module.exports = angular.module('myApp.views.policyDetail', [
	policyService.name,
	headerComponent.name,
	footerComponent.name
])
.directive('myViewPolicyDetail', function (
) {
	return {
		restrict: 'E',
		template: template,
		controller: 'MyViewPolicyDetailCtrl as PolicyDetail',
		replace: true,
		scope: {
			key: '='
		},
		link: function (scope, elem, attrs, controller) {
		}
	};
})
.controller('MyViewPolicyDetailCtrl', function (
	$location,
	$sce,
	$scope,
	$routeParams,
	PolicyService
) {
	var PolicyDetail = this;

	PolicyDetail.getHtml = function () {
		return PolicyDetail.data && $sce.trustAsHtml(PolicyDetail.data.html);
	};


	PolicyDetail.onPreviousClicked = function () {
		$location.path('policies/' + PolicyDetail.previous.key);
	};

	PolicyDetail.onNextClicked = function () {
		$location.path('policies/' + PolicyDetail.next.key);
	};

	PolicyDetail.key = $routeParams.key;
	PolicyDetail.data = PolicyService.getPolicy(PolicyDetail.key);
	PolicyDetail.previous = PolicyService.getPrevious(PolicyDetail.key);
	PolicyDetail.next = PolicyService.getNext(PolicyDetail.key);
});