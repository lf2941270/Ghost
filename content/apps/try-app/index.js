var App = require('ghost-app'),
		MyApp;

MyApp = App.extend({
	install: function () {
		console.log('install')
	},
	uninstall: function () {
		console.log('uninstall')
	},
	activate: function () {
		console.log('activate');
		console.log(this.app);
		this.app.api.posts.read().then(function(post){
			console.log(post);
		});
	},
	deactivate: function () {
		console.log('deactivate')
	},
	filters: {
		ghost_head: 'handleGhostHead',
		ghost_foot: [9, 'handleGhostFoot']
	},
	handleGhostHead: function () {
		console.log('handleGhostHead');
	},
	handleGhostFoot: function () {
		console.log('handleGhostFoot');
	}
});

module.exports = MyApp;