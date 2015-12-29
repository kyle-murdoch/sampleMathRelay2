<?php
	//UTILITY FUNCTION
	function db_Query($Query){
		$con = mysqli_connect('localhost','root','','sampleMathRelay');
		$result=mysqli_query($con, $Query);
	
		if (!$result) {
			print mysqli_error($con);
			die("insert failed for query\n"); 
		}
		
		mysqli_close($con);
		return $result;
	}
	
	//FUNCTION DEFINITIONS
	function getData(){
		$resource = db_Query('SELECT * FROM settings');
		$returnArray = array();
		while($tempObj = mysqli_fetch_object($resource)){
			$returnArray[] = $tempObj;
		}
		
		return $returnArray;
	}
	
	function setData(){
		$value = $_REQUEST['value'];
		$settingName = $_REQUEST['settingName'];
		db_Query('UPDATE settings SET value="'.$value.'" WHERE name="'.$settingName.'"');
	}
	
	//FUNCTION DIRECTORY
	$instruction = $_REQUEST['action'];
	$returnVal = '';
	switch($instruction){
		case "getData": $returnVal = getData(); break;
		case 'setData': setData(); break;
	}
	print json_encode($returnVal);
?>

