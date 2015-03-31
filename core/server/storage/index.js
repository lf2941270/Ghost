/*
var errors  = require('../errors'),
    config  = require('../config'),
    storage = {};

function getStorage(storageChoice) {
    var storagePath,
        storageConfig;

    storageChoice = config.storage.active;
    storagePath = config.paths.storage;
    storageConfig = config.storage[storageChoice];

    if (storage[storageChoice]) {
        return storage[storageChoice];
    }

    try {
        // TODO: determine if storage has all the necessary methods.
        storage[storageChoice] = require(storagePath);
    } catch (e) {
        errors.logError(e);
    }

    // Instantiate and cache the storage module instance.
    storage[storageChoice] = new storage[storageChoice](storageConfig);

    return storage[storageChoice];
}

module.exports.getStorage = getStorage;
*/


var errors = require('../errors'),
		config  = require('../config'),
		storage = {};

var qiniuConfig  = require('../config').qiniu;

function get_storage(storageChoice) {
	// TODO: this is where the check for storage apps should go
	// Local file system is the default
	var storageChoice;
	var storagePath,
			storageConfig;

	storageChoice = 'qiniu';
	storagePath = config.paths.storage;
	storageConfig = config.storage[storageChoice];

	if (storage[storageChoice]) {
		return storage[storageChoice];
	}
	try {
		// TODO: determine if storage has all the necessary methods
//		storage[storageChoice] = require(storagePath);
		storage[storageChoice] = require('./' + storageChoice);
	} catch (e) {
		errors.logError(e);
	}
	storage[storageChoice] = new storage[storageChoice](storageConfig);
	return storage[storageChoice];
}
module.exports.getStorage = get_storage;