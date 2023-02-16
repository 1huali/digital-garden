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
        this.talkHistoryArrayDB=[];
        this.closeButton = document.getElementById("closeDialogButton");


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

    let self=this;

    // self.sendThoughtButton.addEventListener("click", function(){
        //?? IS THIS WHERE THE AJAX FORM FORM FOR JOURNAL FORM IS CALLED

    } //end construtor

    openJournal(){
        // $("#talkBoxDialog").dialog('open');
        document.getElementById("talkBoxDiv").style = "display: block;"
    }

    closeJournal(){
        document.getElementById("talkBoxDiv").style = "display: none;"
    }

    journalDBInsert(growthPercentage){
//thoughts generated in real-time here:
      this.thoughtDate = thoughtDateData();
      console.log("saved to archive");
      this.thoughtCount += 1;
      this.thought = document.getElementById("journalTextContainer").value;
      this.thoughts.push(this.thought);
      console.log(this.thoughts)
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
    // ?? growthStage doesn't work on the 2nd time
    
    
    /*console.log to inspect the data */
                 for (let pair of data.entries()) {
                   console.log(pair[0]+ ', ' + pair[1]);
               }
/*https://api.jquery.com/jQuery.ajax/*/
$.ajax({
    type: "POST",
    enctype: 'multipart/form-data',
    url: "php/insertDB_journal.php",
    data: data,
    processData: false,//prevents from converting into a query string
    /*contentType option to false is used for multipart/form-data forms that pass files.
    When one sets the contentType option to false, it forces jQuery not to add a Content-Type header, otherwise, the boundary string will be missing from it.
    Also, when submitting files via multipart/form-data, one must leave the processData flag set to false, otherwise, jQuery will try to convert your FormData into a string, which will fail. */
    
    /*contentType: "application/x-www-form-urlencoded; charset=UTF-8", // this is the default value, so it's optional*/
    
    contentType: false, //contentType is the type of data you're sending,i.e.application/json; charset=utf-8
    cache: false,
    timeout: 600000,
    success: function (response) {
    //response is a STRING (not a JavaScript object -> so we need to convert)
    console.log("we had success!");
    console.log(response);
    // });
    },
    error:function(){
        console.log("error occurred");
        }
    });
    } //end journalDBInsert() function

    assignMsgValues(msg,msgDate){
        this.thought=msg;
        this.thoughtDate=msgDate;
        console.log(msg,msgDate);
    }

    talkHistory(){
        console.log(this.talkHistoryArrayDB);
        for (let i=0; i< this.talkHistoryArrayDB.length; i++){
        //accessing variables for each object
        $("<article>").addClass("single-archive-line").html(this.user + " thought " + this.talkHistoryArrayDB[i].msg + ": on " + this.talkHistoryArrayDB[i].msgDate).appendTo("#archive-container");
    }
}

}//end of journal class

function thoughtDateData(){
    //add hours if less than 24 hours?
    let date = new Date()
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    
    let fullDate = `${day}.${month}.${year}.`;
    return fullDate;
}