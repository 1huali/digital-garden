//next :change the class name to buttonList
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

    pressLoveButton(){

    //   this.loveButton.addEventListener("click", function (){
    //     this.clicSound.play();
    //     setTimeout(() => {
    //       document.getElementById("flowerThoughts-container").innerHTML= "I love U too!!"
    //     }, "100");
  

    //   });
    }


}//end of class
