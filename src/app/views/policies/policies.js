'use strict';

var angular = require('angular');
var template = require('./policies.html');
// services
var policyService = require('../../services/policyService');

// sub components
var headerComponent = require('../../components/header/header');
var footerComponent = require('../../components/footer/footer');



// directive name:
//		namespaceTypeName (examples: wtComponentAvatar or dinoViewDetail )
// 
// template use:
// <namespace:type-name></namespace:type-name> (examples: <wt:component-avatar></wt:component-avatar> or <dino:view-detail></dino:view-detail> )

module.exports = angular.module('myApp.views.policies', [
	policyService.name,
	headerComponent.name,
	footerComponent.name
])
.directive('myViewPolicies', function (
	$location,
	PolicyService
) {
	return {
		restrict: 'E',
		template: template,
		controller: 'MyViewPoliciesCtrl',
		replace: true,
		scope: {
		},
		link: function (scope, elem, attrs, controller) {
			scope.policies = PolicyService.getAvailablePolicies();

			scope._onLinkClicked = function (policy) {
				$location.path('policies/' + policy.key);
			};
		}
	};
})
.controller('MyViewPoliciesCtrl', function (
) {

});