Ext.define("anwendung.view.phone.Notfall", {
	extend: "Ext.Panel",
	xtype: "notfallpage",

	config: {
		title: 'Notfall',
		styleHtmlContent: true,
		scrollable: true,
		layout: {
			type: 'vbox'
		},
		items: [
			{
				
				html: 'Art des Notfalls:'
			},
			{
				xtype: 'selectfield',
				id: 'notfallart',				
				options: [
					{text: 'Wähle Notfallart', value: 'nix'},
					{text: 'Stroke Unit',  value: 'stroke'},
					{text: 'regionale Stroke Unit', value: 'strokelok'},
					{text: 'Traumazentrum', value: 'trauma'},
					{text: 'lokales Traumazentrum', value: 'traumalok'},
					{text: 'PTCA',  value: 'ptca'}
				]
			},
			{
				html: 'Standort des Notfalls:'
			},
			{
				xtype: 'textfield',
				placeHolder: 'Addresse / Koordinaten eingeben',
				id: 'notfalladdresse'
			},			
			{
				xtype: 'button',
				text: 'Suchen',
				width: '35%',
				id: 'notfallsuchebutton'
			
		
			},
			{
				xtype: 'notfalldetailpage'
			}
		]
	}
});