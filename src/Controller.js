import Presenter from './Presenter'
import React from "react";


class Controller extends  React.Component{




   // init objects
    constructor(model,presenterModel){
        super(model);
        this.model=model;
        this.presenterModel=presenterModel;


    }

    // select values
    selectedValue=(selectorElementId)=>{

        this.presenterModel.selectedValue(selectorElementId)

    };

   // get user input and perform  request on user input data
    userInputListener=(selectorElementId,eventElementId,userInputElementId,controller,data,contentType,requestCallback)=>{

        this.presenterModel.userInputListener(selectorElementId,eventElementId,userInputElementId,controller,data,contentType,requestCallback)

    };

    //fetch request async state
    fetchRequestModel=(method,url)=>{
         return this.model.fetch(method, url);

     };

       // color matrix palette
       presentModelColorMatrix = (parentCanvasClassName,colorElementsClassName) =>{
           this.presenterModel.colorMatrix(parentCanvasClassName,colorElementsClassName);
       };

       // toggle elements
    toggleElement=(eventElementId, elementToggleId)=>{
     this.presenterModel.toggleElement(eventElementId,elementToggleId)
    };

    //hide elements
    moveOverHide=(elementMouseOverId,elementToHideId)=>{
       this.presenterModel.moveOverHide(elementMouseOverId,elementToHideId)


    };

    // change theme
    changeTheme=(eventClassName, themeClassName)=>{
       this.presenterModel.changeTheme(eventClassName,themeClassName)
    };

    exceptionMessage=(message)=>{
        this.presenterModel.exceptionMessage(message)

    };

    // change system feel
    changeThemeSystemFeel=(eventIdSliderName, themeClassName)=>
    {
        this.presenterModel.changeThemeSystemFeel(eventIdSliderName,themeClassName)

    };



    // finally render components
    render() {


        return (<div>
            <Presenter data={this.props.data}/>
        </div>)
    }
}
export  default  Controller
