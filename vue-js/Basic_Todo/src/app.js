import Vue from 'vue';

new Vue({
  el: '#tasks',
  data: {
    tasks: [
      { 
      	body: 'Learn JavaScriptsdasdasd', 
      	completed: false 
      }
    ],
    newTask: ''
  },

  filters: {
  	inProcess: function(tasks) {
  		return tasks.filter(task => !task.completed);
  	},
    reverseString: function(val) {
      return val.split('').reverse().join('');
    }
  },

  computed: {
  	completions: function(tasks) {
  		return this.tasks.filter(task => task.completed);
  	},
  	remaining: function(tasks) {
  		return this.tasks.filter(task => !task.completed);
  	}
  },

  methods: {
  	addTask: function(e) {
  		e.preventDefault();

      if( !this.newTask ) {
        return;
      }

  		this.tasks.push({ 
  			body: this.newTask, 
  			completed: false 
  		});
  		this.newTask = ''
  	},

  	editTask: function(task) {
  		//remove the task
  		this.removeTask(task);
  		//update the newTask input
  		this.newTask = task.body;
  		//focus the newTask input
  		this.$els.newTaskInput.focus();
  	},

  	toggleTaskCompletion: function(task) {
  		task.completed = !task.completed;
	 	},

	 	completeAll: function(e) {
      e.preventDefault();
	 		this.tasks.map(task => task.completed = true);
	 	},

    clearComputed: function() {
      this.tasks = this.tasks.filter(task => !task.completed);
    },

  	removeTask: function(task) {
  		// $remove is like javascript `slice()`
  		this.tasks.$remove(task);
  	}
  }
})