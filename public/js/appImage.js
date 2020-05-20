const myImage = document.getElementById("image");

/* Modelleri Yukledik */
Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri(`faceapimodels`),
  faceapi.nets.faceLandmark68Net.loadFromUri(`faceapimodels`),
  faceapi.nets.ssdMobilenetv1.loadFromUri(`faceapimodels`)
]).then(start);


/* Kisileri Tespit Etme ve Cizim Islemleri */
async function start() {
  document.getElementById("filearea").style.display = "block";
  document.getElementById("filestate").style.display = "none";
  //document.body.append("Tüm modeller Yüklendi..");

  myImage.addEventListener("change", async () => {
    
    var canvasfirst =document.getElementsByTagName('canvas');
    if(canvasfirst[0] != null){
      canvasfirst[0].remove();
    }

    var imagefirst =document.getElementsByTagName('img');
    if(imagefirst[0] != null){
      imagefirst[0].remove();
    }

    const selectedImage = await faceapi.bufferToImage(myImage.files[0]);
    document.body.append(selectedImage);
    
    const detections = await faceapi
      .detectAllFaces(selectedImage)
      .withFaceLandmarks()
      .withFaceDescriptors();

    const displaySize = {
      width: selectedImage.width,
      height: selectedImage.height
    };

    const resizedDetections = faceapi.resizeResults(detections, displaySize);

    const canvas = faceapi.createCanvasFromMedia(selectedImage);
    document.getElementById("imagearea").append(canvas);
    faceapi.matchDimensions(canvas, displaySize);

    // resizedDetections.forEach(d => {
    //   const box = d.detection.box;
    //   const drawBox = new faceapi.draw.DrawBox(box, { label: "Kimdir Bu?" });
    //   drawBox.draw(canvas);
    // });

    const results = resizedDetections.map(d =>
      faceMatcher.findBestMatch(d.descriptor)
    );

    results.forEach((result, i) => {
      const box = resizedDetections[i].detection.box;
      const drawBox = new faceapi.draw.DrawBox(box, {
        label: result.toString()
      });
      drawBox.draw(canvas);
    });
  });

  const labelDescriptions = await loadImages();
  const faceMatcher = new faceapi.FaceMatcher(labelDescriptions, 0.6);
}

/* Db Uzerindeki Resimleri Yukleme Islemi */
async function loadImages() {

  // Burada kullanıcı idler
  var labels = [];
  liste.forEach(element => {
    labels.push(element);
  });

  return Promise.all(
    labels.map(async label => {
      const descriptions = [];

      for (let i = 0; i < label.images.length; i++) {
        console.log("Resim : " + label.images[i].imageUrl);
        const image = await faceapi.fetchImage(
          `imagedatabase/${label._id}/${label.images[i].imageUrl}`
        );

        const detections = await faceapi
          .detectSingleFace(image)
          .withFaceLandmarks()
          .withFaceDescriptor();
        descriptions.push(detections.descriptor);
      }
      return new faceapi.LabeledFaceDescriptors(label.username, descriptions);
    })
  );
}
