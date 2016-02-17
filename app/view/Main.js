Ext.define('anwendung.view.Main', {
    extend: 'Ext.Container',
	xtype: 'mainpage',
	fullscreen: 'true',
	config: {
	layout: 'hbox',
	
		items: [
			{
				xtype: 'titlebar',
				title: 'Rettungsdienst',
				docked: 'top'
			},
			{
				xtype: 'menupage',
				flex: 1
			},
			{
				xtype: 'mappage',
				flex: 1
			}		
		]
	}	
});