//
class Energy {

    constructor (){

      this.loveDailyLevel=0;
      this.waterDailyLevel=0;
      this.waterLevelArray=["░","▒","▓","█","█"];
      this.loveLevelArray=[" ♥"," ♥"," ♥"," ♥"," ♥"];



    } //end construtor


    // printEnergyLevels(){
    //   document.getElementById('waterHeartLevelBox').innerHTML = "" ;
    // }


    printEnergyLevels(){
      //?? TO BE MOVED TO FLOWER DATA 
      document.getElementById('waterHeartLevelBox').innerHTML = "" ;
    }

    printCurrentEnergyLevel(){
              //prints the waterDaily level
              document.getElementById('waterHeartLevelBox').innerHTML ="";

              for (let i=0; i<this.waterDailyLevel;i++){
                //resets it?
                document.getElementById('waterHeartLevelBox').innerHTML ="";
                //goes thru the water level icon visuals
                document.getElementById('waterHeartLevelBox').innerHTML += this.waterLevelArray[i];
                //!! switch to call from energy class

            }
    }




}//end of class
