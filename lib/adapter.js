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

		create: function(connectionName, collectionName, data, cb) {
			connection.create({
				index: collectionName,
				type: 'testtype',
				body: data
			}, function(error, response) {
				if(error) {
					console.log('An error has occurred indexing your content, sorry!' + error);
					throw error;
				}
				else {
					cb(null, response);
				}
			});
		},

		find: function(connectionName, collectionName, options, cb) {
			connection.search({
				index: collectionName,
				q: 'first_name:foo'
			}, function(error, response) {
				if(error) {
					console.log('An error has occurred searching for your query, sorry!' + error);
					throw error;
				}
				else {
					console.log(response);
					cb(null, response);
				}
			});
		}
	};
})();