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
    let totalScore = 0;
    console.log( 'rolls:', this.rollValues.length );

    let curFrameIx = 0;
    let prevFrameIx = 0;
    let hasStrike = false;
    for(let ix = 0; ix < this.rollValues.length; ix++) {
      prevFrameIx = curFrameIx;

      // 1-based index of the current frame.
      curFrameIx = Math.floor(ix / 2) + 1;

      const lastFrame = ( curFrameIx >= 10 );

      if( curFrameIx !== prevFrameIx && curFrameIx <= 10 ) {
        // Reset the strike flag after moving to the next frame.
        hasStrike = false;
      }

      // console.log(hasStrike, curFrameIx, prevFrameIx);
      if( this.rollValues[ix] === 10 ) {
        // A strike;
        hasStrike = true;
        let curScore = this.rollValues[ix];

        if( this.rollValues[ix - 1] !== 10 ) {
          // last frame gets two roll bonuses that is counted only once.
          if( ( ix + 1 ) < this.rollValues.length ) {
            curScore += this.rollValues[ix + 1];
          }
          if( ( ix + 2 ) < this.rollValues.length ) {
            curScore += this.rollValues[ix + 2];
          }
        }

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
