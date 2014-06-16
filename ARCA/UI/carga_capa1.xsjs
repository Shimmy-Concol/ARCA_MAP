var current_object1={};
var general = $.request.parameters.get("general");
var valida = "empty";
var generalResponse=[];
$.response.contentType = "json";

var connection = $.db.getConnection("ARCA_MAPA.UI::Anonymous_Access");

if(general != valida){
	
//}else{
	var generales = connection.prepareStatement(general);
	var ResultRow1 = generales.executeQuery();
	while(ResultRow1.next()){
		current_object1={"LATITUD_RTM":ResultRow1.getString(1), "LONGITUD_RTM":ResultRow1.getString(2)};

		generalResponse.push(current_object1);
		}

		//var respuesta1 = {generals:generalResponse};


		ResultRow1.close();
		generales.close();
}
$.response.setBody(JSON.stringify({generals:generalResponse}));

	connection.close();