
class InputForm {
    constructor(){
        this.newFlower=null;
  

    }//end constructor

  
    openInputForm(newFlower){
        let self=this;
        // $("#seedIdPopUpForm-container").dialog('open');
        document.getElementById("seedBoxDialogDiv").style="display:block";
       this.newFlower = newFlower;
    }   


//sabine added
onSubmit(locationObj,coordinateMarker ,mainMap ,flowerArray,chimeSound,appendConsoleMsg) {
 
    //submission of php flower data thru AJAX :
 $("#insertFlower").submit(function(event) {
    //stop submit the form, we will post it manually. PREVENT THE DEFAULT behaviour ...
   event.preventDefault();
 console.log("insert triggered");
appendConsoleMsg("> Success : new seed created.")


 //retrieve the infos into objet key/value pairs
  let form = $('#insertFlower')[0];
  let data = new FormData(form);
 //  updateSeedCount();


  //NEW:: SABINE:: if these items are not checked then append the off values to the data...
 if(data.get("manual_growth") == null){
     data.append("manual_growth","Off");
 }   

 if(data.get("hide_user") == null){
     data.append("hide_user","No");
 } 

 let date= new Date();
 let newFlower = new Flower(locationObj.lat, locationObj.lng, coordinateMarker ,mainMap ,flowerArray.length,chimeSound);

 flowerArray.push(newFlower);

 data.append('a_timeStamp', date.getTime());
 data.append("x_pos", newFlower.n_latLng.lat);
 data.append("y_pos", newFlower.n_latLng.lng);
 data.append("growthCompleted", newFlower.growthCompleted);
 

 //traversing fill form data to constructor : 
 newFlower.assignFormValues(data.get("a_timeStamp"),data.get("a_length")*60000, data.get("manual_growth"),data.get("hide_user"),data.get("a_fruit"),data.get("a_user"),data.get("a_pattern"), data.get("a_color"));
//  console.log(data.get("a_pattern"));

 // !! changer pr 86400000 ms (jour), mais live c'est en minute pour test purposes
               
//  //console.log to inspect the data :
//                for (let pair of data.entries()) {
//                  console.log(pair[0]+ ', ' + pair[1]);
//              }
// //
/*https://api.jquery.com/jQuery.ajax/*/
$.ajax({
type: "POST",
enctype: 'multipart/form-data',
url: "php/insertDB_flowerObj.php",
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

//sabine:: reset flower
document.getElementById("insertFlower").reset();

//FLOWER CONSTRUCTION
newFlower.flowerGenerated = true;
$("#seedIdPopUpForm-container").dialog('close');
document.getElementById("seedBoxDialogDiv").style= "display=none";

},
error:function(){
console.log("error occurred");
}
});

});//submit

console.log(flowerArray)

}


}//end class