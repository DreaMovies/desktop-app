<template>
	<div class="explorer-list">
		<nav aria-label="breadcrumb">
			<ol class="breadcrumb">
				<li v-for="item in breadcrumb"
				    :class="'breadcrumb-item ' + (item.active ? 'active' : '')">
					<a href="#" @click="changeFolder(item.path)">{{ item.label }}</a>
				</li>
			</ol>
		</nav>
		<table class="table table-hover table-bordered">
			<thead class="thead-light">
				<tr>
					<th scope="col"></th>
					<th scope="col">Name</th>
					<th scope="col">Type</th>
					<th scope="col">Size</th>
					<th scope="col">Info</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="file in files" :key="file.name" @dblclick="openItem(file)">
					<th scope="row" class="text-center">
						<i v-if="file.type == 'folder'" class="far fa-folder"></i>
						<i v-else-if="file.type == 'archive'" class="far fa-file-archive"></i>
						<i v-else-if="file.type == 'text'" class="far fa-file-alt"></i>
						<i v-else-if="file.type == 'image'" class="far fa-file-image"></i>
						<i v-else-if="file.type == 'pdf'" class="far fa-pdf"></i>
						<i v-else-if="file.type == 'code'" class="far fa-file-code"></i>
						<i v-else-if="file.type == 'word'" class="far fa-file-word"></i>
						<i v-else-if="file.type == 'powerpoint'" class="far fa-file-powerpoint"></i>
						<i v-else-if="file.type == 'video'" class="far fa-file-video"></i>
						<i v-else-if="file.type == 'audio'" class="far fa-file-audio"></i>
						<i v-else-if="file.type == 'torrent'" class="far fa-file-download"></i>
					</th>
					<td>{{ file.name }}</td>
					<td>{{ file.type }}</td>
					<td>{{ file.size }}</td>
					<th><i class="fas fa-info-circle"></i></th>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	import fs   from 'fs';
	import path from 'path';
	import info from "../../../services/utils/info";

	export default {
		name: "explorer-list",
		data() {
			return {
				files: [],
				tmpFiles: [],
				fileContent: null,
				breadcrumb: [],
				currentPath: process.cwd(),
			}
		},
		created() {
			this.readFolder();
		},
		methods: {
			changeFolder(newPath){
				this.currentPath = newPath;
				this.readFolder();
			},
			openItem(file){
				console.log(file);
				if(file.isFolder){
					this.changeFolder(file.path);
				} else {
					this.openFile(file);
				}
			},

			openFile(file){
				if(file.type == "video"){
					this.$router.push({
							name: 'player',
							params: {
								detail: {
									type: 'movie',
									plugin: "local",
									imdb_code: "",
									id: ""
								},
								title: file.name,
								path: file.path,
								ext: file.extra.ext,
								type: 'local'
							}
						});
				}
			},

			getBreadcrumbs(){
				let split_path = this.currentPath;

				if(split_path.split('/').length == 1){
					if(split_path.substr(split_path.length - 1) != '\\'){
						split_path = split_path + '\\';
					}
					split_path = split_path.split('\\');
				} else {
					if(split_path.substr(split_path.length - 1) != '/'){
						split_path = split_path + '/';
					}
					split_path = split_path.split('/');
				}
				const path_length = split_path.length;
				let conc_link = "";

				this.breadcrumb = [];
				for (let i = 0; i < path_length - 1; i++) {
					conc_link +=  split_path[i] + "/";
					this.breadcrumb.push({
						label: split_path[i],
						path: conc_link,
						active: (i < path_length - 2 ? false : true)
					});
				}
			},
			readFolder() {
				const Self = this;
				let realPath = path.resolve(this.currentPath).replace(/\\/g, '/') + '/';
				this.getBreadcrumbs();

				fs.readdir(realPath, (err, files) => {
					if (err) throw  err;
					Self.files = [];
					for (let file of files) {
						fs.stat(realPath + file, (err, stats) => {
							if (err) throw err;
							let fullPath = realPath + file;
							//{ type: "", name: "", year: "", quality: "", season: "", episode: "" };
							let element_details = info.fileInfo(file, stats.isDirectory(), fullPath, false);

							if (stats.isDirectory()) {
								fullPath += '/';
							}
							Self.files.push({
								isFolder: stats.isDirectory(),
								path: fullPath,
								name: file,
								type: element_details.ext,
								size: (stats.isDirectory() ? '' : info.humanFileSize(stats.size, true)),
								dates: {
									accessed: stats.atime,
									created: stats.ctime,
									modified: stats.mtime
								},
								subsPath: fullPath.substr(0, fullPath.lastIndexOf('/')) + '/',
								extra: element_details
							});
						});
					}
				});
			},
		},
	}
</script>