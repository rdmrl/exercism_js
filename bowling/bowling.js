//
// This is only a SKELETON file for the 'Bowling' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class Bowling {

  constructor() {
    this.rollValues = [];
  }

  roll( rollValue ) {
    this.rollValues.push( rollValue );
  }

  score() {
    const PERFECT_SCORE = 300;

    // Special condition.
    if( this.rollValues.length == 12 ) {
      const occurrences = this.rollValues.reduce( function( acc, cur ) {
        return acc[cur] ? ++acc[cur] : acc[cur] = 1, acc
      }, {} );

      // All strikes is a perfect game.
      if( occurrences[10] == this.rollValues.length ) {
        return PERFECT_SCORE;
      }
    }

    // console.log( 'rolls:', this.rollValues.length );

    let totalScore = 0;
    let frameScores = {};

    let curFrameIx = 0;
    let prevFrameIx = 0;
    let hasStrike = false;

    let strikesWithRollBonus = false;

    for(let ix = 0; ix < this.rollValues.length; ix++) {
      prevFrameIx = curFrameIx;

      // 1-based index of the current frame.
      curFrameIx = Math.floor(ix / 2) + 1;

      const lastFrame = ( curFrameIx >= 10 );

      if( curFrameIx !== prevFrameIx && curFrameIx <= 10 ) {
        // Reset the strike flag after moving to the next frame.
        hasStrike = false;
      }

      console.log( 'ix:', ix, 'val:', this.rollValues[ix], 'curFrameIx:', curFrameIx );
      if( this.rollValues[ix] === 10 ) {

        // A strike;
        hasStrike = true;

        let curScore = this.rollValues[ix];

        if( ( ix + 1 ) < this.rollValues.length && 
          this.rollValues[ ix + 1 ] === 10 &&
          ( ix + 2 ) < this.rollValues.length &&
          this.rollValues[ ix + 2 ] === 10 ) {
          strikesWithRollBonus = true;
        }

        // last frame gets two roll bonuses that is counted only once.
        // if( this.rollValues[ix - 1] !== 10 ) {
        if( lastFrame && strikesWithRollBonus ) {
        } else {
          if( ( ix + 1 ) < this.rollValues.length ) {
            curScore += this.rollValues[ix + 1];
          }
          if( ( ix + 2 ) < this.rollValues.length ) {
            curScore += this.rollValues[ix + 2];
          }
        }

        // console.log(curScore, totalScore);
        totalScore += curScore;
      } else {
        if( hasStrike && lastFrame ) {
        } else {
          totalScore += this.rollValues[ix];
        }
      }
    }

    return totalScore;

  }
}
