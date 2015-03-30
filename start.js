var child = require('child_process');
var Promise = require('bluebird');
module.exports = function(){
	/*function bower(){
		child.exec('bower install', function(error, stdout, stderr){
			if(error !== null){
				return Promise.reject(error);
			}
			if(stdout){
				return Promise.resolve(stdout);
			}
			return Promise.reject(stderr);
		})
	}
	function grunt(){
		child.exec('grunt init', function(error, stdout, stderr){
			if(error !== null){
				return Promise.reject(error);
			}
			if(stdout){
				return Promise.resolve(stdout);
			}
			return Promise.reject(stderr);
		})
	}*/
	function bower(){
		return new Promise(function(resolve, reject){
			child.exec('bower install', function(error, stdout, stderr){
				if(error !== null){
					return reject(error);
				}
				if(stderr){
					return reject(stderr);
				}
				return resolve(stdout);
			})
		})

	}
	function grunt(){
		return new Promise(function(resolve, reject){
			child.exec('grunt init', function(error, stdout, stderr){
				if(error !== null){
					return reject(error);
				}
				if(stderr){
					return reject(stderr);
				}
				return resolve(stdout);
			})
		})
	}

	return new Promise(function(resolve, reject){
		bower().then(function(){
			return grunt()
		}).then(function(stdout){
					resolve(stdout);
				})
				.catch(function(err){
					reject(err);
				})
	});

}