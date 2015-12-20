'use strict';

/**
 * Smart Reception System
 * @author Jasim
 * @company E-Gov LLC
 * @class RouteStore
 * @singleton
 * @store
 */
var RouteStore = module.exports = {
	
	/**
	 * Collection of routes
	 */
	routes: {},
	
	/**
	 * Adds new route to the route stack
	 * @param {String} name
	 * @param {Object} route
	 * @return {Void} undefined
	 */
	add: function(name, route) {
	 	name = name.toUpperCase().replace(/\s/gi, "_");
		if(!this.routes[name]) {
			Object.assign(route, { id: name });
			this.routes[name] = route;
		}
	},
	
	/**
	 * Removes a route from store
	 * @param {String} name
	 * @return {Void} undefined
	 */
	remove: function(name) {
		name = name.toUpperCase().replace(/\s/gi, "_");
		if(this.routes[name]) {
			delete this.routes[name];
		}	
	},
	
	/**
	 * Get a route object from store's route collection
	 * @param {String} name
	 * @return {Object} route
	 */
	get: function(name) {
		name = name.toUpperCase().replace(/\s/gi, "_");
		return this.routes[name];
	}
};