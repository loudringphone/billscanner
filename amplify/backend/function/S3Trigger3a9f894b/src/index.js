var AWS = require('aws-sdk');
var ddb = new AWS.DynamoDB();

exports.handler = async function(event, context, callback) {
  console.log('Received S3 event:', JSON.stringify(event, null, 2));
  const eventName = event.Records[0].eventName;
  const bucket = event.Records[0].s3.bucket.name; //eslint-disable-line
  let key = event.Records[0].s3.object.key.replace('%3A', ':'); //eslint-disable-line
  console.log(`Bucket: ${bucket}`, `Key: ${key}`);
  
  await putImageDB(key);
  
  function putImageDB(key) {
    let imageTable = "Image-ztaccxdfejathbksdee52ilrx4-staging";
    console.log('key',key)
    let user = key.split('/')[1];
    let name = key.split('/')[2].split('.')[0]
    let online = 'public';
    let date = new Date().toISOString();
    var params = {
      TableName: imageTable,
      Item: {
        id: { S: name },
        imageName: { S: name },
        user: { S: user },
        online: { S: online },
        date: { S: date },
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
