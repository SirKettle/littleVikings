'use strict';

var angular = require('angular');
var utils = require('./utils');
var policies = {
	accidents_incidents_and_emergencies: {
		title: 'Accident/Incident and Emergencies Policy',
		html: require('../html/policy/accidents_incidents_and_emergencies.html')
	},
	bullying: {
		title: 'Bullying Policy',
		html: require('../html/policy/bullying.html')
	},
	asthma: {
		title: 'Asthma Policy',
		html: require('../html/policy/asthma.html')
	},
	admissions: {
		title: 'Admissions Policy',
		html: require('../html/policy/admissions.html')
	},
	alcohol_and_drugs: {
		title: 'Alcohol and Drugs Policy',
		html: require('../html/policy/alcohol_and_drugs.html')
	},
	care_learning_and_play: {
		title: 'Care, Learning and Play Policy',
		html: require('../html/policy/care_learning_and_play.html')
	},
	safeguarding_children: {
		title: 'Policy for safeguarding children',
		html: require('../html/policy/safeguarding_children.html')
	},
	pet: {
		title: 'Pet and Animal Policy',
		html: require('../html/policy/pet.html')
	},
	smoking: {
		title: 'No Smoking Policy',
		html: require('../html/policy/smoking.html')
	},
	nappy: {
		title: 'Nappy and Toilet Training Policy',
		html: require('../html/policy/nappy.html')
	},
	childminder_sickness: {
		title: 'Childminder Sickness Policy',
		html: require('../html/policy/childminder_sickness.html')
	},
	childminder_observation: {
		title: 'Childminding Observation Policy',
		html: require('../html/policy/childminder_observation.html')
	},
	childminding_safety_on_outings: {
		title: 'Childminding Safety On Outings Policy',
		html: require('../html/policy/childminding_safety_on_outings.html')
	},
	complaints: {
		title: 'Complaints Procedure',
		html: require('../html/policy/complaints.html')
	},
	confidentiality: {
		title: 'Confidentiality Policy',
		html: require('../html/policy/confidentiality.html')
	},
	dropping_off_and_collection: {
		title: 'Dropping Off and Collection Policy',
		html: require('../html/policy/dropping_off_and_collection.html')
	},
	fire: {
		title: 'Fire Policy',
		html: require('../html/policy/fire.html')
	},
	health_and_safety: {
		title: 'Health and Safety Policy',
		html: require('../html/policy/health_and_safety.html')
	},
	healthy_eating: {
		title: 'Healthy Eating Policy',
		html: require('../html/policy/healthy_eating.html')
	},
	inclusion_and_anti_bias: {
		title: 'Inclusion and Anti-bias Policy',
		html: require('../html/policy/inclusion_and_anti_bias.html')
	},
	language: {
		title: 'Language Policy',
		html: require('../html/policy/language.html')
	},
	lost_child: {
		title: 'Lost Child Policy',
		html: require('../html/policy/lost_child.html')
	},
	managing_behaviour: {
		title: 'Managing Behaviour Policy',
		html: require('../html/policy/managing_behaviour.html')
	},
	medicine: {
		title: 'Medicine Policy',
		html: require('../html/policy/medicine.html')
	}
};

module.exports = angular.module('myApp.services.policyService', [])
.service('PolicyService', function (
	$q,
	$rootScope,
	DataService
) {
	function PolicyService () {

		var self = this;
		var mCachedPolicies = Object.keys(policies).map(function (key) {
				return {
					key: key,
					title: policies[key].title
				};
			}).sort(function (a, b) {
				return a.title > b.title ? 1 : -1;
			});

		function _getPolicyData (key) {
			return angular.extend({
				key: key,
				info: {
					index: _getPolicyIndex(key),
					totalCount: _getPoliciesCount()
				}
			}, policies[key]);
		}

		function _getPoliciesCount () {
			return mCachedPolicies.length;
		}

		function _getPolicyIndex (key) {
			var policyIndex;

			mCachedPolicies.some(function (policy, index) {
				var isMatch = policy.key === key;

				if (isMatch) {
					policyIndex = index;
				}

				return isMatch;
			});

			return policyIndex;
		}

		function _getAdjacent (key, isNext) {
			var currentIndex, adjacentIndex, adjacentKey;
			isNext = Boolean(isNext) || false;

			currentIndex = _getPolicyIndex(key);

			if (isNext) {
				adjacentIndex = utils.array.getNextIndex(mCachedPolicies, currentIndex);
			}
			else {
				adjacentIndex = utils.array.getPreviousIndex(mCachedPolicies, currentIndex);
			}

			adjacentKey = mCachedPolicies[adjacentIndex].key;

			return _getPolicyData(adjacentKey);
		}

		this.getAvailablePolicies = function () {
			return mCachedPolicies;
		};

		this.getPolicy = function (key) {
			return _getPolicyData(key);
		};

		this.getHtml = function (key) {
			return policies[key] && policies[key].html;
		};

		this.getPrevious = function (key) {
			var isNext = false;
			return _getAdjacent(key, isNext);
		};

		this.getNext = function (key) {
			var isNext = true;
			return _getAdjacent(key, isNext);
		};
	}

	return new PolicyService();
});
