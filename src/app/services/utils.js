
'use strict';

module.exports = {
	array: {
		getPreviousIndex: function (array, currentIndex) {
			var previousIndex = currentIndex - 1;

			if (!array[previousIndex]) {
				previousIndex = array.length - 1;
			}

			return previousIndex;
		},
		getNextIndex: function (array, currentIndex) {
			var nextIndex = currentIndex + 1;

			if (!array[nextIndex]) {
				nextIndex = 0;
			}

			return nextIndex;
		}
	}
};