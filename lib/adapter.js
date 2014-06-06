/*---------------------------------------------------------------
  :: sails-neo4j
  -> adapter
---------------------------------------------------------------*/

var elastic = require('./connection');
var _ = require('underscore');

var adapter = module.exports = (function() {

		// Track schema internally, false since Elastic Search is schemaless (sorta)
		var syncable = false,
		connection,

		// Default adapter config
		defaults = {
			protocol: 'http://',
			port: 9200,
			host: 'localhost',
			debug: false,
			index: 'default'
		};

		connection = elastic.connect(defaults);

		function getConnection() {
			return elastic.connect(defaults);
		}

	return {
		syncable: syncable,
		defaults: defaults,
		getConnection: getConnection,

		create: function(connectionName, collectionName, data, cb) {
			connection.create({
				index: defaults.index,
				type: collectionName,
				body: data
			}, function(error, response) {
				if(error) {
					console.log('An error has occurred indexing your content, sorry!' + error);
					cb(error, null);
				}
				else {
					id = response._id;
					results = _.extend(data, id);
					cb(null, results);
				}
			});
		},

		find: function(connectionName, collectionName, options, cb) {
			connection.search({
				index: defaults.index,
				q: 'first_name:foo'
			}, function(error, response) {
				if(error) {
					console.log('An error has occurred searching for your query, sorry!' + error);
					throw error;
				}
				else {
					cb(null, response);
				}
			});
		}
	};
})();