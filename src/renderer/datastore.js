import Datastore from 'nedb';
import path from 'path';
import { remote } from 'electron';

export const cache = new Datastore({
	autoload: true,
	filename: path.join(remote.app.getPath('userData'), '/cache.db')
})

export const downloads = new Datastore({
	autoload: true,
	filename: path.join(remote.app.getPath('userData'), '/downloads.db')
})

export const settings = new Datastore({
	autoload: true,
	filename: path.join(remote.app.getPath('userData'), '/settings.db')
})