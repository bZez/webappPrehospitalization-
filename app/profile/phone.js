Ext.define('anwendung.profile.Phone', {
    extend: 'Ext.app.Profile',

    config: {
        name: 'Phone',
        views: [
			'Main'
		]
    },

    isActive: function() {
        return Ext.os.is('Phone');
    },
	// launch: function() {
        // Ext.create('anwendung.view.phone.Main');
		// console.log('Phone');
    // }
});