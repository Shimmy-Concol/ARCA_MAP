var current_object={};
var CediResponse=[];
$.response.contentType = "json";

var connection = $.db.getConnection("ARCA_MAPA.UI::Anonymous_Access");
var cedi = connection.prepareStatement( "select DISTINCT CEDIID, CEDIDESC from \"ARCA\".\"GENERALCSV\"   where lat != 0 ORDER BY CEDIDESC ASC" ); 

var ResultRow = cedi.executeQuery();

while(ResultRow.next()){
	current_object={"CEDI":ResultRow.getString(1),"DESC_CEDI":ResultRow.getString(2)};

	CediResponse.push(current_object);
	}

	//var respuesta = {cedis:CediResponse};
	//$.response.setBody(JSON.stringify(respuesta));

	ResultRow.close();
	cedi.close();
	
	var current_object1={};
	var marcaResponse=[];
	var marca = connection.prepareStatement("select DISTINCT marca from \"ARCA\".\"GENERALCSV\"    where lat != 0 ORDER BY MARCA ASC");
	var ResultRow1 = marca.executeQuery();
	while(ResultRow1.next()){
		current_object1={"MARCA":ResultRow1.getString(1)};

		marcaResponse.push(current_object1);
		}

		//var respuesta1 = {marcas:marcaResponse};
		//$.response.setBody(JSON.stringify(respuesta1));

		ResultRow1.close();
		marca.close();
		
		
		var current_object2={};
		var presentacionResponse=[];
		var presentacion = connection.prepareStatement("select DISTINCT presentacion from \"ARCA\".\"GENERALCSV\"   where lat != 0 ORDER BY presentacion ASC");
		var ResultRow2 = presentacion.executeQuery();
		while(ResultRow2.next()){
			current_object2={"presentacion":ResultRow2.getString(1)};

			presentacionResponse.push(current_object2);
			}

			//var respuesta2 = {presentacions:presentacionResponse};
			//$.response.setBody(JSON.stringify(respuesta2));

			ResultRow2.close();
			presentacion.close();
			
			
			var current_object3={};
			var zonaResponse=[];
			var zona = connection.prepareStatement("select DISTINCT zonaid, zonadesc from \"ARCA\".\"GENERALCSV\"   where lat != 0 ORDER BY zonadesc ASC");
			var ResultRow3 = zona.executeQuery();
			while(ResultRow3.next()){
				current_object3={"zona":ResultRow3.getString(1), "desc_zona":ResultRow3.getString(2)};

				zonaResponse.push(current_object3);
				}

				//var respuesta3 = {zonas:zonaResponse};
				//$.response.setBody(JSON.stringify(respuesta3));

				ResultRow3.close();
				zona.close();			

	
			
				var current_object4={};
				var fechaResponse=[];
				var fecha = connection.prepareStatement("select DISTINCT anionaturalmes from \"ARCA\".\"GENERALCSV\"   where lat != 0 ORDER BY anionaturalmes ASC");
				var ResultRow4 = fecha.executeQuery();
				while(ResultRow4.next()){
					current_object4={"fecha":ResultRow4.getString(1)};

					fechaResponse.push(current_object4);
					}

					//var respuesta4 = {fechas:fechaResponse};
					$.response.setBody(JSON.stringify({cedis:CediResponse, marcas:marcaResponse,presentacions:presentacionResponse,zonas:zonaResponse,fechas:fechaResponse}));

					ResultRow4.close();
					fecha.close();	
			
	connection.close();