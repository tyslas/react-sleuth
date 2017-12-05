function speedTest() {
  var imageAddr = "https://static.pexels.com/photos/371633/pexels-photo-371633.jpeg";
  var downloadSize = 2015104; //bytes

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
      console.log("promise started");
      var startTime,
        endTime;
      var download = new Image();
      download.onload = function() {
        endTime = (new Date()).getTime();
        showResults()
      }

      download.onerror = function(err, msg) {
        ShowProgressMessage("Invalid image, or error downloading");
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
