var AWS = require('aws-sdk');
const path = require('path'); 
var mimeTypes = require("./mimemapper");

exports.handler = function  (event,context,callback) {
    
    var region = process.env.S3_REGION;
	var bucket = process.env.S3_BUCKET;
	
    var keyVal = "index.html";
    var base = path.parse(event.path).base;
    var ext = path.parse(event.path).ext;
    
    console.log(base);
    console.log(ext);

    if(ext.length > 1){
        keyVal = base;
        ext = ext.replace("." , "");
    }else{
        //default to html 
        ext = "html";
    }
    
    var mimeType = mimeTypes[ext];
    if(mimeType === undefined){
        console.log("Undefined mime type ---> " + ext);
    }
    console.log(" What is the mime type " + mimeType);
    var isBase64Encoded = "utf8";
    if(mimeType.startsWith("image")){
        isBase64Encoded = 'base64';
    }
    
    var params = {
      Bucket: bucket, 
      Key: keyVal
     };
    
    
     console.log(" Bucket Param" + JSON.stringify(params));
     
     var s3 = new AWS.S3( Object.assign({ region: "eu-west-1" }) );
    
    
    
     s3.getObject(params,function(err,data){
        if(err){
            console.log("!!!!! Received Error");
            console.log(err);
            return err;
        }
        console.log("Encoding is " + isBase64Encoded);
        
        var strData = new Buffer(data.Body).toString(isBase64Encoded);
        
      
        var response = {
            statusCode: 200,
			headers: {
				'Content-Type': mimeType,
			},
			body: strData,
			isBase64Encoded: isBase64Encoded === "utf8" ? false : true
        };
        
        callback(null,response);
        
    });
    
    
};
