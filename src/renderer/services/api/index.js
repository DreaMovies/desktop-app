/**
 * The file enables `@/store/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */

const files = require.context('.', false, /\.js$/);
const modules = {};

files.keys().forEach(key => {
	if (key === './index.js' || key === './example.js') return;
	modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default;
	modules[key.replace(/(\.\/|\.js)/g, '')].id = key;
	modules[key.replace(/(\.\/|\.js)/g, '')].active = true;
});

export default modules;
