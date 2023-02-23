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
      this.reason="";
      this.sound= sound;

      this.flowerGenerated = false;
      this.flowerEl;
      this.flowerDBid= flowerDBid;

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


           //CANVAS ELEMENT/SETUP ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀ 

    //https://editor.p5js.org/caminofarol/sketches/r609C2cs

          //
    let self=this;

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
          //inactive
          console.log("!!stages happening by clicks and nurturing");
        } 
      }
    }

    changeState (){

    }
    
    displayFlower(){

    }

    generate (){

    }

    assignFormValues (timeStamp,length,autonomous_manual,show_hide,fruit,user,pattern,color,motivation){

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

    hoverInfos(){

      function dhm (ms) {
        let days = Math.floor(ms / (24*60*60*1000));
        let daysms = ms % (24*60*60*1000);
        let hours = Math.floor(daysms / (60*60*1000));
        let hoursms = ms % (60*60*1000);
        let minutes = Math.floor(hoursms / (60*1000));
        let minutesms = ms % (60*1000);
        let sec = Math.floor(minutesms / 1000);

        if (days < 0){
          return hours + " hrs " + minutes + " mins ";
        } else if (hours < 0){
          return minutes + " mins " + sec + " sec ";
        } else if (minutes < 0){
          return sec + " sec "
        } else {
          //not showing properly TO FIX
        return days + " days " + hours + " hrs " + minutes + " mins ";
      }


      }

      let currentAge= dhm(this.currentAge);
      // console.log(currentAge);

    //print to div :
    if (this.hideUsername === false){
      this.flowerHoverEl.innerHTML = 
      "name : " + 
      this.flowerId + 
      "<br>" + 
      "by " + 
      this.user +
      "<br> reason : " + 
      this.reason +
      "<br>" + 
      currentAge + 
      "  old" + 
      "<br>" + 
      '<input id="hiButton" class="buttons" type="button" value="Say Hi!"> <br>';
    } else if (this.hideUsername === true){
      this.flowerHoverEl.innerHTML = 
      "name : " + 
      this.flowerId + 
      "<br>" +
      "reason : " + 
      this.reason +
      "<br>" + 
      currentAge + 
      "  old" + 
      "<br>" + 
      '<input id="hiButton" class="buttons" type="button" value="Say Hi!"> <br>';
    }

      document.getElementById("hiButton").addEventListener('click', function(){
      console.log("hello!!!!");
      //should add to the daily visitor list OR print "blabla visited U" in journal
    });
    }

  } //end Flower.js
  