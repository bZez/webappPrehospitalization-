Ext.define("anwendung.view.phone.Menu", {
	extend: "Ext.TabPanel",
	xtype: "menupage",
	config: {
		ui: 'dark',
		scrollable: true,
		items: [
			{
				xtype: 'notfallpage'
			},
			{
				xtype: 'standortepage'
			}
		]
	}
});