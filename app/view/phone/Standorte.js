Ext.define("anwendung.view.phone.Standorte", {
	extend: "Ext.Panel",
	xtype: "standortepage",

	config: {
		title: 'Standorte',
		// scrollable: true,
		layout: {
			type: 'vbox'
		},
		items: [
			{
				xtype: 'listepage',
				flex: 2
			},
			{
				xtype: 'standortedetailpage',
				flex: 1
			}
		]
	}
});