'use strict';

function checkStorageSupport() {
	try {
		sessionStorage.setItem('ftNextStorageTest', 'ftNextStorageTest');
		sessionStorage.removeItem('ftNextStorageTest');
		localStorage.setItem('ftNextStorageTest', 'ftNextStorageTest');
		localStorage.removeItem('ftNextStorageTest');
		return true;
	} catch (e) {
		return false;
	}
}

module.exports = checkStorageSupport();
