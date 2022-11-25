//??growingLength doesn't assign or something

class Flower {
  //https://thecodingtrain.com/tracks/algorithmic-botany/16-l-system-fractal-trees

    constructor(posX, posY, marker,map,arrayNumber,sound,length) {
      let date = new Date();
      this.germinationDay= date.toLocaleTimeString();
      this.arrayNumber= arrayNumber;
      
      // this.name = "";
      this.posX = posX;
      this.posY = posY;
      this.marker= marker;
      this.map= map;

      this.currentText= "seed";
      this.possibleEvolutionGeneration; //json file
      // this.flower = "꧁❀꧂";
      this.growState = this.seed;
      this.state = ["seed", "sprout", "bud", "flower"];
      this.stateIndex = 0;
      this.blossomState = false;


      this.isGrowing = false;
      this.growthCompleted = false;

      //to access the map to have the flower div on top of the map
      this.mapLayerArray= Object.keys(this.map._layers);
      //  //the flower DIV based on the leaflet librairy to create a div element
      //the leaflet DIV element
      this.flowerEl = L.DomUtil.create("div","flowerEl",this.map._layers[this.mapLayerArray[1]]._container);
      //attributing an ID to those DIVs
      this.flowerEl.setAttribute("id","flower"+this.arrayNumber+"_"+this.germinationDay);
      //the id element :
      this.flowerId= this.flowerEl.id;
      this.flowerGenerated = false;
      this.sound= sound;
    
      //L-System

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
        canvas1.parent(self.flowerId);
      }
      }

    this.p5Context = new p5(this.s1);
    this.turtle();
      //end L-system

      //Data from fill form
      this.growthLength; //done
      this.autonomousMode=false;
      this.hideUsername=false;
      this.fruit= "";


      this.flowerEl.style.left = `${this.posX-50}px`;
      this.flowerEl.style.top = `${this.posY-50}px`; 


      //end Data from fill form
    } //end Constructor

    turtle () {
      // console.log("turtle rule applying....");
      this.p5Context.resetMatrix();
      //this.p5Context.background(0);
       this.p5Context.translate( this.p5Context.width / 2,  this.p5Context.height);
       this.p5Context.stroke(0, 255);
      for (let i = 0; i < this.sentence.length; i++) {
        let current = this.sentence.charAt(i);
        // console.log(this.sentence);
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
// console.log("flower is growing");
      let self=this;
      if (self.stateIndex < self.state.length-1 && this.isGrowing===false){
        this.isGrowing =true;
        setTimeout(function(){
          self.changeState()}, this.growthLength/this.state.length);
    }
      }

    changeState (){
//visual of the growing flower
// console.log("gets to change state")
      this.stateIndex ++;
      this.generate();
      this.turtle();
          this.currentText= this.state[this.stateIndex];
          console.log(this.currentText) ;
          this.isGrowing =false;

          if (this.stateIndex === this.state.length-1){
            this.growthCompleted = true;
            this.growthCompleted = false;
          }
//for debugging purposes : 
          if (this.growthCompleted=== true){
            console.log("timer done");
          }

    }
    
    displayFlower(){
// console.log("gets to display flower")
        //  console.log(this.currentText);
        this.flowerEl.style.left = `${this.posX-50}px`;
        this.flowerEl.style.top = `${this.posY-50}px`; 
    }

    generate (){
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

    assignFormValues (length,autonomous_value, show_hide){
      // console.log("assigning values")

      //assigning growth length to flower constructor :
      this.growthLength = length;
      console.log(this.growthLength);
      if(autonomous_value==="on"){
        this.autonomousMode = true;
      }
      else{
        this.autonomousMode = false;
      }

      //set 

      if(show_hide==="Yes"){
        this.hideUsername = true;
      }
      else{
        this.hideUsername = false;
      }
   
      // console.log(this.hideUsername);
      // console.log(this.growthLength);
      // console.log(this.autonomousMode);
    
    }

    assignEnergyLevels(){
      console.log("assign water and fertilizer");
      //water and fertilizer levels will be transferred from script to here
    }

  } //end Flower.js
  