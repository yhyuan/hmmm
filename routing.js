Router.configure({
	layoutTemplate: 'layout',
	notFoundTemplate: 'notFound',
	loadingTemplate: 'loading',
});

webpagename = 'Openki - Course Organisation Platform - '  // global (document title init)

Router.map(function () {
	this.route('locationDetails',{							///////// locationdetails /////////
		path: 'locations/:_id',
		template: 'location_details',
		waitOn: function () {
			return Meteor.subscribe('locations');
		},
		data: function () {
			return Locations.findOne({_id: this.params._id})
		},
		onAfterAction: function() {
			var location = Locations.findOne({_id: this.params._id})
			if (!location) return; // wtf
			document.title = webpagename + 'Location: ' + location.name
		}
	})


	this.route('categorylist',{
		onAfterAction: function() {
			document.title = webpagename + 'Category list'
		}
	})


	this.route('pages', {									///////// static /////////
		path: 'page/:page_name',
		action: function() {
			this.render(this.params.page_name)
		},
		onAfterAction: function() {
			document.title = webpagename + '' + this.params.page_name
		}
	})

	this.route('proposeCourse', {							///////// propose /////////
		path: 'courses/propose',
		template: 'proposecourse',
		onAfterAction: function() {
			document.title = webpagename + 'Propose new course'
		}
	})

	this.route('createCourse', {							///////// create /////////
		path: 'courses/create',
		template: 'createcourse',
		onAfterAction: function() {
			document.title = webpagename + 'Create new course'
		}
	})

});


Router.map(function () {
	this.route('showEvent', {
		path: 'event/:_id',
		template: 'eventPage',
		waitOn: function () {
			var subs = [
				Meteor.subscribe('event', this.params._id)
			]
			var courseId = this.params.query.courseId;
			if (courseId) {
				subs.push(Meteor.subscribe('courseDetails', courseId));
			}
			return subs;
		},
		data: function () {
			var event;
			var create = 'create' == this.params._id;
			if (create) {
				var propose = moment().add(1, 'week').startOf('hour');
				event = {
					new: true,
					startdate: propose.toDate(),
					enddate: moment(propose).add(2, 'hour').toDate(),
				};
				var course = Courses.findOne(this.params.query.courseId);
				if (course) {
					event.title = course.name,
					event.course_id = course._id;
				}
			} else {
				event = Events.findOne({_id: this.params._id});
				if (!event) return {};
			}
			
			return event;
		}
	})
});
