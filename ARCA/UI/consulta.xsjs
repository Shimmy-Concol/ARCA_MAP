var current_object={};
var StoresResponse=[];
$.response.contentType = 'json';

var connection = $.db.getConnection("ARCA.UI::Anonymous_Access");
var tiendas = connection.prepareStatement( "SELECT DISTINCT TEXTO_CUSTOMER, LON_CUS, LAT_CUS FROM \"_SYS_BIC\".\"ARCA.BD/AN_GENERAL\" WHERE LAT_CUS != 0 ");
//$.trace.debug(tiendas);
var ResultRow = tiendas.executeQuery();

while(ResultRow.next()){
current_object={"LONGITUD_RTM":ResultRow.getString(2),"LATITUD_RTM":ResultRow.getString(3)};

StoresResponse.push(current_object);
}

var respuesta = {local:StoresResponse};
$.response.setBody(JSON.stringify(respuesta));

ResultRow.close();
tiendas.close();
connection.close();