//next : now we have a diary class object but its not linked to the flower constructor. We'd need to set up the table to hold the table data and  add a function to the flower.
class Diary {

    constructor (){
        this.thoughtCount=0;
        this.thoughts=[];
        this.closingSound = document.getElementById("chimeSound");

        //talkbox dialog: 
//when user press "talk" button
 $( "#talkBoxDialog" ).dialog({
    position: { my: "left top", at: "right bottom", of: window },
    classes: {
        "ui-dialog": "talkBox"
    },
    buttons: [
        {
          text: "Close",
          click: function() {
            $( this ).dialog( "close" );
            //create its own function, and it will be part of the Flower class so we will call the flower
            // flowerArray.bloom();
            // flowerArray[flowerArray.length-1].blossom=true;

            this.closingSound.play();
          }
        }
      ]
  });

//closes the talkbox dialog after creating it
  $("#talkBoxDialog").dialog('close');
    this.sendThoughtButton = document.getElementById("sendThoughtButton");

    let self=this;
    self.sendThoughtButton.addEventListener("click", function(){
  self.thoughtDate = thoughtDateData();
  console.log("saved to archive");
  self.thoughtCount += 1;
  self.thought = document.getElementById("diaryTextContainer").value;
  self.thoughts.push(self.thought);
          //thoughts are saved in an array and displayed with their date :
  self.singleLineElement = $("<article>").addClass("single-archive-line").html(self.thought + ": on " + self.thoughtDate ).appendTo("#archive-container");
});

    } //en construtor

    openDiary(){
        $("#talkBoxDialog").dialog('open');
    }

    


}//end of class

function thoughtDateData(){
    //add hours if less than 24 hours?
    let date = new Date()
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    
    let fullDate = `${day}.${month}.${year}.`;
    return fullDate;
}