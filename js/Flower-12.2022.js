//back-up copy as of december 2022 2pm, with L-System

class Flower {
  //https://thecodingtrain.com/tracks/algorithmic-botany/16-l-system-fractal-trees
  //Flower as main class. (archived feb 2nd 2023)


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
      }

    this.p5Context = new p5(this.s1);
    this.turtle();
      //end L-system

      //Data from fill form
      this.growthLength; //done
      this.autonomousMode=false;
      this.hideUsername=false;

      this.flowerEl.style.left = `${this.posX-50}px`;
      this.flowerEl.style.top = `${this.posY-50}px`; 
      //end Data from fill form
      this.user=user;

      this.fruitArray= [];
      this.fruit=fruit; //symbol from the fill form

      this.energyStatistics=energyStatistics;
      this.vitaminsLevel=5;
      this.waterLevel=5;
      // console.log(this.vitaminsLevel);
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
        setTimeout(function(){
          self.changeState()}, this.growthLength/this.state.length);
    }
//??where to put this ? to assign do we need to implement in local storage? + change the name of flower
  //   if (this.waterLevel <= 1) {
  //     this.waterLevel = 1;
  //   }
  //   setInterval(() => {
  //     this.waterLevel -= 1;
  //     console.log("water--");
  //   // printIcon();
  //  }, this.growthLength/this.state.length);
  // //  console.log(this.length);
  // //  console.log(this.waterLevel);


  //  if (this.vitaminsLevel <= 1) {
  //   this.vitaminsLevel = 1;
  //   setInterval(() => {
  //     this.vitaminsLevel -= 1;
  //     console.log("vitamins--");
  //   // printIcon();
  //  }, this.growthLength/this.state.length);  //how to assign by cycle length?

// }


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
//?? should this be at displayFlower?
          if (this.blossom === true){
            console.log("flowers at tip of branches");
//call blossom function
            //blooms retract after 5 mins :
            setTimeout(function(){
              this.blossom= false;
            },300000);
          }

          //bud appears
          if (this.stateIndex === this.state.length/2){
            this.budState= true;
            //??I need to create a vector of the last branch coordinate
            let budCoordinates;
            console.log("bud appeared!")
            //   if (!this.growthCompleted) {
            //     let leaf = tree[i].end.copy();
            //     leaves.push(leaf);
            // }
            //call buds();
          }

    }
    
    displayFlower(){
        //  console.log(this.currentText);

        //position of the center of the flower canvas :
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

    assignFormValues (length,autonomous_value, show_hide,fruit,user){

      //traversing flower data values to flower constructor values :
      this.growthLength = length;
      this.fruit = fruit;
      this.user=user;
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
    
    }

    assignEnergyLevels(){
      console.log("assign water and fertilizer");
      //water and fertilizer levels will be transferred from script to here
    }

//     flowerBlossom (){
// console.log("flower can blossom")
// //flower blossons user talks to user && when bud state === true ; ascii symbol appears
//blossom chime also
//     }

// buds(){
  // for (var i = 0; i < leaves.length; i++) {
  //   fill(255, 0, 100, 100);
  //   noStroke();
  //   ellipse(leaves[i].x, leaves[i].y, 8, 8);
  //   leaves[i].y += random(0, 2);
  // }
// }


  } //end Flower.js
  