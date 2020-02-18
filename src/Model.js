
class Model{



    // fetch request
    fetch(method,url){
       let httpRequest = new XMLHttpRequest();
        httpRequest.open(method,url,true);

        return httpRequest;
    }






}
export default Model
