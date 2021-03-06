'use strict';

var angular = require('angular');
var template = require('./about.html');
// services

// filters
var yearsOldFilter = require('../../filters/yearsOld');

// sub components
var headerComponent = require('../../components/header/header');
var footerComponent = require('../../components/footer/footer');



// directive name:
//		namespaceTypeName (examples: wtComponentAvatar or dinoViewDetail )
// 
// template use:
// <namespace:type-name></namespace:type-name> (examples: <wt:component-avatar></wt:component-avatar> or <dino:view-detail></dino:view-detail> )

module.exports = angular.module('myApp.views.about', [
	yearsOldFilter.name,
	headerComponent.name,
	footerComponent.name
])
.directive('myViewAbout', function (
) {
	return {
		restrict: 'E',
		template: template,
		controller: 'MyViewAboutCtrl',
		replace: true,
		scope: {
		},
		link: function (scope, elem, attrs, controller) {
			scope.getYearsOld = function () {

			};
		}
	};
})
.controller('MyViewAboutCtrl', function (
) {

});