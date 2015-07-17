'use strict';

var angular = require('angular');
var template = require('./main.html');
// services
var referenceService = require('../../services/referenceService');
// sub components
var headerComponent = require('../../components/header/header');
var footerComponent = require('../../components/footer/footer');
var referenceQuoteComponent = require('../../components/referenceQuote/referenceQuote');



// directive name:
//		namespaceTypeName (examples: wtComponentAvatar or dinoViewDetail )
// 
// template use:
// <namespace:type-name></namespace:type-name> (examples: <wt:component-avatar></wt:component-avatar> or <dino:view-detail></dino:view-detail> )

module.exports = angular.module('myApp.views.main', [
	referenceService.name,
	headerComponent.name,
	footerComponent.name,
	referenceQuoteComponent.name
])
.directive('myViewMain', function (
) {
	var PLACEHOLDER_IMAGE_SRC = '/images/family_still.jpg';
	var ANIMATED_IMAGE_SRC = '/images/family_animation.gif';

	return {
		restrict: 'E',
		template: template,
		controller: 'MyViewMainCtrl as Main',
		replace: true,
		scope: {
		},
		link: function (scope, elem, attrs, controller) {
			controller.getReferences();

			function _loadImages () {
				// The animated gif is expensive (3MB) so initially render the image
				// with a smaller jpg placeholder until we have loaded the gif.
				var animatedImage;
				// set placeholder image src
				scope._familyImageSrc = PLACEHOLDER_IMAGE_SRC;
				// create new image to load gif
				animatedImage = new Image();
				animatedImage.src = ANIMATED_IMAGE_SRC;
				animatedImage.onload = function () {
					// switch the image src to the animated gif
					scope._familyImageSrc = ANIMATED_IMAGE_SRC;
					scope.$digest();
				};
			}

			_loadImages();
		}
	};
})
.controller('MyViewMainCtrl', function (
	$scope,
	ReferenceService
) {
	var Main = this;

	Main.getReferences = function (params) {
		return ReferenceService.getAll(params)
			.then(function (references) {
				Main.references = references;
				console.log(references);
			})
			.catch(function (err) {
				console.warn('getReferences error', params, err);
			});
	};

	Main.referenceSortBy = 'year';
	Main.referenceSortReversed = true;
});