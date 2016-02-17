Ext.define("anwendung.view.phone.Liste", {
	extend: "Ext.Container",
	requires: [
	'Ext.field.Search',
	'Ext.dataview.List'
	],
	xtype: "listepage",
	
	config: {
		layout: {
            type: 'fit'
        },		
		items: [
			{
				xtype: 'toolbar',
				docked: 'top',
				items: [					
					{
						xtype: 'spacer'
					},
					{
						xtype: 'searchfield',
						docked: 'top',
						id: 'suche',
						placeHolder: ' Suche Standort'
					},
					{
						xtype: 'spacer'
					}					
				]
			},
			{
				xtype: "list",
				id: 'standortliste',
				styleHtmlContent: true,
				store: 'name_einrichtungs',
				itemTpl: '<div class=\"list-item-title\">{station}</div><div class=\"list-item-narrative\">{plz} {stadt}</div>'
			}
		]		
	}
});