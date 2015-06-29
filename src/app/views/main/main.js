'use strict';

var angular = require('angular');
var template = require('./main.html');
// services
var referenceService = require('../../services/referenceService');
// sub components
var headerComponent = require('../../components/header/header');
var footerComponent = require('../../components/footer/footer');
var socialNetworksComponent = require('../../components/socialNetworks/socialNetworks');



// directive name:
//		namespaceTypeName (examples: wtComponentAvatar or dinoViewDetail )
// 
// template use:
// <namespace:type-name></namespace:type-name> (examples: <wt:component-avatar></wt:component-avatar> or <dino:view-detail></dino:view-detail> )

module.exports = angular.module('myApp.views.main', [
	referenceService.name,
	headerComponent.name,
	footerComponent.name,
	socialNetworksComponent.name
])
.directive('myViewMain', function (
) {
	return {
		restrict: 'E',
		template: template,
		controller: 'MyViewMainCtrl',
		replace: true,
		scope: {
		},
		link: function (scope, elem, attrs, controller) {
			controller.getReferences();
		}
	};
})
.controller('MyViewMainCtrl', function (
	$scope,
	ReferenceService
) {
	var self = this;

	this.getReferences = function (params) {
		return ReferenceService.getAll(params)
			.then(function (references) {
				$scope.references = references;
				console.log(references);
			})
			.catch(function (err) {
				console.warn('getReferences error', params, err);
			});
	};
});