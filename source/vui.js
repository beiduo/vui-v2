/**
 * VUI framework V1
 * for personal use and research, but feel free to grab anything you want
 * Created by Vince Snow on 14-5-16.
 * any issues, please contact mail@vincesnow.com
 */
/*jslint browser:true */
/*jslint devel: true */
/*jslint node: true */
(function (global, factory) {
    'use strict';
    
    if (typeof global !== 'object' || typeof global.window !== 'object' || global.window !== global.window.window || typeof global.document !== 'object') {
        throw new Error('VUI requires a window with a document');
    }

    if (typeof global.VUI !== 'object') {
        global.VUI = factory(global);
    }
    
    return global.VUI;
}(typeof window !== 'undefined' ? window : this, function (window) {
    'use strict';

    var V = {
        name: 'VUI',
        version: 'v1.0 beta',
        mix: function (o, stuff) {
            var key;
            if (typeof o !== 'object' || typeof stuff !== 'object') {
                return false;
            }
            for (key in stuff) {
                if (stuff.hasOwnProperty(key)) {
                    o[key] = stuff[key];
                }
            }
            return o;
        }
    };
    
    V.mix(V, {
        log: function (msg) {
            try {
                console.log(msg);
            } catch (e) {}
        },
        merge: function (o, stuff) {
            var key, n;
            if (typeof o !== 'object' || typeof stuff !== 'object') {
                return false;
            }
            function F() {}
            F.prototype = o;
            n = new F();
            n.uber = o;
            for (key in stuff) {
                if (stuff.hasOwnProperty(key)) {
                    n[key] = stuff[key];
                }
            }
            return n;
        },
        isArray: function (o) {
            try {
                Array.prototype.toString.call(o);
                return true;
            } catch (e) {
                return false;
            }
        }
    });
    
    /*==== Dom query ====*/
    
    function Query(selector, context) {
        var nodes = [],
            parents = [],
            self = this,
            i,
            n;
        
        if (typeof selector === 'string') {
            if (typeof context === 'object') {
            } else {
                nodes = Sizzle(selector);
            }
            
        } else if (selector.nodeType) {
            nodes[0] = selector;
        } else if (self.isArray(selector)) {
            n = 0;
            for (i = 0; i < selector.length; i += 1) {
                if (typeof selector[i] === 'object' && selector[i].nodeType) {
                    nodes[n] = selector[i];
                    n += 1;
                }
            }
        }
        for (i = 0; i < nodes.length; i += 1) {
            this[i] = nodes[i];
        }
        this.length = i;
    }
    
    V.fn = Query.prototype = {
        slice: function () {
            return [].slice.apply(this, arguments);
        },
        push: function () {
            return [].push.apply(this, arguments);
        },
        concat: function () {
            return [].concat.apply(this, arguments);
        }
    };
    
    V.mix(V, {
        Query: Query,
        q: function (selector, context) {
            var obj = new this.Query(selector, context);
            obj.constructor = this.Query;
            return obj;
        }
    });
    
    return V;
}));