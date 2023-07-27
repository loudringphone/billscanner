var AWS = require('aws-sdk');
var ddb = new AWS.DynamoDB();
var rekognition = new AWS.Rekognition();

exports.handler = async function(event, context, callback) {
  console.log('Received S3 event:', JSON.stringify(event, null, 2));
  const eventName = event.Records[0].eventName;
  const bucket = event.Records[0].s3.bucket.name;
  let key = event.Records[0].s3.object.key.replace('%3A', ':').replaceAll('%40', '@');
  console.log(`Bucket: ${bucket}`, `Key: ${key}`);
  
  let rekognitionResult = await launchRecognition(key, bucket)
  console.log(rekognitionResult)
  await putImageDB(key, rekognitionResult);
  


  function launchRecognition(key, bucket) {
    let params = {
      Image: {
        S3Object: {
          Bucket: bucket,
          Name: key
        }
      }
    };
  return rekognition.detectText(params).promise()
  }

  function putImageDB(key, analysisResult) {
    let imageTable = "Image-ztaccxdfejathbksdee52ilrx4-staging";
    console.log('key',key)
    let isAnalyse = analysisResult ? true : false;
    let user = key.split('/')[1];
    let imageName = key.split('/')[2].split('.')[0];
    let online = 'public';
    let date = new Date().toISOString();
    var params = {
      TableName: imageTable,
      Item: {
        id: { S: imageName },
        imageName: { S: imageName },
        user: { S: user },
        online: { S: online },
        date: { S: date },
        isAnalyse: { BOOL: isAnalyse },
        analysisResult: { S: JSON.stringify(analysisResult) },
      }
    };
    console.log(params)
    
    // Call DynamoDB to add the item to the table
    return ddb.putItem(params, function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data);
        context.done(null, 'Successfully processed S3 event'); // SUCCESS with message
      }
    }).promise();
  }
};
