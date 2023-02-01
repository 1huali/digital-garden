//next : now we have a journal class object but its not linked to the flower constructor. We'd need to set up the table to hold the table data and  add a function to the flower.
class Journal {

    constructor (flowerDBid, user){
        this.thoughtCount=0;
        this.thoughts=[];
        this.closingSound = document.getElementById("chimeSound");

        this.flowerId = flowerDBid;
        this.completed = false;
        this.user = user;
        this.growthStage;

        //talkbox dialog: 
// //when user press "talk" button
//  $( "#talkBoxDialog" ).dialog({
//     position: { my: "left top", at: "right bottom", of: window },
//     classes: {
//         "ui-dialog": "talkBox"
//     },
//     buttons: [
//         {
//           text: "Close",
//           click: function() {
//             $( this ).dialog( "close" );
//             //create its own function, and it will be part of the Flower class so we will call the flower
//             // flowerArray.bloom();
//             // flowerArray[flowerArray.length-1].blossom=true;

//             this.closingSound.play();
//           }
//         }
//       ]
//   });

// //closes the talkbox dialog after creating it
//   $("#talkBoxDialog").dialog('close');
    this.sendThoughtButton = document.getElementById("sendThoughtButton");
    console.log(this.sendThoughtButton);

    let self=this;

    // self.sendThoughtButton.addEventListener("click", function(){
        //?? IS THIS WHERE THE AJAX FORM FORM FOR JOURNAL FORM IS CALLED
      

    } //end construtor

    openJournal(){
        $("#talkBoxDialog").dialog('open');
    }

    journalDBInsert(growthPercentage){
      this.thoughtDate = thoughtDateData();
      console.log("saved to archive");
      this.thoughtCount += 1;
      this.thought = document.getElementById("journalTextContainer").value;
      this.thoughts.push(this.thought);
              //thoughts are saved in an array and displayed with their date :
      this.singleLineElement = $("<article>").addClass("single-archive-line").html(this.thought + ": on " + this.thoughtDate ).appendTo("#archive-container");
      this.growthStage= growthPercentage;

      this.completedState=false;
      if (this.growthStage=== 100){
        this.completedState=true;
      };

      //AJAX :
      let data = new FormData();
    
    data.append('flower_identification', this.flowerId); 
    data.append('completed_state', this.completedState);
    data.append("msg", this.thought);
    data.append("msg_date", this.thoughtDate);
    data.append("user", this.user);
    data.append("growthStage", this.growthStage); //en %
    
    
    /*console.log to inspect the data */
                 for (let pair of data.entries()) {
                   console.log(pair[0]+ ', ' + pair[1]);
               }


    
    // });
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
