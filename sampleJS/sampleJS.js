//GLOBAL VARIABLES
var nameState;	
var rState;		

//FUNCTION DEFINITIONS
function initializeUI(){
	var serverPath = '/sampleMathRelay/sampleServer/sampleServer.php';
	var instruction = 'action=getData';
	
	$.post(serverPath,instruction,function(data){
		returnedInfo = JSON.parse(data);
		for(var i = 0; i < returnedInfo.length; i++){
			if(returnedInfo[i].name == 'nameState'){
				nameState = returnedInfo[i].value;
			}
			if(returnedInfo[i].name == 'rState'){
				rState = returnedInfo[i].value;
			}
		}
		$('#inputName').val(nameState);
		$('#' + rState).prop('checked',true);
	});
}
function setData(settingName,value){
	var serverPath = '/sampleMathRelay/sampleServer/sampleServer.php';
	instructions = new Object;
	instructions.action = 'setData';
	instructions.settingName = settingName;
	instructions.value = value;
	$.post(serverPath,instructions);
	
}

//MAIN CONTROLS
$(document).ready(function(){
	//INITIALIZATIONS
	initializeUI();
	
	//EVENT HANDLERS
	$('#inputName').blur(function(){
		nameState = $(this).val();
		setData('nameState',nameState);
	});
	
	$('.mainRButtons').click(function(){
		$('.mainRButtons').prop('checked',false);
		$(this).prop('checked',true);
		rState = $(this).attr('id');
		setData('rState',rState);
	});
});