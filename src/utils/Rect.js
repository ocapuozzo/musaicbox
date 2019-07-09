export default class Rect {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  contains(x, y) {
    return x >= (this.x - this.w / 2) && x <= this.x + this.w / 2 &&
      y >= this.y - this.h / 2 && y <= this.y + this.h / 2;
  }

  draw(ctx) {
    ctx.beginPath();
    //ctx.arc(this.x, this.y, this.w, 0, 2 * Math.PI);
    ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h)
    ctx.stroke();
  }

  toString() {
    return "{" + this.x + "," + this.y + "," + this.w + "," + this.h + "}";
  }
}
