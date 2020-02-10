const R = require('ramda');


const isWhisperNull = R.pipe(
  R.head,
  R.prop('whispers'),
  R.prop('id'),
  R.isNil
);

exports.pluckWhisperer = R.pipe(
  R.head,
  R.prop('users')
);

exports.pluckWhispers = R.ifElse(
  isWhisperNull,
  R.empty,
  R.pluck('whispers')
)
