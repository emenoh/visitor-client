// Goal is to provide a base to track anonymous and logged in visitor activity
// in a standardized manner.

var dependency = new Tracker.Dependency
	, identifyMethod = 'visitor.identify'
	, visitorSubscription = 'visitor.visitor'
	, defaultStorageKey = 'visitor.id'
	, defaultCollectionName = 'visitor.visitors'
	, collection
	, connection;

Visitor = {
	init: function(options){
		options = _.defaults(options || {}, {
			collection: defaultCollectionName
			, connection: Meteor.connection
		});

		connection = options.connection;
		this.localStorageKey = options.localStorageKey || defaultStorageKey;

		collection = new Mongo.Collection(options.collection, {
			connection: options.connection
		});

		this._register();

		if(options.subscribe){
			connection.subscribe(visitorSubscription, this.id());
		}
	}
	, id: function () {
		dependency.depend();
		return amplify.store(this.localStorageKey);
	}
	, current: function () {
		return collection.findOne({visitorId: this.id()});
	}
	, _register: function () {
		var visitorId = this.id();
		if(!visitorId){
			visitorId = Random.id();
			amplify.store(this.localStorageKey, visitorId);
			connection.call(identifyMethod, {
				visitorId: visitorId
				, userId: Meteor.userId()
				, createdAt: new Date()
				, startPage: window.location.href
			}, function(err){
				if(err && typeof console != 'undefined'){
					console.error(err);
				}
			});
			dependency.changed();
		}else{
			connection.call(identifyMethod, {
				visitorId: visitorId
				, userId: Meteor.userId()
				, lastSeen: new Date()
				, lastSeenOnPage: window.location.href
			}, function(err){
				if(err && typeof console != 'undefined'){
					console.error(err);
				}
			});
		}
	}
};