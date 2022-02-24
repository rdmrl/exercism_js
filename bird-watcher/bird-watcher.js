// @ts-check
//
// The line above enables type checking for this file. Various IDEs interpret
// the @ts-check directive. It will give you helpful autocompletion when
// implementing this exercise.

/**
 * Calculates the total bird count.
 *
 * @param {number[]} birdsPerDay
 * @returns {number} total bird count
 */
export function totalBirdCount(birdsPerDay) {
  let totalBirdCount = 0;
  for( let ix = 0; ix < birdsPerDay.length; ix++ ) {
    totalBirdCount += birdsPerDay[ ix ];
  }
  return totalBirdCount;

  // ES6 solution.
  // return birdsPerDay.reduce( ( a, b ) => a + b, 0 );
}

/**
 * Calculates the total number of birds seen in a specific week.
 *
 * @param {number[]} birdsPerDay
 * @param {number} week
 * @returns {number} birds counted in the given week
 */
export function birdsInWeek(birdsPerDay, week) {
  const startIndex = 7 * Math.max( 0, week - 1 );
  let weeklyBirdCount = 0;
  for( let ix = startIndex; ix < ( startIndex + 7 ); ix++ ) {
    weeklyBirdCount += birdsPerDay[ ix ];
  }
  return weeklyBirdCount;

  /*
  // ES6 solution.
  return birdsPerDay.filter( function( dayCount, dayIndex ) {
    if( dayIndex >= startIndex && dayIndex < ( startIndex + 7 ) ) {
      return dayCount;
    }
  } ).reduce( ( a, b ) => a + b, 0 );
  */
}

/**
 * Fixes the counting mistake by increasing the bird count
 * by one for every second day.
 *
 * @param {number[]} birdsPerDay
 * @returns {number[]} corrected bird count data
 */
export function fixBirdCountLog(birdsPerDay) {
  for( let ix = 0; ix < birdsPerDay.length; ix++ ) {
    if( ix % 2 == 0 ) {
      birdsPerDay[ ix ] += 1;
    }
  }
  return birdsPerDay;
}
