function focusOrCreateTab(url) {
  chrome.windows.getAll({"populate":true}, function(windows) {
    var existing_tab = null;
    for (var i in windows) {
      var tabs = windows[i].tabs;
      for (var j in tabs) {
        var tab = tabs[j];
        if (tab.url == url) {
          existing_tab = tab;
        break;
        }
      }
    }
    if (existing_tab) {
      chrome.tabs.update(existing_tab.id, {"selected":true});
    } else {
      chrome.tabs.create({"url":url, "selected":true});
    }
  });
}


chrome.browserAction.onClicked.addListener(function(tab) {
  var manager_url = chrome.extension.getURL("front-end/manager.html");
  focusOrCreateTab(manager_url);
});
 chrome.runtime.onConnect.addListener(function(port){
    if(port.name!=='testPort'){
      return;
    }
  });

setConnectToFE('testPort');

  // setTimeout(function(){
  //   chrome.browserAction.setBadgeBackgroundColor({color: [34, 20, 166, 1]});
  // }, 4000);