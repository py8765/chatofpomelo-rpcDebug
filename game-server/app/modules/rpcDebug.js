var MongoClient = require('../util/mongoUtil');

module.exports = function(opts) {
	return new Module(opts);
};

module.exports.moduleId = 'rpcDebug';

var Module = function(opts) {
	opts = opts || {};
};

Module.prototype.clientHandler = function(agent, msg, cb) {
	var mongoClient = new MongoClient({
		database: 'test',
		collection: 'dpomelo'
	});
	mongoClient.init(function(err) {
		if(err) {
			console.error('mongo init error');
		}
		mongoClient.findToArray(msg.limit, function(err, objs) {
			cb(err, objs);
		});
	});
	
};
