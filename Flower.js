class Flower {
  //https://thecodingtrain.com/tracks/algorithmic-botany/16-l-system-fractal-trees

    constructor(posX, posY, marker,map,arrayNumber,sound) {
      let date = new Date();
      this.germinationDay= date.toLocaleTimeString();
      this.arrayNumber= arrayNumber;
      
      // this.name = "";
      this.posX = posX;
      this.posY = posY;
      this.marker= marker;
      this.map= map;

      this.currentText= "seed";
      this.fruit= "❀"; //data from fill form
      this.possibleEvolutionGeneration; //json file
      // this.flower = "꧁❀꧂";
      this.growState = this.seed;
      this.state = ["seed", "sprout", "bud", "leaf", "blossom", "flower"];
      this.stateIndex = 0;

      this.isGrowing = false;
      this.growthCompleted = false;

      this.mapLayerArray= Object.keys(this.map._layers);
      this.flowerEl = L.DomUtil.create("div","flowerEl",this.map._layers[this.mapLayerArray[1]]._container);
      this.flowerEl.setAttribute("id","flower"+this.arrayNumber+"_"+this.germinationDay);
      this.flowerId= this.flowerEl.id;
      this.flowerGenerated = false;
      this.sound= sound;
    
      //L-System
      //l-system

      this.angle= radians(25);
      this.axiom = "F";
      this.sentence = this.axiom;
      this.len = 20;
      this.rules = [];
      this.rules[0] = {
        a: "F",
        b: "FF+[+F-F-F]-[-F+F+F]"
    }

    //https://editor.p5js.org/caminofarol/sketches/r609C2cs
    let self=this;
    this.s1 = function( sketch ) {
      //console.log(sketch);
      sketch.setup = function() {
        let canvas1 = sketch.createCanvas(100, 100);
        canvas1.parent("lSysTestZone");

      }
      }

    this.p5Context = new p5(this.s1);
   this.turtle();
      //
    }

    turtle () {
      //background(51);
  console.log(this.sentence);
      //createCanvas(400, 400);
      console.log("turtle rule applying....");
      this.p5Context.resetMatrix();
       this.p5Context.translate( this.p5Context.width / 2,  this.p5Context.height);
       this.p5Context.stroke(255, 100);
      for (let i = 0; i < this.sentence.length; i++) {
        let current = this.sentence.charAt(i);
        console.log(this.sentence);
        console.log(current);
  
        if (current == "F") {
           this.p5Context.line(0, 0, 0, -this.len);
           this.p5Context.translate(0, -this.len);
        } else if (current == "+") {
           this.p5Context.rotate(this.angle);
        } else if (current == "-") {
           this.p5Context.rotate(-this.angle)
        } else if (current == "[") {
           this.p5Context.push();
        } else if (current == "]") {
           this.p5Context.pop();
        }
      }
    }

    grow() {

      let self=this;
      if (self.stateIndex < self.state.length-1 && this.isGrowing===false){
        this.isGrowing =true;
        setTimeout(function(){
          self.changeState()}, 1000);
    }
      }

    changeState (){
//visual of the growing flower
      this.stateIndex ++;
          this.currentText= this.state[this.stateIndex];
          // console.log(this.currentText);
          this.flowerEl.innerHTML = this.currentText;
          this.isGrowing =false;

          if (this.stateIndex === this.state.length-1){
            console.log("flower growth completed")
            growthCompleted = true;
            growthCompleted = false;
          }

    }
    
    displayFlower(){

         this.flowerEl.innerHTML = this.currentText;
        this.flowerEl.style.left = `${this.posX}px`;
        this.flowerEl.style.top = `${this.posY}px`; 
    }

    generate (){
      console.log("generating.....")
      this.len *= 0.5;
      let nextSentence = "";
      for (let i = 0; i < this.sentence.length; i++) {
        let current = this.sentence.charAt(i);
        let found = false;
        for (let j = 0; j < this.rules.length; j++) {
          if (current == this.rules[j].a) {
            found = true;
            nextSentence += this.rules[j].b;
            break;
          }
        }
        if (!found) {
          nextSentence += current;
        }
      }
      this.sentence = nextSentence;    
    }

  } //end Flower.js
  