
const video = document.getElementById("video");

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(`faceapimodels`),
    faceapi.nets.faceRecognitionNet.loadFromUri(`faceapimodels`),
    faceapi.nets.faceLandmark68Net.loadFromUri(`faceapimodels`),
    faceapi.nets.ssdMobilenetv1.loadFromUri(`faceapimodels`)
]).then(start);

/* Kisileri Tespit Etme ve Cizim Islemleri */
async function start() {
    document.getElementById("laodingText").style.display = "none";
    navigator.getUserMedia(
        {
            video: {}
        },
        stream => (video.srcObject = stream),
        err => console.log(err)
    );

    document.body.style.backgroundColor = "#ecf0f1";

    video.addEventListener("play", async () => {

        const canvas = faceapi.createCanvasFromMedia(video);
        document.body.append(canvas);
        const boxSize = {
            width: video.width,
            height: video.height
        };

        faceapi.matchDimensions(canvas, boxSize);

        setInterval(async () => {

            const detections = await faceapi
                .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceDescriptors();


                canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
            const resizedDetections = faceapi.resizeResults(detections, boxSize);
            //console.log(resizedDetections);

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

        }, 100)


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
          console.log("Image : " + label.images[i].imageUrl);
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
