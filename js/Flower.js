
class Flower {
  //https://thecodingtrain.com/tracks/algorithmic-botany/16-l-system-fractal-trees

      constructor(posX, posY, marker,map,arrayNumber,sound,length,user) {

      this.timeStamp=0;
      this.currentAge;
      this.currentState;

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
      this.blossom= true;
      //ascii symbol at tip

      this.isGrowing = false;
      this.growthCompleted = false;

      //to access the map to have the flower div on top of the map
      this.mapLayerArray= Object.keys(this.map._layers);
      //  //the flower DIV based on the leaflet librairy to create a div element
      //the leaflet DIV element
      this.flowerEl = L.DomUtil.create("div","flowerEl",this.map._layers[this.mapLayerArray[1]]._container);
      //attributing an ID to those DIVs
      this.flowerEl.setAttribute("id","flower"+this.arrayNumber+"_"+this.timeStamp);
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
        if (self.flowerGenerated === true){
          // sketch.background(255);

          //grow calls changeState(), who calls generate()
        self.displayFlower();
        self.grow();
        self.bloom(); //only at fractals
        }
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

      this.loveDailyLevel=0;
      this.waterDailyLevel=0;
      this.loveLevelArray=[" ♥"," ♥"," ♥"," ♥"," ♥"];
      this.waterLevelArray=["░","▒","▓","█","█"];
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
      this.color="";
    } //end Constructor


    turtle () {
      // console.log("turtle rule applying....");

      this.p5Context.resetMatrix();
      //this.p5Context.background(0);
       this.p5Context.translate( this.p5Context.width / 2,  this.p5Context.height);
       this.p5Context.stroke(0, 255);
      for (let i = 0; i < this.sentence.length; i++) {
        let current = this.sentence.charAt(i);
        console.log(this.len);
  
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
      // console.log(this.growthLength);
      // console.log(this.state);

      let self=this;
      if (self.stateIndex < self.state.length-1 && self.isGrowing===false){
        this.isGrowing =true;

        //Regulates the growing changes: 
        //with timeout divided by number of states
        setTimeout(function(){
          //??undefined function
          self.changeState()}, this.growthLength/this.state.length);

        if (this.manualMode===true){
          console.log("!!stages happening by clicks and nurturing");
        } 
    }
      }

    changeState (){
//change the growing state of the flower

//if the growth isn't completed, the changingState() will activate the generate();.
if(this.growthCompleted===false){
    this.generate();

//The L-System requires the extra turtle(); step so it has to be activated here too :
      if (this.pattern === "lsystemAxiomF"){
        this.turtle();
      }
    }

    this.stateIndex++;

      //Logs the text to see the state// for debugging :
          this.currentText= this.state[this.stateIndex];
          console.log(this.currentText) ;

          this.isGrowing =false;

//Whole growing array completed, the flower cycle is completed: 
          if (this.stateIndex === this.state.length-1){
            // console.log("!!send notif/email to user");
            document.getElementById("message").innerHTML = "Growing cycle completed! Congrats!";
            this.growthCompleted = true;
            this.blossom= true;
          }

          // if (this.stateIndex === this.state.length/2){
          //   this.blossom= true;
          // }
    }
    
    displayFlower(){
        //  console.log(this.currentText);

        // console.log(this.posX);
        // console.log(this.posY);
        //position of the center of the flower canvas :
        this.flowerEl.style.left = `${this.posX-50}px`;
        this.flowerEl.style.top = `${this.posY-50}px`; 

        //fractal tree
        if (this.pattern==="fractals"){
        for (let i = 0; i < this.flower.length; i++) {
        this.flower[i].show();
        }
      }

        //end fractal
    }

    generate (){
      // this is where we generate both patterns. L-System requires turtle too :
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

    assignFormValues (timeStamp,length,autonomous_manual,show_hide,fruit,user,pattern,color){

      //traversing flower data values to flower constructor values :
      this.timeStamp=timeStamp;
      this.growthLength = length;
      this.fruit = fruit;
      this.user=user;
      this.pattern=pattern;
      console.log(this.pattern);
      this.color=color;
      
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
    
      this.age();

    }

    assignEnergyLevels(){
      // console.log("assign water and fertilizer for ??each flower");
      document.getElementById('waterHeartLevelBox').innerHTML = "" ;
      document.getElementById('vitaminsHeartLevelBox').innerHTML = "" ;

    }

    bloom(){
      
    if (this.blossom=== true){
      for (let i = 0; i < this.stems.length; i++) {
        fill(255, 0, 100, 100);
        noStroke();
        // this.p5Context.ellipse(this.stems[i].x, this.stems[i].y, 8, 8);
        this.p5Context.textSize(8);
        this.p5Context.text(this.fruit,this.stems[i].x, this.stems[i].y);
        // this.stems[i].y += random(0, 2);
      }
    }
        //blooms retract after 5 mins :
        setTimeout(function(){
          this.blossom= false;
        }, 300000);
      
    }

    age(){

      //calculation of the age of the tree. With the age variable, we can give it an evolution tracking time stamp to assign its visual representation.
      let date = new Date();
      this.currentAge = date.getTime() - this.timeStamp;

     let ageIntervalPerState;//25
    //  this currentState=0;
    //watch out for growth length metrics. here, it's in minutes, converted in miliseconds.
     ageIntervalPerState = (this.growthLength)/this.state.length;// 100/4

     this.currentState= this.currentAge/ageIntervalPerState;

     if (this.currentState >= this.state.length){
      this.currentState = this.state.length-1;

     }

      //change the growing state of the flower
      
      //if the growth isn't completed, the changingState() will activate the generate();.
    for (let j=0; j< this.currentState;j++){   
      this.generate();
    }

      //The L-System requires the extra turtle(); step so it has to be activated here too :
            if (this.pattern === "lsystemAxiomF"){
              this.turtle();
            }
        
      
          // this.stateIndex++;
      
            //Logs the text to see the state// for debugging :
                // this.currentText= this.state[this.stateIndex];
                // console.log(this.currentText) ;
      
                // this.isGrowing =false;
      
      //Whole growing array completed, the flower cycle is completed: 
                // if (this.stateIndex === this.state.length-1){
                //   // console.log("!!send notif/email to user");
                //   document.getElementById("message").innerHTML = "Growing cycle completed! Congrats!";
                //   this.growthCompleted = true;
                //   this.blossom= true;
                // }
      
          

    }

  } //end Flower.js
  