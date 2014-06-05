/*---------------------------------------------------------------
  :: sails-neo4j
  -> adapter
---------------------------------------------------------------*/

var elastic = require('./connection');

module.exports = (function() {
	var adapter = {
		syncable: false,
		identity: 'sails-elasticsearch',
		defaults: {
			protocol: 'http://',
			port: 9200,
			host: 'localhost',
			debug: false
		}
	};

	return adapter;
})();