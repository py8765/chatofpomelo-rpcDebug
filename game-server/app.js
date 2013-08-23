var pomelo = require('pomelo');
var routeUtil = require('./app/util/routeUtil');
/**
 * Init app for client.
 */
var app = pomelo.createApp();
app.set('name', 'chatofpomelo');

app.configure('production|development', 'connector', function(){
	app.set('connectorConfig',
		{
			connector : pomelo.connectors.sioconnector
		});
});


// app configure
app.configure('production|development', function() {
	// route configures
	app.route('chat', routeUtil.chat);

	// enable rpc debug log
  app.enable('rpcDebugLog');
	app.enable('systemMonitor');

	// register rpcDebuger module
	var rpcDebuger = require('./app/modules/rpcDebug');
	app.registerAdmin(rpcDebuger, {app: app});

	app.set('proxyConfig', {
		cacheMsg: true,
		interval: 30,
		lazyConnection: true,
		enableRpcLog: true
	});

	// filter configures
	app.filter(pomelo.timeout());
});

// start app
app.start();

process.on('uncaughtException', function(err) {
	console.error(' Caught exception: ' + err.stack);
});