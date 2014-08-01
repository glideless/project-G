(function(d,w) {

  var el = d.querySelector('#js');
  el.innerHTML = 'JavaScript works!';

  // when the page loads, set the status to online or offline
  function loadDemo() {
      if (navigator.onLine) {
          appCacheLog("Initial online status: online");
          return;
      } else {
          appCacheLog("Initial online status: offline");
          return;
      }
  }

  // add listeners on page load and unload
  w.addEventListener("load", loadDemo, true);

  var counter = 1;

  var appCacheLog = function() {
      var p = d.createElement("p");
      var message = Array.prototype.join.call(arguments, " ");
      p.innerHTML = message;
      d.getElementById("console").appendChild(p);
  }

  // log each of the events fired by w.applicationCache
  w.applicationCache.onchecking = function(e) {
      appCacheLog("Checking for updates");
  }

  w.applicationCache.onnoupdate = function(e) {
      appCacheLog("No updates found");
  }

  w.applicationCache.onupdateready = function(e) {
      appCacheLog("Update complete");
  }

  w.applicationCache.onobsolete = function(e) {
      appCacheLog("Cache obsolete");
  }

  w.applicationCache.ondownloading = function(e) {
      appCacheLog("Downloading updates");
  }

  w.applicationCache.oncached = function(e) {
      appCacheLog("Cached");
  }

  w.applicationCache.onerror = function(e) {
      appCacheLog("ApplicationCache error");
  }

  w.applicationCache.onprogress = function(e) {
      appCacheLog("Progress: downloaded file " + counter);
      counter++;
  }

  w.addEventListener("online", function(e) {
      appCacheLog("You are online");
  }, true);

  w.addEventListener("offline", function(e) {
      appCacheLog("You are offline");
  }, true);

  // Convert applicationCache status codes into messages
  var showCacheStatus = function(n) {
      statusMessages = ["Uncached","Idle","Checking","Downloading","Update Ready","Obsolete"];
      return statusMessages[n];
  }

  onload = function(e) {
      // Check for required browser features
      if (!w.applicationCache) {
          appCacheLog("HTML5 offline web applications (ApplicationCache) are not supported in your browser.");
          return;
      }

      appCacheLog("Initial AppCache status: " + showCacheStatus(w.applicationCache.status));
  }
}(document, window));
