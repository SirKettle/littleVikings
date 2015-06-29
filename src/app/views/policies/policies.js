'use strict';

var angular = require('angular');
var template = require('./policies.html');
// services

// sub components
var headerComponent = require('../../components/header/header');
var footerComponent = require('../../components/footer/footer');



// directive name:
//		namespaceTypeName (examples: wtComponentAvatar or dinoViewDetail )
// 
// template use:
// <namespace:type-name></namespace:type-name> (examples: <wt:component-avatar></wt:component-avatar> or <dino:view-detail></dino:view-detail> )

module.exports = angular.module('myApp.views.policies', [
	headerComponent.name,
	footerComponent.name
])
.directive('myViewPolicies', function (
) {
	return {
		restrict: 'E',
		template: template,
		controller: 'MyViewPoliciesCtrl',
		replace: true,
		scope: {
		},
		link: function (scope, elem, attrs, controller) {
		}
	};
})
.controller('MyViewPoliciesCtrl', function (
) {

});