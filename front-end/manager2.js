(function(){


$(document).ready(function(){
	//icons.setBackgroundConnect('main');
	backgroundConnect = chrome.runtime.connect({
		name: 'testPort'
	});
	icons.setBackgroundConnect(backgroundConnect);
	console.log('ready');
	var current;
	var changeRangeIcon = "selectedPage";
	var changeRangeTitle = "selectedPage";
	var changeRangeChar = "selectedPage";
	function setEval(){
		$('#eval-set-icon').val('icons.setIcon("'+ $('#set-icon-url').val()+'", "'+changeRangeIcon+'")');
		$('#eval-set-title').val('icons.setTitle("' + $('#set-title').val()+ '", "'+ changeRangeTitle + '")');
		$('#eval-set-char').val('icons.setCharacters("'+$('#set-numbers').val()+ '", "' + changeRangeChar + '")');
	}
	setEval();
	$('#test-eval').click(function(){
		eval($('#eval-set-icon').val());
	})
	$('.social').click(function(){
		if(current){
			current.removeClass('selected-social');
		}
		
		$('#set-icon-url').val(this.src);
		
		current = $(this);
		setEval();
		current.addClass('selected-social');	
	});

	$('#set-icon-url').on('input',function(e){
 		setEval();
	});
	$('#set-title').on('input',function(e){
 		setEval();
	});
	$('#set-numbers').on('input',function(e){
 		setEval();
	});

	$('.select-set-icon').click(function(){
		if($('input[name="check-icon"]:checked').val()!=='this-page'){
			changeRangeIcon = 'allPages';
		}else{
			changeRangeIcon = 'selectedPage';
		}
		setEval();
	});

	// $('#icon-change').click(function(){
		//<button class="btn btn-default" id = "icon-change">Change icon</button>
		
	// 	console.log($('input[name="check-icon"]:checked').val());
	// 	var changeRange;
	// 	if($('input[name="check-icon"]:checked').val()!=='this-page'){
	// 		changeRange = 'allPages';
	// 	}else{
	// 		changeRange = 'selectedPage';
	// 	}
	// 	var url;
	// 	if($('#set-icon-url').val()!==''){
	// 		url = $('#set-icon-url').val();
	// 		$('#set-icon-url').val('');
	// 	}else{
	// 		url = currentUrl;
	// 	}
	// 	icons.setIcon(url, changeRange);

		
	// 	$(this).css({'background-color': 'green'});
	// });

	//title
	$('#icon-set-title').click(function(){
		
		if($('input[name="check-title"]:checked').val()!=='this-page'){
			changeRangeTitle = 'allPages';
		}else{
			changeRangeTitle = 'selectedPage';
		}
		icons.setTitle($('#set-title').val(), changeRangeTitle);
		setEval();
	});
	$('.select-set-title').click(function(){
		if($('input[name="check-title"]:checked').val()!=='this-page'){
			changeRangeChar = 'allPages';
		}else{
			changeRangeChar = 'selectedPage';
		}
		setEval();
	});
	$('.select-set-title').click(function(){
		if($('input[name="check-title"]:checked').val()!=='this-page'){
			changeRangeChar = 'allPages';
		}else{
			changeRangeChar = 'selectedPage';
		}
		setEval();
	});

	$('#icon-set-numbers').click(function(){
		var changeRange;
		if($('input[name="check-char"]:checked').val()!=='this-page'){
			changeRange = 'allPages';
		}else{
			changeRange = 'selectedPage';
		}
		
		var numbers = $('#set-numbers').val();
		icons.setCharacters($('#set-numbers').val(), changeRange);

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