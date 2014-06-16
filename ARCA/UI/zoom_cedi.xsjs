var current_object1={};
var seleccion = $.request.parameters.get("seleccion");
var cediResponse=[];
$.response.contentType = "json";

var connection = $.db.getConnection("ARCA_MAPA.UI::Anonymous_Access");
var cedi = connection.prepareStatement(seleccion);
var ResultRow1 = cedi.executeQuery();
while(ResultRow1.next()){
	current_object1={"CEDI":ResultRow1.getString(1),"LAT":ResultRow1.getString(2),"LON":ResultRow1.getString(3)};

	cediResponse.push(current_object1);
	}

	var respuesta1 = {cedisinfo:cediResponse};
	$.response.setBody(JSON.stringify(respuesta1));

	ResultRow1.close();
	cedi.close();
	connection.close();