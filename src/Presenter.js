
import  React from  "react"
import  PresenterStyle from './presenter.css'

/**
 * presentation class
 */
class Presenter extends  React.Component{


    //render components
    render() {


        return (<div>

            <div>


                <Content data ={this.props.data}/>



            </div>
            <div>
                <Header/>

            </div>
        <div>
            <Footer/>
        </div>


        </div>)
    }


}
// create table row and populate it with data
class TableRow extends React.Component {


    //render components
    render() {

            if(this.props.data.AdvertisedTimeAtLocation){
                return (

                    <tr>
                        <td >
                            {this.transDate(this.props.data.AdvertisedTimeAtLocation)}
                        </td>
                        <td>
                            {this.props.data.FromLocation}
                        </td>
                        <td>
                            {this.props.data.InformationOwner}
                        </td>
                        <td>
                            {this.props.data.ToLocation}
                        </td>
                        <td>
                            {this.props.data.TrackAtLocation}
                        </td>
                    </tr>
                )
            }else {
                return  (
                    <tr>
                        <td >
                        </td>
                    </tr>




               )
            }

    }

    transDate(dateInstance){
        let date =new Date(dateInstance);
        return date.getDate()+":"+(date.getMonth()+1)+":"+date.getFullYear()
    }

}
// create Header. menubar and menu list is incorporate in the header
class Header extends React.Component{

    render() {
        return (<div>
            <header id={"header"} className={"theme"}>
                <span id={"title"}>  Vision</span>

                <span className={"menu"}> <input id={"menu"} className={"theme"} src={PresenterStyle} type={"button"}  value={"☰"}/>

                </span>
            </header>
            <MenuList/>
        </div>)
    }
}
// create menu list class
class MenuList extends React.Component{

    render() {
        return (<div >
            <div  id={"menu_list"}    className={"theme"} >


                <div id={"label_settings"} className={"page_settings"}>

                        <span
                              role="img"
                              aria-label={""}
                                className={"menu_list_title"}>⚙️Settings</span>

                </div>

                <div className={"page_settings"}>
                    <span className={"menu_list_title"}> <label> ✲</label>Theme</span>
                </div>




                        <div className={"page_settings"}>
                            <span >Light Theme</span>   <input type={"range"}  id={"switch"} min={0} max={1}/> <span className={"page_settings"}>Dark Theme</span>
                        </div>





                <div id={"alternative_colors"}>

                 Alternative Theme

                </div>
                <div id={"color_picker"}>

                   <span className={"color_matrix"}>

                   </span>

              </div>


            </div>
        </div>)
    }

}
// create content class. the content class hold the data response from async request
class Content extends React.Component{





    constructor(props){
        super(props);
        this.state ={
            selected:true,

        }
    }



    render=()=> {

        return (<div>
            <div   id={"content"} className={"theme"}>
                <form >
                    <div id={"request_context"}>
                        <div id={"request_label"}>  <span id={"progressBar"}>  </span>Request URL </div>
                        <div id={"request_elements"}>
                            <label>
                                <select id={"selector"}>
                                    <option value={"GET"}> GET </option>
                                    <option > POST </option>
                                    <option > OPTION </option>
                                </select><input type={"text"}  id={"request_input"} placeholder={"Enter Request URL "}/>
                                <input type={"button"}  id={"request_button"} value={"Send"}/>
                            </label>
                        </div>

                     </div>
                     <div>



                         <div id={"results"}>

                             <table className={"theme"} id={"data_table"}>
                                 <tbody>
                                 <tr><th>{"Date"}</th><th>{"From"}</th><th>{"Train"}</th><th>{"To"}</th><th>{"Platform"}</th></tr>
                                 { Object.values(this.props.data).map((value, index)=><TableRow key={index} data={value}/>)}
                                 </tbody>
                             </table>




                         </div>


                    </div>
                    <div id={"responseTextArea"}>
                        <TextArea data={this.convertible()}/>
                    </div>

                </form>
            </div>

        </div>)
    };


    convertible(){
        let result=JSON.stringify( Object.values(this.props.data));
        if(result.includes("[",2)){

            return  JSON.stringify(this.props.data)
        }else  {

            return  this.props.data
        }
    }



}
// create textarea row and populate it with data
class TextArea extends React.Component{

    render() {
        return (<div>

            <textarea  readOnly={true} className={"responseTextArea"} value={this.props.data}/>
        </div>)
    }
}
class Footer extends React.Component{

    render() {
        return (<div >

            <footer className={"theme"}  id={"footer"}>

                <span id={"footer_line"}>Ⓒ Vision project : Dan Ayettey</span>
            </footer>

        </div>)
    }
}
export default  Presenter
