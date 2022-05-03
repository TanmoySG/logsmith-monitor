export function ResponseStandardizer(ResponseObject, callback){
    var StatusCode;
    if(ResponseObject.status == "success"){
        StatusCode = 200;
        callback(StatusCode, ResponseObject)
    }else if(ResponseObject.status == "failure" || ResponseObject.status == "failed" ){
        StatusCode = 400;
        callback(StatusCode, ResponseObject)
    }
}