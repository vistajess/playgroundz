new Vue({
	el: '#demo',
	data: {
		search: '',
		sortKey: '',
		order: 1,
		columns: ['name','age'],
		people: [
						{ name: "John", age: 21},
						{ name: "Karen", age: 18},
						{ name: "Jess", age: 25},
						{ name: "Angel", age: 21},
						{ name: "Monica", age: 29},
						{ name: "Ghie", age: 26},
						{ name: "Martin", age: 32}
		]
	},

	methods: {
		sortBy: function(sortKey) {
			// `-1` is the descending order while `1` is the ascending
			this.order = this.order * -1;
			this.sortKey = sortKey;
		}
	}
});


// You can make global filters
Vue.filter('reverse', function(value, wordsOnly) {
	var separator = wordsOnly ? ' ' : '';
	return value.split(separator).reverse().join(separator); 
});
new Vue({
	el: '#customFilters',
	data: {
		message: 'Hello World'
	}
});
new Vue({
	el: '#customFilters2',
	data: {
		message: 'Hello Again'
	}
});

new Vue({
	el: '#customFilters3',
	data: {
		gender: 'all',
		people: [
						{ name: "John", gender: 'male'},
						{ name: "Karen", gender: 'female'},
						{ name: "Jess", gender: 'male'},
						{ name: "Angel", gender: 'female'},
						{ name: "Monica", gender: 'female'},
						{ name: "Ghie", gender: 'female'},
						{ name: "Martin", gender: 'male'}
		]
	},
	filters: {
		gender: function(people) {
			return this.gender === 'all'
			  ? people
				: people.filter(function(person){ return person.gender === this.gender }.bind(this));
		}
	}
})
