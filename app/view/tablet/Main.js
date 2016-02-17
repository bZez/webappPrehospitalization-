Ext.define('anwendung.view.tablet.Main', {
    extend: 'Ext.Container',
	requires: ['Ext.TitleBar', 'Ext.field.Select'],
	xtype: 'mainpagetablet',
	fullscreen: 'true',
	config: {
	layout: 'hbox',
		items: [
			{
				xtype: 'titlebar',
				title: 'Webapplikation zur Berechnung der Prähospitalzeit',
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

// Optimized for Landscape Use