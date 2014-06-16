var respuesta, marca = new Array(), sel=[], valida = 0, valor_pasado = [], coordenadas = new Array(), coordenadas2 = new Array();	
var x1 = 0, x2 = 0, x3 = 0,x4 = 0 ,x5 = 0,x6 = 0, x7= 0 ,x8 = 0, x9 = 0, x10 = 0, x11 = 0, x12 = 0, x13 = 0, x14 = 0,x15 =0; 
var sel_marca, sel_pres, sel_zona, sel_cedi, sel_fecha, sel_ruta, sel_mes, sel_isscom, sel_rgm, sel_act, sel_sub, sel_retor, sel_segmnt, sel_tam, sel_tamcli;
var filtroA, filtroB, filtroC, filtroD, filtroE,filtroR, filtroMes, filtroRgm, filtroIsscom, filtroAct, filtroSub, filtroRetor, filtroSegmnt, filtroTam, filtroTamCli, lista_clientes = [];
var conexion = 0;
for (var u = 0; u <= 15; u++){
sel[u]=null;
valor_pasado[u]="X";
};
var oProgressIndicator2 = new sap.ui.commons.ProgressIndicator("Progreso", {
	width: "100%", 
	percentValue: 1, 
	displayValue: "0%"
	});



/////////////////////////////////////////////////////////
///////////////       MARCA         /////////////////////
/////////////////////////////////////////////////////////
filtroA = new sap.ui.commons.DropdownBox("ComboMarca",{
	Enabled: "false",
	change: function(oEvent){
	 sel_marca = oEvent.oSource.getSelectedKey();
	 if(sel_marca == "X"){
		 sel[1] = null;
		 x1 = 0;
		 }else{			 
	 sel[1] = "MARCA eq '"+sel_marca+"'";
	 console.log(sel[1]);
	 x1 = 1;	 
		 }
	 
	}});

	var oItemTemplate1 = new sap.ui.core.ListItem("uno");
	oItemTemplate1.setText("");
	oItemTemplate1.setKey("X");
	filtroA.addItem(oItemTemplate1);



$.ajax({url:"/ARCA/UI/servicios.xsodata/MARCAS?$format=json",async:true,     
success:function(respuesta){
	var resp1 = respuesta.d.results;	
	var label1;
	for (var a in resp1){
		label1 = 'uno' + a;
		oItemTemplate1 = new sap.ui.core.ListItem(label1);
		oItemTemplate1.setText(resp1[a].MARCA);
		oItemTemplate1.setKey(resp1[a].MARCA);
		filtroA.addItem(oItemTemplate1);
	};
},
error: function (respuesta) {
	 alert("Error al realizar consulta");
	}
});
	
	

//////////////////////////////////
/////////Presentacion//////////////
//////////////////////////////////

filtroC = new sap.ui.commons.DropdownBox("ComboPresentacion",{change: function(oEvent){
	 sel_pres = oEvent.oSource.getSelectedKey();
	 if(sel_pres == "X"){
		 sel[2] = null;
		 x2 = 0;
		 }else{
	 sel[2] = "PRESENTACION eq '"+sel_pres+"'";
	 x2 = 1;
		 }
	 
	}});


var oItemTemplate2 = new sap.ui.core.ListItem("dos");
oItemTemplate2.setText("");
oItemTemplate2.setKey("X");
filtroC.addItem(oItemTemplate2);

$.ajax({url:"/ARCA/UI/servicios.xsodata/PRESENTACIONES?$format=json",     
	success:function(respuesta){
		var resp2 = respuesta.d.results;

		
		var label2;
		for (var b in resp2){
			label2 = 'dos' + b;
			oItemTemplate2 = new sap.ui.core.ListItem(label2);
			oItemTemplate2.setText(resp2[b].PRESENTACION);
			oItemTemplate2.setKey(resp2[b].PRESENTACION);
			filtroC.addItem(oItemTemplate2);
		};
},
error: function (respuesta) {
	 alert("Error al realizar consulta");
	}
});


////////////////////////////////////////////
/////////////    ZONA        ///////////////
////////////////////////////////////////////

filtroD = new sap.ui.commons.DropdownBox("ComboZona",{change: function(oEvent){
	sel_zona = oEvent.oSource.getSelectedKey();
     if(sel_zona == "X"){
		 sel[3] = null;
		 x3 = 0;
		 
		 filtroB.destroyItems();
		 var oItemTemplateX = new sap.ui.core.ListItem("cero");
		 oItemTemplateX.setText("");
		 oItemTemplateX.setKey("X");
		 filtroB.addItem(oItemTemplateX);
		 filtroB.setSelectedKey("X");
		 sel[4] = undefined;
			filtroR.destroyItems();
			oItemTemplateY = new sap.ui.core.ListItem("limpias");
			oItemTemplateY.setText('');
			oItemTemplateY.setKey('X');
			filtroR.addItem(oItemTemplateY);
			filtroR.setSelectedKey("X");
			sel[6] = null;
		 
	 }else{
		 sel[3] = "ZONAID eq '"+sel_zona+"'";
		 console.log(sel[3]);
		 filtroB.destroyItems();
		 var oItemTemplateX = new sap.ui.core.ListItem("cero");
		 oItemTemplateX.setText("");
		 oItemTemplateX.setKey("X");
		 filtroB.addItem(oItemTemplateX);
		 filtroB.setSelectedKey("X");
		 sel[4] = undefined;
		filtroR.destroyItems();
		oItemTemplateY = new sap.ui.core.ListItem("limpias");
		oItemTemplateY.setText('');
		oItemTemplateY.setKey('X');
		filtroR.addItem(oItemTemplateY);
		filtroR.setSelectedKey("X");
		sel[6] = null;

	 x3 = 1;
	 cargaCombo_cedi(sel_zona);
	}}});


	
	var oItemTemplate3 = new sap.ui.core.ListItem("tres");
	oItemTemplate3.setText("");
	oItemTemplate3.setKey("X");
	filtroD.addItem(oItemTemplate3);

$.ajax({url:"/ARCA/UI/servicios.xsodata/ZONAS?$format=json&$orderby=ZONADESC",     
	success:function(respuesta){
		var resp3 = respuesta.d.results;

		
		var label3;
		for (var c in resp3){
			label3 = 'tres' + c;
			oItemTemplate3 = new sap.ui.core.ListItem(label3);
			oItemTemplate3.setText(resp3[c].ZONADESC);
			oItemTemplate3.setKey(resp3[c].ZONAID);
			filtroD.addItem(oItemTemplate3);
		};
},
error: function (respuesta) {
	 alert("Error al realizar consulta");
	}
});


//////////////////////////////////////////////////
////////////////       CEDI          /////////////
//////////////////////////////////////////////////

 filtroB = new sap.ui.commons.DropdownBox("ComboCedi",{change: function(oEvent){
	 sel_cedi = oEvent.oSource.getSelectedKey();
	 if(sel_cedi == "X"){
		 sel[4] = undefined;
		 x4 = 0;
		 
		 filtroR.destroyItems();
		 var oItemTemplateY = new sap.ui.core.ListItem("ceros");
		 oItemTemplateY.setText("");
		 oItemTemplateY.setKey("X");
		 filtroR.addItem(oItemTemplateY);
		 filtroR.setSelectedKey("X");
		 sel[6] = null;
		 }else{
//	 sel[4] = "AT_RUTA_REPARTO_PLANT eq '"+sel_cedi+"'";
	 sel[4] = "CEDIID eq '"+sel_cedi+"'";
	 console.log(sel[4]);
	 x4 = 1;
	 sel[6] = null;
	 cargaCombo_ruta(sel_cedi);
		 }
	 
	 
	}});
//filtroB.setModel(oModel);



var oItemTemplate4 = new sap.ui.core.ListItem("cuatro");
oItemTemplate4.setText("");
oItemTemplate4.setKey("X");
filtroB.addItem(oItemTemplate4);



//////////////////////////////////////////////////
////////////////        RUTA          ////////////
//////////////////////////////////////////////////


		filtroR = new sap.ui.commons.DropdownBox("ComboRuta",{change: function(oEvent){
		sel_ruta = oEvent.oSource.getSelectedKey();
		if(sel_ruta == "X"){
		sel[6] = null;
		x6 = 0;
		}else{
		sel[6] = "TRZONE eq '"+sel_ruta+"'";
		x6 = 1;
		}
		
		
		}});
		

		
		
		var oItemTemplate6 = new sap.ui.core.ListItem("seis");
		oItemTemplate6.setText("");
		oItemTemplate6.setKey("X");
		filtroR.addItem(oItemTemplate6);






///////////////////////////////////////////////////////
//////////////////   Día    ////////////////////////
///////////////////////////////////////////////////////

		 filtroE = new sap.ui.commons.DropdownBox("ComboDia",{change: function(oEvent){
	 		 sel_fecha = oEvent.oSource.getSelectedKey();
	 
			 if(sel_fecha == "X"){
			 sel[5] = null;
			 x5 = 0;
			 }else{
				 sel[5] = "DIA eq '"+sel_fecha+"'";
			 console.log(sel[5]);
			 x5 = 1;
			 }
			 
			}});

			
			
			var oItemTemplate5 = new sap.ui.core.ListItem("cinco");
			oItemTemplate5.setText("");
			oItemTemplate5.setKey("X");
			filtroE.addItem(oItemTemplate5);
		
$.ajax({url:"/ARCA/UI/servicios.xsodata/DIAS?$format=json",     
	success:function(respuesta){
		var resp5 = respuesta.d.results;		
		
		
			var label5;
			for (var e in resp5){
				label5 = 'cinco' + e;
				oItemTemplate5 = new sap.ui.core.ListItem(label5);
				
					switch (resp5[e].DIA){
					case '1':
						oItemTemplate5.setText('LUNES');
					break;
					case '2':
						oItemTemplate5.setText('MARTES');
					break;
					case '3':
						oItemTemplate5.setText('MIÉRCOLES');
					break;
					case '4':
						oItemTemplate5.setText('JUEVES');
					break;
					case '5':
						oItemTemplate5.setText('VIERNES');
					break;
					case '6':
						oItemTemplate5.setText('SÁBADO');
					break;
					case '7':
						oItemTemplate5.setText('DOMINGO');
					}
					
				
				
				oItemTemplate5.setKey(resp5[e].DIA);
				filtroE.addItem(oItemTemplate5);
			};

},
error: function (respuesta) {
	 alert("Error al realizar consulta");
	}
});




///////////////////////////////////////////////////////
//////////////////    MES    ////////////////////////
///////////////////////////////////////////////////////

filtroMes = new sap.ui.commons.DropdownBox("ComboMes",{change: function(oEvent){
sel_mes = oEvent.oSource.getSelectedKey();

if(sel_mes == "X"){
sel[7] = null;
x7 = 0;
}else{
sel[7] = "MES eq '"+sel_mes+"'";
console.log(sel[7]);
x7 = 1;
}

}});



var oItemTemplate7 = new sap.ui.core.ListItem("siete");
oItemTemplate7.setText("");
oItemTemplate7.setKey("X");
filtroMes.addItem(oItemTemplate7);

$.ajax({url:"/ARCA/UI/servicios.xsodata/MES?$format=json",     
success:function(respuesta){
var resp7 = respuesta.d.results;		


var label7;
for (var e in resp7){
label7 = 'siete' + e;
oItemTemplate7 = new sap.ui.core.ListItem(label7);

oItemTemplate7.setText(resp7[e].ANIO + '-' + resp7[e].MES);
oItemTemplate7.setKey(resp7[e].MES);
filtroMes.addItem(oItemTemplate7);
};


 
},
error: function (respuesta) {
	 alert("Error al realizar consulta");
	}
});



///////////////////////////////////////////////////////
//////////////////   Rgm    ////////////////////////
///////////////////////////////////////////////////////

filtroRgm = new sap.ui.commons.DropdownBox("ComboRgm",{change: function(oEvent){
sel_rgm = oEvent.oSource.getSelectedKey();

if(sel_rgm == "X"){
sel[8] = null;
x8 = 0;
}else{
sel[8] = "CANAL_RGM eq '"+sel_rgm+"'";
console.log(sel[8]);
x8 = 1;
}

}});



var oItemTemplate8 = new sap.ui.core.ListItem("ocho");
oItemTemplate8.setText("");
oItemTemplate8.setKey("X");
filtroRgm.addItem(oItemTemplate8);

$.ajax({url:"/ARCA/UI/servicios.xsodata/RGMS?$format=json",     
success:function(respuesta){
var resp8 = respuesta.d.results;		


var label8;
for (var e in resp8){
label8 = 'ocho' + e;
oItemTemplate8 = new sap.ui.core.ListItem(label8);
oItemTemplate8.setText(resp8[e].CANAL_RGM);
oItemTemplate8.setKey(resp8[e].CANAL_RGM);
filtroRgm.addItem(oItemTemplate8);
};

},
error: function (respuesta) {
	 alert("Error al realizar consulta");
	}
});



///////////////////////////////////////////////////////
//////////////////    ISSCOM    ///////////////////////
///////////////////////////////////////////////////////

filtroIsscom = new sap.ui.commons.DropdownBox("ComboIsscom",{change: function(oEvent){
sel_isscom = oEvent.oSource.getSelectedKey();

if(sel_isscom == "X"){
sel[9] = null;
x9 = 0;
}else{
sel[9] = "ISSCOM eq '"+sel_isscom+"'";
console.log(sel[9]);
x9 = 1;
}

}});



var oItemTemplate9 = new sap.ui.core.ListItem("nueve");
oItemTemplate9.setText("");
oItemTemplate9.setKey("X");
filtroIsscom.addItem(oItemTemplate9);

$.ajax({url:"/ARCA/UI/servicios.xsodata/ISSCOMS?$format=json",     
success:function(respuesta){
var resp9 = respuesta.d.results;		


var label9;
for (var e in resp9){
label9 = 'nueve' + e;
oItemTemplate9 = new sap.ui.core.ListItem(label9);
oItemTemplate9.setText(resp9[e].TXT_CAN_ISSCOM);
oItemTemplate9.setKey(resp9[e].ISSCOM);
filtroIsscom.addItem(oItemTemplate9);
};

},
error: function (respuesta) {
	 alert("Error al realizar consulta");
	}
});



///////////////////////////////////////////////////////
//////////////  ACTIVIDAD ISSCOM   ////////////////////
///////////////////////////////////////////////////////

filtroAct = new sap.ui.commons.DropdownBox("ComboAct",{change: function(oEvent){
sel_act = oEvent.oSource.getSelectedKey();

if(sel_act == "X"){
sel[10] = null;
x10 = 0;
}else{
sel[10] = "ACT_ISSCOM eq '"+sel_act+"'";
console.log(sel[10]);
x10 = 1;
}

}});



var oItemTemplate10 = new sap.ui.core.ListItem("diez");
oItemTemplate10.setText("");
oItemTemplate10.setKey("X");
filtroAct.addItem(oItemTemplate10);

$.ajax({url:"/ARCA/UI/servicios.xsodata/ACT_ISSCOMS?$format=json",     
success:function(respuesta){
var resp10 = respuesta.d.results;		


var label10;
for (var e in resp10){
label10 = 'diez' + e;
oItemTemplate10 = new sap.ui.core.ListItem(label10);
oItemTemplate10.setText(resp10[e].TXT_COD_ACT_ISSCOM);
oItemTemplate10.setKey(resp10[e].ACT_ISSCOM);
filtroAct.addItem(oItemTemplate10);
};

},
error: function (respuesta) {
 alert("Error al realizar consulta");
}});



///////////////////////////////////////////////////////
//////////////////    SUBCANAL     ////////////////////
///////////////////////////////////////////////////////

filtroSub = new sap.ui.commons.DropdownBox("ComboSub",{change: function(oEvent){
sel_sub = oEvent.oSource.getSelectedKey();

if(sel_sub == "X"){
sel[11] = null;
x11 = 0;
}else{
sel[11] = "SUBCANAL eq '"+sel_sub+"'";
console.log(sel[11]);
x11 = 1;
}

}});



var oItemTemplate11 = new sap.ui.core.ListItem("once");
oItemTemplate11.setText("");
oItemTemplate11.setKey("X");
filtroSub.addItem(oItemTemplate11);

$.ajax({url:"/ARCA/UI/servicios.xsodata/SUB_CANALS?$format=json",     
success:function(respuesta){
var resp11 = respuesta.d.results;		


var label11;
for (var e in resp11){
label11 = 'once' + e;
oItemTemplate11 = new sap.ui.core.ListItem(label11);
oItemTemplate11.setText(resp11[e].SUBCANAL);
oItemTemplate11.setKey(resp11[e].SUBCANAL);
filtroSub.addItem(oItemTemplate11);
};

},
error: function (respuesta) {
	 alert("Error al realizar consulta");
	}
});




///////////////////////////////////////////////////////
//////////////////  RETORNABILIDAD  ///////////////////
///////////////////////////////////////////////////////

filtroRetor = new sap.ui.commons.DropdownBox("ComboRetor",{change: function(oEvent){
sel_retor = oEvent.oSource.getSelectedKey();

if(sel_retor == "X"){
sel[12] = null;
x12 = 0;
}else{
sel[12] = "RETORNABILIDAD eq '"+sel_retor+"'";
console.log(sel[12]);
x12 = 1;
}

}});



var oItemTemplate12 = new sap.ui.core.ListItem("doce");
oItemTemplate12.setText("");
oItemTemplate12.setKey("X");
filtroRetor.addItem(oItemTemplate12);

$.ajax({url:"/ARCA/UI/servicios.xsodata/RETORNABILIDADS?$format=json",     
success:function(respuesta){
var resp12 = respuesta.d.results;		


var label12;
for (var e in resp12){
label12 = 'doce' + e;
oItemTemplate12 = new sap.ui.core.ListItem(label12);
oItemTemplate12.setText(resp12[e].RETORNABILIDAD);
oItemTemplate12.setKey(resp12[e].RETORNABILIDAD);
filtroRetor.addItem(oItemTemplate12);
};

},
error: function (respuesta) {
	 alert("Error al realizar consulta");
	}
});



///////////////////////////////////////////////////////
/////////////////  Segmento Agrupado  /////////////////
///////////////////////////////////////////////////////

filtroSegmnt = new sap.ui.commons.DropdownBox("ComboSegmnt",{change: function(oEvent){
sel_segmnt = oEvent.oSource.getSelectedKey();

if(sel_segmnt == "X"){
sel[13] = null;
x13 = 0;
}else{
sel[13] = "SEGMEN_AGRU eq '"+sel_segmnt+"'";
console.log(sel[13]);
x13 = 1;
}

}});



var oItemTemplate13 = new sap.ui.core.ListItem("trece");
oItemTemplate13.setText("");
oItemTemplate13.setKey("X");
filtroSegmnt.addItem(oItemTemplate13);

$.ajax({url:"/ARCA/UI/servicios.xsodata/SEGMENTOS?$format=json",     
success:function(respuesta){
var resp13 = respuesta.d.results;		


var label13;
for (var e in resp13){
label13 = 'trece' + e;
oItemTemplate13 = new sap.ui.core.ListItem(label13);
oItemTemplate13.setText(resp13[e].SEGMEN_AGRU);
oItemTemplate13.setKey(resp13[e].SEGMEN_AGRU);
filtroSegmnt.addItem(oItemTemplate13);
};

},
error: function (respuesta) {
	 alert("Error al realizar consulta");
	}});




///////////////////////////////////////////////////////
/////////////////  tamaño  /////////////////
///////////////////////////////////////////////////////

filtroTam = new sap.ui.commons.DropdownBox("ComboTam",{change: function(oEvent){
sel_tam = oEvent.oSource.getSelectedKey();

if(sel_tam == "X"){
sel[14] = null;
x14 = 0;
}else{
sel[14] = "TAMANO eq '"+sel_tam+"'";
console.log(sel[14]);
x14 = 1;
}

}});



var oItemTemplate14 = new sap.ui.core.ListItem("catorce");
oItemTemplate14.setText("");
oItemTemplate14.setKey("X");
filtroTam.addItem(oItemTemplate14);

$.ajax({url:"/ARCA/UI/servicios.xsodata/TAMANIOS?$format=json",     
success:function(respuesta){
var resp14 = respuesta.d.results;		


var label14;
for (var e in resp14){
label14 = 'catorce' + e;
oItemTemplate14 = new sap.ui.core.ListItem(label14);
oItemTemplate14.setText(resp14[e].TAMANO);
oItemTemplate14.setKey(resp14[e].TAMANO);
filtroTam.addItem(oItemTemplate14);
};

},
error: function (respuesta) {
	 alert("Error al realizar consulta");
	}});



///////////////////////////////////////////////////////
//////////////////  Tamaño Cliente  ///////////////////
///////////////////////////////////////////////////////

filtroTamCli = new sap.ui.commons.DropdownBox("ComboTamCli",{change: function(oEvent){
sel_tamcli = oEvent.oSource.getSelectedKey();

if(sel_tamcli == "X"){
sel[15] = null;
x15 = 0;
}else{
sel[15] = "TAMANO_CUS eq '"+sel_tamcli+"'";
console.log(sel[15]);
x15 = 1;
}

}});



var oItemTemplate15 = new sap.ui.core.ListItem("quince");
oItemTemplate15.setText("");
oItemTemplate15.setKey("X");
filtroTamCli.addItem(oItemTemplate15);

$.ajax({url:"/ARCA/UI/servicios.xsodata/TAMANIO_CUSS?$format=json",     
success:function(respuesta){
var resp15 = respuesta.d.results;		


var label15;
for (var e in resp15){
label15 = 'quince' + e;
oItemTemplate15 = new sap.ui.core.ListItem(label15);
oItemTemplate15.setText(resp15[e].TAMANO_CUS);
oItemTemplate15.setKey(resp15[e].TAMANO_CUS);
filtroTamCli.addItem(oItemTemplate15);
};

},
error: function (respuesta) {
	 alert("Error al realizar consulta");
	}});






var oLabel1 = new sap.ui.commons.Label("Labelmarca",{ text: "Marca:", labelFor: filtroA});
oLabel1.setDesign(sap.ui.commons.LabelDesign.Bold);
var oLabel2 = new sap.ui.commons.Label("Labelpresentacion",{ text: "Presentación:", labelFor: filtroC});
oLabel2.setDesign(sap.ui.commons.LabelDesign.Bold);
var oLabel3 = new sap.ui.commons.Label("Labelzona",{ text: "Zona:", labelFor: filtroD});
oLabel3.setDesign(sap.ui.commons.LabelDesign.Bold);
var oLabel4 = new sap.ui.commons.Label("Labelcedi",{ text: "Cedi:", labelFor: filtroB});
oLabel4.setDesign(sap.ui.commons.LabelDesign.Bold);
var oLabel6 = new sap.ui.commons.Label("Labelruta",{ text: "Ruta:", labelFor: filtroR});
oLabel6.setDesign(sap.ui.commons.LabelDesign.Bold);
var oLabel5 = new sap.ui.commons.Label("Labeldia",{ text: "Día:", labelFor: filtroE , design: "Bold"});
oLabel5.setDesign(sap.ui.commons.LabelDesign.Bold);
var oLabel7 = new sap.ui.commons.Label("Labelmes",{ text: "Mes:", labelFor: filtroMes , design: "Bold"});
oLabel7.setDesign(sap.ui.commons.LabelDesign.Bold);
var oLabel8 = new sap.ui.commons.Label("Labelrgm",{ text: "Canal RGM:", labelFor: filtroRgm , design: "Bold"});
oLabel8.setDesign(sap.ui.commons.LabelDesign.Bold);
var oLabel9 = new sap.ui.commons.Label("Labelisscom",{ text: "Canal ISSCOM:", labelFor: filtroIsscom , design: "Bold"});
oLabel9.setDesign(sap.ui.commons.LabelDesign.Bold);
var oLabel10 = new sap.ui.commons.Label("Labelact",{ text: "Actividad ISSCOM:", labelFor: filtroAct , design: "Bold"});
oLabel10.setDesign(sap.ui.commons.LabelDesign.Bold);
var oLabel11 = new sap.ui.commons.Label("Labelsub",{ text: "Subcanal:", labelFor: filtroSub , design: "Bold"});
oLabel11.setDesign(sap.ui.commons.LabelDesign.Bold);
var oLabel12 = new sap.ui.commons.Label("Labelretornabilidad",{ text: "Retornabilidad:", labelFor: filtroRetor , design: "Bold"});
oLabel12.setDesign(sap.ui.commons.LabelDesign.Bold);
var oLabel13 = new sap.ui.commons.Label("Labelsegmento",{ text: "Segmento Agrupado:", labelFor: filtroSegmnt , design: "Bold"});
oLabel13.setDesign(sap.ui.commons.LabelDesign.Bold);
var oLabel14 = new sap.ui.commons.Label("Labeltamano",{ text: "Tamaño:", labelFor: filtroTam , design: "Bold"});
oLabel14.setDesign(sap.ui.commons.LabelDesign.Bold);
var oLabel15 = new sap.ui.commons.Label("Labeltam_cli",{ text: "Tamaño del cliente:", labelFor: filtroTamCli , design: "Bold"});
oLabel15.setDesign(sap.ui.commons.LabelDesign.Bold);

var oLabelrojo = new sap.ui.commons.Label("Labelrojo",{ text: "Clientes totales: ", labelFor: filtroTamCli , design: "Bold"});
oLabelrojo.setDesign(sap.ui.commons.LabelDesign.Bold);
var oLabelamar = new sap.ui.commons.Label("Labelamar",{ text: "Clientes filtrados: ", labelFor: filtroTamCli , design: "Bold"});
oLabelamar.setDesign(sap.ui.commons.LabelDesign.Bold);



//////////////////////////////////////////////////////////////
////////////////        BOTON           //////////////////////
//////////////////////////////////////////////////////////////

var oAceptar = new sap.ui.commons.Button({
	text : "Buscar",
	width: "100%",
	style: sap.ui.commons.ButtonStyle.Emph,
	press : function() {
		
		var combosSeleccionados = x1+x2+x3+x4+x5+x6+x7+x8+x9+x10+x11+x12+x13+x14+x15;
		valida = x1+x2+x5+x7+x8+x9+x10+x11+x12+x13+x14+x15;
		
		var capa2 = ""; 
		var capa1 = "empty"; 
		
		if(combosSeleccionados == 0){
			alert("No hay ningún campo seleccionado");
		}else {			
			for(var contador = 1; contador <= 15; contador++){//Construye select en base al combo ---sin ruta cambiar a 5
				if(sel[contador] != null){
						capa2 = capa2 + sel[contador]  +' and ';
				}
			};
			
			console.log(capa2);
//			capa2=capa2.replace(/and[^and]*)$/,'$1');//quita ultimo AND
			capa2 = capa2.substring(0, capa2.length - 4);
			var valor = 'empty';
		
			if(filtroD.getSelectedKey() != "X" && valida == 0){
				capa1 = capa2;
				capa2 = "empty";
				

			}else if(filtroD.getSelectedKey() != "X" && valida != 0){
				
				if(filtroD.getSelectedKey() != "X"){//ZONA
					capa1 =  sel[3];
				}
				if(filtroB.getSelectedKey() != "X"){//CEDI
					capa1 =  sel[4];
				}
				if(filtroR.getSelectedKey() != "X"){//RUTA
					capa1 =  sel[6];
				}
			}else if(filtroD.getSelectedKey() == "X" && valida != 0){
				capa1 = 'datos';
			}
			console.log('capa2: '+ capa2 + ' ' + 'capa1: ' + capa1);
			
			//Obtiene el valor de la zona para obtener coordenadas
			valor = filtroD.getValue();
			
			if(filtroR.getSelectedKey() != "X"){
				filtros(capa2,capa1,valor,1);
			}else{
				filtros(capa2, capa1, valor,0);
			}
			capa1 = null;
		}	
	}
});


function cedi_seleccion(){
	return filtroB.getSelectedKey();
	
}


var oLimpia = new sap.ui.commons.Button({
	text : "Limpiar",
	width: "100%",
	style: sap.ui.commons.ButtonStyle.Emph,
	press : function(oEvent) {
		reset();
		filtroA.setSelectedKey("X");
			sel[1]=null;
			valor_pasado[0] = "X";
			sel[2]=null;
			valor_pasado[1] = "X";
		filtroC.setSelectedKey("X");
			sel[3]=null;
			valor_pasado[2] = "X";
			filtroB.destroyItems();
			oItemTemplateX = new sap.ui.core.ListItem("limpia");
			oItemTemplateX.setText('');
			oItemTemplateX.setKey('X');
			filtroB.addItem(oItemTemplateX);
			filtroR.destroyItems();
			oItemTemplateY = new sap.ui.core.ListItem("limpia2");
			oItemTemplateY.setText('');
			oItemTemplateY.setKey('X');
			filtroR.addItem(oItemTemplateY);
		filtroD.setSelectedKey("X");
			sel[4]=undefined;
			valor_pasado[3] = "X";
		filtroE.setSelectedKey("X");
			sel[5]=null;
			valor_pasado[4] = "X";
		filtroR.setSelectedKey("X");
			sel[6]=null;
			valor_pasado[5] = "X";
		filtroMes.setSelectedKey("X");
			sel[7]=null;
			valor_pasado[6] = "X";
		filtroRgm.setSelectedKey("X");
			sel[8]=null;
			valor_pasado[7] = "X";
		filtroIsscom.setSelectedKey("X");
			sel[9]=null;
			valor_pasado[8] = "X";
		filtroAct.setSelectedKey("X");
			sel[10]=null;
			valor_pasado[9] = "X";
		filtroSub.setSelectedKey("X");
			sel[11]=null;
			valor_pasado[10] = "X";
		filtroRetor.setSelectedKey("X");
			sel[12]=null;
			valor_pasado[11] = "X";
		filtroSegmnt.setSelectedKey("X");
			sel[13]=null;
			valor_pasado[12] = "X";
		filtroTam.setSelectedKey("X");
			sel[14]=null;
			valor_pasado[13] = "X";
		filtroTamCli.setSelectedKey("X");
			sel[15]=null;
			valor_pasado[14] = "X";
			
			x1=0; x2=0; x3=0; x4=0; x5=0; x6=0; 
			x7=0;x8=0;x9=0;x10=0;x11=0;x12=0;x13=0;x14=0;x15=0;valida = 0;
	}
});






////////////////////////////////////////////////////////////////
/////////////////////    LAYOUT          ///////////////////////
////////////////////////////////////////////////////////////////
var oLayout = new sap.ui.commons.layout.MatrixLayout("Matrix1",{
	layoutFixed: false,//false
	columns: 2,
	rows: [
	       
	       		//FECHAS
				new sap.ui.commons.layout.MatrixLayoutRow("Row9", {cells:[
	                new sap.ui.commons.layout.MatrixLayoutCell("Cell15", {content:oLabel7}),
	                new sap.ui.commons.layout.MatrixLayoutCell("Cell16", {content:filtroMes})]}),	       
				new sap.ui.commons.layout.MatrixLayoutRow("Row6", {cells:[
	                new sap.ui.commons.layout.MatrixLayoutCell("Cell11", {content:oLabel5}),
	                new sap.ui.commons.layout.MatrixLayoutCell("Cell12", {content:filtroE})]}),
	                
				new sap.ui.commons.layout.MatrixLayoutRow("RowF", {cells:[
  				    new sap.ui.commons.layout.MatrixLayoutCell("CellF", {colSpan:2,content: new sap.ui.commons.HorizontalDivider("dividerF", {width: "100%", type: "Page", height: "Small"})})]}),
	                
	            //EST
				new sap.ui.commons.layout.MatrixLayoutRow("Row3", {cells:[
  					new sap.ui.commons.layout.MatrixLayoutCell("Cell5", {content:oLabel3}),
  					new sap.ui.commons.layout.MatrixLayoutCell("Cell6", {content:filtroD})]}),
  				new sap.ui.commons.layout.MatrixLayoutRow("Row4", {cells:[
 					new sap.ui.commons.layout.MatrixLayoutCell("Cell7", {content:oLabel4}),
 					new sap.ui.commons.layout.MatrixLayoutCell("Cell8", {content:filtroB})]}),
  				new sap.ui.commons.layout.MatrixLayoutRow("Row5", {cells:[
 					new sap.ui.commons.layout.MatrixLayoutCell("Cell9", {content:oLabel6}),
 					new sap.ui.commons.layout.MatrixLayoutCell("Cell10", {content:filtroR})]}),
  	                
				new sap.ui.commons.layout.MatrixLayoutRow("RowS1", {cells:[
				    new sap.ui.commons.layout.MatrixLayoutCell("CellS1", {colSpan:2,content: new sap.ui.commons.HorizontalDivider("dividerE", {width: "100%", type: "Page", height: "Small"})})]}),
     			//AGRUPACION
  	            new sap.ui.commons.layout.MatrixLayoutRow("Row10", {cells:[
  	                new sap.ui.commons.layout.MatrixLayoutCell("Cell17", {content:oLabel8}),
  	                new sap.ui.commons.layout.MatrixLayoutCell("Cell18", {content:filtroRgm})]}),
				new sap.ui.commons.layout.MatrixLayoutRow("Row11", {cells:[
  	                new sap.ui.commons.layout.MatrixLayoutCell("Cell19", {content:oLabel9}),
  	                new sap.ui.commons.layout.MatrixLayoutCell("Cell20", {content:filtroIsscom})]}),
				new sap.ui.commons.layout.MatrixLayoutRow("Row12", {cells:[
  	                new sap.ui.commons.layout.MatrixLayoutCell("Cell21", {content:oLabel10}),
  	                new sap.ui.commons.layout.MatrixLayoutCell("Cell22", {content:filtroAct})]}),
				new sap.ui.commons.layout.MatrixLayoutRow("Row13", {cells:[
  	                new sap.ui.commons.layout.MatrixLayoutCell("Cell23", {content:oLabel11}),
  	                new sap.ui.commons.layout.MatrixLayoutCell("Cell124", {content:filtroSub})]}),

				new sap.ui.commons.layout.MatrixLayoutRow("Row17", {cells:[
  	                new sap.ui.commons.layout.MatrixLayoutCell("Cell31", {content:oLabel15}),
  	                new sap.ui.commons.layout.MatrixLayoutCell("Cell132", {content:filtroTamCli})]}),
  	                
				new sap.ui.commons.layout.MatrixLayoutRow("RowS", {cells:[
				    new sap.ui.commons.layout.MatrixLayoutCell("CellS", {colSpan:2,content: new sap.ui.commons.HorizontalDivider("divider2", {width: "100%", type: "Page", height: "Small"})})]}),  	                

  	                
  	            //MATERIAL
	       		new sap.ui.commons.layout.MatrixLayoutRow("Row1", {cells:[
					new sap.ui.commons.layout.MatrixLayoutCell("Cell1", {content:oLabel1}),
					new sap.ui.commons.layout.MatrixLayoutCell("Cell2", {content:filtroA})]}),
				new sap.ui.commons.layout.MatrixLayoutRow("Row2", {cells:[
					new sap.ui.commons.layout.MatrixLayoutCell("Cell3", {content:oLabel2}),
					new sap.ui.commons.layout.MatrixLayoutCell("Cell4", {content:filtroC})]}),
				new sap.ui.commons.layout.MatrixLayoutRow("Row14", {cells:[
  	                new sap.ui.commons.layout.MatrixLayoutCell("Cell25", {content:oLabel12}),
  	                new sap.ui.commons.layout.MatrixLayoutCell("Cell26", {content:filtroRetor})]}),
				new sap.ui.commons.layout.MatrixLayoutRow("Row15", {cells:[
  	                new sap.ui.commons.layout.MatrixLayoutCell("Cell27", {content:oLabel13}),
  	                new sap.ui.commons.layout.MatrixLayoutCell("Cell28", {content:filtroSegmnt})]}),
				new sap.ui.commons.layout.MatrixLayoutRow("Row16", {cells:[
  	                new sap.ui.commons.layout.MatrixLayoutCell("Cell29", {content:oLabel14}),
  	                new sap.ui.commons.layout.MatrixLayoutCell("Cell30", {content:filtroTam})]}),

				new sap.ui.commons.layout.MatrixLayoutRow("Rowb", {cells:[
				    new sap.ui.commons.layout.MatrixLayoutCell("Cellb", {colSpan:2,content: new sap.ui.commons.HorizontalDivider("dividerb", {width: "100%", type: "Page", height: "Small"})})]}),
 
   				new sap.ui.commons.layout.MatrixLayoutRow("Row7", {cells:[
   				    new sap.ui.commons.layout.MatrixLayoutCell("Cell13", {colSpan:2,content: oAceptar})]}),
   				new sap.ui.commons.layout.MatrixLayoutRow("Row8",{cells:[
   				    new sap.ui.commons.layout.MatrixLayoutCell("Cell14", {colSpan:2,content: oLimpia})]})

				]
	}).placeAt("panel_info");

//}});

var oImageR = new sap.ui.commons.Image();
oImageR.setSrc('/ARCA/UI/imagen/rojo.png');
oImageR.setAlt("Clientes totales");

var oImageA = new sap.ui.commons.Image();
oImageA.setSrc('/ARCA/UI/imagen/amarillo.png');
oImageA.setAlt("Clientes filtrados");


new sap.ui.commons.layout.MatrixLayout("Matrix2",{
	layoutFixed: false,
	columns: 2,
	rows: [
				new sap.ui.commons.layout.MatrixLayoutRow("rojo", {cells:[
	                new sap.ui.commons.layout.MatrixLayoutCell("Cellr", {content:oLabelrojo}),
	                new sap.ui.commons.layout.MatrixLayoutCell("Cellr1", {content:oImageR})]}),	       
				new sap.ui.commons.layout.MatrixLayoutRow("amarillo", {cells:[
	                new sap.ui.commons.layout.MatrixLayoutCell("Cella", {content:oLabelamar}),
	                new sap.ui.commons.layout.MatrixLayoutCell("Cella1", {content:oImageA})]})
	                ]
}).placeAt("panel_carac");











function devuelve(indicador){
	if(indicador == 1){ 	
		filtroA.setSelectedKey(valor_pasado[0]);
		if(valor_pasado[0] == "X" || valor_pasado[0] == undefined ){
			sel[1] = null;
			x1 = 0;
		}else{
			sel[1] = "MARCA eq '"+valor_pasado[0]+"'";
			x1 = 1;
		}
		
		filtroC.setSelectedKey(valor_pasado[1]);
		
		if(valor_pasado[1] == "X" || valor_pasado[1] == undefined){
			sel[2] = null;
			x2 = 0;
		}else{
			sel[2] = "PRESENTACION eq '"+valor_pasado[1]+"'";
			x2 = 1;
		}
		
		filtroD.setSelectedKey(valor_pasado[2]);
		
		if(valor_pasado[2] == "X" || valor_pasado[2] == undefined){
			sel[3] = null;
			x3 = 0;
			filtroB.destroyItems();
			oItemTemplateX = new sap.ui.core.ListItem("regreso");
			oItemTemplateX.setText('');
			oItemTemplateX.setKey('X');
			filtroB.addItem(oItemTemplateX);
		}else{
			sel[3] = "ZONAID eq '"+valor_pasado[2]+"'";
			cargaCombo_cedi(valor_pasado[2]);
			x3 = 1;
		}
		
		filtroB.setSelectedKey(valor_pasado[3]);
		
		if(valor_pasado[3] == "X" || valor_pasado[3] == undefined){
			sel[4] = undefined;
			x4 = 0;
			filtroR.destroyItems();
			oItemTemplateY = new sap.ui.core.ListItem("regreso2");
			oItemTemplateY.setText('');
			oItemTemplateY.setKey('X');
			filtroR.addItem(oItemTemplateY);
		}else{
			sel[4] = "CEDIID eq '"+valor_pasado[3]+"'";
			cargaCombo_ruta(valor_pasado[3]);
			x4 = 1;
		}
		
		filtroE.setSelectedKey(valor_pasado[4]);
		
		if(valor_pasado[4] == "X" || valor_pasado[4] == undefined) {
			sel[5] = null;
			x5 = 0;
		}else{
			sel[5] = "DIA eq '"+valor_pasado[4]+"'";
			x5 = 1;
		}
		
		filtroR.setSelectedKey(valor_pasado[5]);
		
		if(valor_pasado[5] == "X" || valor_pasado[5] == undefined){
			sel[6] = null;
			x6 = 0;
		}else{
			sel[6] = "TRZONE eq '"+valor_pasado[5]+"'";
			x6 = 1;
		}
		
		filtroMes.setSelectedKey(valor_pasado[6]);
		if(valor_pasado[6] == "X" || valor_pasado[6] == undefined ){
			sel[7] = null;
			x7 = 0;
		}else{
			sel[7] = "MES eq '"+valor_pasado[6]+"'";
			x7 = 1;
		}
		
		filtroRgm.setSelectedKey(valor_pasado[7]);
		if(valor_pasado[7] == "X" || valor_pasado[7] == undefined ){
			sel[8] = null;
			x8 = 0;
		}else{
			sel[8] = "CANAL_RGM eq '"+valor_pasado[7]+"'";
			x8 = 1;
		}
		
		filtroIsscom.setSelectedKey(valor_pasado[8]);
		if(valor_pasado[8] == "X" || valor_pasado[8] == undefined ){
			sel[9] = null;
			x9 = 0;
		}else{
			sel[9] = "ISSCOM eq '"+valor_pasado[8]+"'";
			x9 = 1;
		}

		filtroAct.setSelectedKey(valor_pasado[9]);
		if(valor_pasado[9] == "X" || valor_pasado[9] == undefined ){
			sel[10] = null;
			x10 = 0;
		}else{
			sel[10] = "ACT_ISSCOM eq '"+valor_pasado[9]+"'";
			x10 = 1;
		}
		
		filtroSub.setSelectedKey(valor_pasado[10]);
		if(valor_pasado[10] == "X" || valor_pasado[10] == undefined ){
			sel[11] = null;
			x11 = 0;
		}else{
			sel[11] = "SUBCANAL eq '"+valor_pasado[10]+"'";
			x11 = 1;
		}
		
		filtroRetor.setSelectedKey(valor_pasado[11]);
		if(valor_pasado[11] == "X" || valor_pasado[11] == undefined ){
			sel[12] = null;
			x12 = 0;
		}else{
			sel[12] = "RETORNABILIDAD eq '"+valor_pasado[11]+"'";
			x12 = 1;
		}
		
		filtroSegmnt.setSelectedKey(valor_pasado[12]);
		if(valor_pasado[12] == "X" || valor_pasado[12] == undefined ){
			sel[13] = null;
			x13 = 0;
		}else{
			sel[13] = "SEGMEN_AGRU eq '"+valor_pasado[12]+"'";
			x13 = 1;
		}
		
		filtroTam.setSelectedKey(valor_pasado[13]);
		if(valor_pasado[13] == "X" || valor_pasado[13] == undefined ){
			sel[14] = null;
			x14 = 0;
		}else{
			sel[14] = "TAMANO eq '"+valor_pasado[13]+"'";
			x14 = 1;
		}
		
		filtroTamCli.setSelectedKey(valor_pasado[14]);
		if(valor_pasado[14] == "X" || valor_pasado[14] == undefined ){
			sel[15] = null;
			x15 = 0;
		}else{
			sel[15] = "TAMANO_CUS eq '"+valor_pasado[14]+"'";
			x15 = 1;
		}
		
		
	}else{
		valor_pasado[0] = filtroA.getSelectedKey();
		valor_pasado[1] = filtroC.getSelectedKey();
		valor_pasado[2] = filtroD.getSelectedKey();
		valor_pasado[3] = filtroB.getSelectedKey();
		valor_pasado[4] = filtroE.getSelectedKey();
		valor_pasado[5] = filtroR.getSelectedKey();
		valor_pasado[6] = filtroMes.getSelectedKey();
		valor_pasado[7] = filtroRgm.getSelectedKey();
		valor_pasado[8] = filtroIsscom.getSelectedKey();
		valor_pasado[9] = filtroAct.getSelectedKey();
		valor_pasado[10] = filtroSub.getSelectedKey();
		valor_pasado[11] = filtroRetor.getSelectedKey();
		valor_pasado[12] = filtroSegmnt.getSelectedKey();
		valor_pasado[13] = filtroTam.getSelectedKey();
		valor_pasado[14] = filtroTamCli.getSelectedKey();
		
	}
}

function cargaCombo_cedi(insel_zona){
	 var respuestazona;
	 	 
	 $.ajax({url:"/ARCA/UI/servicios.xsodata/CEDIS?$format=json", data:{'$filter' : 'ZONAID eq ' + "'" + insel_zona + "'", '$orderby':'CEDIDESC'},     
			success:function(respuesta){
				var respout = respuesta.d.results;	
				
				filtroB.destroyItems();
				oItemTemplateX = new sap.ui.core.ListItem(label4);
				oItemTemplateX.setText('');
				oItemTemplateX.setKey('X');
				filtroB.addItem(oItemTemplateX);
				for (var d in respout){
					var label4 = 'cuatro' + d;
					oItemTemplateX = new sap.ui.core.ListItem(label4);
					oItemTemplateX.setText(respout[d].CEDIDESC);
					oItemTemplateX.setKey(respout[d].CEDIID);
					filtroB.addItem(oItemTemplateX);
				};
	},
	error: function (respuesta) {
		 alert("Error al realizar consulta");
		}
	 });
	 
	 filtroB.setSelectedKey('X');
}

function cargaCombo_ruta(insel_ruta){
	 var respuestaruta;
//	 $.ajax({url:"/ARCA/UI/carga_ruta.xsjs", data:{inruta:insel_ruta}, async: false,
//			success:function(respuestaruta){
//				var respoutR = respuestaruta.rutas,label6='x';
	 
	 $.ajax({url:"/ARCA/UI/servicios.xsodata/RUTAS?$format=json", data:{'$filter' : 'CEDIID eq ' + "'" + insel_ruta + "'", '$orderby':'TRZONE'},
	 success:function(respuesta){
				var respoutR = respuesta.d.results;	
				
				
				if(respoutR.length == 0){
					filtroR.destroyItems();
					oItemTemplateY = new sap.ui.core.ListItem(label6);
					oItemTemplateY.setText('');
					oItemTemplateY.setKey('X');
					filtroR.addItem(oItemTemplateY);
				}else{
					
					filtroR.destroyItems();
					oItemTemplateY = new sap.ui.core.ListItem(label6);
					oItemTemplateY.setText('');
					oItemTemplateY.setKey('X');
					filtroR.addItem(oItemTemplateY);
					for (var e in respoutR){
						var label6 = 'seis' + e;
						oItemTemplateY = new sap.ui.core.ListItem(label6);
						oItemTemplateY.setText(respoutR[e].TEXTO_RUTA);
						oItemTemplateY.setKey(respoutR[e].TRZONE);
						filtroR.addItem(oItemTemplateY);
					};
				}
	},
	error: function (respuesta) {
		 alert("Error al realizar consulta");
		}
	 });
	 
	 filtroR.setSelectedKey('X');
}


function setMes(m){
	filtroMes.setSelectedKey(m);
}


function progressBar(increment){

	if(increment != 100){
		oProgressIndicator2.setVisible(true);
	}
	
	oProgressIndicator2.setPercentValue(parseInt(increment));
	oProgressIndicator2.setDisplayValue(increment + "%");

	oProgressIndicator2.placeAt("panel_info");
	
}
