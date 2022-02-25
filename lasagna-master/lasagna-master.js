/// <reference path="./global.d.ts" />
// @ts-check

/**
 * Determine whether the lasagna is done.
 *
 * @param {number} the remaining time on the timer in minutes
 * @returns {string} the cooking status
 */
export function cookingStatus ( timeInMinutes ) {
  if ( timeInMinutes === null || timeInMinutes === undefined || "undefined" === typeof timeInMinutes ) {
    return 'You forgot to set the timer.';
  }

  const timeVal = parseFloat( timeInMinutes, 10 );
  console.log( timeInMinutes, timeVal );
  if ( timeVal === 0 ) {
    return 'Lasagna is done.';
  }

  return 'Not done, please wait.';
}

/**
 * Estimate the preparation time.
 *
 * @param {Array.<string>} the layers
 * @param {number} the average preparation time per layer in minutes
 * @returns {number} the total preparation time
 */
export function preparationTime ( layers, timePerLayer ) {
  let layerPrepTime = timePerLayer;
  if ( timePerLayer === undefined ) {
    layerPrepTime = 2;
  }
  return layers.length * layerPrepTime;
}

/**
 * Compute the amounts of noodle and sauce needed.
 *
 * @param {Array.<string>} the layers
 * @return {Array.<{layer: string, quantity: number}>} the quantities
 */
export function quantities ( layers ) {
  let result = {
    noodles: 0,
    sauce: 0.0
  };

  for ( let ix = 0; ix < layers.length; ix++ ) {
    if ( "noodles" === layers[ ix ] ) {
      result[ 'noodles' ] += 50;
    } else if ( "sauce" === layers[ ix ] ) {
      result[ 'sauce' ] += 0.2;
    }
  }

  return result;
}

/**
 * Add the secret ingredient.
 *
 * @param {Array.<string>} the friend's list of ingredients
 * @param {Array.<string>} my list of ingredients
 * @return {Array.<string>} the final list
 */
export function addSecretIngredient ( friendsList, myList ) {
  myList.push( friendsList[ friendsList.length - 1 ] );
}

/**
 * Scale the recipe.
 *
 * @param {Object} the recipe for two portions
 * @param {number} the number of portions to cook
 * @return {Object} the scaled recipe
 */
export function scaleRecipe ( recipe, portions ) {
  let scaledRecipe = {};

  for ( const key in recipe ) {
    scaledRecipe[ key ] = recipe[ key ] * portions / 2;
  }

  return scaledRecipe;
}