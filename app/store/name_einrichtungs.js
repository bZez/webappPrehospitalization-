Ext.define('anwendung.store.name_einrichtungs', {
  extend: 'Ext.data.Store', // TreeStore wenn NestedList
  config: {
		model: 'anwendung.model.name_einrichtung',
		sorters: 'station',
		groupField: 'art',
		grouper: {
			groupFn: function(record) {
				return record.get('station').substr(0, 1);
			},
			sortProperty: 'station'
		}
	}
});