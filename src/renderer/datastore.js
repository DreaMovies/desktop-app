import Datastore from 'nedb';
import path from 'path';
import { remote } from 'electron';
import {version} from './../../package.json';
/* Docs: https://github.com/louischatriot/nedb */

const cache = new Datastore({
	autoload: true,
	filename: path.join(remote.app.getPath('userData'), '/db/cache.db')
});

const downloads = new Datastore({
	autoload: true,
	filename: path.join(remote.app.getPath('userData'), '/db/downloads.db')
});

const settings = {
	db: null,
	load() {
		console.log("[DB] Settings Loading");
		this.db = new Datastore({
			autoload: true,
			filename: path.join(remote.app.getPath('userData'), '/db/settings.db')
		});
		this.validate();
	},
	validate() {
		const Self = this;
		// Count all documents in the datastore
		this.db.count({}, function (err, count) {
			console.log("[DB] Settings count: " + count);
			if (count == 0) {
				const doc = {
					startApp: "home",
					downloads: {
						folder: "",
						maxDownloads: 3,
						maxUploads: 3,
						seed: true
					},
					locale: 'en',
					plugins: {},
					installed: new Date(),
					updated: "",
					version: version
				};

				Self.db.insert(doc, function (err, newDoc) {   // Callback is optional
					// newDoc is the newly inserted document, including its _id
					// newDoc has no key called notToBeSaved since its value was undefined
					console.log("[DB] Settings created");
				});
			}
		});
	},
	findOne(db, opt) {
		return new Promise(function(resolve, reject) {
			db.findOne(opt, function(err, doc) {
				if (err) {
					reject(err)
				} else {
					resolve(doc)
				}
			})
		})
	},
	get(){
		const Self = this;
		return new Promise(function(resolve, reject) {
			Self.db.find({}, function(err, doc) {
				if (err) {
					reject(err);
				} else {
					resolve(doc);
				}
			})
		})
	},
	update(data){
		// $pull removes all values matching a value or even any NeDB query from the array
		this.db.update({}, { $pull: { data } }, {}, function () {
			console.log("[DB] Update Fields");
			// Now the fruits array is ['orange', 'pear']
		});
	},
	delete(data){
		// Removing all documents with the 'match-all' query
		this.db.remove({}, { multi: true }, function (err, numRemoved) {

		});
	}
};
export { cache, downloads, settings };