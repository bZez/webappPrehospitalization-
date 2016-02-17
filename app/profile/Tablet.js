Ext.define('anwendung.profile.Tablet', {
    extend: 'Ext.app.Profile',

    config: {
        name: 'Tablet',
        views: 'Main'
    },

    isActive: function() {
        return Ext.os.is('Tablet');	
    }
});