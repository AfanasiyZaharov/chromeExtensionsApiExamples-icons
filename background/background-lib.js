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
      console.log('this error');
      reject('error');
    }
    img.src = iconUrl;
    console.log(img.src);
  });
}

function getTabPromise(options){
  return new Promise(function(resolve, reject){
    if(options==='selected'){
       chrome.tabs.getSelected(function(tab){
          if(tab){
            resolve(tab);
          }else{
            reject('err');
          }
       });
    }else{
      chrome.tabs.query(options, function(tabs){
        console.log(tabs);
          if(tabs){
            resolve(tabs);
          }else{
            reject('err');
          }
      });
    }
  });
}

function setConnectToFE(portName){

  chrome.runtime.onConnect.addListener(function(port){
    if(port.name!==portName){
      return;
    }

    port.onMessage.addListener(function(message, port){
      if(message.eventName ==='change icon'){
        console.log('got req change icon');
        var setImage;
        var url = message.url;
        if((!~url.match('http://'))||(!~url.match('https://'))){
          console.log('change url');
          url = chrome.extension.getURL(url);
        }
        if(message.options ==='selectedPage'){
          getTabPromise('selected').then(function(tab){
            console.log(tab);
            setImage = setIconPromise(url, tab.id);
            setImage.catch(function(){
              port.postMessage({
                eventName: 'invalid url'
              });
            });
          }, function(){
            console.log('err');
          });     
        }
        if(message.options === 'allPages'){
          getTabPromise('selected').then(function(tab){
            tabId = tab.id;
            setImage = setIconPromise(url, tabId);
            setImage.catch(function(){
              port.postMessage({
                eventName: 'invalid url'
              });
            });
          }, function(){
            console.log('err');
          });
          setImage = setIconPromise(url);
          setImage.catch(function(){
            port.postMessage({
              eventName: 'invalid url'
            });
          });
        }
        if(typeof message.options === 'object'){
          console.log(message.options);
          getTabPromise(message.options).then(function(tabs){
            for(var i = 0; i<tabs.length; i++){
              setImage = setIconPromise(message.url, tabs[i].id);
            }
          });
        }
      }
      if(message.eventName ==='set icon characters'){
        
        if(message.options ==='selectedPage'){
          getTabPromise('selected').then(function(tab){
            chrome.browserAction.setBadgeText({text: message.numbers, tabId: tab.id});
          });
        }
        if(message.options ==='allPages'){
          getTabPromise('selected').then(function(tab){
            chrome.browserAction.setBadgeText({text: message.numbers, tabId: tab.id});
          });
          chrome.browserAction.setBadgeText({text: message.numbers});
        }
        if(typeof message.options==='object'){
          getTabPromise(message.options).then(function(tabs){
            for(var i = 0; i<tabs.length; i++){
              chrome.browserAction.setBadgeText({text: message.numbers, tabId: tabs[i].id});
            }
          });
        }
      }
      if(message.eventName ==='set title'){
        if(message.options ==='selectedPage'){
          getTabPromise('selected').then(function(tab){
            console.log(tab);
            chrome.browserAction.setTitle({title: message.title, tabId: tab.id});
          });
        }
        if(message.options ==='allPages'){
          getTabPromise('selected').then(function(tab){
            chrome.browserAction.setTitle({title: message.title, tabId: tab.id});
          });
          chrome.browserAction.setTitle({title: message.title});
        }
        if(typeof message.options==='object'){
          getTabPromise(message.options).then(function(tabs){
            for(var i = 0; i<tabs.length; i++){
               chrome.browserAction.setTitle({title: message.title, tabId: tabs[i].id});
             }
            });
        }
      }
      if(message.eventName==='set icon color'){
        if(message.options==='selectedPage'){
           getTabPromise('selected').then(function(tab){
            chrome.browserAction.setBadgeBackgroundColor({color: message.color, tabId: tab.id});
          });
        }
        if(message.options==='allPages'){
          getTabPromise('selected').then(function(tab){
            chrome.browserAction.setBadgeBackgroundColor({color: message.color, tabId: tab.id});
          });
          chrome.browserAction.setBadgeBackgroundColor({color: message.color});
        }
        if(typeof message.options==='object'){
          getTabPromise(message.options).then(function(tabs){
            for(var i = 0; i<tabs.length; i++){
              chrome.browserAction.setBadgeBackgroundColor({color: message.color, tabId: tabs[i].id});
            }
          });
        }
      }

      if(message.eventName ==='setPopUp'){
        //var url = chrome.extension.getURL(message.popUpUrl);
        var url = message.popUpUrl;
        console.log(url);
         if(message.options==='selectedPage'){
           getTabPromise('selected').then(function(tab){
            console.log(tab);
            chrome.browserAction.setPopup({popup: url, tabId: tab.id});
          });
        }
        if(message.options==='allPages'){
          getTabPromise('selected').then(function(tab){
            chrome.browserAction.setPopup({popup: url, tabId: tab.id});
          });
          chrome.browserAction.setPopup({popup: url});
        }
        if(typeof message.options==='object'){
          getTabPromise(message.options).then(function(tabs){
            for(var i = 0; i<tabs.length; i++){
              chrome.browserAction.setPopup({popup: url, tabId: tabs[i].id});
            }
          });
        }
      }

    });
  });

}
