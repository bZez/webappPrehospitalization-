Ext.define('anwendung.view.desktop.Main', {
    extend: 'Ext.Container',
	requires: ['Ext.TitleBar', 'Ext.field.Select'],
	xtype: 'mainpagedesktop',
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