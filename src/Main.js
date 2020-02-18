import React from "react";
import Controller from "./Controller";
import Model from "./Model";
import PresenterModel from "./PresenterModel";


class Main extends React.Component{


    //init objects
      constructor(props){
          super(props);

              this.state={

                  timeTable: "<REQUEST>" +
                      "<LOGIN authenticationkey='0a561ed7aeda4c8fb370386e0630c5d2' />" +
                      "<QUERY objecttype='TrainAnnouncement' " +
                      "orderby='AdvertisedTimeAtLocation' schemaversion='1'>" +
                      "<FILTER>" +
                      "<AND>" +
                      "<OR>" +
                      "<AND>" +
                      "<GT name='AdvertisedTimeAtLocation' " +
                      "value='$dateadd(-00:15:00)' />" +
                      "<LT name='AdvertisedTimeAtLocation' " +
                      "value='$dateadd(14:00:00)' />" +
                      "</AND>" +
                      "<GT name='EstimatedTimeAtLocation' value='$now' />" +
                      "</OR>" +
                      "<EQ name='LocationSignature' value='Cst' />" +
                      "<EQ name='ActivityType' value='Avgang' />" +
                      "</AND>" +
                      "</FILTER>" +
                      "<INCLUDE>InformationOwner</INCLUDE>" +
                      "<INCLUDE>AdvertisedTimeAtLocation</INCLUDE>" +
                      "<INCLUDE>TrackAtLocation</INCLUDE>" +
                      "<INCLUDE>FromLocation</INCLUDE>" +
                      "<INCLUDE>ToLocation</INCLUDE>" +
                      "</QUERY>" +
                      "</REQUEST>",


                  data:
                      [
                          {
                              "id": 1,
                              "name": "Foo",
                              "age": "20"
                          },
                          {
                              "id": 2,
                              "name": "Bar",
                              "age": "30"
                          },
                          {
                              "id": 3,
                              "name": "Baz",
                              "age": "40"
                          }
                      ]
                  ,
                  url:"https://api.trafikinfo.trafikverket.se/v2/data.json",
                  isMount: false
              };




      }

      // perform request
    promises=(controller,method,url,data,contentType)=>{



        let xhr= controller.fetchRequestModel(method,url);
        xhr.setRequestHeader("Content-Type",contentType);


        xhr.onprogress=()=>{
            controller.presenterModel.progress(xhr.readyState,"progressBar")
        };

        xhr.onerror=()=>{
           // alert("Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource. Not allowed ")
        };


        xhr.onreadystatechange = () => {


            if ( xhr.status === 200 ) {

                if (xhr.DONE && contentType === "application/xml" && xhr.readyState === 4) {
                    let parsedJson = JSON.parse(xhr.response);
                    let parsedResult = parsedJson.RESPONSE.RESULT[0];


                    this.setState({data: parsedResult.TrainAnnouncement})
                } else  {

                    this.setState({data: xhr.responseText})
                }


            } else if ([0, 1, 2, 3].includes(xhr.readyState)) {

                controller.presenterModel.progress(xhr.readyState, "progressBar");
                this.setState({data: xhr.responseText})
            } else if ([405].includes(xhr.status)) {


                this.setState({data: "Method not allowed"});

                controller.exceptionMessage("Method not allowed")

            } else if ([500].includes(xhr.status)) {

                controller.exceptionMessage("Server Error");
                this.setState({data: Object.values(xhr.response)})
            } else if ([400].includes(xhr.status)) {

                controller.exceptionMessage("Bad request, no root element found");
                this.setState({data: xhr.response})
            } else if ([404].includes(xhr.status)) {

                controller.exceptionMessage("element not found");
                this.setState({data: xhr.response})
            } else if ([304].includes(xhr.status)) {

                this.setState({data: xhr.response})


            } else {

                this.setState({data: xhr.response})
            }


        };

        xhr.send(data);




    };



    componentDidMount() {
        let model = new Model();
        let presenterModel =new PresenterModel();
        let controller = new Controller(model,presenterModel);
        controller.presentModelColorMatrix("color_matrix","variable_Color");
        controller.toggleElement("menu","menu_list");
        controller.moveOverHide("content","menu_list");
        controller.changeTheme("variable_Color","theme");
        controller.changeThemeSystemFeel("switch","theme");
         this.promises(controller,"POST",this.state.url,this.state.timeTable,"application/xml");
        controller.selectedValue("selector",controller);


         controller.userInputListener("selector","request_button","request_input",controller,"","text/plain",this.promises)



    }









   // render component
    render() {



        return (<Controller data={this.state.data}/>)
    }
}

export default Main
