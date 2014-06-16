var respuesta, latlng = new Array(), latlngM = new Array(), map, heatmaps="z", heatmap="z";
var marker = [],x,pb, capa_principal, markers = [];
var position, diferencia = 0;
var mapr, latlon = new Array(),latlonM = new Array(),latilong = new Array(), responses, responses2, total, heats, heat;


pb = progressBar();
var oProgressIndicator = new sap.ui.commons.ProgressIndicator("Progreso2", {
	width: "100%", 
	percentValue: 1, 
	displayValue: "0%"
	});
var infowindow = null; 

/////////////////////////////////////////////////
/////////////     carga mapa      ///////////////
/////////////////////////////////////////////////
function initialize(){	
var mapOptions = {
    zoom: 5,
    zoomControl: true,
    streetViewControl: false,
    center: new google.maps.LatLng(20.520556, -99.895833),//DF(22.804899, -102.488591), //otro centro37.0625,-95.677068
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  
  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  
  map.controls[google.maps.ControlPosition.RIGHT].push(pb.getDiv());
 
  google.maps.event.addListenerOnce(map, 'idle', datos);
  
  google.maps.event.addListener(map, 'zoom_changed', function() {
	  var valor_zoom = map.getZoom();
	  
	  if(valor_zoom >= 12 && diferencia == 0){
		  		  diferencia = 1;

		  		
		  		if(cedi_seleccion() != "X"){
		  			heatmap.setMap(null);
		  		setMarcador(map);
		  		
			  if(heatmaps != "z"){
		  		heatmaps.setMap(null);
			  }}
	  }
	  else if(valor_zoom <= 11 && diferencia == 1){
		  diferencia = 0;
		  if(cedi_seleccion() != "X"){
		  setMarcador(null);
		  calor(latlngM);
		  if(latlon.length != 0 || latlon.length != 1){
		  mapa_calor_filtro(latlon);
		  }
		  }
	  }
	  });
  
}


/////////////////////////////////////////////////////////////////////
////////////////   Obtiene datos generales    /////////////////
/////////////////////////////////////////////////////////////////////
function datos(){
	 var d = new Date();
	 var n = 1 + d.getMonth();
	 var mes = "'0" + n + "'";
	 
	 setMes(mes); 
	 
$.ajax({
    xhr: function(){
        var xhr = new window.XMLHttpRequest();
      //Download progress
        xhr.addEventListener("progress", function(evt){
          if (evt.lengthComputable) {
            pb.start(evt.total);
            pb.updateBar(evt.loaded);
            	if(evt.loaded == evt.total){
            	pb.hide();
            	}
          }
        }, false);
        return xhr;
      },

// url:"/ARCA/UI/servicios.xsodata/CONSULTA?$format=json",
url:"/ARCA/UI/servicios.xsodata/NUEVO?$format=json&$select=LAT_CUS, LON_CUS&$filter=CUSTOMER ne '' and LAT_CUS ne 0 and LON_CUS ne 0 and MES eq " + mes,      
success:function(respuesta){
var response = respuesta.d.results;
capa_principal = gen_coord(response);
calor(capa_principal);

				  	     
},
error: function (xhr,respuesta) {
 alert("Error" + xhr.responseText);
}

});
}


//////////////////////////////////////////////////////////
////////////  Genera Coordenadas principal  //////////////
//////////////////////////////////////////////////////////
function gen_coord(intro){
	var latlngA = new Array(), coord = new Array();
	delete latlngA;
	
	for (var i in intro){
//		var coor = [intro[i].LATITUD_RTM, intro[i].LONGITUD_RTM,intro[i].TEXTO_CUSTOMER,intro[i].ISSCOM,intro[i].SUBCANAL,intro[i].TRZONE,intro[i].VOLUMEN];
		var coor = [intro[i].LAT_CUS, intro[i].LON_CUS, intro[i].CUSTOMER, intro[i].TEXTO_CUSTOMER,intro[i].TXT_CAN_ISSCOM,intro[i].SUBCANAL,intro[i].TRZONE,intro[i].VENTA_CU];
		coord.push(coor);
		 latlngA.push({location: new google.maps.LatLng(intro[i].LAT_CUS, intro[i].LON_CUS)});
		};
	
	latlng = [];
	latlng = coord;//capa1 marcador
	latlngM = [];
	latlngM = latlngA; //capa1 calor
	return latlngA; //valor de primera carga
	
}


////////////////////////////////////////////////////////
//////////////       Pinta mapa de calor      //////////
////////////////////////////////////////////////////////
function calor(positions){
	var gradiente = [
                     	'rgba(255, 0, 0, 0)',
						'rgba(255, 0, 0, 1)',
						'rgba(255, 0, 0, 1)',
						'rgba(255, 0, 0, 1)',
						'rgba(255, 0, 0, 1)',
						'rgba(255, 0, 0, 1)',
						'rgba(255, 0, 0, 1)',
						'rgba(255, 0, 0, 1)',
						'rgba(255, 0, 0, 1)',
						'rgba(255, 0, 0, 1)',
						'rgba(255, 0, 0, 1)',
						'rgba(255, 16, 0, 1)',
						'rgba(255, 32, 0, 1)',
						'rgba(255, 64, 0, 1)'
						]
	  heat = null;  
	  heat = new google.maps.MVCArray(positions);
	  heatmap = new google.maps.visualization.HeatmapLayer({
		    data: heat,gradient:gradiente,opacity:1, maxIntensity:100, radius:10
	  });
	  heatmap.setMap(map);
	  
}

function reset(){
	if(heatmap != "z"){
		heatmap.setMap(null);
	}
	if(heatmaps != "z"){
		heatmaps.setMap(null);
	}
	
	if(markers.length != 0){
		setMarcador(null);
	}
	
	
	calor(capa_principal);
	map.setCenter(new google.maps.LatLng(20.520556, -99.895833));
    map.setZoom(5);
    diferencia = 0;
}

///////////////////////////////////////////////////
////////////   Pinta marcadores    ////////////////
///////////////////////////////////////////////////
function crea_marcador(array1, array2,activo){
	infowindow = new google.maps.InfoWindow({maxWidth: 250});
	var bounds = new google.maps.LatLngBounds();
	var Mlatlng = new Array();
	var arrayTotal = [], imagen;
	markers = [], marker;
	
	
	if (array2.length == 0){
		for(var a = 0; a < array1.length; a++){
			var posicion = new google.maps.LatLng(array1[a][0], array1[a][1]);
			marker = new google.maps.Marker({
						icon:'/ARCA/UI/imagen/rojo.png',
					 	position: posicion,
					 	map: map});
						
			markers.push(marker);
						
	  	    google.maps.event.addListener(marker, 'click', (function(marker,a) {
	  	    	return function(){
		            infowindow.setContent('<b># Cliente: </b>' + array1[a][2] + '<BR> <b>Cliente: </b>' + array1[a][3] + '<BR> <b>Canal: </b>' + array1[a][4] + '<BR> <b>Subcanal: </b>' + array1[a][5] + '<BR> <b>Ruta: </b>' + array1[a][6] + '<BR> <b> Volumen: </b>' + array1[a][7]);
		            infowindow.open(map, marker);

	  	    }})(marker,a));
	  	  if (activo == 1 && diferencia == 1){
	  		  bounds.extend(posicion);
	  		  map.fitBounds(bounds);
	  	  }
		};
	}else{	
		for(var a = 0; a < array1.length; a++){
			imagen = '/ARCA/UI/imagen/rojo.png';
			array1[a][7] = '-';
			for(var b = 0; b < array2.length; b++){
//				if((array1[a][0] == array2[b][0]) && (array1[a][1] == array2[b][1])){
				if(array1[a][2] == array2[b][3]){
					imagen = '/ARCA/UI/imagen/amarillo.png';
					
					array1[a][7] = array2[b][2];
					
					break;
				}
				
			};
			var posicion = new google.maps.LatLng(array1[a][0], array1[a][1]);
			marker = new google.maps.Marker({
			 		 icon:imagen,
			 	     position: posicion,
			 	     map: map});
			markers.push(marker);			
			
	  	    google.maps.event.addListener(marker, 'click', (function(marker,a) {
	  	    	return function(){
	  	    		infowindow.setContent('<b># Cliente: </b>' + array1[a][2] + '<BR> <b>Cliente: </b>' + array1[a][3] + '<BR> <b>Canal: </b>' + array1[a][4] + '<BR> <b>Subcanal: </b>' + array1[a][5] + '<BR> <b>Ruta: </b>' + array1[a][6] + '<BR> <b> Volumen: </b>' + array1[a][7]);
		            infowindow.open(map, marker);

	  	    }})(marker,a));
		  	  if (activo == 1 && diferencia == 1){//centrar marcadores de ruta
		  		  bounds.extend(posicion);
		  		  map.fitBounds(bounds);
		  	  }
			};
	}
}


function setMarcador(inmarca){
	var porcentaje = 0;
	
	for(var i = 0; i < markers.length; i++){
    	porcentaje = (i * 100);
        porcentaje = porcentaje / markers.length; 
	    progressBar2(porcentaje);
		markers[i].setMap(inmarca);
		
	};
		oProgressIndicator.setVisible(false);
	
}





////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////                                               ////////////////////////////
/////////////////////         FUNCIONES PARA FILTROS                ////////////////////////////
/////////////////////                                               ////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////
///////  Pinta mancha por filtro  ////////////
//////////////////////////////////////////////
function filtros(capa2, capa1, valor,activo){

	var nuevo;
	var responses, responses2;
	if(capa1 == "datos"){
		nuevo = capa1;
		capa1 = "empty";
	}	 		

	if(capa2 != 'empty' && capa1 != 'empty'){
	 $.ajax({
		    xhr: function(){  /////INDICADOR DE CARGA
		        var xhr = new window.XMLHttpRequest();
		      //Download progress
		        xhr.addEventListener("progress", function(evt){
		          if (evt.lengthComputable) {
		            pb.start(evt.total);
		            pb.updateBar(evt.loaded);
		            	if(evt.loaded == evt.total){
		            	pb.hide();
		            	}
		          }
		        }, false);
		        return xhr;
		      },
//		      url:"/ARCA/UI/servicios.xsodata/GENERALS?$format=json&$groupby=TEXTO_CUSTOMER, LATITUD_RTM, LONGITUD_RTM&$select=TEXTO_CUSTOMER, LATITUD_RTM, LONGITUD_RTM", data:{'$filter': capa2},
		      url:"/ARCA/UI/servicios.xsodata/NUEVO?$format=json&$select=LAT_CUS, LON_CUS, VENTA_CU, CUSTOMER", data:{'$filter' : "CUSTOMER ne '' and TEXTO_CUSTOMER ne '' and LAT_CUS ne 0 and LON_CUS ne 0 and " + capa2},
			  success:function(respuesta){
			  if(respuesta.d.results.length == 0){
					alert("No existe resultados para este criterio de búsqueda.");
					devuelve(1);
		      }else{	
				    responses = respuesta.d.results;
					var latlon1 = [];
					latlonM = [];
					
					for (var i in responses){
//						var ubicacion = [responses[i].LATITUD_RTM, responses[i].LONGITUD_RTM];//, responses[i].TEXTO_CLIENTE, responses[i].TEXTO_CLIENTE,responses[i].ISSCOM,responses[i].SUBCANALresponses[i].TRZONE];
						var ubicacion = [responses[i].LAT_CUS, responses[i].LON_CUS, responses[i].VENTA_CU, responses[i].CUSTOMER];
						latlonM.push(ubicacion);
//						latlon1.push({location: new google.maps.LatLng(responses[i].LATITUD_RTM, responses[i].LONGITUD_RTM)});
						latlon1.push({location: new google.maps.LatLng(responses[i].LAT_CUS, responses[i].LON_CUS)});
						
					};

					latilong = latlonM;//marcador
					latlon = latlon1;//calor capa2
							
				//CAPA1
				 $.ajax({
//					 url:"/ARCA/UI/servicios.xsodata/CAPA1S?$format=json", data:{'$filter': capa1 },
					 url:"/ARCA/UI/servicios.xsodata/NUEVO?$format=json&$select=LAT_CUS, LON_CUS, CUSTOMER, TEXTO_CUSTOMER, TXT_CAN_ISSCOM, SUBCANAL, TRZONE, VENTA_CU", data:{'$filter' : "CUSTOMER ne '' and TEXTO_CUSTOMER ne '' and LAT_CUS ne 0 and LON_CUS ne 0 and " + capa1},
							success:function(respuesta){
						responses2 = respuesta.d.results;
						
							gen_coord(responses2);
							
							
							if(valor != "" && cedi_seleccion() == "X"){//En caso de ZONA realiza el zoom
								zoomzona(valor);
							}
							

							if(cedi_seleccion() != "X"){

								if(markers.length != 0){setMarcador(null);}
								crea_marcador(latlng, latilong, activo)
							}
							
							devuelve(0);
							
							switch(diferencia){
							case 0:
								heatmap.setMap(null);
								if(heatmaps != "z"){
								heatmaps.setMap(null);
								}
								
								if(cedi_seleccion() != "X"){
								setMarcador(null);
								}
								
								calor(latlngM);
								mapa_calor_filtro(latlon);								
							break;
							case 1:
								heatmap.setMap(null);
								if(heatmaps != "z"){
								heatmaps.setMap(null);
								}
								
								
								if(cedi_seleccion() != "X"){
								setMarcador(map);
								}
							break;
							}
							
						},
						error: function (respuesta) {
							 alert("Error al realizar consulta");
							}
				});	
			}
	    },
	    error: function (respuesta) {
	    	 alert("Error al realizar consulta");
	    	}
		      
	 });
	 
						
	}else if(capa2 != 'empty' && capa1 == 'empty'){
		 $.ajax({
			    xhr: function(){  /////INDICADOR DE CARGA
			        var xhr = new window.XMLHttpRequest();
			      //Download progress
			        xhr.addEventListener("progress", function(evt){
			          if (evt.lengthComputable) {
			            pb.start(evt.total);
			            pb.updateBar(evt.loaded);
			            	if(evt.loaded == evt.total){
			            	pb.hide();
			            	}
			          }
			        }, false);
			        return xhr;
			      },
//			      url:"/ARCA/UI/servicios.xsodata/GENERALS?$format=json&$groupby=TEXTO_CUSTOMER, LATITUD_RTM, LONGITUD_RTM&$select=TEXTO_CUSTOMER, LATITUD_RTM, LONGITUD_RTM", data:{'$filter': capa2},
			      url:"/ARCA/UI/servicios.xsodata/NUEVO?$format=json&$select=LAT_CUS, LON_CUS, VENTA_CU, CUSTOMER", data:{'$filter' : "CUSTOMER ne '' and TEXTO_CUSTOMER ne '' and LAT_CUS ne 0 and LON_CUS ne 0 and " + capa2},
				  success:function(respuesta){
				  if(respuesta.d.results.length == 0){
						alert("No existe resultados para este criterio de búsqueda.");
						devuelve(1);
			      }else{	
					    responses = respuesta.d.results;
						var latlon1 = [];
						latlonM = [];
						
						for (var i in responses){
//							var ubicacion = [responses[i].LATITUD_RTM, responses[i].LONGITUD_RTM];//, responses[i].TEXTO_CLIENTE, responses[i].TEXTO_CLIENTE,responses[i].ISSCOM,responses[i].SUBCANALresponses[i].TRZONE];
							var ubicacion = [responses[i].LAT_CUS, responses[i].LON_CUS,responses[i].VENTA_CU,, responses[i].CUSTOMER];
							latlonM.push(ubicacion);
//							latlon1.push({location: new google.maps.LatLng(responses[i].LATITUD_RTM, responses[i].LONGITUD_RTM)});
							latlon1.push({location: new google.maps.LatLng(responses[i].LAT_CUS, responses[i].LON_CUS)});
							
						};

						latilong = latlonM;//marcador
						latlon = latlon1;//calor capa2		
						
						if(nuevo == 'datos'){
							heatmap.setMap(null);
							if(heatmaps != "z"){heatmaps.setMap(null);}
				 			calor(capa_principal);
				 			map.setCenter(new google.maps.LatLng(20.520556, -99.895833));
				 		    map.setZoom(5);
				 		}
						
						
						devuelve(0);
						
						switch(diferencia){
						case 0:
							if(heatmaps != "z"){
							heatmaps.setMap(null);
							}
							if(cedi_seleccion() != "X"){
							setMarcador(null);
							}
							mapa_calor_filtro(latlon);								
						break;
						case 1:
							if(heatmaps != "z"){
								heatmaps.setMap(null);
								}
							if(cedi_seleccion() != "X"){
							setMarcador(map);
							}
						break;
						}
			      }},
			      error: function (respuesta) {
			    	  alert("Error al realizar consulta");
			    	 }
			      
		 });			

						
	}else if(capa2 == 'empty' && capa1 != 'empty'){
		 $.ajax({
			    xhr: function(){  /////INDICADOR DE CARGA
			        var xhr = new window.XMLHttpRequest();
			      //Download progress
			        xhr.addEventListener("progress", function(evt){
			          if (evt.lengthComputable) {
			            pb.start(evt.total);
			            pb.updateBar(evt.loaded);
			            	if(evt.loaded == evt.total){
			            	pb.hide();
			            	}
			          }
			        }, false);
			        return xhr;
			      },
//			      url:"/ARCA/UI/servicios.xsodata/CAPA1S?$format=json", data:{'$filter': capa1},
			      url:"/ARCA/UI/servicios.xsodata/NUEVO?$format=json&$select=LAT_CUS, LON_CUS, CUSTOMER, TEXTO_CUSTOMER, TXT_CAN_ISSCOM, SUBCANAL, TRZONE, VENTA_CU", data:{'$filter' : "CUSTOMER ne '' and TEXTO_CUSTOMER ne '' and LAT_CUS ne 0 and LON_CUS ne 0 and " + capa1},
				  success:function(respuesta){
				  if(respuesta.d.results.length == 0){
						alert("No existe resultados para este criterio de búsqueda.");
						devuelve(1);
			      }else{	
					    responses = respuesta.d.results;
					    
					    gen_coord(responses);
						
						latilong = [];
						if(valor != "" && cedi_seleccion() == "X"){//En caso de ZONA realiza el zoom
							zoomzona(valor);
						}
						
						if(cedi_seleccion() != "X"){

							if(markers.length != 0){setMarcador(null);}
							crea_marcador(latlng, latilong, activo)
						}
						
						devuelve(0);
						
						switch(diferencia){
						case 0:
							heatmap.setMap(null);
							if(heatmaps != "z"){
							heatmaps.setMap(null);
							}
							
							if(cedi_seleccion() != "X"){
							setMarcador(null);
							}
							calor(latlngM);								
						break;
						case 1:
							heatmap.setMap(null);
							if(heatmaps != "z"){
								heatmaps.setMap(null);
								}
							if(cedi_seleccion() != "X"){
							setMarcador(map);
							}
						break;
						}
	}},
	error: function (respuesta) {
		 alert("Error al realizar consulta");
		}
			      
		 });
				  }
}










function mapa_calor_filtro(coordenadas){//capa2
	var color = [
                 'rgba(255,255,0,0)',
                 'rgba(255,255,0,1)',
                 'rgba(255,255,0,1)',
                 'rgba(255,255,0,1)',
                 'rgba(255,255,0,1)',
                 'rgba(255,255,0,1)',
                 'rgba(255,255,0,1)',
                 'rgba(255,255,0,1)',
                 'rgba(255,255,0,1)',
                 'rgba(255,255,0,1)',
                 'rgba(255,255,0,1)',
                 'rgba(255,255,32,1)',
                 'rgba(255,255,64,1)',
                 'rgba(255,255,128,1)'
               ]
//	  heatmaps
	  heats = new google.maps.MVCArray(coordenadas);
	  heatmaps = new google.maps.visualization.HeatmapLayer({
		    data: heats,gradient:color,opacity:1, maxIntensity:200, radius:10
	  });
	  heatmaps.setMap(map);
}





//////////////////////////////////////////////////////
////////////////   Zoom en CEDI   ////////////////////
//////////////////////////////////////////////////////
//function zoomin(intro){////Tabla inconsistente de datos
//	
//	if(val_atn != intro){
//
//		diferencia = 0;
//		val_atn = intro;
//		var resp, respon;
//		var seleccion = "select * from \"ARCA\".\"GEO_CEDI\" where cediid = ";
//		seleccion = seleccion + intro;
//		console.log(seleccion);
//		$.ajax({url:"/ARCA/UI/zoom_cedi.xsjs", data:{seleccion:seleccion},
//			success:function(resp){
//			respon = resp.cedisinfo;
//			//console.log(respon);
//			var lati,long;
//			//latlong.push({location: new google.maps.LatLng(responses[i].lat, responses[i].lon)});
//			lati = respon[0].LAT; 
//			long = respon[0].LON;
//		     		map.setZoom(10);
//		     		map.panTo({lat:parseFloat(lati),lng:parseFloat(long)});
//	
//	
//		}});
//	}
//}

var valor_anterior;
function zoomzona(localiza_zona){
	localiza_zona = localiza_zona.replace(/\s/g,"+");

	if(valor_anterior != localiza_zona){
		valor_anterior = localiza_zona;

//		diferencia = 1;
	
	if(localiza_zona == 'Pacifico+Norte' || localiza_zona == 'Pacifico+Sur' || localiza_zona == 'Centro'){
			map.setZoom(5)
			map.panTo({lat:20.520556,lng:-99.895833});		
	}else{
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({ 'address': localiza_zona}, function(results, status){
			if(status == google.maps.GeocoderStatus.OK){
		        map.setCenter(results[0].geometry.location);
		        map.setZoom(7);
		      } else{
		        alert("Zona no se encontro por el siguiente motivo: " + status);
		      }
			
	});
	}
	}
	
}



function progressBar2(increment){

	if(increment != 100){
		oProgressIndicator.setVisible(true);
	}
	
	oProgressIndicator.setPercentValue(parseInt(increment));
	oProgressIndicator.setDisplayValue(increment + "%");

	oProgressIndicator.placeAt("panel_info");
	
}


//// Carga mapa
google.maps.event.addDomListener(window, 'load', initialize);
  

	