<template>
	<div class="wrapper page-settings">
		<form>
			<div class="form-group row">
				<label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
				<div class="col-sm-10">
					<input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com">
				</div>
			</div>
			<div class="form-group row">
				<label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
				<div class="col-sm-10">
					<input type="password" class="form-control" id="inputPassword" placeholder="Password">
				</div>
			</div>

			<div class="form-group row">
				<label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
				<div class="custom-control custom-switch">
					<input type="checkbox" class="custom-control-input" id="customSwitch1">
					<label class="custom-control-label" for="customSwitch1">Toggle this switch element</label>
				</div>
			</div>

			<div class="form-group row">
				<label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
				<div class="custom-control custom-switch">
					<input type="checkbox" class="custom-control-input" id="customSwitch1">
					<label class="custom-control-label" for="customSwitch1">Toggle this switch element</label>
				</div>
			</div>

			<div class="form-group row">
				<label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
				<div class="custom-control custom-switch">
					<input type="checkbox" class="custom-control-input" id="customSwitch1">
					<label class="custom-control-label" for="customSwitch1">Toggle this switch element</label>
				</div>
			</div>

			<div class="form-group row">
				<label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
				<div class="custom-control custom-switch">
					<input type="checkbox" class="custom-control-input" id="customSwitch1">
					<label class="custom-control-label" for="customSwitch1">Toggle this switch element</label>
				</div>
			</div>

			<div class="form-group row">
				<label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
				<div class="custom-control custom-switch">
					<input type="checkbox" class="custom-control-input" id="customSwitch1">
					<label class="custom-control-label" for="customSwitch1">Toggle this switch element</label>
				</div>
			</div>

			<div class="form-group row">
				<label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
				<div class="custom-control custom-switch">
					<input type="checkbox" class="custom-control-input" id="customSwitch1">
					<label class="custom-control-label" for="customSwitch1">Toggle this switch element</label>
				</div>
			</div>

			<div class="form-group row">
				<label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
				<div class="custom-control custom-switch">
					<input type="checkbox" class="custom-control-input" id="customSwitch1">
					<label class="custom-control-label" for="customSwitch1">Toggle this switch element</label>
				</div>
			</div>

			<div class="form-group row">
				<label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
				<div class="custom-control custom-switch">
					<input type="checkbox" class="custom-control-input" id="customSwitch1">
					<label class="custom-control-label" for="customSwitch1">Toggle this switch element</label>
				</div>
			</div>
			<div>
				<label for="customRange3">Example range</label>
				<input type="range" value="3" class="custom-range" min="0" max="5" step="0.5" id="customRange3">
			</div>




			<ul class="list-group">
				<li class="list-group-item d-flex justify-content-between align-items-center">
					Cras justo odio
					<div class="custom-control custom-switch">
						<input type="checkbox" class="custom-control-input" id="customSwitch-list1">
						<label class="custom-control-label" for="customSwitch-list1"></label>
					</div>
				</li>
				<li class="list-group-item d-flex justify-content-between align-items-center">
					Dapibus ac facilisis in
					<div class="custom-control custom-switch">
						<input type="checkbox" class="custom-control-input" id="customSwitchlist-2">
						<label class="custom-control-label" for="customSwitchlist-2"></label>
					</div>
				</li>
				<li class="list-group-item d-flex justify-content-between align-items-center">
					Morbi leo risus
					<div class="custom-control custom-switch">
						<input type="checkbox" class="custom-control-input" id="customSwitch-list3">
						<label class="custom-control-label" for="customSwitch-list3"></label>
					</div>
				</li>
			</ul>
		</form>
	</div>
</template>

<script>

  export default {
    name: 'settings',
    components: {

    },
	  data() {
		  return {

		  }
	  },
    methods: {
      // open(link) {
      // this.link = link;
      // require('electron').shell.openExternal(link);
      // },
    },
  };
</script>