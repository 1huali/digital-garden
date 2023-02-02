let opened= false;

class Fractals extends Flower {
  //https://thecodingtrain.com/tracks/algorithmic-botany/16-l-system-fractal-trees
  // In the inputForm class, the pattern condition would assign which class to refer too (and we could erase the "if pattern === blabla" from both classes).

      constructor(posX, posY, marker,map,flowerDBid,sound,length,user) {
        super(posX, posY, marker,map,flowerDBid,sound,length,user);

      this.dialogActivate = false;

      this.creationTimeStamp= new Date();
      this.timeStamp=0;
      this.currentAge;
      this.currentState;
      //Data from fill form
      this.growthLength; 
      this.manualMode=false;
      this.hideUsername=false;
      this.user=user;
      this.pattern="";
      this.color="";

      this.flowerDBid= flowerDBid;

      this.posX = posX;
      this.posY = posY;
      this.marker= marker;
      this.map= map;

      //about the flower growth :
      this.currentText= "seed";
      this.possibleEvolutionGeneration; //json file
      // this.flower = "꧁❀꧂";
      this.growState = this.seed;
      this.state = ["seed", "sprout", "bud", "flower"];
      this.stateIndex = 0;
      this.isGrowing = false;
      this.growthCompleted = false;
      this.fruitArray= [];

      this.waterDailyLevel=0;
      this.waterLevelArray=["░","▒","▓","█","█"];

           //FRACTALS FEATURES ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀ 
           
        this.a = this.p5Context.createVector(this.p5Context.width / 2, this.p5Context.height);
        this.b = this.p5Context.createVector(this.p5Context.width / 2, this.p5Context.height - 25);
        this.root = new Branch(this.a, this.b, this.p5Context);
        this.flower = [];

        this.flower[0]=this.root;

        this.stems = [];
        this.stemCount=0;

        this.blossom= true;
        //ascii symbol at tip

           //LEAFLET/DIV ELEMENT ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀ 

      //to access the map to have the flower div on top of the map
      this.mapLayerArray= Object.keys(this.map._layers);
      //  //the flower DIV based on the leaflet librairy to create a div element

      this.flowerEl = L.DomUtil.create("div","flowerEl",this.map._layers[this.mapLayerArray[1]]._container);
      this.flowerHoverEl = L.DomUtil.create("div","flowerHoverEl",this.map._layers[this.mapLayerArray[1]]._container);
      this.flowerEl.addEventListener("click", function(){

          let flowerHoverElClass = document.querySelectorAll(".flowerHoverEl");
          for (let i=0; i < flowerHoverElClass.length; i++){
            if (flowerHoverElClass[i].style.display === "block"); {
              flowerHoverElClass[i].style.display = "none";
              opened=false;
            }
            self.flowerHoverEl.style= "display: block;"
            opened=true;

            if (opened === true){
              setTimeout(() => {
                self.flowerHoverEl.style.display= "none"
                opened=false;
              }, "5000");
        }
          }
      });

      //attributing an ID to those DIVs
      this.flowerEl.setAttribute("id","flower"+this.flowerDBid+"_"+this.creationTimeStamp.getTime());

      //the id element :
      this.flowerId= this.flowerEl.id;
      this.flowerGenerated = false;
      this.sound= sound;

           //CANVAS ELEMENT/SETUP ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀ 

    //https://editor.p5js.org/caminofarol/sketches/r609C2cs
    let self=this;
    this.s1 = function( sketch ) {
      //console.log(sketch);
      sketch.setup = function() {
        let canvas1 = sketch.createCanvas(100, 100);
        canvas1.parent(self.flowerId);
      }
      //loop/draw is in the constructor because the elements are on individual canvases and has their own drawings :
      sketch.draw = function (){
        // console.log("get into sketchDraw")
        if (self.flowerGenerated === true){
          // sketch.background(255);

          //grow calls changeState(), who calls generate()
        self.displayFlower();
        self.grow();
       // self.bloom(); //only at fractals
        }
      }

      }

    this.p5Context = new p5(this.s1);

      this.flowerEl.style.left = `${this.posX-50}px`;
      this.flowerEl.style.top = `${this.posY-50}px`; 

      this.flowerHoverEl.style.left = `${this.posX-50}px`;
      this.flowerHoverEl.style.top = `${this.posY-150}px`; 


           //FLOWER'S OBJECT ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀ 
      //each flower object has its own journal and energy class
      this.buttons = new Button(); //generic
      this.energy = new Energy();
      this.journal = new Journal(this.flowerDBid, this.user);

     } //end Constructor

           //FUNCTIONS ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀ 


    changeState (){
//change the growing state of the flower
    this.stateIndex++;

      //Logs the text to see the state// for debugging :
          this.currentText= this.state[this.stateIndex];
          console.log(this.currentText) ;
          this.isGrowing =false;

//Whole growing array completed, the flower cycle is completed: 
          if (this.stateIndex === this.state.length-1){
            // console.log("!!send notif/email to user");
            document.getElementById("message").innerHTML = "Growing cycle completed! Congrats!";
            setTimeout(() => {
              document.getElementById("message").innerHTML = "";
            }, "5000");
            this.growthCompleted = true;
            this.blossom= true;
          }

    }
    

    generate (){
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

      //age of the tree. With the age variable, we can give it an evolution tracking time stamp to assign its visual representation.
      let date = new Date();
      this.currentAge = date.getTime() - this.timeStamp;

     let ageIntervalPerState;//25
    //  this currentState=0;
    //watch out for growth length metrics. here, it's in minutes, converted in miliseconds.
     ageIntervalPerState = (this.growthLength)/this.state.length;// 100/4

     this.currentState= this.currentAge/ageIntervalPerState;
     this.stateIndex =   this.currentState;

     if (this.currentState >= this.state.length){
      this.currentState = this.state.length-1;
      this.stateIndex =   this.currentState;

     }
      //change the growing state of the flower
      //if the growth isn't completed, the changingState() will activate the generate();.
    for (let j=0; j< this.currentState;j++){   
      this.generate();
    }
    }

  } //end Fractals_flower.js
  