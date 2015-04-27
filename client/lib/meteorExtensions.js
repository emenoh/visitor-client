Meteor.visitorId = function(){
	return Visitor.id();
};

Meteor.visitor = function () {
	return Visitor.current();
};