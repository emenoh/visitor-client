Package.describe({
	name: 'emenoh:visitor-client',
	version: '0.0.2',
	summary: 'Client-side infrastructure for tracking visitors to your site.',
	git: 'https://github.com/emenoh/visitor-client/',
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
		, 'underscore'
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
