<template>
	<div class="explorer-sidebar">
		<h5>Show:</h5>
		<a href="#" class="file-control active">All</a>
		<a href="#" class="file-control">Documents</a>
		<a href="#" class="file-control">Audio</a>
		<a href="#" class="file-control">Images</a>

		<div class="btn-group btn-group-toggle" data-toggle="buttons">
			<label class="btn btn-secondary" @click="toggleView">
				<input type="radio" name="options" id="option1" autocomplete="off" value="grid" v-model="view"><i class="fas fa-th"></i>
			</label>
			<label class="btn btn-secondary" @click="toggleView">
				<input type="radio" name="options" id="option2" autocomplete="off" value="list" v-model="view"><i class="fas fa-list"></i>
			</label>
		</div>

		<div class="hr-line-dashed"></div>

		<h5>Folders</h5>
		<ul class="folder-list">
			<li><a href="#"><i class="fa fa-folder"></i> Files</a></li>
			<li><a href="#"><i class="fa fa-folder"></i> Pictures</a></li>
			<li><a href="#"><i class="fa fa-folder"></i> Web pages</a></li>
			<li><a href="#"><i class="fa fa-folder"></i> Illustrations</a></li>
			<li><a href="#"><i class="fa fa-folder"></i> Films</a></li>
			<li><a href="#"><i class="fa fa-folder"></i> Books</a></li>
		</ul>
		<h5 class="tag-title">Tags</h5>
		<ul class="tag-list">
			<li><a href="#">Family</a></li>
			<li><a href="#">Work</a></li>
			<li><a href="#">Home</a></li>
			<li><a href="#">Children</a></li>
			<li><a href="#">Holidays</a></li>
			<li><a href="#">Music</a></li>
			<li><a href="#">Photography</a></li>
			<li><a href="#">Film</a></li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: "explorer-sidebar",
		data() {
			return {
				view: "list", //"list" or "grid"
			}
		},
		methods: {
			toggleView(){

			}
		}
	}
</script>