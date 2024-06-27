import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCustomClock]'
})
export class CustomClockDirective {
  constructor(private element: ElementRef) {
    //const dataCorrente = new Date();
    const targetElement: HTMLElement = element.nativeElement;
    targetElement.classList.add("reddish");
    targetElement.classList.add("rounded");
    //targetElement.textContent = "La data e l'ora sono: " + dataCorrente;

    //console.log(targetElement.textContent);

    setInterval(() => {
    
      this.currentTime();
      //console.log(targetElement.textContent);
    
    }, 1000);
    
  }

  currentTime() {
    console.log("this.elementw: " + this.element);

    let date = new Date(); 
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let session = "AM";

    let hh2 = "";
    let mm2 = "";
    let ss2 = "";
  
      
    if(hh > 12){
        session = "PM";
     }
  
     hh2 = (hh < 10) ? "0" + hh : hh + "";
     mm2 = (mm < 10) ? "0" + mm : mm + "";
     ss2 = (ss < 10) ? "0" + ss : ss + "";
      
     let time = hh2 + ":" + mm2 + ":" + ss2 + " " + session;
  
     console.log(time);

     this.element.nativeElement.textContent = time;
  }
}

function $timeout(arg0: () => void, arg1: number) {
  throw new Error('Function not implemented.');
}
/*<p appCustomClock></p>
<div appCustomClock></div>*/