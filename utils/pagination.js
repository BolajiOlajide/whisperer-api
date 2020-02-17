const R = require('ramda');

const { stressError } = require('./errors');

exports.checkLimitPageExist = (args) => {
  const doesLimitExist = !R.isNil(R.prop('limit', args));
  const doesPageExist = !R.isNil(R.prop('page', args));

  if (doesLimitExist) {
    if (!doesPageExist) {
      return stressError('Supply page and limit arguments abeg.');
    }
  }
}
