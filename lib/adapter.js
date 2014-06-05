/*---------------------------------------------------------------
  :: sails-neo4j
  -> adapter
---------------------------------------------------------------*/

var elastic = require('./connection');

var adapter = module.exports = (function() {

		// Track schema internally, false since Elastic Search is schemaless (sorta)
		var syncable = false,
		connection,

		// Default adapter config
		defaults = {
			protocol: 'http://',
			port: 9200,
			host: 'localhost',
			debug: false
		};

		connection = elastic.connect(defaults);

		function query(params, cb) {

		}

		function getConnection() {
			return elastic.connect(defaults);
		}

	return {
		syncable: syncable,
		defaults: defaults,
		getConnection: getConnection,
		query: query,

		create: function(collectionName, params, cb) {

		}
	};
})();