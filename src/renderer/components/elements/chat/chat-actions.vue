<template>
	<div class="chat-actions">
		<i class="fas fa-film"></i>
		<i class="fa fa-video"></i>
		<i class="fa fa-phone"></i>
		<i class="fa fa-star"></i>
	</div> <!-- end chat-header -->
</template>

<script>
	export default {
		name: "chat-actions",
		components: {},
		data(){
			return{
				constraints: {
					video: {
						mandatory: {
							minWidth: 640,
							minHeight: 360
						}
					}
				},
			};
		},
		methods: {
			getCamera() {
				function successCallback(stream) {
					var video = document.querySelector("video");
					video.src = window.URL.createObjectURL(stream);
				}

				function errorCallback(error) {
					console.log("navigator.getUserMedia error: ", error);
				}
			},
			}
		}
</script>

<style scoped>

</style>