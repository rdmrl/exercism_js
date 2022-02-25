// @ts-check

/**
 * Calculates the sum of the two input arrays.
 *
 * @param {number[]} array1
 * @param {number[]} array2
 * @returns {number} sum of the two arrays
 */
export function twoSum ( array1, array2 ) {
  // Combine the arrays with the digits converted to strings.
  // Convert them back to a number using parseInt.
  let array1Value = parseInt( array1.join( '' ), 10 );
  let array2Value = parseInt( array2.join( '' ), 10 );

  return array1Value + array2Value;
}

/**
 * Checks whether a number is a palindrome.
 *
 * @param {number} value
 * @returns {boolean}  whether the number is a palindrome or not
 */
export function luckyNumber ( value ) {
  // Convert into a string.
  const strValue = String( value );

  // Compare the digits from the start and the end and moving to the center.
  for ( let ix = 0, jx = strValue.length - 1; ix < strValue.length, jx >= 0; ix++, jx-- ) {
    if ( ix === jx ) {
      // Stop at the center to avoid repeating the comparison.
      break;
    }
    if ( strValue[ ix ] === strValue[ jx ] ) {
      continue;
    } else {
      return false;
    }
  }

  return true;
}

/**
 * Determines the error message that should be shown to the user
 * for the given input value.
 *
 * @param {string|null|undefined} input
 * @returns {string} error message
 */
export function errorMessage ( input ) {

  // Check for null and undefined.
  if ( input === undefined || input === null || "undefined" === typeof input ) {
    return 'Required field';
  }

  // Check for empty string.
  if ( input.trim() === '' ) {
    return 'Required field';
  }

  // Check for a single zero or spaces in between numbers.
  if ( input === '0' || input.trim().includes( ' ' ) ) {
    return 'Must be a number besides 0';
  }

  // Check for a valid number.
  if ( isNaN( input.trim() ) ) {
    return 'Must be a number besides 0';
  }

  return '';
}
