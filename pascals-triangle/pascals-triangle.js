//
// This is only a SKELETON file for the 'Pascals Triangle' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const rows = (rowCount) => {
  let output = [];

  const FIRST_ROW_OUTPUT = [1];
  const SECOND_ROW_OUTPUT = [1, 1];

  if (rowCount === 1) {
    output = [ FIRST_ROW_OUTPUT ];
  }

  if (rowCount > 1) {
    output[0] = FIRST_ROW_OUTPUT;
    output[1] = SECOND_ROW_OUTPUT;
  }

  if (rowCount > 2) {

    for (let ix = 2; ix < rowCount; ix++) {
      const prevRow = output[ix - 1];

      const row = [1];
      for (let jx = 0; jx < prevRow.length - 1; jx++) {
        const nextVal = prevRow[jx] + prevRow[jx + 1];
        row.push(nextVal);
      }
      row.push(1);

      output[ix] = row;
    }
  }

  return output;
};
