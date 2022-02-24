//
//

class WordSearch {
  constructor( grid ) {
    this.grid = grid;
    this.numRows = this.grid.length;
    this.numCols = this.grid[ 0 ].length;
    this.words = [];
  }

  #reverseWord( word ) {
    return word.split( '' ).reverse().join( '' );
  }

  #findWordHorizontal( word ) {
    let wordPos;

    // Loop through each of the rows in the grid.
    for ( let gx = 0; gx < this.grid.length; gx++ ) {

      // Check each row if this word exists.
      let startIx = this.grid[ gx ].indexOf( word );

      // console.log(word, startIx, word.length, this.grid[gx].length);
      if ( startIx !== -1 && startIx + word.length < this.grid[ gx ].length ) {
        wordPos = {
          start: [ gx + 1, startIx + 1 ],
          end: [ gx + 1, startIx + word.length ]
        };
      } else {
        // Check the reversed word.
        let reverseWord = this.#reverseWord( word );
        let revStartIx = this.grid[ gx ].indexOf( reverseWord );
        // console.log(this.grid[gx], reverseWord, revStartIx, reverseWord.length, this.grid[gx].length);
        if ( revStartIx !== -1 && revStartIx + reverseWord.length < this.grid[ gx ].length + reverseWord.length ) {
          wordPos = {
            start: [ gx + 1, revStartIx + reverseWord.length ],
            end: [ gx + 1, revStartIx + 1 ]
          };
        }
      }
    }

    return wordPos;
  }


  #findWordInColumn( word, charIx, rowIx, columnIx, reverseSearch ) {

    let wordPos;

    // The char at charIx has already been found before arriving here.
    // Start with the next char.
    let nextCharIx = charIx + 1;

    // Look for the next char on the next row.
    let gy = rowIx;

    // Check only the number of rows as there are chars remaining in the word
    // or the total number of columns.
    const charLimit = Math.min( word.length - charIx, this.numCols );

    // Check for the next char on the next row at the SAME position.

    do {

      // Get the next char in the word.
      const nextWordChar = word.charAt( nextCharIx );

      // Get the char at the same position from the next row in the grid.
      const nextRowChar = this.grid[ gy ].charAt( columnIx );

      // console.log( 'gy:', gy, 'nextCharIx:', nextCharIx, 'nextWordChar:', nextWordChar, 'nextRowChar:', nextRowChar );

      // Compare it to the next char in the word.
      if ( nextRowChar === nextWordChar ) {
        // Found a match; continue to the next row.
      } else {
        // No match. Stop checking the rest of the rows.
        break;
      }

      if ( reverseSearch ) {
        gy--;
        if ( gy < 0 ) {
          break;
        }
      } else {
        gy++;
        if ( gy >= this.numRows ) {
          break;
        }
      }

      nextCharIx++;

    } while ( nextCharIx < charLimit );

    // console.log( 'nextCharIx:', nextCharIx, 'word.len:', word.length );
    // Found the entire word.
    if ( reverseSearch ) {
      if ( nextCharIx === word.length ) {
        wordPos = {
          start: [ rowIx + 2, columnIx + 1 ],
          end: [ gy + 2, columnIx + 1 ]
        };
      }
    } else {
      if ( nextCharIx === word.length - 1 ) {
        wordPos = {
          start: [ rowIx, columnIx + 1 ],
          end: [ gy, columnIx + 1 ]
        };
      }
    }

    return wordPos;
  }

  #findCharInRow( row, rowIx, word, reverseSearch ) {
    let wordPos;

    // Start with the first character of the word.
    let charIx = 0;

    // Also check for multiple matches of the first char in the same row.
    // The index of the next search in the row. Set to the character after
    // the previous match.
    let findCharPos = 0;

    do {
      const curChar = word.charAt( charIx );

      // Find the word's character column index in the grid row.
      let columnIx = row.indexOf( curChar, findCharPos );

      if ( reverseSearch ) {
        // console.log( row, 'rowIx:', rowIx, 'curChar:', curChar, 'charIx:', charIx, 'columnIx:', columnIx, 'rev.srch:', reverseSearch );
      }

      // Found the char on this row.
      if ( columnIx !== -1 ) {

        // If reverse search, move to the previous row. Else, move to the next row.
        let nextRowIx = reverseSearch ? Math.max( 0, rowIx - 1 ) : Math.min( rowIx + 1, this.numRows - 1 );

        // Check if the word is present in this column.
        let result = this.#findWordInColumn( word, charIx, nextRowIx, columnIx, reverseSearch );
        if ( result ) {
          wordPos = result;
          break;
        } else {
          // Set the start position of the search to the next character after the last char match.
          findCharPos = columnIx + 1;
        }
      } else {
        // Continue on the next row. Restart with the first character of the word.
        charIx = 0;
        break;
      }

    } while ( findCharPos < row.length );

    return wordPos;
  }

  #findInRows( word, reverseSearch ) {
    let wordPos;

    // If in reverse search, start from the last row.
    // Else start from the first row.
    let rowIx = reverseSearch ? ( this.numRows - 1 ) : 0;

    // Set to true to break out of the loop.
    let foundWord = false;

    // Loop through each of the rows.
    do {
      // Get the current row in the grid.
      const row = this.grid[ rowIx ];

      // Find the matching character in the current row.
      wordPos = this.#findCharInRow( row, rowIx, word, reverseSearch );
      if ( "undefined" !== typeof( wordPos ) ) {
        foundWord = true;
        break;
      }

      if ( reverseSearch ) {
        // Decrement the row index until the first row (0-index).
        rowIx--;
        if ( rowIx < 0 ) {
          break;
        }
      } else {
        // Increment the row index until the last row is reached.
        rowIx++;
        if ( rowIx >= this.numRows ) {
          break;
        }
      }

    } while ( !foundWord );

    return wordPos;
  }

  #findWordVertical( word ) {

    // First search from top to bottom.
    let wordPos = this.#findInRows( word, false );

    if ( "object" !== typeof( wordPos ) ) {
      // Next search from bottom to top.
      wordPos = this.#findInRows( word, true );
    }

    return wordPos;
  }

  find( words ) {
    this.words = words;

    let result = {};

    // Look for the words in rows in both directions.
    for ( let ix = 0; ix < words.length; ix++ ) {
      const foundResult = this.#findWordHorizontal( words[ ix ] );
      if ( foundResult ) {
        result[ words[ ix ] ] = foundResult;
      }
    }

    // Remove the words already found in rows from the list.
    const wordsFound = Object.keys( result );
    const wordsNotFound = words.filter( w => !wordsFound.includes( w ) );

    // Look for the remaining words in columns in both directions.
    for ( let ix = 0; ix < wordsNotFound.length; ix++ ) {
      const foundResult = this.#findWordVertical( wordsNotFound[ ix ] );
      if ( foundResult ) {
        result[ wordsNotFound[ ix ] ] = foundResult;
      }
    }

    // console.log( 'final result:', result );
    return result;
  }
}

export default WordSearch;
