Ext.define('anwendung.view.phone.Map', {
    extend: 'Ext.Map',
    xtype: 'mappage',
	
    config: {
		layout: 'fit',
		style: 'background:brown',

		items: [
			{
				xtype: 'map',
				id: 'karte',
				useCurrentLocation: false,
				mapOptions: {
					zoom: 7,
					streetViewControl: false,
					center: new google.maps.LatLng(53.725605, 12.426031),
					mapTypeControlOptions: {
						style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
					}
				}
			}
		]
	}
});