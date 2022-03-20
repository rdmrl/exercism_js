//
// This is only a SKELETON file for the 'Change' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class Change {
  calculate(coinArray, target) {
    if (target <= 0) {
      return [];
    }

    // Exact coin match.
    if (coinArray.includes(target)) {
      return [target];
    } 

    let changeArray = [];

    let remValue = target;
    // Start with the largest coin.
    for (let ix = coinArray.length - 1; ix >= 0; ix--) {
      // Skip any coins that are larger than the target amount.
      if (remValue < coinArray[ix]) {
        continue;
      }

      console.log('found:', coinArray[ix]);
      changeArray.push(coinArray[ix]);

      remValue = remValue % coinArray[ix];
      console.log('remValue:', remValue);
    }

    changeArray.sort((a, b) => { return a - b; } );

    console.log(changeArray);
    return changeArray;
  }
}
