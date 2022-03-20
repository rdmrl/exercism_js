// @ts-check

/**
 * Implement the classes etc. that are needed to solve the
 * exercise in this file. Do not forget to export the entities
 * you defined so they are available for the tests.
 */
export function Size(width, height) {
  this.width = "undefined" !== typeof width ? width : 80;
  this.height = "undefined" !== typeof height ? height : 60;
}

Size.prototype.resize = function(newWidth, newHeight) {
  this.width = newWidth;
  this.height = newHeight;
}

export function Position(x, y) {
  this.x = "undefined" !== typeof x ? x : 0;
  this.y = "undefined" !== typeof y ? y : 0;
}

Position.prototype.move = function(newX, newY) {
  this.x = newX;
  this.y = newY;
}

export class ProgramWindow {
  constructor() {
    this.screenSize = new Size(800, 600);
    this.size = new Size();
    this.position = new Position();
  }

  resize(size) {
    // Clip widths or heights less than 1 to 1.
    let newWidth = Math.max(1, size.width);
    let newHeight = Math.max(1, size.height);

    if ((this.position.x + newWidth) > this.screenSize.width) {
      newWidth = this.screenSize.width - this.position.x;
    }

    if ((this.position.y + newHeight) > this.screenSize.height) {
      newHeight = this.screenSize.height - this.position.y;
    }

    this.size.resize(newWidth, newHeight);
  }

  move(newPosition) {
    let newX = Math.max(0, newPosition.x);
    let newY = Math.max(0, newPosition.y);

    if ((this.size.width + newPosition.x) > this.screenSize.width) {
      newX = this.screenSize.width - this.size.width;
    }

    if ((this.size.height + newPosition.y) > this.screenSize.height) {
      newY = this.screenSize.height - this.size.height;
    }

    this.position.move(newX, newY);
  }


}
