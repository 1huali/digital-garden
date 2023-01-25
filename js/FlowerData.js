//next : now we have a journal class object but its not linked to the flower constructor. We'd need to set up the table to hold the table data and  add a function to the flower.
class FlowerData {

    constructor (flowerInstance){

      this.waterButton = document.getElementById("waterButton");
      this.loveButton = document.getElementById("loveButton");
      this.talkButton = document.getElementById('talkButton');
      this.clicSound = document.getElementById("chimeSound");

      this.flowerInstance = flowerInstance;

    } //end construtor


    // assignFlowerInstance(){
    //     $("#talkBoxDialog").dialog('open');
    // }


}//end of class
