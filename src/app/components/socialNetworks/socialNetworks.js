'use strict';

var angular = require('angular');
var template = require('./socialNetworks.html');
var contactService = require('../../services/contactService');

module.exports = angular.module('myApp.components.socialNetworks', [
	contactService.name
])
.directive('mySocialNetworks', function (
	$sce
) {
	return {
		restrict: 'E',
		template: template,
		controller: 'MySocialNetworksCtrl as SocialNetworks',
		replace: true,
		scope: {
			isInline: '=?'
		},
		link: function (scope, elem, attrs, controller) {
		}
	};
})
.controller('MySocialNetworksCtrl', function (
	ContactService
) {
	var SocialNetworks = this;

	ContactService.getSocialNetworks().then(function (socialNetworks) {
		SocialNetworks.socialNetworks = socialNetworks;
	});

	ContactService.getContactDetails().then(function (contactDetails) {
		SocialNetworks.contactDetails = contactDetails;
	});


});