class InputForm {
    constructor(){

        $( "#seedIdPopUpForm-container" ).dialog({
            position: { my: "left top", at: "right bottom", of: window },
            classes: {
                "ui-dialog": "seedFillForm-dialog"
            },
                    buttons: [
              {
                text: "Cancel",
                click: function() {
                                console.log("!!change for html button");
                  $( this ).dialog( "close" );
                }
              }
            ]
          });
    
    // closes the talkbox dialog after creating it
          $("#seedIdPopUpForm-container").dialog('close');

    }//end constructor

    openInputForm(){
        $("#seedIdPopUpForm-container").dialog('open');
    }

}//end class