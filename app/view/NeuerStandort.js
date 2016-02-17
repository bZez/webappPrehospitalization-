Ext.define("anwendung.view.NeuerStandort", {
	extend: "Ext.form.Panel",
	requires: [
		'Ext.form.FieldSet',
		'Ext.field.Select',
		'Ext.field.Number',
		'Ext.field.Email'
	],
	xtype: "neuerstandortpage",
	id: 'neuerstandort',
	alias: 'widget.neuerstandort',
	
	config: {
		styleHtmlContent: true,
		title: 'Neuer Standort',
		width: '70%',
		items: [
			{
				html: 'Neuen Standort anlegen',
			},
			{
				xtype: 'fieldset',
				tilte: 'Neuer Standort',
				instructions: 'Felder mit * müssen ausgefüllt werden',
				
				items: [
					{
						xtype: 'selectfield',
						label: 'Art des Standorts',
						id: 'standortwahl',
						options: [
							{text: 'Wähle Standortart'},
							{text: 'Stroke Unit',  value: 'first'},
							{text: 'Traumazentrum', value: 'second'},
							{text: 'PTCA',  value: 'third'},
							{text: 'Rettungswache',  value: 'fourth'},
							{text: 'Luftrettungsstation',  value: 'fifth'}
						]
					}	
				]
			}
		]
	}
});