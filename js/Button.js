//next : now we have a journal class object but its not linked to the flower constructor. We'd need to set up the table to hold the table data and  add a function to the flower.
class Button {

    constructor (flowerInstance){

      this.waterButton = document.getElementById("waterButton");
      this.loveButton = document.getElementById("loveButton");
      this.talkButton = document.getElementById('talkButton');
      this.clicSound = document.getElementById("chimeSound");

      this.flowerInstance = flowerInstance;

    } //end construtor

    setOptionButtons(){
      //this function set up generic water/nurture buttons when a user is logged in.
      // console.log("set option buttons"); OK
      document.getElementById("flowerStatistic-buttons").style = "display : block";
    }


}//end of class
