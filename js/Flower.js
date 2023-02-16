let opened= false;

class Flower {
  //https://thecodingtrain.com/tracks/algorithmic-botany/16-l-system-fractal-trees
  // Flower as parent class, then into 2 childs : L-System and Fractal. (current)

      constructor(lat, lng, marker,map,flowerDBid,sound,length,user) {
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
      this.fruit;


      this.flowerDBid= flowerDBid;

      // this.posX = posX;
      // this.posY = posY;

      this.marker= marker;
      this.map= map;
      this.n_latLng = new L.latLng(lat,lng);
      this.point = this.map.latLngToLayerPoint(this.n_latLng);
      this.posX = this.point.x;
      this.posY = this.point.y;

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
      this.blossom=false;
      this.selected=false;

      this.waterDailyLevel=0;
      this.waterLevelArray=["░","▒","▓","█","█"];


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
    // this.s1 = function( sketch ) {
    //   //console.log(sketch);
    //   sketch.setup = function() {
    //     let canvas1 = sketch.createCanvas(100, 100);
    //     canvas1.parent(self.flowerId);
    //   }
    //   //loop/draw is in the constructor because the elements are on individual canvases and has their own drawings :
    //   sketch.draw = function (){
    //     // console.log("get into sketchDraw")
    //     if (self.flowerGenerated === true){
    //       // sketch.background(255);

    //       //grow calls changeState(), who calls generate()
    //     self.displayFlower();
    //     self.grow();
    //    // self.bloom(); //only at fractals
    //     }
    //   }

    //   }

    // this.p5Context = new p5(this.s1);

      this.flowerEl.style.left = `${this.posX-50}px`;
      this.flowerEl.style.top = `${this.posY-50}px`; 

      this.flowerHoverEl.style.left = `${this.posX-50}px`;
      this.flowerHoverEl.style.top = `${this.posY-150}px`; 


           //FLOWER'S OBJECT ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀ 
      //each flower object has its own journal and energy class
      this.buttons = new ButtonList(); //generic
      this.energy = new Energy();
      this.journal = new Journal(this.flowerDBid, this.user);

     } //end Constructor

            //FUNCTIONS ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀ 

     activateJournal(){
      console.log("activate")
      this.dialogActivate=true;
      this.journal.sendThoughtButton = document.getElementById("sendThoughtButton");
      let self=this;

      //at click, it calls growthPercentage. But putting the funtion in the Flower.js, we can traverse the retunred value dynamically 
      this.journal.sendThoughtButton.addEventListener("click", function(){self.clickHandler()});
      this.journal.openJournal();
     }

     clickHandler(){
    this.journal.journalDBInsert(this.growthPercentage());
    }

    deactivateJournal(){
    this.dialogActivate=false;

    let self = this;
    console.log("deactivate")
    let old_element = document.getElementById("sendThoughtButton");
    let new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);

    $("#talkBoxDialog").dialog('close');
    }

    highlightFlower(){
      if (this.selected === true){
        this.flowerEl.style.background= "rgba(255, 207, 228, 0.4)";
      } else {
        this.flowerEl.style.background= "rgba(255, 255, 255, 0)";
      }
    }

    grow() {
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

    }
    
    displayFlower(){
        //position of the center of the flower canvas :
        this.flowerEl.style.left = `${this.posX-50}px`;
        this.flowerEl.style.top = `${this.posY-50}px`; 
        this.flowerHoverEl.style.left = `${this.posX-50}px`;
        this.flowerHoverEl.style.top = `${this.posY-150}px`; 
    }

    generate (){

    }

    assignFormValues (timeStamp,length,autonomous_manual,show_hide,fruit,user,pattern,color){

      //traversing flower data values to flower constructor values :
      this.timeStamp=timeStamp;
      this.growthLength = length;
      this.fruit = fruit;
      this.user=user;
      this.pattern=pattern;
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

      //hover display:
      this.flowerHoverEl.innerHTML = "name : " + this.flowerId + "<br>" + "by " + this.user + "<br> age : " + this.growthLength + "years old" + "<br>" + this.currentAge + "<br>" + '<input id="hiButton" class="buttons" type="button" value="Say Hi!"> <br>';
    }

    bloom(){
      
    }

    age(){

    }

    growthPercentage(){
    //converts age/growthLenght into a %

      //calculation of the age of the tree. With the age variable, we can give it an evolution tracking time stamp to assign its visual representation.
      let date = new Date();
      let currentAge = date.getTime() - this.timeStamp; //age in minutes

    //watch out for growth length metrics. here, it's in minutes, converted in miliseconds.

      let growthPercent= currentAge/this.growthLength; //growth length in minutes

      if (growthPercent >= 1){
      growthPercent = 1;
      }

      growthPercent*=100;
      return growthPercent;

    }

    printPositions(){

      //positions printed in the data 
      document.getElementById('xPosBox').innerHTML = this.posX;
      // console.log(this.posX);
      document.getElementById('yPosBox').innerHTML = this.posY;
    }

  } //end Flower.js
  