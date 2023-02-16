class DraggableBox {
    constructor (){
      this.pos1 = 0;
      this.pos2 = 0;
      this.pos3 = 0;
      this.pos4 = 0;
      // Make the DIV element draggable:
      dragElement(document.getElementsByClassName("mydiv"));
    } //end construtor


 dragElement(elmnt) {
  if (document.getElementsByClassName(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementsByClassName(elmnt.id + "header").onmousedown = dragMouseDown();;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }


   function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;
    document.onmouseup = closeDragElement();
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag();
  }

   function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    this.pos1 = this.pos3 - e.clientX;
    this.pos2 = this.pos4 - e.clientY;
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - this.pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - this.pos1) + "px";
  }

   function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
  }//end dragElement();
}//end of class
