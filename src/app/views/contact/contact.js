'use strict';

var angular = require('angular');
var template = require('./contact.html');
// services

// sub components
var headerComponent = require('../../components/header/header');
var footerComponent = require('../../components/footer/footer');



// directive name:
//		namespaceTypeName (examples: wtComponentAvatar or dinoViewDetail )
// 
// template use:
// <namespace:type-name></namespace:type-name> (examples: <wt:component-avatar></wt:component-avatar> or <dino:view-detail></dino:view-detail> )

module.exports = angular.module('myApp.views.contact', [
	headerComponent.name,
	footerComponent.name
])
.directive('myViewContact', function (
) {
	return {
		restrict: 'E',
		template: template,
		controller: 'MyViewContactCtrl as Contact',
		replace: true,
		scope: {
		},
		link: function (scope, elem, attrs, controller) {
		}
	};
})
.controller('MyViewContactCtrl', function (
) {
	var Contact = this;

	Contact.name = 'Vicky';
	Contact.email = 'vickyl24@aol.com';
	Contact.telephone = '07886 035 561';
});