var current_object1={};
var inzona = $.request.parameters.get("inzona");
var zonaResponse=[];
$.response.contentType = "json";

var connection = $.db.getConnection("ARCA_MAPA.UI::Anonymous_Access");
var zona = connection.prepareStatement("select DISTINCT cediid, cedidesc from \"ARCA\".\"GENERAL\" where lat != 0 and zonaid = "+ inZona + " ORDER BY cedidesc ASC");
var ResultRow1 = zona.executeQuery();
while(ResultRow1.next()){
	current_object1={"cediid":ResultRow1.getString(1),"cediiddesc":ResultRow1.getString(2)};

	zonaResponse.push(current_object1);
	}

	var respuesta1 = {zonas:zonaResponse};
	$.response.setBody(JSON.stringify(respuesta1));

	ResultRow1.close();
	zona.close();
	connection.close();