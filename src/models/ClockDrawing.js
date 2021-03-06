/**
 * Copyright (c) 2019. Olivier Capuozzo
 *
 * This file is part of the musaicbox project
 *
 * (c) Olivier Capuozzo <olivier.capuozzo@gmail.com>
 *
 * For the full copyright and license information, please view the README.md
 * file on git server.
 */

import IPcs from "./IPcs";
import Rect from "../utils/Rect"
import Point from "../utils/Point"

const PITCH_LINE_WIDTH = 4;
export default class ClockDrawing {

  constructor({
                ipcs = new IPcs({strPcs: "[0,3,7"}),
                ctx = null,  // canvas context
                width = 20,
                height = 20,
                pc_pivot_color = "red",
                pc_color = "yellow",
                segmentsLineDash= [ [1, 3], [1, 3, 3, 1] ] // median, inter
              }) {
    this.ipcs = ipcs
    this.ctx = ctx
    this.width = width
    this.height = height
    this.pc_pivot_color = pc_pivot_color
    this.pc_color = pc_color
    this.n = this.ipcs.n
    this.points = []
    this.pointsAxesSym = []
    this.segmentsLineDash = segmentsLineDash
  }

  setIpcs(ipcs) {
    this.ipcs = ipcs
  }

  isSelected(i) {
    return this.ipcs.pcs[i] === 1;
  }

  // pass IPcs instance in parameter ? for store reactive ?
  draw(ipcs = null) {
    if (ipcs) this.ipcs = ipcs

    // console.log("ipcs :" + this.ipcs)
    let ox = this.width / 2;
    let oy = this.height / 2;
    let radius = Math.round(ox * .8);
    this.computePitchesRegion(ox, oy, radius);
    this.ctx.save()
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawPolygon(this.ctx);
    this.drawAxesSymmetry(this.ctx)
    this.ctx.translate(ox, oy);
    this.drawPitches(this.ctx, radius);
    this.ctx.translate(-ox, -oy);
    this.ctx.restore();
  }

  drawCirclePitch(ctx, index, radius) {
    let grad;
    ctx.save()
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.stroke()
    // console.log("index : " + index + " selected : " + this.isSelected(index));
    ctx.fillStyle =
      (this.isSelected(index))
        ? (index === this.ipcs.iPivot)
        ? this.pc_pivot_color
        : this.pc_color
        : 'white';
    ctx.fill();
    if (radius > 6) {
      grad = ctx.createRadialGradient(0, 0, radius * 0.8, 0, 0, radius * 1.2);
      grad.addColorStop(0, '#333');
      grad.addColorStop(0.5, 'white');
      grad.addColorStop(1, '#333');
      ctx.strokeStyle = grad;
      ctx.lineWidth = PITCH_LINE_WIDTH;//lineWidth; //radius*0.1;
      ctx.stroke();
      ctx.beginPath();
      ctx.fillStyle = '#333';
      ctx.fill();
      if (index < 10) {
        ctx.fillText(index.toString(), -.1, 1);
      } else {
        ctx.fillText(index.toString(), -.4, 1)
      }
    }
    ctx.restore()
  }

  drawPitches(ctx, radius) {
    let ang;
    ctx.font = radius * 0.1 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    let radiusPitch = Math.round(radius / 9);
    for (let index = 0; index < this.n; index++) {
      ang = index * Math.PI / (this.n / 2);
      // console.log(this.$options.points[index].toString());
      ctx.rotate(ang);
      ctx.translate(0, -radius);
      ctx.rotate(-ang);
      this.drawCirclePitch(ctx, index, radiusPitch /*, PITCH_LINE_WIDTH*/);
      ctx.rotate(ang);
      ctx.translate(0, radius);
      ctx.rotate(-ang);
    }
  }

  drawPolygon(ctx) {
    let points = this.points;
    let firstPoint = true;
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.beginPath();
    for (let i = 0; i < this.ipcs.pcs.length; i++) {
      if (this.ipcs.pcs[i] === 1 && firstPoint) {
        firstPoint = false;
        ctx.moveTo(points[i].x, points[i].y);
      } else if (this.ipcs.pcs[i] === 1) {
        ctx.lineTo(points[i].x, points[i].y);
      }
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  drawAxeMedian(i, revOX, revOY, ctx) {
    let points = this.pointsAxesSym;
    let x1 = points[i * 2].x
    let y1 = points[i * 2].y
    let i2 = (Math.round(this.n / 2) + i) % this.n;
    let nEven = this.n % 2 === 0;
    let delta = nEven ? 0 : -1;
    let x2 = points[(i2 * 2 + delta + this.n * 2) % (this.n * 2)].x;
    let y2 = points[(i2 * 2 + delta + this.n * 2) % (this.n * 2)].y;
    ctx.save();
    ctx.beginPath()
    ctx.setLineDash(this.segmentsLineDash[0]);
    ctx.moveTo(revOX, revOY)
    ctx.lineTo(x2, y2)
    ctx.moveTo(revOX, revOY)
    ctx.lineTo(x1, y1)
    ctx.stroke()
    ctx.restore()
  }

  drawAxeInter(i, revOX, revOY, ctx) {
    let points = this.pointsAxesSym;
    let x1 = points[((i * 2 + 1) + this.n * 2) % (this.n * 2)].x
    let y1 = points[((i * 2 + 1) + this.n * 2) % (this.n * 2)].y

    let i2 = (this.n / 2 + i) % this.n;
    let nEven = this.n % 2 === 0;
    if (!nEven)
      i2 -= 1;

    let x2 = points[((i2 * 2 + 1) + this.n * 2) % (this.n * 2)].x
    let y2 = points[((i2 * 2 + 1) + this.n * 2) % (this.n * 2)].y

    ctx.save();
    ctx.setLineDash(this.segmentsLineDash[1]);
    ctx.beginPath()
    ctx.moveTo(revOX, revOY)
    ctx.lineTo(x2, y2)
    ctx.moveTo(revOX, revOY)
    ctx.lineTo(x1, y1)
    ctx.stroke()
    ctx.restore();
  }

  drawAxesSymmetry(ctx) {
    let ox = this.width / 2;
    let oy = this.height / 2;
    let axesSym = this.ipcs.getAxialSymmetries()

    for (let i = 0; i < axesSym.symMedian.length; i++) {
      if (axesSym.symMedian[i] === 1) {
        this.drawAxeMedian(i, ox, oy, ctx);
      }
      if (axesSym.symInter[i] === 1) {
        this.drawAxeInter(i, ox, oy, ctx);
      }
    }
  }

  computePitchesRegion(ox, oy, radius) {
    if (this.points.length < this.n) {
      this.points = new Array(this.n)
      this.pointsAxesSym = new Array(this.n * 2)
    }

    // console.log("this.n : " + this.n)
    // console.log("ox :" + ox + "  oy : "+oy + " radius : " + radius)
    let radiusPitch = Math.round(radius / (this.n - 1));
    let radiusAxesSym = radius * 1.3 // more length ?
    let x;
    let y;
    let ang = 3 * Math.PI / 2;
    for (let index = 0; index < this.n; index++) {
      x = radiusPitch * 2 + Math.round(ox + Math.cos(ang) * radius);
      y = radiusPitch * 2 + Math.round(oy + Math.sin(ang) * radius);
      // console.log("ox : " + ox +"  x:" + x + " y:" + y);
      this.points[index] = new Rect(
        x - radiusPitch * 2,
        y - radiusPitch * 2,
        radiusPitch * 3, // width rectangle
        radiusPitch * 3); // square...
      //this.$options.points[index].draw(ctx);
      // console.log(this.$options.points[index].toString());
      ang = ang + 2 * Math.PI / this.n;
    }
    // compute points for axes symmetry (*2 because inter pitches)
    ang = 3 * Math.PI / 2;
    for (let index = 0; index < this.n * 2; index++) {
      let x = Math.round(ox + Math.cos(ang) * radiusAxesSym);
      let y = Math.round(oy + Math.sin(ang) * radiusAxesSym);
      this.pointsAxesSym[index] = new Point(x, y)
      ang = ang + 2 * Math.PI / (this.n * 2);
    }
  }

  getIndexPitchFromXY(x1, y1) {
    return this.points.findIndex(p => p.contains(x1, y1))
  }
}
