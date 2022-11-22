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
      this.possibleEvolutionGeneration; //json file
      // this.flower = "꧁❀꧂";
      this.growState = this.seed;
      this.state = ["seed", "sprout", "bud", "leaf", "blossom", "flower"];
      this.stateIndex = 0;

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
      this.growthLength;
      this.autonomousMode=false;
      this.hideUsername=false;
      this.fruit= "";


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
          // this.flowerEl.innerHTML = this.currentText;
          this.isGrowing =false;

          if (this.stateIndex === this.state.length-1){
            console.log("flower growth completed")
            this.growthCompleted = true;
            this.growthCompleted = false;
          }

    }
    
    displayFlower(){

        //  this.flowerEl.innerHTML = this.currentText;
        this.flowerEl.style.left = `${this.posX-50}px`;
        this.flowerEl.style.top = `${this.posY-50}px`; 
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

    assignFormValues (length){
      console.log("assigning values")
      console.log(length);
      this.growthLength= length;

      //length
      // let length1= document.getElementById("length1");
      // let length2= document.getElementById("length2");
      // let length3= document.getElementById("length3");

      // if (length1.checked) {
      //   console.log("length1 selected");
      // } else if (length2.checked){
      //   console.log("length2 selected")
      // } else if(length3.checked){
      //   console.log("length3 selected")
      // }

    //   let displayUser;
    //   let showUser = document.getElementById("showUserOption");
    //   let hideUser = document.getElementById("hideUserOption");

    //   if (showUser.checked){
    //     console.log("display user");
    //   } else if (hideUser.checked){
    //     console.log("hide user");
    //   }
    }

  } //end Flower.js
  