/**
 * Loader plugin
 * 
 * Set configurations by key from within a certain action
 * Call $.loaderShow(key); to apply configurations.
 * Call $.loaderRemove(key); to remove.
 * 
 */
 
;(function(defaults, $, window, document, undefined) {

    var configs = {};
    
    $.extend({
		loaderConfig : function(options) {
		    var conf = $.extend(defaults, options), key = options.key;
		    configs[key] = conf;
		    if(conf.debug){ console.log(configs); }
			return conf;
		},
		loaderShow : function(key){
		    var opts = configs[key];
		    if(typeof(opts) == 'undefined') return;
		    if(opts.hide != null){
		        $(opts.hide).hide();
		    }
		    if(opts.empty != null){
		        $(opts.empty).empty();
		    }
		    if(opts.fillClass){
		        $(opts.fill).addClass(opts.fillClass);
		    }
		    if(opts.fillContent != null){
		        $(opts.fill).html(opts.fillContent);
		    }
		},
		// Use the key, so we can turn everything back on.
		loaderRemove : function(key){
		    var opts = configs[key];
		    if(typeof(opts) == 'undefined') {
		        // unset them all
		        configs = {};
		    } else {
		        delete configs[key];
		        if(opts.debug){ console.log(configs); }
		        
		        if(opts.hide != null){
                    $(opts.hide).show();
                }
                if(opts.fillClass){
                    $(opts.fill).removeClass(opts.fillClass);
                }
                if(opts.fillContent != null){
                    var html = $(opts.fill).html();
                    $(opts.fill).html(html.replace(opts.fillContent, ''));
                }
		    }
		}
	});
})({
    key: 0, /* This actions settings. ie: key: 'message-view' */
    hide: null, /* Element(s) to hide/unhide, eg: hide: '#foo, .bar' */
    empty: null, /* Element(s) to empty, eg: empty: '#foo, .bar' */
    fill: 'body', /* Fill container(s). Where to put our fillContent and/or add fillClass */
    fillContent: null, /* Content to be added to fill container(s). Like a spinning gif. */
    fillClass: null, /* Class that will be added to element(s) specified in fill. ie: <body class="loading"> */
    debug: false /* console logging */
}, jQuery, window, document);
