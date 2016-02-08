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
	$sce,
	$scope,
	$routeParams,
	PolicyService
) {
	var PolicyDetail = this;

	PolicyDetail.getHtml = function () {
		return PolicyDetail.html && $sce.trustAsHtml(PolicyDetail.html);
	};

	PolicyDetail.key = $routeParams.key;
	PolicyDetail.html = PolicyService.getHtml(PolicyDetail.key);
});