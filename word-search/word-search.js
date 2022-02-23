//
// This is only a SKELETON file for the 'Word Search' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

class WordSearch {
  constructor(grid) {
    this.grid = grid;
    this.numRows = this.grid.length;
    this.numCols = this.grid[0].length;
    this.words = [];
  }

  #reverseWord(word) {
    return word.split('').reverse().join('');
  }

  #findWordHorizontal(word) {
    let wordPos;

    // Loop through each of the rows in the grid.
    for(let gx = 0; gx < this.grid.length; gx++) {

      // Check each row if this word exists.
      let startIx = this.grid[gx].indexOf(word);

      // console.log(word, startIx, word.length, this.grid[gx].length);
      if(startIx !== -1 && startIx + word.length < this.grid[gx].length) {
        wordPos = { start: [ gx + 1, startIx + 1 ], end: [ gx + 1, startIx + word.length ] };
      } else {
        // Check the reversed word.
        let reverseWord = this.#reverseWord(word);
        let revStartIx = this.grid[gx].indexOf(reverseWord);
        // console.log(this.grid[gx], reverseWord, revStartIx, reverseWord.length, this.grid[gx].length);
        if(revStartIx !== -1 && revStartIx + reverseWord.length < this.grid[gx].length + reverseWord.length ) {
          wordPos = { start: [ gx + 1, revStartIx + reverseWord.length ], end: [ gx + 1, revStartIx + 1 ] };
        }
      }
    }

    return wordPos;
  }


  #findWordInColumn(word, charIx, rowIx, columnIx, reverseSearch) {
    
    let wordPos;

    // The char at charIx has already been found; start with the next char.
    let nextCharIx = charIx + 1;

    // Look for the next char on the next row.
    let gy = rowIx;

    // Check only the number of rows as there are chars remaining in the word
    // or the total number of columns.
    const charLimit = Math.min( word.length - charIx, this.numCols );

    // Check for the next char on the next row at the SAME position.

    do {

      // Get the next char in the word.
      const nextWordChar = word.charAt(nextCharIx);

      // Get the char at the same position from the next row in the grid.
      const nextRowChar = this.grid[gy].charAt(columnIx);

      if(reverseSearch) {
      // console.log('gy:', gy, 'nextCharIx:', nextCharIx, 'nextWordChar:', nextWordChar, 'nextRowChar:', nextRowChar);
      }

      // Compare it to the next char in the word.
      if(nextRowChar === nextWordChar) {
        // Found a match; continue to the next row.
      } else {
        // No match. Stop checking the rest of the rows.
        break;
      }

      if(reverseSearch) {
        gy--;
        if(gy < 0) {
          break;
        }
      } else {
        gy++;
        if(gy >= this.numRows - 1) {
          break;
        }
      }

      nextCharIx++;

    } while( nextCharIx < charLimit );

    if(nextCharIx === word.length) {
      // Found the entire word.
      if(reverseSearch) {
        wordPos = { start: [ rowIx + 2, columnIx + 1 ], end: [ gy + 2, columnIx + 1 ] };
      } else {
        wordPos = { start: [ rowIx + 1, columnIx + 1 ], end: [ gy, columnIx + 1 ] };
      }
    }

    return wordPos;
  }

  #findCharInRow(row, rowIx, word, reverseSearch) {
    let wordPos;

    let charIx = 0;

    // Also check for multiple matches of the first char in the same row.
    let findCharPos = 0;

    do {
      // Start with the first character of the word.
      const curChar = word.charAt(charIx);

      // Find the word's character column index in the grid row.
      let columnIx = row.indexOf(curChar, findCharPos);

      if(reverseSearch) {
      // console.log(row, 'rowIx:', rowIx, 'curChar:', curChar, 'charIx:', charIx, 'columnIx:', columnIx, 'findCharPos:', findCharPos);
      }

      // Found the char on this row.
      if(columnIx !== -1) {

        let nextRowIx = reverseSearch ? Math.max(0, rowIx - 1) : Math.min(rowIx + 1, this.numRows - 1);
        // Check if the word is present in this column.
        let result = this.#findWordInColumn(word, charIx, nextRowIx, columnIx, reverseSearch);
        if(result) {
          console.log('findWordInCol:', result);
          wordPos = result;
          break;
        } else {
          // Set the start position of the search to the next character after the last char match.
          findCharPos = columnIx + 1;
        }
      } else {
        // Continue on the next row.
        charIx = 0;
        break;
      }

    } while (findCharPos < word.length);

    return wordPos;
  }

  #findInRows(word, reverseSearch) {
    let wordPos;

    // Start with the first row.
    let rowIx = reverseSearch ? (this.numRows - 1) : 0;

    let foundWord = false;

    do {
      // Get the current row in the grid.
      const row = this.grid[rowIx];

      wordPos = this.#findCharInRow(row, rowIx, word, reverseSearch);
      if("undefined" !== typeof(wordPos)) {
        foundWord = true;
        break;
      }

      if(reverseSearch) {
        rowIx--;
        if(rowIx < 0) {
          break;
        }
      } else {
        rowIx++;
        if(rowIx >= this.numRows) {
          break;
        }
      }

    } while (! foundWord );

    return wordPos;
  }

  #findWordVertical(word) {

    let wordPos = this.#findInRows(word, false);
    if("object" !== typeof(wordPos)) {
      // Try the reverse vertical search.
      console.log('reverse vertical search');
      wordPos = this.#findInRows(word, true);
    }

    return wordPos;
  }

  find(words) {
    this.words = words;

    let result = {};
    for(let ix = 0; ix < words.length; ix++) {
      const foundResult = this.#findWordHorizontal(words[ix]);
      if(foundResult) {
        result[words[ix]] = foundResult;
      }
    }

    // console.log(result);

    const wordsFound = Object.keys(result);
    // console.log('wordsFound:', wordsFound);
    const wordsNotFound = words.filter(w => !wordsFound.includes(w));
    // console.log('wordsNotFound:', wordsNotFound);

    for(let ix = 0; ix < wordsNotFound.length; ix++) {
      const foundResult = this.#findWordVertical(wordsNotFound[ix]);
      if(foundResult) {
        result[wordsNotFound[ix]] = foundResult;
      }
    }

    return result;
  }
}

export default WordSearch;
