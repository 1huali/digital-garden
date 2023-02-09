// https://editor.p5js.org/codingtrain/sketches/JDT5wrxVj THANK U DANIEL SCHIFFMAN
class Branch {
    //stem.js
      constructor(begin, end, p5Context) {
        this.begin = begin;
        this.end = end;
        this.finished = false;

        this.p5Context= p5Context;
        
      }
    
    //   jitter() {
    //     this.end.x += random(-1, 1);
    //     this.end.y += random(-1, 1);
    //   }
    
      show() {

        this.p5Context.stroke(0);
        this.p5Context.line(this.begin.x, this.begin.y, this.end.x, this.end.y);

      }
    
      stemA() {
        let dir = p5.Vector.sub(this.end, this.begin);
        dir.rotate(this.p5Context.PI / 6);
        dir.mult(0.67); //to shrink the newcoming branches
        let newEnd = p5.Vector.add(this.end, dir);
        let b = new Branch(this.end, newEnd,this.p5Context);
        return b;
      }
    
      stemB() {
        let dir = p5.Vector.sub(this.end, this.begin);
        dir.rotate(-this.p5Context.PI / 4);
        dir.mult(0.67);
        let newEnd = p5.Vector.add(this.end, dir);
        let b = new Branch(this.end, newEnd,this.p5Context);
        return b;
      }
    }