export default {

	filterCurrentFiles ({ currentTarget: { value }}) {
		if (!value) {
			this.files = this.tmpFiles
		} else {
			this.files = this.files.filter((file) => file.name.indexOf(value) > -1)
		}
	}
}