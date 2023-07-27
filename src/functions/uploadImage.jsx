import { Storage } from 'aws-amplify';

export async function uploadImage(asset, imageName, updateProgress) {
  
  const fetchResourceFromURI = async uri => {
    const response = await fetch(uri);
    console.log(JSON.stringify(response));
    const blob = await response.blob();
    return blob;
  };

  let uri = asset.uri

  const img = await fetchResourceFromURI(uri);
  return Storage.put(imageName, img, {
    level: 'public',
    contentType: asset.type,
    progressCallback(uploadProgress) {
      const progressText = `Progress: ${Math.round(
        (uploadProgress.loaded / uploadProgress.total) * 100
      )} %`;
      updateProgress(progressText);
      console.log(`Progress: ${uploadProgress.loaded}/${uploadProgress.total}`);
    },
  })
    .then(res => {
      updateProgress('Upload Done: 100%');
      Storage.get(res.key)
        .then(result => console.log(result))
        .catch(err => {
          updateProgress('Upload Error');
          console.log(err);
        });
    })
    .catch(err => {
      updateProgress('Upload Error');
      console.log(err);
    });

  
}
   