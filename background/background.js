
function setIconPromise(iconUrl, tabId){
  return new Promise(function(resolve, reject){
    var img = new Image();
    img.onload = function(){
      console.log('ready');
      if(tabId){
        chrome.browserAction.setIcon({
           path: iconUrl,
           tabId: tabId
        });
      }else{
         chrome.browserAction.setIcon({
           path: iconUrl
        });
      }
      resolve('success');
    }
    img.onerror = function(){
      reject('error');
    }
    img.src = iconUrl;
    console.log(img.src);
  });
}

function getTabPromise(){
  return new Promise(function(resolve, reject){
     chrome.tabs.getSelected(function(tab){
        if(tab){
          resolve(tab);
        }else{
          reject('err');
        }
     });
  });
}

document.onreadystatechange = function () {
  console.log('network');
}

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

var portMain;
chrome.browserAction.onClicked.addListener(function(tab) {
  var manager_url = chrome.extension.getURL("front-end/manager.html");
  focusOrCreateTab(manager_url);
});


chrome.runtime.onConnect.addListener(function(port){
  if(port.name!=='main'){
    return;
  }

  port.onMessage.addListener(function(message, port){
    if(message.eventName ==='change icon'){
      console.log('got req change icon');
      var setImage;
      var tabId;
      if(message.changeRange){
        getTabPromise().then(function(tab){
          tabId = tab.id;
          setImage = setIconPromise(message.url, tabId);
          setImage.catch(function(){
            port.postMessage({
              eventName: 'invalid url'
            });
          });
        }, function(){
          console.log('err');
        });     
      }else{
        getTabPromise().then(function(tab){
          tabId = tab.id;
          setImage = setIconPromise(message.url, tabId);
          setImage.catch(function(){
            port.postMessage({
              eventName: 'invalid url'
            });
          });
        }, function(){
          console.log('err');
        });
        setImage = setIconPromise(message.url);
        setImage.catch(function(){
          port.postMessage({
            eventName: 'invalid url'
          });
        });
      }
     
     
    }
    if(message.eventName ==='set icon characters'){
      
      if(message.changeRange){
        getTabPromise().then(function(tab){
          chrome.browserAction.setBadgeText({text: message.numbers, tabId: tab.id});
        });
      }else{
        getTabPromise().then(function(tab){
          chrome.browserAction.setBadgeText({text: message.numbers, tabId: tab.id});
        });
        chrome.browserAction.setBadgeText({text: message.numbers});
      }
    }
    if(message.eventName ==='set title'){
      if(message.changeRange){
        getTabPromise().then(function(tab){
          chrome.browserAction.setTitle({title: message.title, tabId: tab.id});
        });
      }else{
        getTabPromise().then(function(tab){
          chrome.browserAction.setTitle({title: message.title, tabId: tab.id});
        });
        chrome.browserAction.setTitle({title: message.title});
      }
    }

    if(message.eventName==='back up'){
       getTabPromise().then(function(tab){
          chrome.browserAction.setTitle({title: 'chrome api example', tabId: tab.id});
          chrome.browserAction.setBadgeText({text: '', tabId: tab.id});
          getTabPromise().then(function(tab){
            tabId = tab.id;
            var url = chrome.extension.getURL('icon.png');
            setImage = setIconPromise(url, tabId);
          }, function(){
            console.log('err');
          });     
       });
       chrome.browserAction.setTitle({title: 'chrome api example'});
       chrome.browserAction.setBadgeText({text: ''});
       var url = chrome.extension.getURL('icons/icon.png');
       chrome.browserAction.setIcon({
           path: url
        });

    }
  });
});


