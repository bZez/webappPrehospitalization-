Ext.define('anwendung.profile.Desktop', {
    extend: 'Ext.app.Profile',

    config: {
        name: 'Desktop',
        views: 'Main',
       // models: ['Mail.model.Message']
    },

    isActive: function() {
        return Ext.os.is('Desktop');
		
    },
	// launch: function() {
        // Ext.create('anwendung.view.desktop.Main');
		// console.log('Desktop');
    // }
});