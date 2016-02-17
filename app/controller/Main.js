Ext.define("anwendung.controller.Main", {
  extend: "Ext.app.Controller",
    config: {
/********
Refs
********/
		refs: {
		
			standorte: '#standortliste',
			onSearchKeyUp: '#suche',
			onSearchClearIconTap: '#suche',
			onStandortwahl: '#standortwahl',
			neuerstandort: '#neuerstandort',
			karteView: 'karte',
			notfallAddresseField: '#notfalladdresse',
			notfallCoordinateField: '#notfallcoordinate',
			notafllArt: 'notfallart',
			
/**********	Navigation Buttons. ********/
		
			ersterBtn: '#erster',
			onSaveButtonTap: '#speicherbutton',
			onNotfallSucheButtonTap: '#notfallsuchebutton',
			onNotfallCoordSucheButtonTap: '#notfallcoordsuchebutton',
			onSucheRettungButtonTap: '#sucherettungbutton',
			
/********** Action *********/
			// createAccountBtn: '#createAccountButton', //ohne action
		
			
/**********	Views. ********/
			
			listeView: '#listepage',
			mapView: 'mappage',
			menuView: 'menupage',
			notfallView: 'notfallpage',
			standorteView: 'standortepage',
			neuerStandortView: 'neuerstandortpage',
			standorteDetailView: 'standortedetailpage',
			notfallEingabeView: '#notfalleingabe',
			notfallDetailView: 'notfalldetailpage',
			
		},
		
/********
Controls
********/
		control: {
/********* Buttons. *********/
			// accountBtn: {
				// tap: function () {
					// Ext.Viewport.animateActiveItem(this.getAccountView(), this.slideRightTransition);
				// }
			// }
			onNotfallSucheButtonTap: {
				tap: function () {
					
					console.log('Notfallsuche taped');
					var detail = this.getNotfallDetailView();
					var view = this.getNotfallAddresseField();
					var addresse = view.getValue();		
					var latlng = addresse.split(",",2);
					var lat = parseFloat(latlng[0]);
					var lng = parseFloat(latlng[1]);
					var	geocoder = new google.maps.Geocoder(),
						addr;
					console.log(addresse);
					if (addresse == ''){
						Ext.Msg.alert('Achtung', 'Bitte geben Sie eine Adresse oder Koordinate ein.');
					}
						
					// Geocoder für Notfalladdresse
					geocoder.geocode( { 'address': addresse }||{ 'latLng': addresse}, function(results, status) {
						
						if (status == google.maps.GeocoderStatus.OK) {
							var lat = results[0].geometry.location.lat();
							var lng = results[0].geometry.location.lng();
							var addr = results[0].formatted_address;
						} else {
							alert("Geocode was not successful for the following reason: " + status);
						};
						console.log("Success!",lat + "," +lng + "," +addr);
						console.log(status);
						console.log(results);
						getStations(lat, lng, addr);						
					});
					// Lädt gesuchte Zielkliniken und Rettungswachen in Array
					function getStations (lat, lng, addr){
						var value = Ext.getCmp('notfallart').getValue();
						console.log(value);
						var store = Ext.getStore('name_einrichtungs');
						store.setProxy({
							type: 'rest',
							url: '/stations.json',
							reader: 'json'
						});
						if(value == 'nix'){
								Ext.Msg.alert('Achtung', 'Bitte wählen Sie eine Notfallart.');
							}
						var addressen = [],
							rettungswachen = [],
							luftrettung = [];
						store.load();
						store.each(function(rec) {
							var name = rec.get('station'),
								str = rec.get('strasse'),
								hausnr = rec.get('hausnr'),
								plz = rec.get('plz'),
								stadt = rec.get('stadt'),
								art = rec.get('art'),
								lati = rec.get('lat'),
								lngi = rec.get('lng');
							
							if (value == 'stroke' && art == 'Überregionale Strokeunit'){
								addressen.push(str + ' ' + hausnr + ', ' + plz + ' ' + stadt + ', ' + lati + ' ' + lngi);									
							}
							if (value == 'strokelok' && art == 'Regionale Strokeunit'){
								addressen.push(str + ' ' + hausnr + ', ' + plz + ' ' + stadt + ', ' + lati + ' ' + lngi);									
							}
							if (value == 'ptca' && art == 'PTCA'){
								addressen.push(str + ' ' + hausnr + ', ' + plz + ' ' + stadt + ', ' + lati + ' ' + lngi);
							}
							if (value == 'trauma' && art == 'Überregionales Traumazentrum'){
								addressen.push(str + ' ' + hausnr + ', ' + plz + ' ' + stadt + ', ' + lati + ' ' + lngi);
							}
							if (value == 'traumalok' && art == 'regionales Traumazentrum'){
								addressen.push(str + ' ' + hausnr + ', ' + plz + ' ' + stadt + ', ' + lati + ' ' + lngi);
							}
							if(art == 'Rettungswache'){
								rettungswachen.push(str + ' ' + hausnr + ', ' + plz + ' ' + stadt + ', ' + lati + ' ' + lngi);
							}
							if(art == 'ITH' || art == 'RTH'){
								luftrettung.push(str + ' ' + hausnr + ', ' + plz + ' ' + stadt + ', ' + lati + ' ' + lngi);
								
							}
							
						});	
						//Haversine formula Rettungswachen
						var wachenentf = [];
						var entf = 150;
						if (rettungswachen.length > 24){
							for (var y = 0; y < rettungswachen.length; y++){
						
								var latlngu = rettungswachen[y].split(', ', 3);
								var eins = latlngu[0];
								var zwei = latlngu[1];
								var drei = latlngu[2];
								var xx = drei.split(' ', 2);
														
								var lat2 = xx[0]; 
								var lon2 = xx[1]; 
								var lat1 = lat; 
								var lon1 = lng; 

								var R = 6371; // Erdradius in km 
								
								var x1 = lat2-lat1;
								var dLat = x1 * Math.PI / 180;  
								var x2 = lon2-lon1;
								var dLon = x2 * Math.PI / 180;  
								var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
										Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
										Math.sin(dLon/2) * Math.sin(dLon/2);  
								var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
								var d = R * c;
								if (d < entf){
									entf = d;
									wachenentf.push(eins + ', ' + zwei );
								}
							}
							console.log('Anzahl Wachen: ' + wachenentf.length);							
						} 
						//End Haversine formula Rettungswachen			
						//Start Haversine formula Kliniken
						var addressenentf = [];
						var entfernung = 1000;
						if (addressen.length > 2){
							for (var y = 0; y < addressen.length; y++){
						
								var latlngusw = addressen[y].split(', ', 3);
								var anschrift1 = latlngusw[0];
								var anschrift2 = latlngusw[1];
								var latlng = latlngusw[2];
								var ll = latlng.split(' ', 2);
														
								var lat2 = ll[0]; 
								var lon2 = ll[1]; 
								var lat1 = lat; 
								var lon1 = lng; 

								var R = 6371; // Erdradius in km 
								
								var x1 = lat2-lat1;
								var dLat = x1 * Math.PI / 180;  
								var x2 = lon2-lon1;
								var dLon = x2 * Math.PI / 180;  
								var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
										Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
										Math.sin(dLon/2) * Math.sin(dLon/2);  
								var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
								var d = R * c;
								if (d < entfernung){
									entfernung = d;
									addressenentf.push(anschrift1 + ', ' + anschrift2);
								}
							}
							console.log('Anzahl Zielkliniken :' +addressenentf.length	);							
						} 
						//End Haversine formula Kliniken
						
						// DistanceMatrixService Rettungswache
						var wache;
						var notfalladdr = addr;
						var servicew = new google.maps.DistanceMatrixService();
						
						servicew.getDistanceMatrix(
							{
								origins: [notfalladdr],
								destinations: wachenentf,
								travelMode: google.maps.TravelMode.DRIVING,
								avoidHighways: false,
								avoidTolls: false
							}, callbackRettung);
							console.log(wachenentf);
												
						function callbackRettung(response, status) {
						
							if (status == google.maps.DistanceMatrixStatus.OK) {

								var origins = response.originAddresses;
								var destinations = response.destinationAddresses;
								
								for (var i = 0; i < origins.length; i++) {
									var results = response.rows[i].elements;
									console.log(response);

									for (var j = 0; j < results.length; j++) {
										
										var element = results[j];
										var distance = element.distance.text;
										var duration = element.duration.text;
										var to = origins[0];
										var from = destinations[j];
										console.log(from + ' NACH ' + to + ' LÄNGE ' + distance + ' DAUER ' + duration);										
									}
								}
								var duration = results[0].duration.value;
							}												
							for (var k = 0; k < results.length; k++){
								
								if (results[k].duration.value - 1 <= duration){
									distancew = results[k].distance.text;
									durationw = results[k].duration.value;
									dauerw = results[k].duration.text;
									wache = destinations[k];									
								}							
							}
							console.log(results);
							console.log(durationw + ' ' + dauerw + ' ' + distancew + ' ' + wache); 
							var startw = wache.split(', ',2);
							var strhausnrw = startw[0];
							var plzstdw = startw[1];
							var stopw = plzstdw.split(' ',2);
							var postw = stopw[0];
							var stadtw = stopw[1];
							var rwache = store.findRecord('plz', postw);
							console.log(rwache);
							var namew = rwache.data.station;
						
							activateRettungssuche(lat, lng, addr, addressenentf, wachenentf, wache, namew, luftrettung);
						}						
					};
					
					function activateRettungssuche (lat, lng, addr, addressenentf, wachenentf, wache, namew, luftrettung){ 
					// DistanceMatrixService Klinik
						var ort;
						var notfalladdr = addr;
					
						var service = new google.maps.DistanceMatrixService();
						service.getDistanceMatrix(
						  {
							origins: [notfalladdr],
							destinations: addressenentf,
							travelMode: google.maps.TravelMode.DRIVING,
							avoidHighways: false,
							avoidTolls: false
						  }, callback);
						  	console.log(addressenentf.length);					 						
						function callback(response, status) {
							
							if (status == google.maps.DistanceMatrixStatus.OK) {
								var origins = response.originAddresses;
								var destinations = response.destinationAddresses;
	
								for (var i = 0; i < origins.length; i++) {
									var results = response.rows[i].elements;
									console.log(response);
									for (var j = 0; j < results.length; j++) {
										var element = results[j];
										var distance = element.distance.text;
										var duration = element.duration.text;
										var to = origins[0];
										var from = destinations[j];
										console.log(from + ' NACH ' + to + ' LÄNGE ' + distance + ' DAUER ' + duration);										
									}
								}
								var duration = results[0].duration.value;
							}												
							for (var k = 0; k < results.length; k++){
								
								if (results[k].duration.value - 1 <= duration){
									distance = results[k].distance.text;
									duration = results[k].duration.value;
									dauer = results[k].duration.text;
									ort = destinations[k];									
								}							
							}
							//Haversine formula LuftRettung - Station --> Unfallort
							
							var luftentf,
								latklinik,
								lonklinik,
								dklinik;
							var luentf = 1000;
							var klentf = 1000;
							console.log('Luftrettung gestartet');
							var	geocoder = new google.maps.Geocoder();
								
							// Geocoder für Klinik-Koordinaten und Entfernung zum Notfallort
							geocoder.geocode( { 'address': ort }, function(results, status) {
								console.log(ort);
								if (status == google.maps.GeocoderStatus.OK) {
									latklin = results[0].geometry.location.lat();
									lngklin = results[0].geometry.location.lng();
								} else {
									alert("Geocode was not successful for the following reason: " + status);
								};								
								console.log("Ja! " + latklin + ", " +lngklin);
														
								var latklinik = latklin; 
								var lonklinik = lngklin; 
								var lat1 = lat; 
								var lon1 = lng; 

								var R = 6371; // Erdradius in km 
								
								var x1 = latklinik-lat1;
								var dLat = x1 * Math.PI / 180;  
								var x2 = lonklinik-lon1;
								var dLon = x2 * Math.PI / 180;  
								var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
										Math.cos(lat1 * Math.PI / 180) * Math.cos(latklinik * Math.PI / 180) * 
										Math.sin(dLon/2) * Math.sin(dLon/2);  
								var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
								var dklinik = R * c;
								
								console.log(dklinik + ' ' + latklinik);
							
								// Berechnet dichteste Luftrettungs-Station 

								if (luftrettung.length > 1){
									console.log(latklinik);
									for (var b = 0; b < luftrettung.length; b++){
										var addrlatlng = luftrettung[b].split(', ', 3);
										var latstation,
											lonstation,
											strrth;
										var street = addrlatlng[0];
										var postl = addrlatlng[1];
										var ltln = addrlatlng[2];
										var yy = ltln.split(' ', 2);
																
										var lat2 = yy[0]; 
										var lon2 = yy[1]; 
										var lat1 = lat; 
										var lon1 = lng; 

										var R = 6371; // Erdradius in km 
										
										var x1 = lat2-lat1;
										var dLat = x1 * Math.PI / 180;  
										var x2 = lon2-lon1;
										var dLon = x2 * Math.PI / 180;  
										var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
												Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
												Math.sin(dLon/2) * Math.sin(dLon/2);  
										var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
										var drth = R * c;
										if (drth < luentf){
											luentf = drth;
											luftentf = (lat2 + ', ' + lon2 + ', ' + drth); // Koordinaten der dichtesten Luftrettungs-Station
											latstation = lat2;
											lonstation = lon2;
											strrth = street;
										}
									}
									console.log('LuftRettung: ' + luftentf);
									console.log(latstation + ', ' + lonstation + ' ' + lat + ', ' + lng + ' ' + latklinik+ ', ' + lonklinik);
									
								} 
								addMapAndDetail(latstation, lonstation, lat, lng, latklinik, lonklinik, street, dklinik);
							});

							//End Haversine formula LuftRettung	
							
							function addMapAndDetail(latstation, lonstation, lat, lng, latklinik, lonklinik, street, dklinik) {
								var store = Ext.getStore('name_einrichtungs');
								store.setProxy({
									type: 'rest',
									url: '/stations.json',
									reader: 'json'
								});
								store.load();
								var flzeit = Math.round(((luentf/200)*60)+2);			// Angenommene durschn. Fluggeschw.	von 180	km/h 		
								var flzeit2 = Math.round(((dklinik/200)*60)+2);			// + 4 min für den Start/Landung & Einsteigen
								console.log(flzeit2);
								var strhsnrth = street.split(' ', 2);
								var strrth = strhsnrth[0];
								var start = ort.split(', ',3);
								var strhausnr = start[0];
								var wichtig = strhausnr.split(' ', 2);
								var stra = wichtig[0];
								var plzstd = start[1];
								var stop = plzstd.split(' ',2);
								var post = stop[0];
								var stadt = stop[1];
								var klinik = store.findRecord('strasse', stra);
								var stationrth = store.findRecord('strasse', strrth);
								var name = klinik.data.station;
								var namerth = stationrth.data.station;
								console.log(name + ' ' + post + ' ' + namerth);
								var waypts = [];
								waypts.push({
									location:new google.maps.LatLng(lat, lng),
									stopover:true
								});
							
								var directionsDisplay = new google.maps.DirectionsRenderer({
									suppressMarkers: true,
									polylineOptions: {
									  strokeColor: "green"
									}
								});
								var directionsService = new google.maps.DirectionsService();
								var	mapOptions = {
									//zoom: 14,
									streetViewControl: false,
									//center: new google.maps.LatLng(lat, lng),
									mapTypeControlOptions: {
										style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
									}
								};
								var icons = {
									start: new google.maps.MarkerImage('/resources/icons/start.png', 
										new google.maps.Size( 30, 30 ), 
										new google.maps.Point( 0, 0 ),
										new google.maps.Point( 15, 35 )
									),
									wpt: new google.maps.MarkerImage('/resources/icons/wpt.png', new google.maps.Size( 30, 30 ), new google.maps.Point( 0, 0 ),
										new google.maps.Point( 15, 30 )
									),
									end: new google.maps.MarkerImage('/resources/icons/end.png', new google.maps.Size( 30, 30 ), new google.maps.Point( 0, 0 ),
										new google.maps.Point( 15, 30 )
									),
									heliport: new google.maps.MarkerImage('/resources/icons/heliport.png', new google.maps.Size( 35, 25 ), new google.maps.Point( 0, 0 ),
										new google.maps.Point( 18, 30 )
									)
								};
								// Definiert und setzt Punkte für Polylinien
								console.log(latstation + ', ' + lonstation + ' ' + lat + ', ' + lng + ' ' + latklinik+ ', ' + lonklinik);
								var flightPlanCoordinates = [
									new google.maps.LatLng(latstation, lonstation),
									new google.maps.LatLng(lat, lng),
									new google.maps.LatLng(latklin, lngklin)
								];
						
								var flightPath = new google.maps.Polyline({
									path: flightPlanCoordinates,
									strokeColor: "#FF0000",
									strokeOpacity: 1.0,
									strokeWeight: 2
								});

								detail.setHtml('<h1></h1><b>Ergebnis:</b>' + '<div></div>' + '<b>Notfall-Addresse: </b>'+ addr + '<div></div>' + '<b>Notfall-Koordinaten: </b>' 
								+ 'Lat: '+ lat + ', Lng: ' + lng + '<h1></h1>' + '<b>nächste Rettungswache: </b>' + namew + '<div></div>'+ '<b>Adresse: </b>' + wache 
								+ '<div></div>' + '<b>Fahrzeit zum Notfallort: </b>' + dauerw + '<div></div>' + '<b>Entfernung: </b>' + distancew +
								'<h1></h1>' + '<b>nächste Zielklinik: </b>' + name + '<div></div>' + '<b>Adresse: </b>' + ort + '<div></div>' +
								'<b>Fahrzeit zur Klinik: </b>' + dauer + '<div></div>' + '<b>Entfernung: </b>' + distance + '<h1></h1>' + 
								'<b>nächste Luftrettungs-Station: </b>' + namerth + '<div></div>' + '<b>Distanz zum Notfallort: </b>' + Math.round(luentf) + 
								' km' + '<div></div>' + '<b>Flugzeit: </b>' + flzeit + ' min' + '<div></div>' +
								'<b>Distanz zur Zielklinik: </b>' + Math.round(dklinik) + ' km' + '<div></div>' + '<b>Flugzeit: </b>' + flzeit2 + ' min' + '<div></div>');
								
								var myMap = new google.maps.Map(karte, mapOptions);
								
								console.log('Origin: ' + wache + ' WP ' + waypts + ' destination ' + ort);						
								var request = {
									origin: wache,
									waypoints: waypts,
									destination: ort,
									travelMode: google.maps.TravelMode.DRIVING
								};

								directionsService.route(request, function(result, status) {
									if (status == google.maps.DirectionsStatus.OK) {
										directionsDisplay.setDirections(result);
										console.log(result);
										var leg = result.routes[0].legs[0];
										var leg2 = result.routes[0].legs[1];
										makeMarker( leg.start_location, icons.start, "Rettungswache" );
										makeMarker( leg.end_location, icons.wpt, 'Notfalladdresse' );
										makeMarker( leg2.end_location, icons.end, 'Zielklinik');
										makeMarker( new google.maps.LatLng(latstation, lonstation), icons.heliport, 'Luftrettungs-Station' );
									}
								});
								function makeMarker( position, icon, title ) {
									new google.maps.Marker({
										position: position,
										map: myMap,
										icon: icon,
										title: title
									});
								}
								flightPath.setMap(myMap);
								directionsDisplay.setMap(myMap);
							}
						}	
					}				
				}
			},
						
/********* Listeners Views. *********/
			// Lädt Liste mit Standorten
			standorte: {
				activate: function() {
					
					var store = Ext.getStore('name_einrichtungs');
					store.setProxy({
						type: 'rest',
						url: '/stations.json',
						reader: 'json'
					});
					store.load();
					console.log ('geladen');
				},
				itemtap: function(list, index, target, record, e, eOpts) {
					setTimeout(100);
					console.log ('TAPPED');
					var detailView = this.getStandorteDetailView();
					detailView.setHtml('<b>Standortinformationen:</b><div> </div>' + '<b>' + record.get('station') + '</b><div> </div>' + '<b>Addresse: </b>' + record.get('strasse') + ' ' 
										+ record.get('hausnr') + ', ' + record.get('plz') + ' ' + record.get('stadt') + '<div> </div>' + 
										'<b>Telefon: </b>' + record.get('tel') + '<h1> </h1>' +	'<b>Internet: </b>' + record.get('web'));		
					
					var mapContainerStandorte = this.getMapView(),
						geocoder = new google.maps.Geocoder(),
						lat,
						lng,
						address = record.get('strasse') + ' ' + record.get('hausnr') + ' ' + record.get ('plz') + ' ' + record.get('stadt'),
						name = record.get('station');
					
					// Geocoder
					geocoder.geocode( { 'address': address}, function(results, status) {
						
						if (status == google.maps.GeocoderStatus.OK) {
							var lat = results[0].geometry.location.lat();
							var lng = results[0].geometry.location.lng();
						} else {
							alert("Geocode was not successful for the following reason: " + status);
						};
						console.log(results);
						console.log(status);
					// Add MapView  
						var meineMap = Ext.create('Ext.Map', {

							
							useCurrentLocation: false,
							mapOptions: {
								zoom: 15,
								streetViewControl: false,
								center: new google.maps.LatLng(lat, lng),
								mapTypeControlOptions: {
									style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
								}
							},
					
							//Add Markers
							listeners: {
								maprender : function(comp, meineMap){
									console.log('Map rendered' + ' ' + google.maps.center);
									meineMap.setCenter(new google.maps.LatLng(lat, lng));
									var marker = new google.maps.Marker({
										position: meineMap.center,
										title : name,
										map: meineMap,
										icon: '/resources/icons/end.png'
									});
								}
							}
						});
						mapContainerStandorte.add(meineMap);		
					});	
					
				}					
			},
			mapView:{
				maprender: function(comp, myMap){
					console.log('Karte geladen');					
				}			
			},
	// Suchfunktion
			
			onSearchKeyUp:{
				keyup: function(field) {
					//get the store and the value of the field
					console.log('onSearchKeyUpCommand');
					
					var value = field.getValue(),
						store = Ext.getStore('name_einrichtungs');
						// store = this.getStore('standortliste');

					//first clear any current filters on thes tore
					store.clearFilter();

					//check if a value is set first, as if it isnt we dont have to do anything
					if (value) {
						//the user could have entered spaces, so we must split them so we can loop through them all
						var searches = value.split(' '),
							regexps = [],
							i;

						//loop them all
						for (i = 0; i < searches.length; i++) {
							//if it is nothing, continue
							if (!searches[i]) continue;

							//if found, create a new regular expression which is case insenstive
							regexps.push(new RegExp(searches[i], 'i'));
						}

						//now filter the store by passing a method
						//the passed method will be called for each record in the store
						store.filter(function(record) {
							var matched = [];

							//loop through each of the regular expressions
							for (i = 0; i < regexps.length; i++) {
								var search = regexps[i],
									didMatch = record.get('station').match(search) || record.get('stadt').match(search);

								//if it matched the first or last name, push it into the matches array
								matched.push(didMatch);
							}

							//if nothing was found, return false (dont so in the store)
							if (regexps.length > 1 && matched.indexOf(false) != -1) {
								return false;
							} else {
								//else true true (show in the store)
								return matched[0];
							}
						});
					}
				}
			},
			onSearchClearIconTap: {
				clearicontap: function() {
					console.log('Icon taped');
					//call the clearFilter method on the store instance
					Ext.getStore('name_einrichtungs').clearFilter();
				}
			},
			onStandortwahl: {
				change: function(field) {
					console.log('Selection done');
					var value = Ext.getCmp('standortwahl').getValue(),
						strokeunit = Ext.getCmp('neuerstandort'),
						saveButton = {
							xtype: 'button',
							ui: 'confirm',
							text: 'Speichern',
							width: '30%',
							id: 'speicherbutton'
						};
					
					if (value == 'first' || value == 'second' || value == 'third') {
								
						strokeunit.add([
							{
						        xtype : 'textfield',
						        label : 'Name der Einrichtung',
								name: 'station',
								required: true
						    },
							{
						        xtype : 'textfield',
						        label : 'Straße',
								name: 'strasse',
								required: true
						    },
							{
						        xtype : 'numberfield',
						        label : 'Hausnummer',
								name: 'hausnr',
								required: true
						    },
							{
						        xtype : 'numberfield',
						        label : 'Postleitzahl',
								name: 'plz',
								required: true
						    },
							{
						        xtype : 'textfield',
						        label : 'Stadt',							
								name: 'stadt',
								required: true
						    },
						    {
						        xtype : 'textfield',
						        label : 'Abteilung',
								name: 'abteilung'
						    },
							{
						        xtype : 'numberfield',
						        label : 'Telefon',
								name: 'tel'								
						    },
							{
						        xtype : 'numberfield',
						        label : 'Fax',
								name: 'fax'
						    },
							{
						        xtype : 'emailfield',
						        label : 'eMail',
								name: 'mail'
						    },
							{
						        xtype : 'textfield',
						        label : 'Webaddresse',
								name: 'web'
						    },
							saveButton
							
						]);
						
					} else if (value == 'fourth' || value == 'fifth') {
						strokeunit.add([
							{
						        xtype : 'textfield',
						        label : 'Name der Einrichtung',
								name: 'station',
								required: true
						    },
							{
						        xtype : 'textfield',
						        label : 'Straße',
								name: 'strasse',
								required: true
						    },
							{
						        xtype : 'numberfield',
						        label : 'Hausnummer',
								name: 'hausnr',
								required: true
						    },
							{
						        xtype : 'numberfield',
						        label : 'Postleitzahl',
								name: 'plz',
								required: true
						    },
							{
						        xtype : 'textfield',
						        label : 'Stadt',							
								name: 'stadt',
								required: true
						    },
						    {
						        xtype : 'textfield',
						        label : 'Abteilung',
								name: 'abteilung'
						    },
							{
						        xtype : 'numberfield',
						        label : 'Telefon',
								name: 'tel'								
						    },
							{
						        xtype : 'numberfield',
						        label : 'Fax',
								name: 'fax'
						    },
							{
						        xtype : 'emailfield',
						        label : 'eMail',
								name: 'mail'
						    },
							{
						        xtype : 'textfield',
						        label : 'Webaddresse',
								name: 'web'
						    },
							saveButton							
						]);
						
					} else if (value == null) {
						Ext.Msg.alert('Bitte wählen');
						// strokeunit.animateActiveItem('neuerstandort'); Panel zurücksetzten, da bisher alle ausgewählten Felder untereinander geladen werden
					}									
				}
			},
			// Speichert neue Standorte in Datenbank
			onSaveButtonTap: {
				tap: function(){
					console.log('Knock knock');
					var me = this;
					var newStandort = Ext.getCmp('neuerstandort');
					var records = newStandort.getRecord();
					var values = newStandort.getValues();
					Ext.Ajax.request({
						url		: "/name_einrichtungs",
						method  : "POST",
						params	: values,
						success : function(response, options) {
						//	me.activateNotesListL();
							//this.activateCreateRateFromNewBrand();
						},
						failure: function(response, options) {
							var response = Ext.decode(response.responseText);
							Ext.Msg.alert('Speichern fehlgeschlagen', response.message);
						}
					});
					var view = this.getStandorteView(); //get Statement anpassen
						var store = Ext.getStore('name_einrichtungs');
						store.setProxy({
							type: 'ajax',
							url: '/stations.json'
						});
						store.load();
				}
			}
		}
	},
/********* Helper Functions *********/

	
/********* Transitions *******/
    // slideLeftTransition: { type: 'slide', direction: 'left' },
    // slideRightTransition: { type: 'slide', direction: 'right' },

/******* Commands (Funktionen) ********/
		
	init: function () {
		this.callParent(arguments);
		console.log("init");
    }
});

