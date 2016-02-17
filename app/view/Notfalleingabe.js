Ext.define("anwendung.view.Notfalleingabe", {
	extend: "Ext.Container",
	xtype: "notfalleingabe",

	config: {
		styleHtmlContent: true,
		items: [
			{
				html: 'Art des Notfalls:'
			},
			{
				xtype: 'selectfield',
				label: 'Notfallart',
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
			}
		]
	}
});