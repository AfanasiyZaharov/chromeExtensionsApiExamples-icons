var icons = {
	setBackgroundConnect: function(portName){
		if(typeof portName === 'string'){
			this.backgroundConnect = chrome.runtime.connect({
				name: portName
			});
		}
		if(typeof portName === 'object'){
			this.backgroundConnect = portName
		}
	},
	setIcon: function(iconUrl, options){
		console.log(options);
		this.backgroundConnect.postMessage({
			eventName:'change icon',
			url: iconUrl,
			options: options
		});

		this.backgroundConnect.onMessage.addListener(function(message){
			if(message.eventName==='invalid url'){
				console.log('url is invalid');
			}
		});
	},
	setTitle: function(title, options){
		this.backgroundConnect.postMessage({
			eventName:'set title',
			title: title,
			options: options
		});
	},
	setCharacters: function(chars, options){
		this.backgroundConnect.postMessage({
			eventName:'set icon characters',
			numbers: chars,
			options: options
		});
	},
	setColor: function(color, options){
		this.backgroundConnect.postMessage({
			eventName:'set icon color',
			color: color,
			options: options
		});
	},
	setPopUp: function(url, options){
		this.backgroundConnect.postMessage({
			eventName:'setPopUp',
			popUpUrl : url,
			options: options
		});
	} 
}
/*

icons.changeIcon('https://d13yacurqjgara.cloudfront.net/users/8063/screenshots/873671/github_icon_vector_shape.png', null, {url:'*://vk.com/*'})
*/


