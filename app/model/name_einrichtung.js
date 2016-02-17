Ext.define('anwendung.model.name_einrichtung', {
	extend: 'Ext.data.Model',
	config: {
		fields: [  
			{name: 'station',  type: 'string'},
			{name: 'abteilung',  type: 'string'},
			{name: 'tel',  type: 'string'},
			{name: 'fax',  type: 'integer'},
			{name: 'web', type: 'string'},
			{name: 'strasse',  type: 'string'},
			{name: 'hausnr', type: 'integer'},
			{name: 'plz', type: 'string'},
			{name: 'stadt',  type: 'string'},
			{name: 'mail',  type: 'string'},
			{name: 'lat', type: 'float'},
			{name: 'lng', type: 'float'},
			{name: 'art', type: 'string'}
		],
		validations: [
			{ type: 'presence', field: 'station', message: 'Please enter the Brand name.' },
			{ type: 'presence', field: 'abteilung'/*, message: 'Please enter the region.'*/ },
			{ type: 'presence', field: 'tel'/*, message: 'Please enter the distillery.'*/ },
			{ type: 'presence', field: 'fax'/*, message: 'Please enter the type.'*/ },
			{ type: 'presence', field: 'web'/*, message: 'Please enter the years.'*/ },
			{ type: 'presence', field: 'strasse'/*, message: 'Please enter the vol-%.'*/ },
			{ type: 'presence', field: 'hausnr'/*, message: 'Please enter the years.'*/ },
			{ type: 'presence', field: 'plz'/*, message: 'Please enter the type.'*/ },
			{ type: 'presence', field: 'stadt'/*, message: 'Please enter the vol-%.'*/ },
			{ type: 'presence', field: 'mail'/*, message: 'Please enter the type.'*/ },
			{ type: 'presence', field: 'lat'/*, message: 'Please enter the Lat.'*/ },
			{ type: 'presence', field: 'lng'/*, message: 'Please enter the Lng'*/ },
			{ type: 'presence', field: 'art'/*, message: 'Please enter the Art'*/ }		
		],
		proxy: {
			type: 'rest',
			url: '/stations.json',
			reader: {
				type: 'json',
				//rootProperty: 'stations'
			},
			writer: {
				writeAllFields: false
			},
			batchActions : false
		}
	}
});