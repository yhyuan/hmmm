Router.configure({
	layoutTemplate: 'layout',
	notFoundTemplate: 'notFound',
	loadingTemplate: 'loading'
});

Router.map(function () {							///////// startpage /////////
	this.route('home', {
		path: '/',
		template: 'start'
	})

	this.route('showCourse', {						///////// coursedetails /////////
		path: 'course/:_id',
		template: 'coursedetails',
		waitOn: function () {
			return [
				Meteor.subscribe('courses')
			]
		},
		data: function () {
			return Courses.findOne({_id: this.params._id})
		},
		unload: function () {
			Session.set("isEditing", false);
		}
	})

	this.route('locations',{								///////// locations /////////
		path: 'locations',
		template: 'locationlist',
	})

	this.route('categorylist')								///////// categories /////////


	this.route('pages', {									///////// static /////////
		path: 'page/:page_name',
		action: function() {
			this.render(this.params.page_name)
		}
	})

	this.route('proposeCourse', {							///////// propose /////////
		path: 'courses/propose',
		template: 'proposecourse',
		waitOn: function () {
			return Meteor.subscribe('categories');
		},
	})

	this.route('createCourse', {							///////// create /////////
		path: 'courses/create',
		template: 'createcourse',
		waitOn: function () {
			return Meteor.subscribe('categories');
		},
	})

	this.route('userprofile', {								///////// userprofile /////////
		path: 'user/:_id',
		waitOn: function () {
			return Meteor.subscribe('users');
		},
		data: function () {
			return Meteor.users.findOne({_id: this.params._id})
		}
	})

		this.route('calendar')

})