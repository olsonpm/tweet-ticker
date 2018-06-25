//
// README
//  - This file only exists because date-fns alpha was buggy and I wanted an fp
//    interface to its functions
//

//---------//
// Imports //
//---------//

import {
  addDays as _addDays,
  differenceInMilliseconds as _differenceInMilliseconds,
  format as _format,
  setHours as _setHours,
  startOfHour as _startOfHour,
} from 'date-fns'

//
//------//
// Main //
//------//

const addDays = numberOfDays => aDate => _addDays(aDate, numberOfDays)

const differenceInMillisecondsFrom = earlierDate => laterDate =>
  _differenceInMilliseconds(laterDate, earlierDate)

const format = formatString => aDate => _format(aDate, formatString)

const setHour = hour => aDate => _setHours(aDate, hour)

const startOfHour = aDate => _startOfHour(aDate)

//
//---------//
// Exports //
//---------//

export { addDays, differenceInMillisecondsFrom, format, setHour, startOfHour }
