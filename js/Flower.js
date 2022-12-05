
class Flower {
  //https://thecodingtrain.com/tracks/algorithmic-botany/16-l-system-fractal-trees

      constructor(posX, posY, marker,map,arrayNumber,sound,length,user,energyStatistics) {

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
//black ellipses at tip
      this.budState= false;
      //ascii symbol at tip
      this.blossom = false;

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
      sketch.draw = function (){
        // console.log("get into sketchDraw")
        self.displayFlower();
      }
      }

    this.p5Context = new p5(this.s1);
    // this.turtle();
      //end L-system

      //Data from fill form
      this.growthLength; //done
      this.manualMode=false;
      this.hideUsername=false;

      this.flowerEl.style.left = `${this.posX-50}px`;
      this.flowerEl.style.top = `${this.posY-50}px`; 
      //end Data from fill form
      this.user=user;

      this.fruitArray= [];
      this.fruit=fruit; //symbol from the fill form

      this.energyStatistics=energyStatistics;

      this.loveDailyLevel=0;
      this.waterDailyLevel=0;
      this.loveLevelArray=[" ♥"," ♥"," ♥"," ♥"," ♥"];
      this.waterLevelArray=[" ♥"," ♥"," ♥"," ♥"," ♥"];
      //level array  like  let levelIcon = " ♥ ";


 
      //fractal tree
      this.a = this.p5Context.createVector(this.p5Context.width / 2, this.p5Context.height);
      this.b = this.p5Context.createVector(this.p5Context.width / 2, this.p5Context.height - 25);
      this.root = new Branch(this.a, this.b, this.p5Context);
      this.flower = [];

      this.flower[0]=this.root;

      this.stems = [];
      this.stemCount=0;

      this.pattern="";
    } //end Constructor


    turtle () {
      // console.log("turtle rule applying....");

      this.p5Context.resetMatrix();
      //this.p5Context.background(0);
       this.p5Context.translate( this.p5Context.width / 2,  this.p5Context.height);
       this.p5Context.stroke(0, 255);
      for (let i = 0; i < this.sentence.length; i++) {
        let current = this.sentence.charAt(i);
        // console.log(current);
  
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

        //Regulates the growing changes: 
        //with timeout divided by number of states
        setTimeout(function(){
          self.changeState()}, this.growthLength/this.state.length);


        if (this.manualMode===true){
          console.log("!!stages happening by clicks and nurturing");
        } 
    }


      }

    changeState (){
//change the growing state of the flower
      
      // let counter=0;
      // this.stateIndex ++;
      // counter++;

      if (this.pattern === "lsystemAxiomF"){
      this.turtle();
    }

      //Logs the text to see the state// for debugging :
          this.currentText= this.state[this.stateIndex];
          console.log("state counter : "+counter);
          console.log(this.currentText) ;

          this.isGrowing =false;

//Whole growing array completed, the flower cycle is completed: 
          if (this.stateIndex === this.state.length-1){
            console.log("!!send notif/email to user");
            this.growthCompleted = true;
            this.growthCompleted = false;
          }
          if (this.stateIndex === this.state.length/2){
            this.budState= true;
          }

    }
    
    displayFlower(){
        //  console.log(this.currentText);

        //position of the center of the flower canvas :
        this.flowerEl.style.left = `${this.posX-50}px`;
        this.flowerEl.style.top = `${this.posY-50}px`; 

        //fractal tree
        if (this.pattern==="fractals"){
        for (let i = 0; i < this.flower.length; i++) {
        this.flower[i].show();
        }
      }

        if (this.budState=== true){
          displayBuds();
        }

        //end fractal
    }

    generate (){
      
      //L-System pattern :
      if (this.pattern === "lsystemAxiomF"){
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
} //end L-System

  //Fractal method generation:
else if (this.pattern === "fractals"){
for (let i = this.flower.length - 1; i >= 0; i--) {
  if (!this.flower[i].finished) {
    this.flower.push(this.flower[i].stemA());
    this.flower.push(this.flower[i].stemB());
  }
  // this.stem.finished = true;
}
this.stemCount++;

if (this.stemCount === 6) {
  for (var i = 0; i < this.flower.length; i++) {
    if (!this.flower[i].finished) {
      let stem = this.flower[i].end.copy();
      this.stems.push(stem);
    }
  }
}
}//end fractal method

    }

    assignFormValues (length,autonomous_manual,show_hide,fruit,user,pattern){

      //traversing flower data values to flower constructor values :
      this.growthLength = length;
      this.fruit = fruit;
      this.user=user;
      this.pattern=pattern;

      if(autonomous_manual==="on"){
        this.manualMode = true;
      }
      else{
        this.manualMode = false;
      }
      //set 
      if(show_hide==="Yes"){
        this.hideUsername = true;
      }
      else{
        this.hideUsername = false;
      }

      if (pattern=== "lsystemAxiomF"){
        this.pattern = "lsystemAxiomF";
      } else if (pattern=== "fractal"){
        this.pattern= "fractal";
      }
    
    }

    assignEnergyLevels(){
      console.log("assign water and fertilizer");
      //?? does a button go in constructor
    }

    displayBuds(){
      for (let i = 0; i < this.stems.length; i++) {
        fill(255, 0, 100, 100);
        noStroke();
        this.p5Context.ellipse(this.stems[i].x, this.stems[i].y, 8, 8);
        this.stems[i].y += random(0, 2);
      }

      //Blossom:  should this be at displayFlower?
      if (this.blossom === true){
        console.log("flowers at tip of branches");
//call blossom function
        //blooms retract after 5 mins :
        setTimeout(function(){
          this.blossom= false;
        },300000);
      }
    }


  } //end Flower.js
  