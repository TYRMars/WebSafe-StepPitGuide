const mysql = require('mysql');
exports.getConnection = function(){
	let connection = mysql.createConnection({
		host: 'localhost',
		database: 'imooc_safety',
		user: 'root',
		password: '123456'
	});
	connection.connect();
	return connection;
};
