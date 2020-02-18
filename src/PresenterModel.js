
import  "./presenter.css"

class PresenterModel {

    //an instance
    method;





    //color matrix
    colorMatrix(parentCanvasClassName,colorElementsClassName){

       let colorCanvas = document.getElementsByClassName(parentCanvasClassName)[0];
        let var_color = document.getElementsByClassName(colorElementsClassName);

      for(let x =0; x <30; x++){

         colorCanvas.innerHTML += `<span class="variable_Color" onclick=""> </span>` ;


         for(let y=0;  y<=x; y++){
             let  perc = 60.0 *y;
             var_color[y].style.background = "hsl("+perc+", 50%, 50%)" ;
             var_color[y].style.color ="hsl(0, 0%, 100%)"

         }

      }




    }

    //progress dot
    progress(count,progressBarElementId){
        let progressBarElement = document.getElementById(progressBarElementId);
        let  perc = 60.0 *count;
        progressBarElement.style.background = "hsl("+perc+", 50%, 50%)"

    }



    //toggle element
    toggleElement(eventElementId, elementToggleId){
        let eventElement= document.getElementById(eventElementId);
        let toToggle =   document.getElementById(elementToggleId);


        eventElement.addEventListener("click",function () {

            if( toToggle.style.visibility === "visible"){
                toToggle.style.visibility = "hidden";
            }else {
                toToggle.style.visibility = "visible";
            }




        })
    }

    moveOverHide(elementMouseOverId,elementToHideId){
        let hide =document.getElementById(elementToHideId);
        let overElement = document.getElementById(elementMouseOverId);
        overElement.addEventListener("mouseenter" ,function() {
            hide.style.visibility = "hidden"

        })


    }

    selectedValue=(selectorElementId)=>{


        let overElement = document.getElementById(selectorElementId);
        overElement.addEventListener("click" ,(ev)=> {

            this.method=ev.target.value



        });


    };
    changeTheme(eventClassName, themeClassName){
        let theme = document.querySelectorAll("."+themeClassName);
        let event= document.querySelectorAll("."+eventClassName);

        event.forEach(function (event) {
        event.addEventListener("click",function (el) {

            theme.forEach(function (change) {
                change.style.background  = el.target.style.background;
                change.style.color = "white";
                change.style.boxShadow = "0 0px 4px  white"
            })


        })
    })
    }
    // empty elements
    empty=(elementId)=>{

           let obj=document.getElementById(elementId);
               obj.value = ""



    };
    // set element visibilty
    isVisible=(elementId,enable)=>{
        if(enable){
            document.getElementById(elementId).style.display= "block"
        }else {
            document.getElementById(elementId).style.display= "none"
        }


    };

    //exceptional messages
    exceptionMessage=(message)=>{
        alert(message)

    };

    // get use input and preform operations
    userInputListener(selectorElementId,eventElementId,userInputElementId,controller,data,contentType,requestCallback){

        let requestButton= document.getElementById(eventElementId);
        let userInput= document.getElementById(userInputElementId);
        let overElement = document.getElementById(selectorElementId);

        requestButton.addEventListener("click",(ev)=> {
            ev.stopPropagation();
            this.isVisible("results",false);
            this.isVisible("responseTextArea",true);
             this.empty("responseTextArea");

                this.method=overElement.value;
            if([undefined,""," ",null].includes(userInput.value) || [undefined,""," ",null].includes(this.method)){

                this.exceptionMessage("The request method and text field must not be left empty")
            }else {

                requestCallback(controller,this.method,userInput.value,data,contentType);

            }







        })
    }



    // change system feel
    changeThemeSystemFeel(eventIdSliderName, themeClassName)
    {
        let theme = document.querySelectorAll("." + themeClassName);
        let event = document.getElementById(eventIdSliderName);

        event.addEventListener("click", function (el) {

            theme.forEach(function (change) {

                if(el.target.value === "0" ){
                    change.style.background = "RGB(46, 52, 64)";
                    change.style.color = "white";
                    change.style.boxShadow = "0 0px 4px  lightgray"
                }else  if(el.target.value === "1" ) {
                    change.style.background = "#f5f5f5";
                    change.style.color = "black";
                    change.style.boxShadow = "0 0px 4px  gray"
                }

            })


        })

    }



}
export  default  PresenterModel
