(function(){

var backgroundConnect = chrome.runtime.connect({
	name: 'main'
});

$(document).ready(function(){
	console.log('ready');
	var currentUrl;
	var current;
	$('.social').click(function(){
		if(current){
			current.removeClass('selected-social');
		}
		currentUrl = this.src;
		current = $(this);
		current.addClass('selected-social');	
	});

	$('#icon-change').click(function(){
		console.log($('input[name="check-icon"]:checked').val());
		var changeRange;
		if($('input[name="check-icon"]:checked').val()!=='this-page'){
			changeRange = false;
		}else{
			changeRange = true;
		}
		var url;
		if($('#set-icon-url').val()!==''){
			url = $('#set-icon-url').val();
			$('#set-icon-url').val('');
		}else{
			url = currentUrl;
		}
		console.log(' icon change click');
		backgroundConnect.postMessage({
			eventName:'change icon',
			url: url,
			changeRange : changeRange
		});

		backgroundConnect.onMessage.addListener(function(message){
			if(message.eventName==='invalid url'){
				console.log('url is invalid');
			}
		});
		$(this).css({'background-color': 'green'});
	});

	//title
	$('#icon-set-title').click(function(){
		var changeRange;
		if($('input[name="check-title"]:checked').val()!=='this-page'){
			changeRange = false;
		}else{
			changeRange = true;
		}
		
		backgroundConnect.postMessage({
			eventName:'set title',
			title: $('#set-title').val(),
			changeRange : changeRange
		});
	});

	$('#icon-set-numbers').click(function(){
		var changeRange;
		if($('input[name="check-char"]:checked').val()!=='this-page'){
			changeRange = false;
		}else{
			changeRange = true;
		}
		
		var numbers = $('#set-numbers').val();
		backgroundConnect.postMessage({
			eventName:'set icon characters',
			numbers: numbers,
			changeRange : changeRange
		});
	});
	$('#back-up').click(function(){
		backgroundConnect.postMessage({
			eventName:'back up',
		});
	});
	

});


})();
/*
class task{
  
  constructor(name, bgname, button, input){
    
  }
}


*/