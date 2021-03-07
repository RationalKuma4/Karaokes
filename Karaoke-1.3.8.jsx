/***************************************************************
*
*	Funcion ValorK inserta tantas key en el layer perteneciente a Texto
* como silabas marcadas (\k) existan con su correspondiente tiempo 
* aparte inserta markers en el layer para poder usarlo en expresiones.
*
* ent: Layer Texto ; float TI
* sal: Layer Texto3
*
******************************************************************/

function ValorK(Texto, TI, theAnimators, postefecto, gradual, Master) {
	var lel, valor, valor2, Texto3, TiempoM, bTiempoM, tamanioPalabra, tamanioSilaba;

	if (postefecto == "true") {
		var preTiempoM, pretamanioPalabra, pretamanioSilaba;
		pretamanioPalabra = 0;
		pretamanioSilaba = 0;
	}//fin si
	preTiempoM = 0.0;
	TiempoM = 0.0;
	bTiempoM = 0.0;
	lel = 0;
	Texto3 = TextoExtra;
	var respaldo = Texto3;
	var posicion1 = 0
	var posicion2 = 0;
	tamanioPalabra = 0;
	var marcadorInicio = new MarkerValue("0");
	Texto.Marker.setValueAtTime(TI, marcadorInicio);
	Texto3 = Texto3 + "{\\k1}{";
	if (setMaster == "true") {
		a = Master.property(2).property(1);
		a.setValueAtTime(0, NombreMaster);
	}
	posicion2 = respaldo.indexOf("{\\k", posicion2);
	posicion1 = respaldo.indexOf("}", posicion2);
	posicion2 = respaldo.indexOf("{\\k", posicion1);
	Sil = respaldo.substring(posicion1 + 1, posicion2, respaldo);
	if (Sil == "")
		Sil = " ";

	rangeStartProp = theAnimators.property("Silaba Seleccionada").Selectors.property(1).property(4);
	rangeEndProp = theAnimators.property("Silaba Seleccionada").Selectors.property(1).property(5);
	rangeStartProp.setValueAtTime(TI + TiempoM, tamanioPalabra);
	rangeEndProp.setValueAtTime(TI + TiempoM, tamanioPalabra);

	var primero = 10;
	var suma = 0;
	while ((Texto3.indexOf("\\k") != -1) && lel < 120) {
		if (gradual) {
			theAnimators.property(2).Selectors.property("ADBE Text Selector").property(7).property(4).setValueAtTime(TI + TiempoM, 0);
			bTiempoM = TiempoM;
		}
		valor = 0;
		valor2 = 0;
		valor = Texto3.indexOf("\\k", valor2);
		valor2 = Texto3.indexOf("}", valor);
		tamanioSilaba = Texto3.indexOf("{", valor2) - (valor2 + 1);
		valor3 = Texto3.indexOf("{", valor2 - 1);
		SilabaAMostrar = Texto3.substring(valor2 + 1, valor3);
		posicion2 = respaldo.indexOf("{\\k", posicion2);
		posicion1 = respaldo.indexOf("}", posicion2);
		posicion2 = respaldo.indexOf("{\\k", posicion1);
		//posicion1=Texto3.indexOf("}",valor);
		//posicion2=Texto3.indexOf("\\k",valor2);
		if (posicion2 == -1)
			posicion2 = respaldo.length;
		Silaba = Sil;
		if (Silaba == "")
			Silaba = " ";
		Sil = respaldo.substring(posicion1 + 1, posicion2, respaldo);
		//Silaba= Texto3.substring(posicion1+1,posicion2+1);
		if (tamanioSilaba < 0) {
			tamanioSilaba = (Texto3.length) - Texto3.indexOf("{", valor2);
		}//fin si
		TextoABorrar = Texto3.substring(valor - 1, valor2 + 1);
		Texto3 = Texto3.replace(TextoABorrar, "");
		TextoABorrar = TextoABorrar.replace("}", "");
		TextoABorrar = TextoABorrar.replace("\\k", "");
		TextoABorrar = TextoABorrar.replace("{", "");
		Tiempo = parseInt(TextoABorrar);

		//Crea una nueva capa postefecto si la constante postefecto es true
		if (postefecto == "true") {
			prerangeStartProp = preAnimator.Selectors.property("ADBE Text Selector").property(4);
			prerangeEndProp = preAnimator.Selectors.property("ADBE Text Selector").property(5);
			prerangeStartProp.setValueAtTime(TI + preTiempoM, 0);
			prerangeEndProp.setValueAtTime(TI + preTiempoM, pretamanioPalabra);
			//Actualiza
			pretamanioSilaba = tamanioSilaba;
			pretamanioPalabra = tamanioPalabra;

		}//fin si
		preTiempoM = TiempoM;


		//Metemos en el marcador el valor del Key en este texto
		//var marcador = new MarkerValue(Tiempo); 
		marcador = new MarkerValue(Silaba);




		rangeStartProp.setValueAtTime(TI + TiempoM, tamanioPalabra);
		if (primero <= 0) {
			//alert("Resto de silababas: Tiempo:"+TI+TiempoM+"End:"+(tamanioPalabra+tamanioSilaba+suma)+"tamanioPalabra:"+tamanioPalabra+"suma:"+suma+"tamaniSilaba:"+tamanioSilaba+"Silaba:"+SilabaAMostrar+"valor2/valor3:"+valor2+"/"+valor3+"Tiempo:"+Tiempo);
			//rangeEndProp.setValueAtTime(TI+TiempoM, tamanioPalabra + tamanioSilaba + suma);
			rangeEndProp.setValueAtTime(TI + TiempoM, tamanioPalabra + tamanioSilaba);

			//tamanioPalabra=tamanioPalabra+tamanioSilaba+suma;
			tamanioPalabra = tamanioPalabra + tamanioSilaba;
			suma = 0;
		}
		else {
			//alert("Primera silaba: Tiempo:"+TI+TiempoM+"End:"+(tamanioPalabra)+"tamanioPalabra:"+tamanioPalabra+"suma:"+suma+"tamaniSilaba:"+tamanioSilaba+"Silaba:"+SilabaAMostrar+"valor2/valor3:"+valor2+"/"+valor3+"Tiempo:"+Tiempo);
			rangeEndProp.setValueAtTime(TI + TiempoM, tamanioPalabra);
			suma = suma + tamanioSilaba;

			tamanioPalabra = tamanioPalabra + tamanioSilaba;
		}

		primero = primero - 10;


		//tamanioPalabra=tamanioPalabra+tamanioSilaba;
		TiempoM = Tiempo / 100 + TiempoM;
		if (gradual) {
			theAnimators.property(2).Selectors.property("ADBE Text Selector").property(7).property(4).setValueAtTime(TI + (TiempoM + bTiempoM - myComp.frameDuration) / 2, 100);
			theAnimators.property(2).Selectors.property("ADBE Text Selector").property(7).property(4).setValueAtTime(TI + TiempoM - myComp.frameDuration, 0);
		}
		lel = lel + 1;
		Texto.Marker.setValueAtTime(TI + TiempoM, marcador);
		if (setMaster == "true") {
			a = Master.property(2).property(1).setValueAtTime(TI + preTiempoM, Silaba);
		}
	}//fin mientras

	//Crea una nueva marca justo cuando acaba la ultima silaba.
	if (postefecto == "true") {
		prerangeStartProp.setValueAtTime(TI + preTiempoM, 0);
		prerangeEndProp.setValueAtTime(TI + preTiempoM, pretamanioPalabra);
		//Actualiza
		pretamanioSilaba = tamanioSilaba;
		pretamanioPalabra = tamanioPalabra;
		preTiempoM = TiempoM;
	}//fin si
	if (Texto3 == "" || Texto3 == null)
		Texto3 = TextoExtra;

	return Texto3;
}


/**********************************************************
*
*	Funcion Limpieza borra los comentarios en las lineas
*
* ent: String Texto
* sal: String Texto
*
***********************************************************/

function Limpieza(Texto) {
	var lel, valor, valor2, Texto2;
	lel = 0;
	Texto2 = Texto;
	TextoExtra = Texto;
	while ((Texto.indexOf("{") != -1) && lel < 60) {
		valor = 0;
		valor2 = 0;
		valor = Texto.indexOf("{", valor2);
		valor2 = Texto.indexOf("}", valor);
		TextoABorrar = Texto.substring(valor, valor2 + 1);
		Texto = Texto.replace(TextoABorrar, "");
		lel = lel + 1
	}
	if (Texto == "" || Texto == null)
		Texto = Texto2;


	return Texto;
}

/***********************************************************
*
* Funcion getFinSSA devuelve en centisegundos el valor final 
* de la frase en el karaoke.
*
* ent: string Linea
* sal: int resultado
*
*************************************************************/

function getFinSSA(Linea) {
	valor = 0;
	var Hora, Minuto, Srgundo, CSegundo;
	var resultado = 0.0;
	valor1 = Linea.indexOf(":", valor);
	valor1 = Linea.indexOf(":", valor1 + 1);
	valor2 = Linea.indexOf(",", valor1 + 1);
	valor2 = Linea.indexOf(":", valor2 + 1) - 2;
	valor3 = Linea.indexOf(",", valor2 + 1);  //Esto es para la hora

	Tiempo = Linea.substring(valor2 + 1, valor3);
	if (Tiempo != "" || Tiempo != null) {
		Hora = parseInt(Tiempo[0]);
		Minuto = parseInt(Tiempo[2] + Tiempo[3]);
		Segundo = parseInt(Tiempo[5] + Tiempo[6]);
		CSegundo = parseInt(Tiempo[8] + Tiempo[9]);
		//alert(Tiempo[0]+':'+Tiempo[2]+Tiempo[3]+':'+Tiempo[5]+Tiempo[6]+'.'+Tiempo[8]+Tiempo[9]);
		resultado = (CSegundo / 100) + Segundo + Minuto * 60 + Hora * 3600;
		resultado = myComp.frameDuration * (Math.ceil((resultado) / myComp.frameDuration));
	}
	return resultado;
}

/***********************************************************
*
* Funcion getInicioSSA devuelve en centisegundos el valor inicial
* de la frase en el karaoke.
*
* ent: string Linea
* sal: int resultado
*
*************************************************************/

function getInicioSSA(Linea) {
	valor = 0;
	var Hora, Minuto, Segundo;
	var Csegundo = 0.0;
	var resultado = 0.0;
	valor1 = Linea.indexOf(":", valor);
	valor1 = Linea.indexOf(":", valor1 + 1) - 2; //Esto es para la hora

	valor2 = Linea.indexOf(",", valor1 + 1);
	Tiempo = Linea.substring(valor1 + 1, valor2);
	if (Tiempo != "" || Tiempo != null) {
		Hora = parseInt(Tiempo[0]);
		Minuto = parseInt(Tiempo[2] + Tiempo[3]);
		Segundo = parseFloat(Tiempo[5] + Tiempo[6] + Tiempo[7] + Tiempo[8] + Tiempo[9]);
		//MyComp.frameDuration="pep";
		resultado = Segundo + Minuto * 60 + Hora * 3600;
		resultado = myComp.frameDuration * (Math.ceil((resultado) / myComp.frameDuration));
	}
	return resultado;
}

/***************************************************************
*
* Funcion getTextoSSA devuelve el string con la frase del fichero SSA
*
* ent: String Linea
* sal: String Texto
*
*****************************************************************/

function getTextoSSA(Linea) {
	valor1 = Linea.indexOf(",", 0);
	valor1 = Linea.indexOf(",", valor1 + 1);
	valor1 = Linea.indexOf(",", valor1 + 1);
	valor1 = Linea.indexOf(",", valor1 + 1);
	valor1 = Linea.indexOf(",", valor1 + 1);
	valor1 = Linea.indexOf(",", valor1 + 1);
	valor1 = Linea.indexOf(",", valor1 + 1);
	valor1 = Linea.indexOf(",", valor1 + 1);
	valor1 = Linea.indexOf(",", valor1 + 1);
	//valor1=Linea.indexOf("0000,,",0);
	Texto = Linea.substring(valor1 + 1, Linea.length);
	return Texto;
	//alert(Texto);
}


/***************************************************************
*
* Funcion reverserLayerOrder invierte el orden de los layers 
*
* ent: Composition myComp
* sal: 
*
*****************************************************************/

function reverseLayerOrder(myComp) {
	var comp_layers = myComp.layers;
	for (j = 1; j <= comp_layers.length / 2; j++) {
		var layerToMoveAfter = comp_layers[j];
		var wasLocked = layerToMoveAfter.locked;
		if (wasLocked) {
			layerToMoveAfter.locked = false;
		}
		layerToMoveAfter.moveAfter(comp_layers[comp_layers.length - j + 1]);
		if (wasLocked) {
			layerToMoveAfter.locked = true;
		}
		if (comp_layers.length - j != j) {
			var layerToMoveBefore = comp_layers[comp_layers.length - j];
			wasLocked = layerToMoveBefore.locked;
			if (wasLocked) {
				layerToMoveBefore.locked = false;
			}
			layerToMoveBefore.moveBefore(comp_layers[j]);
			if (wasLocked) {
				layerToMoveBefore.locked = true;
			}
		}
	}
}

/**************************************************************************
*
*          Function MenuDialog se encarga de crear las ventanas de configuracion
*          de el script
*
*					 ent:
*  				 sal:
*
****************************************************************************/

function MenuDialog() {
	var dlg = new Window('dialog', 'Especificaciones Generales de carga del SSA', [100, 100, 480, 245]);
	dlg.btnPnl = dlg.add('panel', [15, 10, 365, 55], 'Modo de transicion entre keyframes general');
	dlg.btnPnl.holdBtn = dlg.btnPnl.add('button', [15, 15, 115, 35], 'Estatico', { name: 'ld' });
	dlg.btnPnl.exprBtn = dlg.btnPnl.add('button', [125, 40, 115, 65], 'Aplicar Expr', { name: 'ld' });
	dlg.btnPnl.linearBtn = dlg.btnPnl.add('button', [125, 15, 225, 35], 'Linear', { name: 'ar' });
	dlg.btnPnl.bezierBtn = dlg.btnPnl.add('button', [235, 15, 335, 35], 'Bezier', { name: 'er' });
	dlg.btnPnl2 = dlg.add('panel', [15, 55, 365, 95], 'Ajuste de Capas');
	dlg.btnPnl2.postBtn = dlg.btnPnl2.add('radiobutton', [15, 15, 155, 35], 'Capa PostSilaba', { name: 'ld' });
	//Aun no esta implementado
	//dlg.btnPnl2.preBtn = dlg.btnPnl2.add('radiobutton', [135,25,155,45], 'Capa PreSilaba',{name:'ld'});
	with (dlg.btnPnl) {
		holdBtn.onClick = function () {
			hold1 = true;
			this.parent.parent.close(1);
		};
		exprBtn.onClick = function () {
			expr1 = true;
			dlg2.show();
			this.parent.parent.close(1);
		};
		linearBtn.onClick = function () {
			linear1 = true;
			this.parent.parent.close(1);
		};
		bezierBtn.onClick = function () {
			bezier1 = true;
			this.parent.parent.close(1);
		};
	};
	with (dlg.btnPnl2) {
		postBtn.onClick = function () {
			postefecto = "true"
		};
	};

	fin = 250 + TotalTextoLineas * 15;
	doble = 1;
	if (fin > 640) {
		fin = 640;
		doble = 2;
	}




	dlg2 = new Window('dialog', 'SSA:', [100, 10, 370 * doble + 100, fin]);
	dlg2.btnPnl = dlg2.add('panel', [15, 150, 365 * doble, fin - 80], 'Comportamiento');
	dlg2.btnPnl2 = dlg2.add('panel', [15, fin - 70, 365 * doble, fin - 20], 'Accion');
	dlg2.btnPnl3 = dlg2.add('panel', [15, 1, 365 * doble, 140], 'General');
	i = 0;
	i2 = 0;
	i3 = 0;
	/*
	ArrayLineas=new Array();
	
	
	while (i<TotalLineas)
	{
		var text=fichero[i];
		var Dialog=text[0].indexOf(":");
		if (text[0]!="" && text[0].substring(0,Dialog)=="Dialogue")
		{
		 Lin=new Array();
		 if (doble&&(15+i2*15>600-210))
		 {
		 Lin[0] = dlg2.btnPnl.add('radiobutton', [317,15+i3*15,352,30+i3*15], '',{name:i});
			   Lin[1] = dlg2.btnPnl.add('statictext', [357,15+i3*15,657,30+i3*15], Limpieza(getTextoSSA(text[0])));
			   ArrayLineas[i2]=Lin;
			   i3=i3+1;
			   i2=i2+1;
			   }
			   else
			   {
		 Lin[0] = dlg2.btnPnl.add('radiobutton', [15,15+i2*15,50,30+i2*15], '',{name:i});
			   Lin[1] = dlg2.btnPnl.add('statictext', [55,15+i2*15,315,30+i2*15], Limpieza(getTextoSSA(text[0])));
			   ArrayLineas[i2]=Lin;
			   i2=i2+1;
			   }
	  }
	 i=i+1;
	}*/
	//dlg2.btnPnl.abajo=dlg2.btnPnl.add('button', [0,30+i2*15,365,35+i2*15], '',{name:'ld'});
	//dlg2.btnPnl.arriba=dlg2.btnPnl.add('button', [0,5,365,10], '',{name:'ld'});
	dlg2.btnPnl2.salirBtn = dlg2.btnPnl2.add('button', [15, 15, 60, 40], 'Aceptar', { name: 'ld' });
	dlg2.btnPnl3.holdBtn = dlg2.btnPnl3.add('button', [15, 15, 115, 35], 'Estatico', { name: 'ld' });
	dlg2.btnPnl3.exprBtn = dlg2.btnPnl3.add('button', [125, 40, 115, 65], 'Aplicar Expr', { name: 'ld' });
	dlg2.btnPnl3.linearBtn = dlg2.btnPnl3.add('button', [125, 15, 225, 35], 'Linear', { name: 'ar' });
	dlg2.btnPnl3.bezierBtn = dlg2.btnPnl3.add('button', [235, 15, 335, 35], 'Bezier', { name: 'er' });
	dlg2.btnPnl3.textoBtn = dlg2.btnPnl3.add('statictext', [135, 40, 240, 60], 'Capa PostSilaba', { name: 'ld' });
	dlg2.btnPnl3.postBtn = dlg2.btnPnl3.add('radiobutton', [245, 40, 255, 60], 'Si', { name: 'ld' });
	dlg2.btnPnl3.graBtn = dlg2.btnPnl3.add('button', [15, 40, 115, 60], 'Gradual', { name: 'gra' });
	dlg2.btnPnl3.preBtn = dlg2.btnPnl3.add('radiobutton', [265, 40, 275, 60], 'No', { name: 'ld' });
	dlg2.btnPnl3.masterBtn = dlg2.btnPnl3.add('statictext', [15, 70, 180, 100], 'Cambiar Texto de Master por Silabas', { name: 'ld' });
	dlg2.btnPnl3.ConMasterBtn = dlg2.btnPnl3.add('radiobutton', [185, 70, 215, 90], 'Si', { name: 'ld' });
	dlg2.btnPnl3.SinMasterBtn = dlg2.btnPnl3.add('radiobutton', [225, 70, 270, 90], 'No', { name: 'ld' });
	dlg2.btnPnl3.porBtn = dlg2.btnPnl3.add('statictext', [15, 100, 180, 130], 'Valores A Porcentaje', { name: 'ld' });
	dlg2.btnPnl3.porSiBtn = dlg2.btnPnl3.add('radiobutton', [185, 100, 215, 120], 'Si', { name: 'ld' });
	dlg2.btnPnl3.porNoBtn = dlg2.btnPnl3.add('radiobutton', [225, 100, 270, 120], 'No', { name: 'ld' });

	dlg2.btnPnl.textoBtn = dlg2.btnPnl.add('statictext', [15, 5, 120, 25], 'Capa Silaba', { name: 'ld' });
	dlg2.btnPnl.cuaSilBtn = dlg2.btnPnl.add('button', [15, 25, 60, 50], 'Cuadrado', { name: 'ld' });
	dlg2.btnPnl.PUPSilBtn = dlg2.btnPnl.add('button', [60, 25, 120, 50], 'Pendiente Up', { name: 'ld' });
	dlg2.btnPnl.PDWSilBtn = dlg2.btnPnl.add('button', [120, 25, 180, 50], 'Pendiente Dw', { name: 'ld' });
	dlg2.btnPnl.TriSilBtn = dlg2.btnPnl.add('button', [180, 25, 240, 50], 'Triangulo', { name: 'ld' });
	dlg2.btnPnl.CirSilBtn = dlg2.btnPnl.add('button', [240, 25, 300, 50], 'Circulo', { name: 'ld' });
	dlg2.btnPnl.SuaSilBtn = dlg2.btnPnl.add('button', [300, 25, 360, 50], 'Suave', { name: 'ld' });

	dlg2.btnPnl.textoBtn = dlg2.btnPnl.add('statictext', [15, 65, 120, 100], 'Capa PostSilaba', { name: 'ld' });
	dlg2.btnPnl.cuaPSilBtn = dlg2.btnPnl.add('button', [15, 115, 60, 140], 'Cuadrado', { name: 'ld' });
	dlg2.btnPnl.PUPPSilBtn = dlg2.btnPnl.add('button', [60, 115, 120, 140], 'Pendiente Up', { name: 'ld' });
	dlg2.btnPnl.PDWPSilBtn = dlg2.btnPnl.add('button', [120, 115, 180, 140], 'Pendiente Dw', { name: 'ld' });
	dlg2.btnPnl.TriPSilBtn = dlg2.btnPnl.add('button', [180, 115, 240, 140], 'Triangulo', { name: 'ld' });
	dlg2.btnPnl.CirPSilBtn = dlg2.btnPnl.add('button', [240, 115, 300, 140], 'Circulo', { name: 'ld' });
	dlg2.btnPnl.SuaPSilBtn = dlg2.btnPnl.add('button', [300, 115, 360, 140], 'Suave', { name: 'ld' });


	dlg2.btnPnl3.SinMasterBtn.value = true;
	dlg2.btnPnl3.preBtn.value = true;
	dlg2.btnPnl3.porNoBtn.value = true;
	var a = true;
	with (dlg2.btnPnl) {
		/*for (i2=0;i2<TotalTextoLineas;i2++)
		 {
		 Boton=ArrayLineas[i2][0];
		 Boton.onClick= function() {
		 if (this.value==true)
			  LineaDialog(this.properties.name).show();
		 this.value=false;

		 };
		 }*/
		/* arriba.onClick= function() {
		   
		   for (i2=0;i2<dlg2.btnPnl.children.length;i2++)
		   {
				dlg2.btnPnl.children.location.y=dlg2.btnPnl.children.location.y
		   }
		   //dlg2.btnPnl.show();
	    

		   };*/
		cuaSilBtn.onClick = function () {
			estiloSilaba = 1;
		};
		PUPSilBtn.onClick = function () {
			estiloSilaba = 2;
		};
		PDWSilBtn.onClick = function () {
			estiloSilaba = 3;
		};
		TriSilBtn.onClick = function () {
			estiloSilaba = 4;
		};
		CirSilBtn.onClick = function () {
			estiloSilaba = 5;
		};
		SuaSilBtn.onClick = function () {
			estiloSilaba = 6;
		};

		cuaPSilBtn.onClick = function () {
			estiloPSilaba = 1;
		};
		PUPPSilBtn.onClick = function () {
			estiloPSilaba = 2;
		};
		PDWPSilBtn.onClick = function () {
			estiloPSilaba = 3;
		};
		TriPSilBtn.onClick = function () {
			estiloPSilaba = 4;
		};
		CirPSilBtn.onClick = function () {
			estiloPSilaba = 5;
		};
		SuaPSilBtn.onClick = function () {
			estiloPSilaba = 6;
		};

	};
	with (dlg2.btnPnl2) {
		salirBtn.onClick = function () {
			this.parent.parent.close(1);
		};
	};

	with (dlg2.btnPnl3) {
		holdBtn.onClick = function () {
			hold1 = true;
			for (i2 = 0; i2 < TotalLineas; i2++) {
				fichero[i2][1] = "hold";
			}
		};
		porSiBtn.onClick = function () {
			valoresAPorcentaje = true;
			porNoBtn.value = false;
		};
		porNoBtn.onClick = function () {
			valoresAPorcentaje = false;
			porSiBtn.value = false;
		};
		exprBtn.onClick = function () {
			expr1 = true;
			dlg2.show();
			this.parent.parent.close(1);
		};
		linearBtn.onClick = function () {
			for (i2 = 0; i2 < TotalLineas; i2++) {
				fichero[i2][1] = "linear";
			}
		};
		bezierBtn.onClick = function () {
			for (i2 = 0; i2 < TotalLineas; i2++) {
				fichero[i2][1] = "bezier";
			}

		};
		postBtn.onClick = function () {
			for (i2 = 0; i2 < TotalLineas; i2++) {
				fichero[i2][2] = "true";
			}
			preBtn.value = false;
		};
		graBtn.onClick = function () {
			for (i2 = 0; i2 < TotalLineas; i2++) {
				if (fichero[i2][2] == "true")
					fichero[i2][3] = true;
			}
			preBtn.value = false;
		};
		SinMasterBtn.onClick = function () {
			setMaster = "false";
			ConMasterBtn.value = false;
		};
		ConMasterBtn.onClick = function () {
			setMaster = "true";
			SinMasterBtn.value = false;
		};
		preBtn.onClick = function () {
			for (i2 = 0; i2 < TotalLineas; i2++) {
				fichero[i2][2] = "false";
			}
			postBtn.value = false;




		};
	};

	dlg2.show();
}


/**************************************************************************
*
*       	Function ComposicionDialog crea la primera pantalla de configuracion
*					de el script cambia las variables globales xComp yComp y fpsComp
*
*					ent:
*					sal:
*
***************************************************************************/

function ComposicionDialog() {
	var ret = new Array();

	var dlg5 = new Window('dialog', 'Crea una nueva Composicion Karaoke', [100, 100, 550, 250]);
	dlg5.btnPnl = dlg5.add('panel', [35, 30, 390, 105], 'Propiedades de la composicion');
	dlg5.btnPnl.fpsT = dlg5.btnPnl.add('statictext', [15, 15, 45, 35], 'FPS:', { name: 'fp' });
	dlg5.btnPnl.fpsP = dlg5.btnPnl.add('edittext', [55, 15, 115, 35], '23,976', { name: 'fps' });
	dlg5.btnPnl.resT = dlg5.btnPnl.add('statictext', [125, 40, 115, 35], 'Resolucion', { name: 'ld' });
	dlg5.btnPnl.xCompP = dlg5.btnPnl.add('edittext', [125, 15, 225, 35], '1920', { name: 'xComp' });
	dlg5.btnPnl.xT = dlg5.btnPnl.add('statictext', [235, 15, 245, 35], 'x', { name: 'er' });
	dlg5.btnPnl.yCompP = dlg5.btnPnl.add('edittext', [255, 15, 335, 35], '1080', { name: 'yComp' });
	dlg5.btnPnl.salirBtn = dlg5.btnPnl.add('button', [15, 45, 60, 75], 'Aceptar', { name: 'ld' });


	with (dlg5.btnPnl) {
		salirBtn.onClick = function () {
			ret[0] = xCompP.text;
			ret[1] = yCompP.text;
			ret[2] = fpsP.text;
			this.parent.parent.close(1);
		};
	};

	dlg5.show();

	return ret;
}


/**************************************************************************
*
*          Function LineaDialog se encarga de crear las ventanas de configuracion
*          de el script
*
*					 ent: Linea Entero
*  				 sal:
*
****************************************************************************/

function LineaDialog(Linea) {

	var dlg = new Window('dialog', Limpieza(getTextoSSA(fichero[Linea][0])) + '  {' + fichero[Linea][1] + '}', [100, 100, 480, 245]);
	dlg.btnPnl = dlg.add('panel', [15, 10, 365, 55], 'Modo de transicion entre keyframes');
	dlg.btnPnl.holdBtn = dlg.btnPnl.add('button', [15, 15, 115, 35], 'Estatico', { name: 'ld' });
	dlg.btnPnl.exprBtn = dlg.btnPnl.add('button', [125, 40, 115, 65], 'Aplicar Expr', { name: 'ld' });
	dlg.btnPnl.linearBtn = dlg.btnPnl.add('button', [125, 15, 225, 35], 'Linear', { name: 'ar' });
	dlg.btnPnl.bezierBtn = dlg.btnPnl.add('button', [235, 15, 335, 35], 'Bezier', { name: 'er' });
	dlg.btnPnl2 = dlg.add('panel', [15, 55, 365, 95], 'Ajuste de Capas');
	dlg.btnPnl2.postBtn = dlg.btnPnl2.add('radiobutton', [15, 15, 155, 35], 'Capa PostSilaba', { name: 'ld' });

	if (fichero[Linea][2] == "true") {
		dlg.btnPnl2.postBtn.value = true;
		dlg.btnPnl2.postBtn.eneabled = true;
		dlg.btnPnl2.postBtn.show();
	}
	//Aun no esta implementado
	//dlg.btnPnl2.preBtn = dlg.btnPnl2.add('radiobutton', [135,25,155,45], 'Capa PreSilaba',{name:'ld'});
	with (dlg.btnPnl) {
		holdBtn.onClick = function () {
			//hold1=true;
			fichero[Linea][1] = "hold";
			this.parent.parent.hide();
		};
		exprBtn.onClick = function () {
			expr1 = true;
			dlg2.show();
			this.parent.parent.hide();
		};
		linearBtn.onClick = function () {
			//linear1=true;
			fichero[Linea][1] = "linear";
			this.parent.parent.hide();
		};
		bezierBtn.onClick = function () {
			//bezier1=true;
			fichero[Linea][1] = "bezier";
			this.parent.parent.hide();
		};
	};
	with (dlg.btnPnl2) {
		postBtn.onClick = function () {
			if (fichero[Linea][2] == "true") {
				fichero[Linea][2] = "false";
			}
			else {
				fichero[Linea][2] = "true";
			}
		};

	};
	return dlg;
}


/**************************************************************************
*
*          Funcion Asignar NombreMaster se encarga de asignar el nombre de la capa maestra
*
*					 ent:myComp Composition,NombreMaster String
*					 sal:NombreMaster String
*
****************************************************************************/

function AsignarNombreMaster(myComp, NombreMaster) {
	var NombreMaster;
	testeo = myComp.layer("Master");
	if (testeo == null) {
		NombreMaster = "Master";
	}
	else {
		testeo = myComp.layer("Master 2");
		if (testeo == null) {
			NombreMaster = "Master 2";
		}
		else {
			testeo = myComp.layer("Master 3");
			if (testeo == null) {
				NombreMaster = "Master 3";
			}
			else {
				testeo = myComp.layer("Master 4");
				if (testeo == null) {
					NombreMaster = "Master 4";
				}
				else {
					NombreMaster = "Master 5";
				}
			}
		}
	}
	return NombreMaster;
}


/**************************************************************************
*
*          Function AsignarMaster se encarga de crear las capas de texto maestras.
*
*					 ent: myComp Compostion
*					 sal:
*
****************************************************************************/

function AsignarMaster(myComp) {
	Master = myComp.layers.addText(NombreMaster);
	Master.threeDPerChar = true;
	var Slider = Master.property("Effects").addProperty("ADBE Slider Control");
	Slider.name = "Silaba Offset";
	var Slider2 = Master.property("Effects").addProperty("ADBE Slider Control");
	Slider2.name = "Post Silaba Offset";
	var Slider3 = Master.property("Effects").addProperty("ADBE Slider Control");
	Slider3.name = "Silaba Comienzo Delay";
	var Slider4 = Master.property("Effects").addProperty("ADBE Slider Control");
	Slider4.name = "Post Silaba Comienzo Delay";
	var Slider6 = Master.property("Effects").addProperty("ADBE Slider Control");
	Slider6.name = "Silaba Fin Delay";
	var Slider5 = Master.property("Effects").addProperty("ADBE Slider Control");
	Slider5.name = "Post Silaba Fin Delay";
	var Point1 = Master.property("Effects").addProperty("ADBE Point Control");

	Point1.name = "Posicion de la Silaba";

	Point1.property(1).expression = "Compo=thisComp;if (time >0 && Compo.layer(1).outPoint>time){ a=Compo.numLayers;while (a>0 && Compo.layer(a).inPoint<=time){ a=a-1;}layerActual=Compo.layer(a+1);if(layerActual.name!=\"Master\"){izquierda=400.6;derecha=710.6;selectorEnd=layerActual.text.animator(\"Silaba Seleccionada\").selector(" + TextoSelector + ").end;X=linear(selectorEnd,0,100,izquierda,derecha);Y=275.0+10;if (time>layerActual.outPoint-0.3){i=layerActual.index;if (i>1){proximoLayer=Compo.layer(i-1);X=linear(time,layerActual.outPoint-0.3,proximoLayer.inPoint,derecha,izquierda);}else {X=linear(time,layerActual.outPoint-0.3,layerActual.outPoint+0.3,derecha,izquierda);}}[X,Y+5]}else{[-200,0]}}else {[-100,0]}";
	var Slider6 = Master.property("Effects").addProperty("ADBE Slider Control");
	Slider6.name = "Tamanio de frase";

	Slider6.property(1).expression = "Compo=thisComp;if (time >0 && Compo.layer(1).outPoint>time){ a=Compo.numLayers;while (a>0 && Compo.layer(a).inPoint<=time){ a=a-1;}layerActual=Compo.layer(a+1);if(layerActual.name!=\"Master\"){izquierda=400.6;derecha=710.6;selectorEnd=layerActual.text.animator(\"Silaba Seleccionada\").selector(" + TextoSelector + ").end;X=linear(selectorEnd,0,100,izquierda,derecha);Y=275.0+10;if (time>layerActual.outPoint-0.3){i=layerActual.index;if (i>1){proximoLayer=Compo.layer(i-1);X=derecha-izquierda;}else {X=derecha-izquierda;}}X}else{0}}else {0}";

	if (is7 == "true") {
		var MasterAnimator = Master.property("ADBE Text Properties").property("ADBE Text Animators");
	}
	else {
		var MasterAnimator = Master.property(1).property(4);
	}
	var defaultMaster = MasterAnimator.addProperty("ADBE Text Animator");
	defaultMaster.name = "Efecto por Defecto";
	var fillMasterProperty = defaultMaster.Properties.addProperty("ADBE Text Fill Color");
	fillMasterProperty.setValue([0.50, 0.50, 0.50, 0]);
	var posMasterProperty = defaultMaster.Properties.addProperty("ADBE Text Position 3D");
	var scaleMasterProperty = defaultMaster.Properties.addProperty("ADBE Text Scale 3D");
	var skewMasterProperty = defaultMaster.Properties.addProperty("ADBE Text Skew");
	var rotationMasterProperty = defaultMaster.Properties.addProperty("ADBE Text Rotation");
	var rotationYMasterProperty = defaultMaster.Properties.addProperty("ADBE Text Rotation Y");
	var rotationXMasterProperty = defaultMaster.Properties.addProperty("ADBE Text Rotation X");
	var opacityMasterProperty = defaultMaster.Properties.addProperty("ADBE Text Opacity");
	var SopacityMasterProperty = defaultMaster.Properties.addProperty("ADBE Text Stroke Opacity");
	var FopacityMasterProperty = defaultMaster.Properties.addProperty("ADBE Text Fill Opacity");
	var ScolorMasterProperty = defaultMaster.Properties.addProperty("ADBE Text Stroke Color");
	var SwidthMasterProperty = defaultMaster.Properties.addProperty("ADBE Text Stroke Width");
	//var TTMasterProperty = defaultMaster.Properties.addProperty("ADBE Text Tracking Type");	
	var TAMasterProperty = defaultMaster.Properties.addProperty("ADBE Text Tracking Amount");
	if (is7 == "true") {
		var blurMasterProperty = defaultMaster.Properties.addProperty("ADBE Text Blur");
	}
	//var sliderMasterProperty = defaultMaster.Properties.addProperty("ADBE Slider Control");



	var highlightMaster = MasterAnimator.addProperty("ADBE Text Animator");
	highlightMaster.name = "Silaba Seleccionada";
	var SilabaMasterSeleccionada = highlightMaster.Selectors.addProperty("ADBE Text Selector"); //highligth
	var advancedMasterSelector = SilabaMasterSeleccionada.property(7);
	var unitsMasterProperty = advancedMasterSelector.property(1);
	unitsMasterProperty.setValue(2);
	var rangeMasterStartProp = SilabaMasterSeleccionada.property(4);
	var rangeMasterEndProp = SilabaMasterSeleccionada.property(5);
	rangeMasterStartProp.setValueAtTime(0, 0);
	rangeMasterEndProp.setValueAtTime(0, 0);
	var hMasterProperty = highlightMaster.Properties.addProperty("ADBE Text Fill Color");
	var hposMasterProperty = highlightMaster.Properties.addProperty("ADBE Text Position 3D");
	var hscaleMasterProperty = highlightMaster.Properties.addProperty("ADBE Text Scale 3D");
	var hskewMasterProperty = highlightMaster.Properties.addProperty("ADBE Text Skew");
	var hrotationMasterProperty = highlightMaster.Properties.addProperty("ADBE Text Rotation");
	var hrotationYMasterProperty = highlightMaster.Properties.addProperty("ADBE Text Rotation Y");
	var hrotationXMasterProperty = highlightMaster.Properties.addProperty("ADBE Text Rotation X");
	var hopacityMasterProperty = highlightMaster.Properties.addProperty("ADBE Text Opacity");
	var hSopacityMasterProperty = highlightMaster.Properties.addProperty("ADBE Text Stroke Opacity");
	var hFopacityMasterProperty = highlightMaster.Properties.addProperty("ADBE Text Fill Opacity");
	var hScolorMasterProperty = highlightMaster.Properties.addProperty("ADBE Text Stroke Color");
	var hSwidthMasterProperty = highlightMaster.Properties.addProperty("ADBE Text Stroke Width");
	//var hTTMasterProperty = highlightMaster.Properties.addProperty("ADBE Text Tracking Type");	
	var hTAMasterProperty = highlightMaster.Properties.addProperty("ADBE Text Tracking Amount");
	if (is7 == "true") {
		var hblurMasterProperty = highlightMaster.Properties.addProperty("ADBE Text Blur");
	}

	hMasterProperty.setValue([1, 0, 0, 0]);
	//Siempre
	if ("true" == "true") {

		var preMasterAnimator = MasterAnimator.addProperty("ADBE Text Animator");
		preMasterAnimator.name = "Despues de Silaba Seleccionada";
		var preMasterSilabaSeleccionada = preMasterAnimator.Selectors.addProperty("ADBE Text Selector"); //highligth
		var preMasteradvancedSelector = preMasterSilabaSeleccionada.property(7);
		var preMasterunitsProperty = preMasteradvancedSelector.property(1);
		preMasterunitsProperty.setValue(2);
		var preMasterrangeStartProp = preMasterSilabaSeleccionada.property(4);
		var preMasterrangeEndProp = preMasterSilabaSeleccionada.property(5);
		preMasterrangeStartProp.setValueAtTime(0, 0);
		preMasterrangeEndProp.setValueAtTime(0, 0);

		var preMasterProperty = preMasterAnimator.Properties.addProperty("ADBE Text Fill Color");
		var preposMasterProperty = preMasterAnimator.Properties.addProperty("ADBE Text Position 3D");
		var prescaleMasterProperty = preMasterAnimator.Properties.addProperty("ADBE Text Scale 3D");
		var preskewMasterProperty = preMasterAnimator.Properties.addProperty("ADBE Text Skew");
		var prerotationMasterProperty = preMasterAnimator.Properties.addProperty("ADBE Text Rotation");
		var prerotationYMasterProperty = preMasterAnimator.Properties.addProperty("ADBE Text Rotation Y");
		var prerotationXMasterProperty = preMasterAnimator.Properties.addProperty("ADBE Text Rotation X");
		var preopacityMasterProperty = preMasterAnimator.Properties.addProperty("ADBE Text Opacity");
		var preSopacityMasterProperty = preMasterAnimator.Properties.addProperty("ADBE Text Stroke Opacity");
		var preFopacityMasterProperty = preMasterAnimator.Properties.addProperty("ADBE Text Fill Opacity");
		var preScolorMasterProperty = preMasterAnimator.Properties.addProperty("ADBE Text Stroke Color");
		var preSwidthMasterProperty = preMasterAnimator.Properties.addProperty("ADBE Text Stroke Width");
		//var preTTMasterProperty = preMaster.Properties.addProperty("ADBE Text Tracking Type");	
		var preTAMasterProperty = preMasterAnimator.Properties.addProperty("ADBE Text Tracking Amount");
		if (is7 == "true") {
			var preblurMasterProperty = preMasterAnimator.Properties.addProperty("ADBE Text Blur");
		}


		preMasterProperty.setValue([0.50, 0.50, 0.50, 0]);
	}
	return Master;
}


/**************************************************************************
*
*          Funcion CreaLayer se encarga de crear las distintas capas de texto
*
*					 ent: text Array ,Texto2 Layer,TiempoInicio Entero,TiempoFin Entero
*					 sal: 
*
****************************************************************************/

function RellenaLayer(Linea, Texto2, TiempoInicio, TiempoFin, Master) {
	var text = Linea[0];
	var preunitsProperty;
	postefecto = Linea[2];
	gradual = Linea[3];



	var Texto = Texto2;
	if (is7 == "true") {
		var theAnimators = Texto.property("ADBE Text Properties").property("ADBE Text Animators");
	}
	else {
		var theAnimators = Texto.property(1).property(4);
	}
	Texto.threeDPerChar = true;
	var defaultAnimator = theAnimators.addProperty("ADBE Text Animator");
	defaultAnimator.name = "Efecto por Defecto";


	//rellena blanco
	if (is7 == "true") {
		//var defaultProperties = theAnimators.property(2).property("ADBE Text Animator Properties");
		var defaultProperties = theAnimators.property(1).property("ADBE Text Animator Properties");
		var defaultProperty = defaultProperties.addProperty("ADBE Text Fill Color");
		var posAnimatorProperty = defaultProperties.addProperty("ADBE Text Position 3D");
		var scaleAnimatorProperty = defaultProperties.addProperty("ADBE Text Scale 3D");
		var skewAnimatorProperty = defaultProperties.addProperty("ADBE Text Skew");
		var rotationAnimatorProperty = defaultProperties.addProperty("ADBE Text Rotation");
		var rotationYAnimatorProperty = defaultProperties.addProperty("ADBE Text Rotation Y");
		var rotationXAnimatorProperty = defaultProperties.addProperty("ADBE Text Rotation X");
		var opacityAnimatorProperty = defaultProperties.addProperty("ADBE Text Opacity");
		var SopacityAnimatorProperty = defaultProperties.addProperty("ADBE Text Stroke Opacity");
		var FopacityAnimatorProperty = defaultProperties.addProperty("ADBE Text Fill Opacity");
		var ScolorAnimatorProperty = defaultProperties.addProperty("ADBE Text Stroke Color");
		var SwidthAnimatorProperty = defaultProperties.addProperty("ADBE Text Stroke Width");
		//var TTAnimatorProperty = defaultAnimator.Properties.addProperty("ADBE Text Tracking Type");	
		var TAAnimatorProperty = defaultAnimator.Properties.addProperty("ADBE Text Tracking Amount");
		if (is7 == "true") {
			var blurAnimatorProperty = defaultProperties.addProperty("ADBE Text Blur");
		}

	}
	else {
		var defaultProperty = defaultAnimator.Properties.addProperty("ADBE Text Fill Color");
		var posAnimatorProperty = defaultAnimator.Properties.addProperty("ADBE Text Position 3D");
		var scaleAnimatorProperty = defaultAnimator.Properties.addProperty("ADBE Text Scale 3D");
		var skewAnimatorProperty = defaultAnimator.Properties.addProperty("ADBE Text Skew");
		var rotationAnimatorProperty = defaultAnimator.Properties.addProperty("ADBE Text Rotation");
		var rotationYAnimatorProperty = defaultAnimator.Properties.addProperty("ADBE Text Rotation Y");
		var rotationXAnimatorProperty = defaultAnimator.Properties.addProperty("ADBE Text Rotation X");
		var opacityAnimatorProperty = defaultAnimator.Properties.addProperty("ADBE Text Opacity");
		var SopacityAnimatorProperty = defaultAnimator.Properties.addProperty("ADBE Text Stroke Opacity");
		var FopacityAnimatorProperty = defaultAnimator.Properties.addProperty("ADBE Text Fill Opacity");
		var ScolorAnimatorProperty = defaultAnimator.Properties.addProperty("ADBE Text Stroke Color");
		var SwidthAnimatorProperty = defaultAnimator.Properties.addProperty("ADBE Text Stroke Width");
		//var TTAnimatorProperty = defaultAnimator.Properties.addProperty("ADBE Text Tracking Type");	
		var TAAnimatorProperty = defaultAnimator.Properties.addProperty("ADBE Text Tracking Amount");

		if (is7 == "true") {
			var blurAnimatorProperty = defaultAnimator.Properties.addProperty("ADBE Text Blur");
		}

	}
	//defaultProperty.setValue([1,1,1,0]);
	defaultProperty.expression = "thisComp.layer(\"" + NombreMaster + "\").text.animator(\"Efecto por Defecto\").property.fillColor";
	posAnimatorProperty.expression = "thisComp.layer(\"" + NombreMaster + "\").text.animator(\"Efecto por Defecto\").property.position";
	scaleAnimatorProperty.expression = "thisComp.layer(\"" + NombreMaster + "\").text.animator(\"Efecto por Defecto\").property.scale";
	skewAnimatorProperty.expression = "thisComp.layer(\"" + NombreMaster + "\").text.animator(\"Efecto por Defecto\").property.skew";
	rotationAnimatorProperty.expression = "thisComp.layer(\"" + NombreMaster + "\").text.animator(\"Efecto por Defecto\").property.rotation";
	rotationYAnimatorProperty.expression = "thisComp.layer(\"" + NombreMaster + "\").text.animator(\"Efecto por Defecto\").property.yRotation";
	rotationXAnimatorProperty.expression = "thisComp.layer(\"" + NombreMaster + "\").text.animator(\"Efecto por Defecto\").property.xRotation";
	opacityAnimatorProperty.expression = "thisComp.layer(\"" + NombreMaster + "\").text.animator(\"Efecto por Defecto\").property.opacity";
	SopacityAnimatorProperty.expression = "thisComp.layer(\"" + NombreMaster + "\").text.animator(\"Efecto por Defecto\").property.strokeOpacity";
	FopacityAnimatorProperty.expression = "thisComp.layer(\"" + NombreMaster + "\").text.animator(\"Efecto por Defecto\").property.fillOpacity";
	ScolorAnimatorProperty.expression = "thisComp.layer(\"" + NombreMaster + "\").text.animator(\"Efecto por Defecto\").property.strokeColor";
	SwidthAnimatorProperty.expression = "thisComp.layer(\"" + NombreMaster + "\").text.animator(\"Efecto por Defecto\").property.strokeWidth";
	//TTAnimatorProperty.expression="thisComp.layer(\""+NombreMaster+"\").text.animator(\"Efecto por Defecto\").property.trackingType";
	TAAnimatorProperty.expression = "thisComp.layer(\"" + NombreMaster + "\").text.animator(\"Efecto por Defecto\").property.trackingAmount";
	if (is7 == "true") {
		blurAnimatorProperty.expression = "thisComp.layer(\"" + NombreMaster + "\").text.animator(\"Efecto por Defecto\").property.blur";
	}


	var highlightAnimator = theAnimators.addProperty("ADBE Text Animator");
	highlightAnimator.name = "Silaba Seleccionada";
	var SilabaSeleccionada = highlightAnimator.Selectors.addProperty("ADBE Text Selector"); //highligth
	var advancedSelector = SilabaSeleccionada.property(7);
	var unitsProperty = advancedSelector.property(1);
	unitsProperty.setValue(2);
	var rangeStartProp = SilabaSeleccionada.property(4);
	var rangeEndProp = SilabaSeleccionada.property(5);
	var rangeOffset = SilabaSeleccionada.property(6);
	rangeStartProp.setValueAtTime(0, 0);
	rangeEndProp.setValueAtTime(0, 0);

	//Aqui viene una ventana para seleccionar el tipo de efecto transicion.
	if (Linea[1] == "hold") {
		rangeStartProp.setInterpolationTypeAtKey(1, KeyframeInterpolationType.HOLD, KeyframeInterpolationType.HOLD); //HOLD
		rangeEndProp.setInterpolationTypeAtKey(1, KeyframeInterpolationType.HOLD, KeyframeInterpolationType.HOLD);
	}
	if (Linea[1] == "linear") {
		rangeStartProp.setInterpolationTypeAtKey(1, KeyframeInterpolationType.LINEAR, KeyframeInterpolationType.LINEAR); //HOLD
		rangeEndProp.setInterpolationTypeAtKey(1, KeyframeInterpolationType.LINEAR, KeyframeInterpolationType.LINEAR);
	}
	if (Linea[1] == "bezier") {
		rangeStartProp.setInterpolationTypeAtKey(1, KeyframeInterpolationType.BEZIER, KeyframeInterpolationType.BEZIER); //HOLD
		rangeEndProp.setInterpolationTypeAtKey(1, KeyframeInterpolationType.BEZIER, KeyframeInterpolationType.BEZIER);
	}


	//rellena de gris
	var highlightProperty = highlightAnimator.Properties.addProperty("ADBE Text Fill Color");
	var HposAnimatorProperty = highlightAnimator.Properties.addProperty("ADBE Text Position 3D");
	var HscaleAnimatorProperty = highlightAnimator.Properties.addProperty("ADBE Text Scale 3D");
	var HskewAnimatorProperty = highlightAnimator.Properties.addProperty("ADBE Text Skew");
	var HrotationAnimatorProperty = highlightAnimator.Properties.addProperty("ADBE Text Rotation");
	var HrotationYAnimatorProperty = highlightAnimator.Properties.addProperty("ADBE Text Rotation Y");
	var HrotationXAnimatorProperty = highlightAnimator.Properties.addProperty("ADBE Text Rotation X");
	var HopacityAnimatorProperty = highlightAnimator.Properties.addProperty("ADBE Text Opacity");
	var HSopacityAnimatorProperty = highlightAnimator.Properties.addProperty("ADBE Text Stroke Opacity");
	var HScolorAnimatorProperty = highlightAnimator.Properties.addProperty("ADBE Text Stroke Color");
	var HFopacityAnimatorProperty = highlightAnimator.Properties.addProperty("ADBE Text Fill Opacity");
	var HSwidthAnimatorProperty = highlightAnimator.Properties.addProperty("ADBE Text Stroke Width");
	//var HTTAnimatorProperty = highlightAnimator.Properties.addProperty("ADBE Text Tracking Type");	
	var HTAAnimatorProperty = highlightAnimator.Properties.addProperty("ADBE Text Tracking Amount");
	if (is7 == "true") {
		var HblurAnimatorProperty = highlightAnimator.Properties.addProperty("ADBE Text Blur");
	}

	//highlightProperty.setValue([0.75,0.75,0.75,0]);


	rangeStartProp.expression = "text.animator(\"Silaba Seleccionada\").selector(" + TextoSelector + ").start+thisComp.layer(\"" + NombreMaster + "\").effect(\"Silaba Comienzo Delay\")(" + TextoSlider + ")"
	rangeEndProp.expression = "text.animator(\"Silaba Seleccionada\").selector(" + TextoSelector + ").end+thisComp.layer(\"" + NombreMaster + "\").effect(\"Silaba Fin Delay\")(" + TextoSlider + ")"
	rangeOffset.expression = "thisComp.layer(\"" + NombreMaster + "\").effect(\"Silaba Offset\")(" + TextoSlider + ")"
	highlightProperty.expression = "thisComp.layer(\"" + NombreMaster + "\").text.animator(\"Silaba Seleccionada\").property.fillColor";
	HposAnimatorProperty.expression = "thisComp.layer(\"" + NombreMaster + "\").text.animator(\"Silaba Seleccionada\").property.position";
	HscaleAnimatorProperty.expression = "thisComp.layer(\"" + NombreMaster + "\").text.animator(\"Silaba Seleccionada\").property.scale";
	HskewAnimatorProperty.expression = "thisComp.layer(\"" + NombreMaster + "\").text.animator(\"Silaba Seleccionada\").property.skew";
	HrotationAnimatorProperty.expression = "thisComp.layer(\"" + NombreMaster + "\").text.animator(\"Silaba Seleccionada\").property.rotation";
	HrotationYAnimatorProperty.expression = "thisComp.layer(\"" + NombreMaster + "\").text.animator(\"Silaba Seleccionada\").property.yRotation";
	HrotationXAnimatorProperty.expression = "thisComp.layer(\"" + NombreMaster + "\").text.animator(\"Silaba Seleccionada\").property.xRotation";
	HopacityAnimatorProperty.expression = "thisComp.layer(\"" + NombreMaster + "\").text.animator(\"Silaba Seleccionada\").property.opacity";
	HSopacityAnimatorProperty.expression = "thisComp.layer(\"" + NombreMaster + "\").text.animator(\"Silaba Seleccionada\").property.strokeOpacity";
	HFopacityAnimatorProperty.expression = "thisComp.layer(\"" + NombreMaster + "\").text.animator(\"Silaba Seleccionada\").property.fillOpacity";
	HScolorAnimatorProperty.expression = "thisComp.layer(\"" + NombreMaster + "\").text.animator(\"Silaba Seleccionada\").property.strokeColor";
	HSwidthAnimatorProperty.expression = "thisComp.layer(\"" + NombreMaster + "\").text.animator(\"Silaba Seleccionada\").property.strokeWidth";
	//HTTAnimatorProperty.expression="thisComp.layer(\""+NombreMaster+"\").text.animator(\"Silaba Seleccionada\").property.trackingType";
	HTAAnimatorProperty.expression = "thisComp.layer(\"" + NombreMaster + "\").text.animator(\"Silaba Seleccionada\").property.trackingAmount";
	if (is7 == "true") {
		HblurAnimatorProperty.expression = "thisComp.layer(\"" + NombreMaster + "\").text.animator(\"Silaba Seleccionada\").property.blur";
	}

	if (postefecto == "true") {

		preAnimator = theAnimators.addProperty("ADBE Text Animator");
		preAnimator.name = "Despues de Silaba Seleccionada";
		preSilabaSeleccionada = preAnimator.Selectors.addProperty("ADBE Text Selector"); //highligth //var
		preadvancedSelector = preSilabaSeleccionada.property(7); //var
		preunitsProperty = preadvancedSelector.property(1); //var
		preunitsProperty.setValue(2);
		var prerangeStartProp = preSilabaSeleccionada.property(4);
		var prerangeEndProp = preSilabaSeleccionada.property(5);
		var prerangeOffset = preSilabaSeleccionada.property(6);
		prerangeStartProp.setValueAtTime(0, 0);
		prerangeEndProp.setValueAtTime(0, 0);

		if (Linea[1] == "hold") {
			prerangeStartProp.setInterpolationTypeAtKey(1, KeyframeInterpolationType.HOLD, KeyframeInterpolationType.HOLD); //HOLD
			prerangeEndProp.setInterpolationTypeAtKey(1, KeyframeInterpolationType.HOLD, KeyframeInterpolationType.HOLD);
		}
		if (Linea[1] == "linear") {
			prerangeStartProp.setInterpolationTypeAtKey(1, KeyframeInterpolationType.LINEAR, KeyframeInterpolationType.LINEAR); //HOLD
			prerangeEndProp.setInterpolationTypeAtKey(1, KeyframeInterpolationType.LINEAR, KeyframeInterpolationType.LINEAR);
		}
		if (Linea[1] == "bezier") {
			prerangeStartProp.setInterpolationTypeAtKey(1, KeyframeInterpolationType.BEZIER, KeyframeInterpolationType.BEZIER); //HOLD
			prerangeEndProp.setInterpolationTypeAtKey(1, KeyframeInterpolationType.BEZIER, KeyframeInterpolationType.BEZIER);
		}
	}

	if (postefecto == "true") {
		var preProperty = preAnimator.Properties.addProperty("ADBE Text Fill Color");
		var PposAnimatorProperty = preAnimator.Properties.addProperty("ADBE Text Position 3D");
		var PscaleAnimatorProperty = preAnimator.Properties.addProperty("ADBE Text Scale 3D");
		var PskewAnimatorProperty = preAnimator.Properties.addProperty("ADBE Text Skew");
		var ProtationAnimatorProperty = preAnimator.Properties.addProperty("ADBE Text Rotation");
		var ProtationYAnimatorProperty = preAnimator.Properties.addProperty("ADBE Text Rotation Y");
		var ProtationXAnimatorProperty = preAnimator.Properties.addProperty("ADBE Text Rotation X");
		var PopacityAnimatorProperty = preAnimator.Properties.addProperty("ADBE Text Opacity");
		var PSopacityAnimatorProperty = preAnimator.Properties.addProperty("ADBE Text Stroke Opacity");
		var PFopacityAnimatorProperty = preAnimator.Properties.addProperty("ADBE Text Fill Opacity");
		var PScolorAnimatorProperty = preAnimator.Properties.addProperty("ADBE Text Stroke Color");
		var PSwidthAnimatorProperty = preAnimator.Properties.addProperty("ADBE Text Stroke Width");
		//var PTTAnimatorProperty = preAnimator.Properties.addProperty("ADBE Text Tracking Type");	
		var PTAAnimatorProperty = preAnimator.Properties.addProperty("ADBE Text Tracking Amount");
		if (is7 == "true") {
			var PblurAnimatorProperty = preAnimator.Properties.addProperty("ADBE Text Blur");
		}


		//preProperty.setValue([0.50,0.50,0.50,0]);
		prerangeStartProp.expression = "text.animator(\"Despues de Silaba Seleccionada\").selector(" + TextoSelector + ").start+thisComp.layer(\"" + NombreMaster + "\").effect(\"Post Silaba Comienzo Delay\")(" + TextoSlider + ")"
		prerangeEndProp.expression = "text.animator(\"Despues de Silaba Seleccionada\").selector(" + TextoSelector + ").end+thisComp.layer(\"" + NombreMaster + "\").effect(\"Post Silaba Fin Delay\")(" + TextoSlider + ")"
		prerangeOffset.expression = "thisComp.layer(\"" + NombreMaster + "\").effect(\"Post Silaba Offset\")(" + TextoSlider + ")";
		preProperty.expression = "thisComp.layer(\"" + NombreMaster + "\").text.animator(\"Despues de Silaba Seleccionada\").property.fillColor";
		PposAnimatorProperty.expression = "thisComp.layer(\"" + NombreMaster + "\").text.animator(\"Despues de Silaba Seleccionada\").property.position";
		PscaleAnimatorProperty.expression = "thisComp.layer(\"" + NombreMaster + "\").text.animator(\"Despues de Silaba Seleccionada\").property.scale";
		PskewAnimatorProperty.expression = "thisComp.layer(\"" + NombreMaster + "\").text.animator(\"Despues de Silaba Seleccionada\").property.skew";
		ProtationAnimatorProperty.expression = "thisComp.layer(\"" + NombreMaster + "\").text.animator(\"Despues de Silaba Seleccionada\").property.rotation";
		ProtationYAnimatorProperty.expression = "thisComp.layer(\"" + NombreMaster + "\").text.animator(\"Despues de Silaba Seleccionada\").property.yRotation";
		ProtationXAnimatorProperty.expression = "thisComp.layer(\"" + NombreMaster + "\").text.animator(\"Despues de Silaba Seleccionada\").property.xRotation";
		PopacityAnimatorProperty.expression = "thisComp.layer(\"" + NombreMaster + "\").text.animator(\"Despues de Silaba Seleccionada\").property.opacity";
		PSopacityAnimatorProperty.expression = "thisComp.layer(\"" + NombreMaster + "\").text.animator(\"Despues de Silaba Seleccionada\").property.strokeOpacity";
		PFopacityAnimatorProperty.expression = "thisComp.layer(\"" + NombreMaster + "\").text.animator(\"Despues de Silaba Seleccionada\").property.fillOpacity";
		PScolorAnimatorProperty.expression = "thisComp.layer(\"" + NombreMaster + "\").text.animator(\"Despues de Silaba Seleccionada\").property.strokeColor";
		PSwidthAnimatorProperty.expression = "thisComp.layer(\"" + NombreMaster + "\").text.animator(\"Despues de Silaba Seleccionada\").property.strokeWidth";
		//PTTAnimatorProperty.expression="thisComp.layer(\""+NombreMaster+"\").text.animator(\"Despues de Silaba Seleccionada\").property.trackingType";
		PTAAnimatorProperty.expression = "thisComp.layer(\"" + NombreMaster + "\").text.animator(\"Despues de Silaba Seleccionada\").property.trackingAmount";
		if (is7 == "true") {
			PblurAnimatorProperty.expression = "thisComp.layer(\"" + NombreMaster + "\").text.animator(\"Despues de Silaba Seleccionada\").property.blur";
		}

	}

	//Creamos los keyframes de animacion para las K
	while (text.indexOf("\\K") > 0) {
		text = text.replace("\\K", "\\k");
	}

	if (text.indexOf("\\k") > 0) {
		ValorK(Texto, TiempoInicio, theAnimators, postefecto, gradual, Master);
	}

	var marcadorFin = new MarkerValue("0");
	Texto.Marker.setValueAtTime(TiempoFin, marcadorFin);
	Texto.outPoint = TiempoFin;


	if (valoresAPorcentaje) {
		theAnimators.property(2).Selectors.property("ADBE Text Selector").property(7).property(1).setValue(1);
		if (postefecto == "true") {
			theAnimators.property(3).Selectors.property("ADBE Text Selector").property(7).property(1).setValue(1);
		}
	}


	theAnimators.property(2).Selectors.property("ADBE Text Selector").property(7).property(5).setValue(estiloSilaba);
	if (postefecto == "true") {
		theAnimators.property(3).Selectors.property("ADBE Text Selector").property(7).property(5).setValue(estiloPSilaba);
	}
	return Texto;
}

{
	/************
	* PRINCIPAL *
	************/

	xComp = 1920;
	yComp = 1080;
	fpsComp = 23.976;
	var postefecto = "false";
	setMaster = "false";
	var valoresAPorcentaje = false;
	var estiloSilaba = 1;
	var estiloPSilaba = 1;
	// create undo group
	var is7;
	if (parseFloat(app.version) < 7) {
		is7 = "false";
	}
	else {
		is7 = "true";
	}
	app.beginUndoGroup("Karaoke");

	if (app.language == Language.SPANISH) {
		TextoSelector = "\"Selector de rango 1\"";
		TextoSlider = "\"Deslizador\"";
	}
	else if (app.language == Language.ENGLISH) {
		TextoSelector = "\"Range Selector 1\"";
		TextoSlider = "\"Slider\"";
	}
	else {
		alert("Error de idioma");
	}
	var activeItem = app.project.activeItem;
	var expr1 = false;

	//Llamamos el primer menu.
	if (app.project.numItems == 0 || !(app.project.item(1) instanceof CompItem)) {
		ret = ComposicionDialog();

		if (ret.length > 0) {
			xComp = parseInt(ret[0]);
			yComp = parseInt(ret[1]);
			fpsComp = parseInt(ret[2]);
		}
		else {
			alert("Error: No pueden ser nulos los valores");
			ret = ComposicionDialog();
			xComp = parseInt(ret[0]);
			yComp = parseInt(ret[1]);
			fpsComp = parseInt(ret[2]);
		}
	}
	// Prompt user to select text file  
	var myFile = File.openDialog("Abrir fichero SSA...", "");
	if (myFile != null) {


		// open file
		var fileOK = myFile.open("r");
		if (fileOK) {

			fichero = new Array();
			i = 0;
			TotalTextoLineas = 0;
			while (!myFile.eof && !expr1) {
				linea = new Array();
				linea[0] = myFile.readln();
				linea[0] = linea[0].replace("\\K", "\\k");
				linea[0] = linea[0].replace("\\kf", "\\k");
				linea[1] = "hold";
				linea[2] = "false";
				fichero[i] = linea;
				text = fichero[i];
				var Dialog = text[0].indexOf(":");
				if (text[0].substring(0, Dialog) == "Dialogue") {
					TotalTextoLineas = TotalTextoLineas + 1;
				}
				i = i + 1;
			}

			TotalLineas = i;

			// create project if necessary

			var proj = app.project;
			if (!proj) proj = app.newProject();
			var TextoExtra;
			// create new comp named 'my text comp'


			var compW = xComp; // comp width
			var compH = yComp; // comp height
			var compL = 600;  // 10 minutos = 600 segundos
			var compRate = fpsComp; // comp frame rate
			var compBG = [48 / 255, 63 / 255, 84 / 255] // comp background color

			var myItemCollection = app.project.items;
			var myComp;
			if (0 > 1 && app.project.numItems > 0 && (app.project.item(1) instanceof CompItem)) { myComp = app.project.item(1); }
			else { myComp = myItemCollection.addComp('Composicion Karaoke', compW, compH, 1, compL, compRate); }

			var hold1 = false;
			var linear1 = false;
			var bezier1 = false;

			myComp.bgColor = compBG;




			var text;
			var TiempoInicio = 0.0;
			var TiempoFin = 0.0;



			MenuDialog();

			NombreMaster = AsignarNombreMaster(myComp);

			Master = AsignarMaster(myComp, NombreMaster);
			i = 0;
			while (i < TotalLineas) {
				text = fichero[i][0];
				var Dialog = text.indexOf(":");
				if (text == "" || text.substring(0, Dialog) != "Dialogue") {
					// NULO
				}
				else {
					while (text.indexOf("!Effect") != -1)
						text = text.replace("!Effect", "");
					while (text.indexOf("\\K") != -1)
						text = text.replace("\\K", "\\k");
					while (text.indexOf("\\kf") != -1)
						text = text.replace("\\kf", "\\k");
					TextoKaraoke = Limpieza(getTextoSSA(text));
					if (TextoKaraoke != "") {
						Texto = myComp.layers.addText(TextoKaraoke);
						//var TextLayerBounds = Texto.property("Effects").addProperty("ADBE TextLayerBounds");

						TiempoInicio = getInicioSSA(text);

						TiempoFin = getFinSSA(text);
						Texto.startTime = 0;
						Texto.inPoint = TiempoInicio;

						Texto = RellenaLayer(fichero[i], Texto, TiempoInicio, TiempoFin, Master);
					}


				}
				i = i + 1;
			}

			// close the file before exiting
			app.endUndoGroup();
			clearOutput();
			myFile.close();

			//reverseLayerOrder(myComp);
		}
		else {
			alert("Fallo al abrir el fichero");
		}

	}
	else {
		alert("No hay ningun archivo seleccionado.");
	}

	app.endUndoGroup();
}









/* Expresion que asignado a un layer varia segun el marcador actual
marcadores=thisLayer.marker;
ind=marcadores.nearestKey(time).index;
if (ind<=2){
valor=marcadores.key(2).time-marcadores.key(1).time;
indA=1;
}
else {
if (marcadores.key(ind).time<time && marcadores.numKeys>ind)
{
ind=ind+1;
}
indA=marcadores.key(ind-1).index;
valor=marcadores.key(ind).time-marcadores.key(indA).time;
}
linear(time,marcadores.key(indA).time,marcadores.key(ind).time,0,1)
*/

/* Expresion que asignada a master varia segun el layer actual.
if (time >0){
a=thisComp.numLayers;
while (thisComp.layer(a).startTime<=time){
a=a-1;
}
//Aqui thisComp.layer(a+1) es el layer actual
layerActual=thisComp.layer(a+1);

// Se realiza lo que haya que realizar

}
else
{
//caso nulo
}
*/
/*
	 FILE ARCHIVED ON 10:25:58 Mar 13, 2013 AND RETRIEVED FROM THE
	 INTERNET ARCHIVE ON 17:58:31 Jul 26, 2018.
	 JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

	 ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
	 SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 64.424 (3)
  esindex: 0.011
  captures_list: 89.755
  CDXLines.iter: 15.045 (3)
  PetaboxLoader3.datanode: 56.153 (4)
  exclusion.robots: 0.252
  exclusion.robots.policy: 0.236
  RedisCDXSource: 1.049
  PetaboxLoader3.resolve: 748.787
  load_resource: 759.927
*/