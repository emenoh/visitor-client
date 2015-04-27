Package.describe({
	name: 'useful:visitor-client',
	version: '0.0.1',
	summary: 'Client-side infrastructure for tracking visitors to your site.',
	git: '',
	documentation: 'README.md'
});

Package.onUse(function(api) {

	api.versionsFrom('1.1');

	// ====== BUILT-IN PACKAGES =======

	api.use([
		'amplify@1.0.0'
		, 'tracker'
		, 'random'
		, 'accounts-base'
		, 'mongo'
		, 'templating'
	], 'client');

	// ====== 3RD PARTY PACKAGES =======

	// ====== BOTH =======

	// ====== SERVER =======

	// ====== CLIENT =======

	api.addFiles([
		'client/lib/visitor.js'
		, 'client/lib/meteorExtensions.js'
		, 'client/views/helpers.js'
	], 'client');

	// ====== EXPORTS =======

	api.export('Visitor');
});

Package.onTest(function(api) {
	api.use('tinytest');
});
