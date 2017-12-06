function speedTest(index) {

//   var imageAddr =[
//     "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Panorama_puy_de_dome_sud.jpg/1200px-Panorama_puy_de_dome_sud.jpg",
//     "https://op-cdn-madavor.netdna-ssl.com/contests/532693/the-american-landscape-beamie-0-1493386200-824x501.jpg",
//      "https://static.pexels.com/photos/371633/pexels-photo-371633.jpeg",
//   "http://www.raincoast.org/wp-content/uploads/S1I1596grizzlysittingattideline547-10MB.jpg",
// ];
//   var downloadSize = [
//     64404, 81650, 2015104, 8989774,
//   ]; //bytes

  var imageAddr = "https://static.pexels.com/photos/371633/pexels-photo-371633.jpeg"
  var downloadSize = 2015104;

  function ShowProgressMessage(msg) {
    if (console) {
      if (typeof msg == "string") {
        console.log(msg);
      } else {
        for (var i = 0; i < msg.length; i++) {
          console.log(msg[i]);
        }
      }
    }

    var oProgress = document.getElementById("progress");
    if (oProgress) {
      var actualHTML = (typeof msg == "string")
        ? msg
        : msg.join("<br />");
      oProgress.innerHTML = actualHTML;
    }
  }

  let MeasureConnectionSpeedPromise = new Promise((resolve, reject) => {
    MeasureConnectionSpeed()
    function MeasureConnectionSpeed() {
      var startTime,
        endTime;
      var download = new Image();
      download.onload = function() {
        endTime = (new Date()).getTime();
        showResults()
      }

      download.onerror = function(err, msg) {
        ShowProgressMessage("Invalid image, or error downloading");
        resolve(0)
      }

      startTime = (new Date()).getTime();
      var cacheBuster = "?nnn=" + startTime;
      download.src = imageAddr + cacheBuster;

      function showResults() {
        var duration = (endTime - startTime) / 1000;
        var bitsLoaded = downloadSize * 8;
        var speedBps = (bitsLoaded / duration).toFixed(2);
        var speedKbps = (speedBps / 1024).toFixed(2);
        var speedMbps = (speedKbps / 1024).toFixed(2);
        // ShowProgressMessage([
        //   "Your connection speed is:", speedBps + " bps",
        //   speedKbps + " kbps",
        //   speedMbps + " Mbps"
        // ]);
        resolve(speedMbps)
      }
    }
  })

  ShowProgressMessage("Loading the image, please wait...");
  return MeasureConnectionSpeedPromise.then(speedMbps => {
    return speedMbps
  })

}

export default speedTest
