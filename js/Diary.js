class Diary {

    constructor (){
        this.thoughtCount=0;
        this.thoughts=[];
        // this.thought;

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
            flowerArray.bloom();
            flowerArray[flowerArray.length-1].blossom=true;

            chimeSound.play();
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