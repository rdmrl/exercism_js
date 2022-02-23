//
// This is only a SKELETON file for the 'Bowling' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class Bowling {

  constructor() {
    // The value of each roll.
    this.rollValues = [];

    // Scores grouped by frame.
    this.frameScores = [];
  }

  roll( rollValue ) {
    if(rollValue < 0) {
      throw new Error('Negative roll is invalid');
    }

    if(rollValue > 10) {
      throw new Error('Pin count exceeds pins on the lane');
    }

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

    // The total score for the entire game.
    let totalScore = 0;


    let prevFrameIx = -2;

    // Set this to -1 so that the first frame check works
    // when comparing with prevFrameIx.
    let curFrameIx = -1;

    let hasStrike = false;

    // The game always starts with a new frame.
    let newFrameStart = true;

    let strikesWithRollBonus = false;

    let errorMsg = null;

    for(let ix = 0; ix < this.rollValues.length; ix++) {
      prevFrameIx = curFrameIx;

      if(this.rollValues[ix] < 0) {
        errorMsg = "Negative roll is invalid";
        break;
      }

      // 0-based index of the current frame.
      curFrameIx = Math.floor(ix / 2);

      // Combined the scores for the rolls in each individual frame.
      if("undefined" === typeof(frameScores[curFrameIx])) {
        // Initial value.
        frameScores[curFrameIx] = 0;
      }
      frameScores[curFrameIx] += this.rollValues[ix];

      if( curFrameIx !== prevFrameIx && curFrameIx <= 10 ) {
        // Reset the strike flag after moving to the next frame.
        hasStrike = false;

        // Start of a new frame.
        newFrameStart = true;
      } else {
        newFrameStart = false;
      }

      const lastFrame = ( curFrameIx >= 9 );

      console.log( 'ix:', ix, 'val:', this.rollValues[ix], 'curFrameIx:', curFrameIx, 'lastFrame:', lastFrame, 'newFrameStart:', newFrameStart );
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
        // if( this.rollValues[ix - 1] !== 10 ) 
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
          console.log('hasStrike and lastFrame');
        } else {
          console.log('NOT hasStrike and lastFrame');
          totalScore += this.rollValues[ix];
        }
      }

      // Check at the end of the frame for a spare.
      if(!newFrameStart 

        // A spare in the last frame gets a one roll bonus that is 
        // counted only once.
        && !lastFrame) {

        // End of the frame.
        if(frameScores[curFrameIx] === 10) {
          // This is a spare. Points scored after a spare are counted twice.
          if( ( ix + 1 ) < this.rollValues.length ) {
            totalScore += this.rollValues[ix + 1];
          }
        }
      }
    } // for


    console.log(frameScores);
    return totalScore;

  }
}
