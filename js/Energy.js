//
class Energy {

    constructor (){

      this.loveDailyLevel=0;
      this.waterDailyLevel=0;
      this.waterLevelArray=["░","▒","▓","█","█"];
      this.loveLevelArray=[" ♥"," ♥"," ♥"," ♥"," ♥"];

    } //end construtor


    printEnergyLevels(){
      document.getElementById('waterHeartLevelBox').innerHTML = "" ;
    }

    printCurrentEnergyLevel(){

              document.getElementById('waterHeartLevelBox').innerHTML ="";

              //prints the waterDaily level
              for (let i=0; i<this.waterDailyLevel;i++){
                //start at 0
                document.getElementById('waterHeartLevelBox').innerHTML ="";
                //goes thru the water level icon visuals
                document.getElementById('waterHeartLevelBox').innerHTML += this.waterLevelArray[i];
                //!! switch to call from energy class

            }
    }




}//end of class
