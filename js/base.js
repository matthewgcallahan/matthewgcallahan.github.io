(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function( factory ) {
	if (typeof define !== 'undefined' && define.amd) {
		define([], factory);
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = factory();
	} else {
		window.scrollMonitor = factory();
	}
})(function() {

	var scrollTop = function() {
		return window.pageYOffset ||
			(document.documentElement && document.documentElement.scrollTop) ||
			document.body.scrollTop;
	};

	var exports = {};

	var watchers = [];

	var VISIBILITYCHANGE = 'visibilityChange';
	var ENTERVIEWPORT = 'enterViewport';
	var FULLYENTERVIEWPORT = 'fullyEnterViewport';
	var EXITVIEWPORT = 'exitViewport';
	var PARTIALLYEXITVIEWPORT = 'partiallyExitViewport';
	var LOCATIONCHANGE = 'locationChange';
	var STATECHANGE = 'stateChange';

	var eventTypes = [
		VISIBILITYCHANGE,
		ENTERVIEWPORT,
		FULLYENTERVIEWPORT,
		EXITVIEWPORT,
		PARTIALLYEXITVIEWPORT,
		LOCATIONCHANGE,
		STATECHANGE
	];

	var defaultOffsets = {top: 0, bottom: 0};

	var getViewportHeight = function() {
		return window.innerHeight || document.documentElement.clientHeight;
	};

	var getDocumentHeight = function() {
		// jQuery approach
		// whichever is greatest
		return Math.max(
			document.body.scrollHeight, document.documentElement.scrollHeight,
			document.body.offsetHeight, document.documentElement.offsetHeight,
			document.documentElement.clientHeight
		);
	};

	exports.viewportTop = null;
	exports.viewportBottom = null;
	exports.documentHeight = null;
	exports.viewportHeight = getViewportHeight();

	var previousDocumentHeight;
	var latestEvent;

	var calculateViewportI;
	function calculateViewport() {
		exports.viewportTop = scrollTop();
		exports.viewportBottom = exports.viewportTop + exports.viewportHeight;
		exports.documentHeight = getDocumentHeight();
		if (exports.documentHeight !== previousDocumentHeight) {
			calculateViewportI = watchers.length;
			while( calculateViewportI-- ) {
				watchers[calculateViewportI].recalculateLocation();
			}
			previousDocumentHeight = exports.documentHeight;
		}
	}

	function recalculateWatchLocationsAndTrigger() {
		exports.viewportHeight = getViewportHeight();
		calculateViewport();
		updateAndTriggerWatchers();
	}

	var recalculateAndTriggerTimer;
	function debouncedRecalcuateAndTrigger() {
		clearTimeout(recalculateAndTriggerTimer);
		recalculateAndTriggerTimer = setTimeout( recalculateWatchLocationsAndTrigger, 100 );
	}

	var updateAndTriggerWatchersI;
	function updateAndTriggerWatchers() {
		// update all watchers then trigger the events so one can rely on another being up to date.
		updateAndTriggerWatchersI = watchers.length;
		while( updateAndTriggerWatchersI-- ) {
			watchers[updateAndTriggerWatchersI].update();
		}

		updateAndTriggerWatchersI = watchers.length;
		while( updateAndTriggerWatchersI-- ) {
			watchers[updateAndTriggerWatchersI].triggerCallbacks();
		}

	}

	function ElementWatcher( watchItem, offsets ) {
		var self = this;

		this.watchItem = watchItem;

		if (!offsets) {
			this.offsets = defaultOffsets;
		} else if (offsets === +offsets) {
			this.offsets = {top: offsets, bottom: offsets};
		} else {
			this.offsets = {
				top: offsets.top || defaultOffsets.top,
				bottom: offsets.bottom || defaultOffsets.bottom
			};
		}

		this.callbacks = {}; // {callback: function, isOne: true }

		for (var i = 0, j = eventTypes.length; i < j; i++) {
			self.callbacks[eventTypes[i]] = [];
		}

		this.locked = false;

		var wasInViewport;
		var wasFullyInViewport;
		var wasAboveViewport;
		var wasBelowViewport;

		var listenerToTriggerListI;
		var listener;
		function triggerCallbackArray( listeners ) {
			if (listeners.length === 0) {
				return;
			}
			listenerToTriggerListI = listeners.length;
			while( listenerToTriggerListI-- ) {
				listener = listeners[listenerToTriggerListI];
				listener.callback.call( self, latestEvent );
				if (listener.isOne) {
					listeners.splice(listenerToTriggerListI, 1);
				}
			}
		}
		this.triggerCallbacks = function triggerCallbacks() {

			if (this.isInViewport && !wasInViewport) {
				triggerCallbackArray( this.callbacks[ENTERVIEWPORT] );
			}
			if (this.isFullyInViewport && !wasFullyInViewport) {
				triggerCallbackArray( this.callbacks[FULLYENTERVIEWPORT] );
			}


			if (this.isAboveViewport !== wasAboveViewport &&
				this.isBelowViewport !== wasBelowViewport) {

				triggerCallbackArray( this.callbacks[VISIBILITYCHANGE] );

				// if you skip completely past this element
				if (!wasFullyInViewport && !this.isFullyInViewport) {
					triggerCallbackArray( this.callbacks[FULLYENTERVIEWPORT] );
					triggerCallbackArray( this.callbacks[PARTIALLYEXITVIEWPORT] );
				}
				if (!wasInViewport && !this.isInViewport) {
					triggerCallbackArray( this.callbacks[ENTERVIEWPORT] );
					triggerCallbackArray( this.callbacks[EXITVIEWPORT] );
				}
			}

			if (!this.isFullyInViewport && wasFullyInViewport) {
				triggerCallbackArray( this.callbacks[PARTIALLYEXITVIEWPORT] );
			}
			if (!this.isInViewport && wasInViewport) {
				triggerCallbackArray( this.callbacks[EXITVIEWPORT] );
			}
			if (this.isInViewport !== wasInViewport) {
				triggerCallbackArray( this.callbacks[VISIBILITYCHANGE] );
			}
			switch( true ) {
				case wasInViewport !== this.isInViewport:
				case wasFullyInViewport !== this.isFullyInViewport:
				case wasAboveViewport !== this.isAboveViewport:
				case wasBelowViewport !== this.isBelowViewport:
					triggerCallbackArray( this.callbacks[STATECHANGE] );
			}

			wasInViewport = this.isInViewport;
			wasFullyInViewport = this.isFullyInViewport;
			wasAboveViewport = this.isAboveViewport;
			wasBelowViewport = this.isBelowViewport;

		};

		this.recalculateLocation = function() {
			if (this.locked) {
				return;
			}
			var previousTop = this.top;
			var previousBottom = this.bottom;
			if (this.watchItem.nodeName) { // a dom element
				var cachedDisplay = this.watchItem.style.display;
				if (cachedDisplay === 'none') {
					this.watchItem.style.display = '';
				}

				var boundingRect = this.watchItem.getBoundingClientRect();
				this.top = boundingRect.top + exports.viewportTop;
				this.bottom = boundingRect.bottom + exports.viewportTop;

				if (cachedDisplay === 'none') {
					this.watchItem.style.display = cachedDisplay;
				}

			} else if (this.watchItem === +this.watchItem) { // number
				if (this.watchItem > 0) {
					this.top = this.bottom = this.watchItem;
				} else {
					this.top = this.bottom = exports.documentHeight - this.watchItem;
				}

			} else { // an object with a top and bottom property
				this.top = this.watchItem.top;
				this.bottom = this.watchItem.bottom;
			}

			this.top -= this.offsets.top;
			this.bottom += this.offsets.bottom;
			this.height = this.bottom - this.top;

			if ( (previousTop !== undefined || previousBottom !== undefined) && (this.top !== previousTop || this.bottom !== previousBottom) ) {
				triggerCallbackArray( this.callbacks[LOCATIONCHANGE] );
			}
		};

		this.recalculateLocation();
		this.update();

		wasInViewport = this.isInViewport;
		wasFullyInViewport = this.isFullyInViewport;
		wasAboveViewport = this.isAboveViewport;
		wasBelowViewport = this.isBelowViewport;
	}

	ElementWatcher.prototype = {
		on: function( event, callback, isOne ) {

			// trigger the event if it applies to the element right now.
			switch( true ) {
				case event === VISIBILITYCHANGE && !this.isInViewport && this.isAboveViewport:
				case event === ENTERVIEWPORT && this.isInViewport:
				case event === FULLYENTERVIEWPORT && this.isFullyInViewport:
				case event === EXITVIEWPORT && this.isAboveViewport && !this.isInViewport:
				case event === PARTIALLYEXITVIEWPORT && this.isAboveViewport:
					callback.call( this, latestEvent );
					if (isOne) {
						return;
					}
			}

			if (this.callbacks[event]) {
				this.callbacks[event].push({callback: callback, isOne: isOne||false});
			} else {
				throw new Error('Tried to add a scroll monitor listener of type '+event+'. Your options are: '+eventTypes.join(', '));
			}
		},
		off: function( event, callback ) {
			if (this.callbacks[event]) {
				for (var i = 0, item; item = this.callbacks[event][i]; i++) {
					if (item.callback === callback) {
						this.callbacks[event].splice(i, 1);
						break;
					}
				}
			} else {
				throw new Error('Tried to remove a scroll monitor listener of type '+event+'. Your options are: '+eventTypes.join(', '));
			}
		},
		one: function( event, callback ) {
			this.on( event, callback, true);
		},
		recalculateSize: function() {
			this.height = this.watchItem.offsetHeight + this.offsets.top + this.offsets.bottom;
			this.bottom = this.top + this.height;
		},
		update: function() {
			this.isAboveViewport = this.top < exports.viewportTop;
			this.isBelowViewport = this.bottom > exports.viewportBottom;

			this.isInViewport = (this.top <= exports.viewportBottom && this.bottom >= exports.viewportTop);
			this.isFullyInViewport = (this.top >= exports.viewportTop && this.bottom <= exports.viewportBottom) ||
								 (this.isAboveViewport && this.isBelowViewport);

		},
		destroy: function() {
			var index = watchers.indexOf(this),
				self  = this;
			watchers.splice(index, 1);
			for (var i = 0, j = eventTypes.length; i < j; i++) {
				self.callbacks[eventTypes[i]].length = 0;
			}
		},
		// prevent recalculating the element location
		lock: function() {
			this.locked = true;
		},
		unlock: function() {
			this.locked = false;
		}
	};

	var eventHandlerFactory = function (type) {
		return function( callback, isOne ) {
			this.on.call(this, type, callback, isOne);
		};
	};

	for (var i = 0, j = eventTypes.length; i < j; i++) {
		var type =  eventTypes[i];
		ElementWatcher.prototype[type] = eventHandlerFactory(type);
	}

	try {
		calculateViewport();
	} catch (e) {
		try {
			window.$(calculateViewport);
		} catch (e) {
			throw new Error('If you must put scrollMonitor in the <head>, you must use jQuery.');
		}
	}

	function scrollMonitorListener(event) {
		latestEvent = event;
		calculateViewport();
		updateAndTriggerWatchers();
	}

	if (window.addEventListener) {
		window.addEventListener('scroll', scrollMonitorListener);
		window.addEventListener('resize', debouncedRecalcuateAndTrigger);
	} else {
		// Old IE support
		window.attachEvent('onscroll', scrollMonitorListener);
		window.attachEvent('onresize', debouncedRecalcuateAndTrigger);
	}

	exports.beget = exports.create = function( element, offsets ) {
		if (typeof element === 'string') {
			element = document.querySelector(element);
		} else if (element && element.length > 0) {
			element = element[0];
		}

		var watcher = new ElementWatcher( element, offsets );
		watchers.push(watcher);
		watcher.update();
		return watcher;
	};

	exports.update = function() {
		latestEvent = null;
		calculateViewport();
		updateAndTriggerWatchers();
	};
	exports.recalculateLocations = function() {
		exports.documentHeight = 0;
		exports.update();
	};

	return exports;
});

},{}],2:[function(require,module,exports){
// Your graphic code here!

var scrollMonitor = require('scrollmonitor');

var wapoWatcher = scrollMonitor.create( $('#washington-post'), {top: 20, bottom: -20} );


$('.post-port').slick({
    // variableWidth:true
    adaptiveHeight: true,
    nextArrow: $('.next-button'),
    prevArrow: $('.prev-button')
});



// wapoWatcher.partiallyExitViewport(function() {
//     $('#washington-post .publication-headline').removeClass('affix');

//     if(wapoWatcher.isAboveViewport){

//        $('#washington-post .publication-headline').removeClass('affix').addClass('above').css('top', $('#washington-post').outerHeight() - $( window ).height()  );

//     }
// });

// wapoWatcher.fullyEnterViewport(function() {
//     $('#washington-post .publication-headline').addClass('affix').removeClass('above').css('top','');
// });


// var tbtWatcher = scrollMonitor.create( $('#tampa-bay-times'), {top: 20, bottom: -20} );

// tbtWatcher.partiallyExitViewport(function() {
//     $('#tampa-bay-times .publication-headline').removeClass('affix');

//     if(tbtWatcher.isAboveViewport){

//        $('#tampa-bay-times .publication-headline').removeClass('affix').addClass('above').css('top', $('#tampa-bay-times').outerHeight() - $( window ).height() );

//     }
// });

// tbtWatcher.fullyEnterViewport(function() {
//     $('#tampa-bay-times .publication-headline').addClass('affix').removeClass('above').css('top','');
// });

},{"scrollmonitor":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvc2Nyb2xsbW9uaXRvci9zY3JvbGxNb25pdG9yLmpzIiwic3JjL2pzL2Jhc2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2WEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24oIGZhY3RvcnkgKSB7XG5cdGlmICh0eXBlb2YgZGVmaW5lICE9PSAndW5kZWZpbmVkJyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0fSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHR9IGVsc2Uge1xuXHRcdHdpbmRvdy5zY3JvbGxNb25pdG9yID0gZmFjdG9yeSgpO1xuXHR9XG59KShmdW5jdGlvbigpIHtcblxuXHR2YXIgc2Nyb2xsVG9wID0gZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHdpbmRvdy5wYWdlWU9mZnNldCB8fFxuXHRcdFx0KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wKSB8fFxuXHRcdFx0ZG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XG5cdH07XG5cblx0dmFyIGV4cG9ydHMgPSB7fTtcblxuXHR2YXIgd2F0Y2hlcnMgPSBbXTtcblxuXHR2YXIgVklTSUJJTElUWUNIQU5HRSA9ICd2aXNpYmlsaXR5Q2hhbmdlJztcblx0dmFyIEVOVEVSVklFV1BPUlQgPSAnZW50ZXJWaWV3cG9ydCc7XG5cdHZhciBGVUxMWUVOVEVSVklFV1BPUlQgPSAnZnVsbHlFbnRlclZpZXdwb3J0Jztcblx0dmFyIEVYSVRWSUVXUE9SVCA9ICdleGl0Vmlld3BvcnQnO1xuXHR2YXIgUEFSVElBTExZRVhJVFZJRVdQT1JUID0gJ3BhcnRpYWxseUV4aXRWaWV3cG9ydCc7XG5cdHZhciBMT0NBVElPTkNIQU5HRSA9ICdsb2NhdGlvbkNoYW5nZSc7XG5cdHZhciBTVEFURUNIQU5HRSA9ICdzdGF0ZUNoYW5nZSc7XG5cblx0dmFyIGV2ZW50VHlwZXMgPSBbXG5cdFx0VklTSUJJTElUWUNIQU5HRSxcblx0XHRFTlRFUlZJRVdQT1JULFxuXHRcdEZVTExZRU5URVJWSUVXUE9SVCxcblx0XHRFWElUVklFV1BPUlQsXG5cdFx0UEFSVElBTExZRVhJVFZJRVdQT1JULFxuXHRcdExPQ0FUSU9OQ0hBTkdFLFxuXHRcdFNUQVRFQ0hBTkdFXG5cdF07XG5cblx0dmFyIGRlZmF1bHRPZmZzZXRzID0ge3RvcDogMCwgYm90dG9tOiAwfTtcblxuXHR2YXIgZ2V0Vmlld3BvcnRIZWlnaHQgPSBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gd2luZG93LmlubmVySGVpZ2h0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XG5cdH07XG5cblx0dmFyIGdldERvY3VtZW50SGVpZ2h0ID0gZnVuY3Rpb24oKSB7XG5cdFx0Ly8galF1ZXJ5IGFwcHJvYWNoXG5cdFx0Ly8gd2hpY2hldmVyIGlzIGdyZWF0ZXN0XG5cdFx0cmV0dXJuIE1hdGgubWF4KFxuXHRcdFx0ZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQsIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQsXG5cdFx0XHRkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm9mZnNldEhlaWdodCxcblx0XHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHRcblx0XHQpO1xuXHR9O1xuXG5cdGV4cG9ydHMudmlld3BvcnRUb3AgPSBudWxsO1xuXHRleHBvcnRzLnZpZXdwb3J0Qm90dG9tID0gbnVsbDtcblx0ZXhwb3J0cy5kb2N1bWVudEhlaWdodCA9IG51bGw7XG5cdGV4cG9ydHMudmlld3BvcnRIZWlnaHQgPSBnZXRWaWV3cG9ydEhlaWdodCgpO1xuXG5cdHZhciBwcmV2aW91c0RvY3VtZW50SGVpZ2h0O1xuXHR2YXIgbGF0ZXN0RXZlbnQ7XG5cblx0dmFyIGNhbGN1bGF0ZVZpZXdwb3J0STtcblx0ZnVuY3Rpb24gY2FsY3VsYXRlVmlld3BvcnQoKSB7XG5cdFx0ZXhwb3J0cy52aWV3cG9ydFRvcCA9IHNjcm9sbFRvcCgpO1xuXHRcdGV4cG9ydHMudmlld3BvcnRCb3R0b20gPSBleHBvcnRzLnZpZXdwb3J0VG9wICsgZXhwb3J0cy52aWV3cG9ydEhlaWdodDtcblx0XHRleHBvcnRzLmRvY3VtZW50SGVpZ2h0ID0gZ2V0RG9jdW1lbnRIZWlnaHQoKTtcblx0XHRpZiAoZXhwb3J0cy5kb2N1bWVudEhlaWdodCAhPT0gcHJldmlvdXNEb2N1bWVudEhlaWdodCkge1xuXHRcdFx0Y2FsY3VsYXRlVmlld3BvcnRJID0gd2F0Y2hlcnMubGVuZ3RoO1xuXHRcdFx0d2hpbGUoIGNhbGN1bGF0ZVZpZXdwb3J0SS0tICkge1xuXHRcdFx0XHR3YXRjaGVyc1tjYWxjdWxhdGVWaWV3cG9ydEldLnJlY2FsY3VsYXRlTG9jYXRpb24oKTtcblx0XHRcdH1cblx0XHRcdHByZXZpb3VzRG9jdW1lbnRIZWlnaHQgPSBleHBvcnRzLmRvY3VtZW50SGVpZ2h0O1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIHJlY2FsY3VsYXRlV2F0Y2hMb2NhdGlvbnNBbmRUcmlnZ2VyKCkge1xuXHRcdGV4cG9ydHMudmlld3BvcnRIZWlnaHQgPSBnZXRWaWV3cG9ydEhlaWdodCgpO1xuXHRcdGNhbGN1bGF0ZVZpZXdwb3J0KCk7XG5cdFx0dXBkYXRlQW5kVHJpZ2dlcldhdGNoZXJzKCk7XG5cdH1cblxuXHR2YXIgcmVjYWxjdWxhdGVBbmRUcmlnZ2VyVGltZXI7XG5cdGZ1bmN0aW9uIGRlYm91bmNlZFJlY2FsY3VhdGVBbmRUcmlnZ2VyKCkge1xuXHRcdGNsZWFyVGltZW91dChyZWNhbGN1bGF0ZUFuZFRyaWdnZXJUaW1lcik7XG5cdFx0cmVjYWxjdWxhdGVBbmRUcmlnZ2VyVGltZXIgPSBzZXRUaW1lb3V0KCByZWNhbGN1bGF0ZVdhdGNoTG9jYXRpb25zQW5kVHJpZ2dlciwgMTAwICk7XG5cdH1cblxuXHR2YXIgdXBkYXRlQW5kVHJpZ2dlcldhdGNoZXJzSTtcblx0ZnVuY3Rpb24gdXBkYXRlQW5kVHJpZ2dlcldhdGNoZXJzKCkge1xuXHRcdC8vIHVwZGF0ZSBhbGwgd2F0Y2hlcnMgdGhlbiB0cmlnZ2VyIHRoZSBldmVudHMgc28gb25lIGNhbiByZWx5IG9uIGFub3RoZXIgYmVpbmcgdXAgdG8gZGF0ZS5cblx0XHR1cGRhdGVBbmRUcmlnZ2VyV2F0Y2hlcnNJID0gd2F0Y2hlcnMubGVuZ3RoO1xuXHRcdHdoaWxlKCB1cGRhdGVBbmRUcmlnZ2VyV2F0Y2hlcnNJLS0gKSB7XG5cdFx0XHR3YXRjaGVyc1t1cGRhdGVBbmRUcmlnZ2VyV2F0Y2hlcnNJXS51cGRhdGUoKTtcblx0XHR9XG5cblx0XHR1cGRhdGVBbmRUcmlnZ2VyV2F0Y2hlcnNJID0gd2F0Y2hlcnMubGVuZ3RoO1xuXHRcdHdoaWxlKCB1cGRhdGVBbmRUcmlnZ2VyV2F0Y2hlcnNJLS0gKSB7XG5cdFx0XHR3YXRjaGVyc1t1cGRhdGVBbmRUcmlnZ2VyV2F0Y2hlcnNJXS50cmlnZ2VyQ2FsbGJhY2tzKCk7XG5cdFx0fVxuXG5cdH1cblxuXHRmdW5jdGlvbiBFbGVtZW50V2F0Y2hlciggd2F0Y2hJdGVtLCBvZmZzZXRzICkge1xuXHRcdHZhciBzZWxmID0gdGhpcztcblxuXHRcdHRoaXMud2F0Y2hJdGVtID0gd2F0Y2hJdGVtO1xuXG5cdFx0aWYgKCFvZmZzZXRzKSB7XG5cdFx0XHR0aGlzLm9mZnNldHMgPSBkZWZhdWx0T2Zmc2V0cztcblx0XHR9IGVsc2UgaWYgKG9mZnNldHMgPT09ICtvZmZzZXRzKSB7XG5cdFx0XHR0aGlzLm9mZnNldHMgPSB7dG9wOiBvZmZzZXRzLCBib3R0b206IG9mZnNldHN9O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLm9mZnNldHMgPSB7XG5cdFx0XHRcdHRvcDogb2Zmc2V0cy50b3AgfHwgZGVmYXVsdE9mZnNldHMudG9wLFxuXHRcdFx0XHRib3R0b206IG9mZnNldHMuYm90dG9tIHx8IGRlZmF1bHRPZmZzZXRzLmJvdHRvbVxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHR0aGlzLmNhbGxiYWNrcyA9IHt9OyAvLyB7Y2FsbGJhY2s6IGZ1bmN0aW9uLCBpc09uZTogdHJ1ZSB9XG5cblx0XHRmb3IgKHZhciBpID0gMCwgaiA9IGV2ZW50VHlwZXMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRzZWxmLmNhbGxiYWNrc1tldmVudFR5cGVzW2ldXSA9IFtdO1xuXHRcdH1cblxuXHRcdHRoaXMubG9ja2VkID0gZmFsc2U7XG5cblx0XHR2YXIgd2FzSW5WaWV3cG9ydDtcblx0XHR2YXIgd2FzRnVsbHlJblZpZXdwb3J0O1xuXHRcdHZhciB3YXNBYm92ZVZpZXdwb3J0O1xuXHRcdHZhciB3YXNCZWxvd1ZpZXdwb3J0O1xuXG5cdFx0dmFyIGxpc3RlbmVyVG9UcmlnZ2VyTGlzdEk7XG5cdFx0dmFyIGxpc3RlbmVyO1xuXHRcdGZ1bmN0aW9uIHRyaWdnZXJDYWxsYmFja0FycmF5KCBsaXN0ZW5lcnMgKSB7XG5cdFx0XHRpZiAobGlzdGVuZXJzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRsaXN0ZW5lclRvVHJpZ2dlckxpc3RJID0gbGlzdGVuZXJzLmxlbmd0aDtcblx0XHRcdHdoaWxlKCBsaXN0ZW5lclRvVHJpZ2dlckxpc3RJLS0gKSB7XG5cdFx0XHRcdGxpc3RlbmVyID0gbGlzdGVuZXJzW2xpc3RlbmVyVG9UcmlnZ2VyTGlzdEldO1xuXHRcdFx0XHRsaXN0ZW5lci5jYWxsYmFjay5jYWxsKCBzZWxmLCBsYXRlc3RFdmVudCApO1xuXHRcdFx0XHRpZiAobGlzdGVuZXIuaXNPbmUpIHtcblx0XHRcdFx0XHRsaXN0ZW5lcnMuc3BsaWNlKGxpc3RlbmVyVG9UcmlnZ2VyTGlzdEksIDEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMudHJpZ2dlckNhbGxiYWNrcyA9IGZ1bmN0aW9uIHRyaWdnZXJDYWxsYmFja3MoKSB7XG5cblx0XHRcdGlmICh0aGlzLmlzSW5WaWV3cG9ydCAmJiAhd2FzSW5WaWV3cG9ydCkge1xuXHRcdFx0XHR0cmlnZ2VyQ2FsbGJhY2tBcnJheSggdGhpcy5jYWxsYmFja3NbRU5URVJWSUVXUE9SVF0gKTtcblx0XHRcdH1cblx0XHRcdGlmICh0aGlzLmlzRnVsbHlJblZpZXdwb3J0ICYmICF3YXNGdWxseUluVmlld3BvcnQpIHtcblx0XHRcdFx0dHJpZ2dlckNhbGxiYWNrQXJyYXkoIHRoaXMuY2FsbGJhY2tzW0ZVTExZRU5URVJWSUVXUE9SVF0gKTtcblx0XHRcdH1cblxuXG5cdFx0XHRpZiAodGhpcy5pc0Fib3ZlVmlld3BvcnQgIT09IHdhc0Fib3ZlVmlld3BvcnQgJiZcblx0XHRcdFx0dGhpcy5pc0JlbG93Vmlld3BvcnQgIT09IHdhc0JlbG93Vmlld3BvcnQpIHtcblxuXHRcdFx0XHR0cmlnZ2VyQ2FsbGJhY2tBcnJheSggdGhpcy5jYWxsYmFja3NbVklTSUJJTElUWUNIQU5HRV0gKTtcblxuXHRcdFx0XHQvLyBpZiB5b3Ugc2tpcCBjb21wbGV0ZWx5IHBhc3QgdGhpcyBlbGVtZW50XG5cdFx0XHRcdGlmICghd2FzRnVsbHlJblZpZXdwb3J0ICYmICF0aGlzLmlzRnVsbHlJblZpZXdwb3J0KSB7XG5cdFx0XHRcdFx0dHJpZ2dlckNhbGxiYWNrQXJyYXkoIHRoaXMuY2FsbGJhY2tzW0ZVTExZRU5URVJWSUVXUE9SVF0gKTtcblx0XHRcdFx0XHR0cmlnZ2VyQ2FsbGJhY2tBcnJheSggdGhpcy5jYWxsYmFja3NbUEFSVElBTExZRVhJVFZJRVdQT1JUXSApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICghd2FzSW5WaWV3cG9ydCAmJiAhdGhpcy5pc0luVmlld3BvcnQpIHtcblx0XHRcdFx0XHR0cmlnZ2VyQ2FsbGJhY2tBcnJheSggdGhpcy5jYWxsYmFja3NbRU5URVJWSUVXUE9SVF0gKTtcblx0XHRcdFx0XHR0cmlnZ2VyQ2FsbGJhY2tBcnJheSggdGhpcy5jYWxsYmFja3NbRVhJVFZJRVdQT1JUXSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmICghdGhpcy5pc0Z1bGx5SW5WaWV3cG9ydCAmJiB3YXNGdWxseUluVmlld3BvcnQpIHtcblx0XHRcdFx0dHJpZ2dlckNhbGxiYWNrQXJyYXkoIHRoaXMuY2FsbGJhY2tzW1BBUlRJQUxMWUVYSVRWSUVXUE9SVF0gKTtcblx0XHRcdH1cblx0XHRcdGlmICghdGhpcy5pc0luVmlld3BvcnQgJiYgd2FzSW5WaWV3cG9ydCkge1xuXHRcdFx0XHR0cmlnZ2VyQ2FsbGJhY2tBcnJheSggdGhpcy5jYWxsYmFja3NbRVhJVFZJRVdQT1JUXSApO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRoaXMuaXNJblZpZXdwb3J0ICE9PSB3YXNJblZpZXdwb3J0KSB7XG5cdFx0XHRcdHRyaWdnZXJDYWxsYmFja0FycmF5KCB0aGlzLmNhbGxiYWNrc1tWSVNJQklMSVRZQ0hBTkdFXSApO1xuXHRcdFx0fVxuXHRcdFx0c3dpdGNoKCB0cnVlICkge1xuXHRcdFx0XHRjYXNlIHdhc0luVmlld3BvcnQgIT09IHRoaXMuaXNJblZpZXdwb3J0OlxuXHRcdFx0XHRjYXNlIHdhc0Z1bGx5SW5WaWV3cG9ydCAhPT0gdGhpcy5pc0Z1bGx5SW5WaWV3cG9ydDpcblx0XHRcdFx0Y2FzZSB3YXNBYm92ZVZpZXdwb3J0ICE9PSB0aGlzLmlzQWJvdmVWaWV3cG9ydDpcblx0XHRcdFx0Y2FzZSB3YXNCZWxvd1ZpZXdwb3J0ICE9PSB0aGlzLmlzQmVsb3dWaWV3cG9ydDpcblx0XHRcdFx0XHR0cmlnZ2VyQ2FsbGJhY2tBcnJheSggdGhpcy5jYWxsYmFja3NbU1RBVEVDSEFOR0VdICk7XG5cdFx0XHR9XG5cblx0XHRcdHdhc0luVmlld3BvcnQgPSB0aGlzLmlzSW5WaWV3cG9ydDtcblx0XHRcdHdhc0Z1bGx5SW5WaWV3cG9ydCA9IHRoaXMuaXNGdWxseUluVmlld3BvcnQ7XG5cdFx0XHR3YXNBYm92ZVZpZXdwb3J0ID0gdGhpcy5pc0Fib3ZlVmlld3BvcnQ7XG5cdFx0XHR3YXNCZWxvd1ZpZXdwb3J0ID0gdGhpcy5pc0JlbG93Vmlld3BvcnQ7XG5cblx0XHR9O1xuXG5cdFx0dGhpcy5yZWNhbGN1bGF0ZUxvY2F0aW9uID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAodGhpcy5sb2NrZWQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0dmFyIHByZXZpb3VzVG9wID0gdGhpcy50b3A7XG5cdFx0XHR2YXIgcHJldmlvdXNCb3R0b20gPSB0aGlzLmJvdHRvbTtcblx0XHRcdGlmICh0aGlzLndhdGNoSXRlbS5ub2RlTmFtZSkgeyAvLyBhIGRvbSBlbGVtZW50XG5cdFx0XHRcdHZhciBjYWNoZWREaXNwbGF5ID0gdGhpcy53YXRjaEl0ZW0uc3R5bGUuZGlzcGxheTtcblx0XHRcdFx0aWYgKGNhY2hlZERpc3BsYXkgPT09ICdub25lJykge1xuXHRcdFx0XHRcdHRoaXMud2F0Y2hJdGVtLnN0eWxlLmRpc3BsYXkgPSAnJztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBib3VuZGluZ1JlY3QgPSB0aGlzLndhdGNoSXRlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRcdFx0dGhpcy50b3AgPSBib3VuZGluZ1JlY3QudG9wICsgZXhwb3J0cy52aWV3cG9ydFRvcDtcblx0XHRcdFx0dGhpcy5ib3R0b20gPSBib3VuZGluZ1JlY3QuYm90dG9tICsgZXhwb3J0cy52aWV3cG9ydFRvcDtcblxuXHRcdFx0XHRpZiAoY2FjaGVkRGlzcGxheSA9PT0gJ25vbmUnKSB7XG5cdFx0XHRcdFx0dGhpcy53YXRjaEl0ZW0uc3R5bGUuZGlzcGxheSA9IGNhY2hlZERpc3BsYXk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLndhdGNoSXRlbSA9PT0gK3RoaXMud2F0Y2hJdGVtKSB7IC8vIG51bWJlclxuXHRcdFx0XHRpZiAodGhpcy53YXRjaEl0ZW0gPiAwKSB7XG5cdFx0XHRcdFx0dGhpcy50b3AgPSB0aGlzLmJvdHRvbSA9IHRoaXMud2F0Y2hJdGVtO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMudG9wID0gdGhpcy5ib3R0b20gPSBleHBvcnRzLmRvY3VtZW50SGVpZ2h0IC0gdGhpcy53YXRjaEl0ZW07XG5cdFx0XHRcdH1cblxuXHRcdFx0fSBlbHNlIHsgLy8gYW4gb2JqZWN0IHdpdGggYSB0b3AgYW5kIGJvdHRvbSBwcm9wZXJ0eVxuXHRcdFx0XHR0aGlzLnRvcCA9IHRoaXMud2F0Y2hJdGVtLnRvcDtcblx0XHRcdFx0dGhpcy5ib3R0b20gPSB0aGlzLndhdGNoSXRlbS5ib3R0b207XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMudG9wIC09IHRoaXMub2Zmc2V0cy50b3A7XG5cdFx0XHR0aGlzLmJvdHRvbSArPSB0aGlzLm9mZnNldHMuYm90dG9tO1xuXHRcdFx0dGhpcy5oZWlnaHQgPSB0aGlzLmJvdHRvbSAtIHRoaXMudG9wO1xuXG5cdFx0XHRpZiAoIChwcmV2aW91c1RvcCAhPT0gdW5kZWZpbmVkIHx8IHByZXZpb3VzQm90dG9tICE9PSB1bmRlZmluZWQpICYmICh0aGlzLnRvcCAhPT0gcHJldmlvdXNUb3AgfHwgdGhpcy5ib3R0b20gIT09IHByZXZpb3VzQm90dG9tKSApIHtcblx0XHRcdFx0dHJpZ2dlckNhbGxiYWNrQXJyYXkoIHRoaXMuY2FsbGJhY2tzW0xPQ0FUSU9OQ0hBTkdFXSApO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR0aGlzLnJlY2FsY3VsYXRlTG9jYXRpb24oKTtcblx0XHR0aGlzLnVwZGF0ZSgpO1xuXG5cdFx0d2FzSW5WaWV3cG9ydCA9IHRoaXMuaXNJblZpZXdwb3J0O1xuXHRcdHdhc0Z1bGx5SW5WaWV3cG9ydCA9IHRoaXMuaXNGdWxseUluVmlld3BvcnQ7XG5cdFx0d2FzQWJvdmVWaWV3cG9ydCA9IHRoaXMuaXNBYm92ZVZpZXdwb3J0O1xuXHRcdHdhc0JlbG93Vmlld3BvcnQgPSB0aGlzLmlzQmVsb3dWaWV3cG9ydDtcblx0fVxuXG5cdEVsZW1lbnRXYXRjaGVyLnByb3RvdHlwZSA9IHtcblx0XHRvbjogZnVuY3Rpb24oIGV2ZW50LCBjYWxsYmFjaywgaXNPbmUgKSB7XG5cblx0XHRcdC8vIHRyaWdnZXIgdGhlIGV2ZW50IGlmIGl0IGFwcGxpZXMgdG8gdGhlIGVsZW1lbnQgcmlnaHQgbm93LlxuXHRcdFx0c3dpdGNoKCB0cnVlICkge1xuXHRcdFx0XHRjYXNlIGV2ZW50ID09PSBWSVNJQklMSVRZQ0hBTkdFICYmICF0aGlzLmlzSW5WaWV3cG9ydCAmJiB0aGlzLmlzQWJvdmVWaWV3cG9ydDpcblx0XHRcdFx0Y2FzZSBldmVudCA9PT0gRU5URVJWSUVXUE9SVCAmJiB0aGlzLmlzSW5WaWV3cG9ydDpcblx0XHRcdFx0Y2FzZSBldmVudCA9PT0gRlVMTFlFTlRFUlZJRVdQT1JUICYmIHRoaXMuaXNGdWxseUluVmlld3BvcnQ6XG5cdFx0XHRcdGNhc2UgZXZlbnQgPT09IEVYSVRWSUVXUE9SVCAmJiB0aGlzLmlzQWJvdmVWaWV3cG9ydCAmJiAhdGhpcy5pc0luVmlld3BvcnQ6XG5cdFx0XHRcdGNhc2UgZXZlbnQgPT09IFBBUlRJQUxMWUVYSVRWSUVXUE9SVCAmJiB0aGlzLmlzQWJvdmVWaWV3cG9ydDpcblx0XHRcdFx0XHRjYWxsYmFjay5jYWxsKCB0aGlzLCBsYXRlc3RFdmVudCApO1xuXHRcdFx0XHRcdGlmIChpc09uZSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMuY2FsbGJhY2tzW2V2ZW50XSkge1xuXHRcdFx0XHR0aGlzLmNhbGxiYWNrc1tldmVudF0ucHVzaCh7Y2FsbGJhY2s6IGNhbGxiYWNrLCBpc09uZTogaXNPbmV8fGZhbHNlfSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ1RyaWVkIHRvIGFkZCBhIHNjcm9sbCBtb25pdG9yIGxpc3RlbmVyIG9mIHR5cGUgJytldmVudCsnLiBZb3VyIG9wdGlvbnMgYXJlOiAnK2V2ZW50VHlwZXMuam9pbignLCAnKSk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRvZmY6IGZ1bmN0aW9uKCBldmVudCwgY2FsbGJhY2sgKSB7XG5cdFx0XHRpZiAodGhpcy5jYWxsYmFja3NbZXZlbnRdKSB7XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwLCBpdGVtOyBpdGVtID0gdGhpcy5jYWxsYmFja3NbZXZlbnRdW2ldOyBpKyspIHtcblx0XHRcdFx0XHRpZiAoaXRlbS5jYWxsYmFjayA9PT0gY2FsbGJhY2spIHtcblx0XHRcdFx0XHRcdHRoaXMuY2FsbGJhY2tzW2V2ZW50XS5zcGxpY2UoaSwgMSk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignVHJpZWQgdG8gcmVtb3ZlIGEgc2Nyb2xsIG1vbml0b3IgbGlzdGVuZXIgb2YgdHlwZSAnK2V2ZW50KycuIFlvdXIgb3B0aW9ucyBhcmU6ICcrZXZlbnRUeXBlcy5qb2luKCcsICcpKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdG9uZTogZnVuY3Rpb24oIGV2ZW50LCBjYWxsYmFjayApIHtcblx0XHRcdHRoaXMub24oIGV2ZW50LCBjYWxsYmFjaywgdHJ1ZSk7XG5cdFx0fSxcblx0XHRyZWNhbGN1bGF0ZVNpemU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5oZWlnaHQgPSB0aGlzLndhdGNoSXRlbS5vZmZzZXRIZWlnaHQgKyB0aGlzLm9mZnNldHMudG9wICsgdGhpcy5vZmZzZXRzLmJvdHRvbTtcblx0XHRcdHRoaXMuYm90dG9tID0gdGhpcy50b3AgKyB0aGlzLmhlaWdodDtcblx0XHR9LFxuXHRcdHVwZGF0ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLmlzQWJvdmVWaWV3cG9ydCA9IHRoaXMudG9wIDwgZXhwb3J0cy52aWV3cG9ydFRvcDtcblx0XHRcdHRoaXMuaXNCZWxvd1ZpZXdwb3J0ID0gdGhpcy5ib3R0b20gPiBleHBvcnRzLnZpZXdwb3J0Qm90dG9tO1xuXG5cdFx0XHR0aGlzLmlzSW5WaWV3cG9ydCA9ICh0aGlzLnRvcCA8PSBleHBvcnRzLnZpZXdwb3J0Qm90dG9tICYmIHRoaXMuYm90dG9tID49IGV4cG9ydHMudmlld3BvcnRUb3ApO1xuXHRcdFx0dGhpcy5pc0Z1bGx5SW5WaWV3cG9ydCA9ICh0aGlzLnRvcCA+PSBleHBvcnRzLnZpZXdwb3J0VG9wICYmIHRoaXMuYm90dG9tIDw9IGV4cG9ydHMudmlld3BvcnRCb3R0b20pIHx8XG5cdFx0XHRcdFx0XHRcdFx0ICh0aGlzLmlzQWJvdmVWaWV3cG9ydCAmJiB0aGlzLmlzQmVsb3dWaWV3cG9ydCk7XG5cblx0XHR9LFxuXHRcdGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGluZGV4ID0gd2F0Y2hlcnMuaW5kZXhPZih0aGlzKSxcblx0XHRcdFx0c2VsZiAgPSB0aGlzO1xuXHRcdFx0d2F0Y2hlcnMuc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdGZvciAodmFyIGkgPSAwLCBqID0gZXZlbnRUeXBlcy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0c2VsZi5jYWxsYmFja3NbZXZlbnRUeXBlc1tpXV0ubGVuZ3RoID0gMDtcblx0XHRcdH1cblx0XHR9LFxuXHRcdC8vIHByZXZlbnQgcmVjYWxjdWxhdGluZyB0aGUgZWxlbWVudCBsb2NhdGlvblxuXHRcdGxvY2s6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5sb2NrZWQgPSB0cnVlO1xuXHRcdH0sXG5cdFx0dW5sb2NrOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMubG9ja2VkID0gZmFsc2U7XG5cdFx0fVxuXHR9O1xuXG5cdHZhciBldmVudEhhbmRsZXJGYWN0b3J5ID0gZnVuY3Rpb24gKHR5cGUpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24oIGNhbGxiYWNrLCBpc09uZSApIHtcblx0XHRcdHRoaXMub24uY2FsbCh0aGlzLCB0eXBlLCBjYWxsYmFjaywgaXNPbmUpO1xuXHRcdH07XG5cdH07XG5cblx0Zm9yICh2YXIgaSA9IDAsIGogPSBldmVudFR5cGVzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdHZhciB0eXBlID0gIGV2ZW50VHlwZXNbaV07XG5cdFx0RWxlbWVudFdhdGNoZXIucHJvdG90eXBlW3R5cGVdID0gZXZlbnRIYW5kbGVyRmFjdG9yeSh0eXBlKTtcblx0fVxuXG5cdHRyeSB7XG5cdFx0Y2FsY3VsYXRlVmlld3BvcnQoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdHRyeSB7XG5cdFx0XHR3aW5kb3cuJChjYWxjdWxhdGVWaWV3cG9ydCk7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdJZiB5b3UgbXVzdCBwdXQgc2Nyb2xsTW9uaXRvciBpbiB0aGUgPGhlYWQ+LCB5b3UgbXVzdCB1c2UgalF1ZXJ5LicpO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIHNjcm9sbE1vbml0b3JMaXN0ZW5lcihldmVudCkge1xuXHRcdGxhdGVzdEV2ZW50ID0gZXZlbnQ7XG5cdFx0Y2FsY3VsYXRlVmlld3BvcnQoKTtcblx0XHR1cGRhdGVBbmRUcmlnZ2VyV2F0Y2hlcnMoKTtcblx0fVxuXG5cdGlmICh3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcikge1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBzY3JvbGxNb25pdG9yTGlzdGVuZXIpO1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBkZWJvdW5jZWRSZWNhbGN1YXRlQW5kVHJpZ2dlcik7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gT2xkIElFIHN1cHBvcnRcblx0XHR3aW5kb3cuYXR0YWNoRXZlbnQoJ29uc2Nyb2xsJywgc2Nyb2xsTW9uaXRvckxpc3RlbmVyKTtcblx0XHR3aW5kb3cuYXR0YWNoRXZlbnQoJ29ucmVzaXplJywgZGVib3VuY2VkUmVjYWxjdWF0ZUFuZFRyaWdnZXIpO1xuXHR9XG5cblx0ZXhwb3J0cy5iZWdldCA9IGV4cG9ydHMuY3JlYXRlID0gZnVuY3Rpb24oIGVsZW1lbnQsIG9mZnNldHMgKSB7XG5cdFx0aWYgKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJykge1xuXHRcdFx0ZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbWVudCk7XG5cdFx0fSBlbHNlIGlmIChlbGVtZW50ICYmIGVsZW1lbnQubGVuZ3RoID4gMCkge1xuXHRcdFx0ZWxlbWVudCA9IGVsZW1lbnRbMF07XG5cdFx0fVxuXG5cdFx0dmFyIHdhdGNoZXIgPSBuZXcgRWxlbWVudFdhdGNoZXIoIGVsZW1lbnQsIG9mZnNldHMgKTtcblx0XHR3YXRjaGVycy5wdXNoKHdhdGNoZXIpO1xuXHRcdHdhdGNoZXIudXBkYXRlKCk7XG5cdFx0cmV0dXJuIHdhdGNoZXI7XG5cdH07XG5cblx0ZXhwb3J0cy51cGRhdGUgPSBmdW5jdGlvbigpIHtcblx0XHRsYXRlc3RFdmVudCA9IG51bGw7XG5cdFx0Y2FsY3VsYXRlVmlld3BvcnQoKTtcblx0XHR1cGRhdGVBbmRUcmlnZ2VyV2F0Y2hlcnMoKTtcblx0fTtcblx0ZXhwb3J0cy5yZWNhbGN1bGF0ZUxvY2F0aW9ucyA9IGZ1bmN0aW9uKCkge1xuXHRcdGV4cG9ydHMuZG9jdW1lbnRIZWlnaHQgPSAwO1xuXHRcdGV4cG9ydHMudXBkYXRlKCk7XG5cdH07XG5cblx0cmV0dXJuIGV4cG9ydHM7XG59KTtcbiIsIi8vIFlvdXIgZ3JhcGhpYyBjb2RlIGhlcmUhXG5cbnZhciBzY3JvbGxNb25pdG9yID0gcmVxdWlyZSgnc2Nyb2xsbW9uaXRvcicpO1xuXG52YXIgd2Fwb1dhdGNoZXIgPSBzY3JvbGxNb25pdG9yLmNyZWF0ZSggJCgnI3dhc2hpbmd0b24tcG9zdCcpLCB7dG9wOiAyMCwgYm90dG9tOiAtMjB9ICk7XG5cblxuJCgnLnBvc3QtcG9ydCcpLnNsaWNrKHtcbiAgICAvLyB2YXJpYWJsZVdpZHRoOnRydWVcbiAgICBhZGFwdGl2ZUhlaWdodDogdHJ1ZSxcbiAgICBuZXh0QXJyb3c6ICQoJy5uZXh0LWJ1dHRvbicpLFxuICAgIHByZXZBcnJvdzogJCgnLnByZXYtYnV0dG9uJylcbn0pO1xuXG5cblxuLy8gd2Fwb1dhdGNoZXIucGFydGlhbGx5RXhpdFZpZXdwb3J0KGZ1bmN0aW9uKCkge1xuLy8gICAgICQoJyN3YXNoaW5ndG9uLXBvc3QgLnB1YmxpY2F0aW9uLWhlYWRsaW5lJykucmVtb3ZlQ2xhc3MoJ2FmZml4Jyk7XG5cbi8vICAgICBpZih3YXBvV2F0Y2hlci5pc0Fib3ZlVmlld3BvcnQpe1xuXG4vLyAgICAgICAgJCgnI3dhc2hpbmd0b24tcG9zdCAucHVibGljYXRpb24taGVhZGxpbmUnKS5yZW1vdmVDbGFzcygnYWZmaXgnKS5hZGRDbGFzcygnYWJvdmUnKS5jc3MoJ3RvcCcsICQoJyN3YXNoaW5ndG9uLXBvc3QnKS5vdXRlckhlaWdodCgpIC0gJCggd2luZG93ICkuaGVpZ2h0KCkgICk7XG5cbi8vICAgICB9XG4vLyB9KTtcblxuLy8gd2Fwb1dhdGNoZXIuZnVsbHlFbnRlclZpZXdwb3J0KGZ1bmN0aW9uKCkge1xuLy8gICAgICQoJyN3YXNoaW5ndG9uLXBvc3QgLnB1YmxpY2F0aW9uLWhlYWRsaW5lJykuYWRkQ2xhc3MoJ2FmZml4JykucmVtb3ZlQ2xhc3MoJ2Fib3ZlJykuY3NzKCd0b3AnLCcnKTtcbi8vIH0pO1xuXG5cbi8vIHZhciB0YnRXYXRjaGVyID0gc2Nyb2xsTW9uaXRvci5jcmVhdGUoICQoJyN0YW1wYS1iYXktdGltZXMnKSwge3RvcDogMjAsIGJvdHRvbTogLTIwfSApO1xuXG4vLyB0YnRXYXRjaGVyLnBhcnRpYWxseUV4aXRWaWV3cG9ydChmdW5jdGlvbigpIHtcbi8vICAgICAkKCcjdGFtcGEtYmF5LXRpbWVzIC5wdWJsaWNhdGlvbi1oZWFkbGluZScpLnJlbW92ZUNsYXNzKCdhZmZpeCcpO1xuXG4vLyAgICAgaWYodGJ0V2F0Y2hlci5pc0Fib3ZlVmlld3BvcnQpe1xuXG4vLyAgICAgICAgJCgnI3RhbXBhLWJheS10aW1lcyAucHVibGljYXRpb24taGVhZGxpbmUnKS5yZW1vdmVDbGFzcygnYWZmaXgnKS5hZGRDbGFzcygnYWJvdmUnKS5jc3MoJ3RvcCcsICQoJyN0YW1wYS1iYXktdGltZXMnKS5vdXRlckhlaWdodCgpIC0gJCggd2luZG93ICkuaGVpZ2h0KCkgKTtcblxuLy8gICAgIH1cbi8vIH0pO1xuXG4vLyB0YnRXYXRjaGVyLmZ1bGx5RW50ZXJWaWV3cG9ydChmdW5jdGlvbigpIHtcbi8vICAgICAkKCcjdGFtcGEtYmF5LXRpbWVzIC5wdWJsaWNhdGlvbi1oZWFkbGluZScpLmFkZENsYXNzKCdhZmZpeCcpLnJlbW92ZUNsYXNzKCdhYm92ZScpLmNzcygndG9wJywnJyk7XG4vLyB9KTtcbiJdfQ==
