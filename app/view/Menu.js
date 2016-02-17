Ext.define("anwendung.view.Menu", {
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