var current_object1={};
//var entrada = $.request.parameters.get("entrada");
var presentacionResponse=[];

var connection = $.db.getConnection("ARCA.UI::Anonymous_Access");
var presentacion = connection.prepareStatement("select CEDIDESC from \"_SYS_BIC\".\"ARCA.BD/CA_GENERAL2\"");
//connection.setString(entrada);
var ResultRow1 = presentacion.executeQuery();
while(ResultRow1.next()){
	current_object1={"TEXTO_CUSTOMER":ResultRow1.getString(1)};

	presentacionResponse.push(current_object1);
	}

	var respuesta1 = {presentacions:presentacionResponse};

	$.response.contentType = "json";
	$.response.setBody(JSON.stringify(respuesta1));

	ResultRow1.close();
	presentacion.close();
	connection.close();