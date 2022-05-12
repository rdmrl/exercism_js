//
// This is only a SKELETON file for the 'Square root' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

// Using the digit-by-digit calculation algorithm.

// Find p, y and x, as follows:
// - Let p be the part of the root found so far, ignoring any decimal point. p == 0 for the first step.
// - Determine the greatest digit x such that x(20p + x) <= c.
//   - 20p + x is simply twice p with the digit x appended to the right.
//   - x can be found by guessing what cl(20 * p) is 
// - Place the digit x as the next digit of the root. The next p will be the old p times 10 plus x.
// Subtract y from c to form a new remainder.
// Continue until the remainder is zero and there are no more digits.
export const squareRoot = () => {
  
};
