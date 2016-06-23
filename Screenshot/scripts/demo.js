(function (global) {
  var DemoViewModel,
      app = global.app = global.app || {};

  DemoViewModel = kendo.data.ObservableObject.extend({
    
    defaultSettings: function () {
      if (!this.checkSimulator()) {
        navigator.screenshot.save(
          this.resultHandler
        );
      }
    },

    customSettings: function () {
      if (!this.checkSimulator()) {
        navigator.screenshot.save(
          this.resultHandler,
          'jpg', // custom extension (always jpg on iOS)
          60, // quality 0-100
          'myScreenshot' // custom filename
        );
      }
    },

    asBase64: function () {
      if (!this.checkSimulator()) {
        navigator.screenshot.URI(
          this.resultHandler,
          40 // quality 0-100
        );
      }
    },

    resultHandler: function (error, result) {
      if (error) {
        alert("Screenshot plugin error: " + error);
        return;
      }

      alert("Grabbed a screenshot, updating the preview!")
      
      if (result.filePath) {
        // file path
        document.getElementById("imageOutput").innerHTML = '<img style="width:100%" src="' + result.filePath + '">';
      } else {
        // base64 encoded
        document.getElementById("imageOutput").innerHTML = '<img style="width:100%" src="' + result.URI + '">';        
      }
    },

    checkSimulator: function() {
      if (window.navigator.simulator === true) {
        alert('This plugin is not available in the simulator.');
        return true;
      } else if (window.navigator.screenshot === undefined) {
        alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
        return true;
      } else {
        return false;
      }
    }
  });

  app.demoService = {
    viewModel: new DemoViewModel()
  };
})(window);
