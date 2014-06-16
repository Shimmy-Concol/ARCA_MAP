var current_object1={}; 
var entrada = $.request.parameters.get("entrada");
var valida = "empty";
var marcaResponse=[];
$.response.contentType = "json";

var connection = $.db.getConnection("ARCA.UI::Anonymous_Access");
if(entrada != valida){
	var marca = connection.prepareStatement(entrada);
	var ResultRow1 = marca.executeQuery();
	while(ResultRow1.next()){
		current_object1={"lat":ResultRow1.getString(1), "lon":ResultRow1.getString(2), "cliente":ResultRow.getString(3)};
	
		marcaResponse.push(current_object1);
		}

	ResultRow1.close();
	marca.close();
}else{
	marcaResponse = 'empty';
}



var current_object2={};
var general = $.request.parameters.get("general");
var generalResponse=[];
$.response.contentType = "json";
if(general != valida){
	var generales = connection.prepareStatement(general);
	var ResultRow2 = generales.executeQuery();
	while(ResultRow2.next()){
		current_object2={"LATITUD_RTM":ResultRow2.getString(1), "LONGITUD_RTM":ResultRow2.getString(2), "cliente":ResultRow.getString(3)};

		generalResponse.push(current_object2);
		}
		ResultRow2.close();
		generales.close();
}else{
	generalResponse = 'empty';
}

$.response.setBody(JSON.stringify({marcasmap:marcaResponse, generals:generalResponse}));
connection.close();