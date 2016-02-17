Ext.define('anwendung.view.phone.Main', {
    extend: 'Ext.Container',
	requires: ['Ext.TitleBar', 'Ext.field.Select'],
	xtype: 'mainpagephone',
	fullscreen: 'true',
	config: {
	layout: 'vbox',
		items: [
			{
				xtype: 'titlebar',
				title: 'Prähospitalzeitberechnung',
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