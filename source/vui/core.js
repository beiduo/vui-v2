/**
 * VUI framework V1
 * for personal use and research, but feel free to grab anything you want
 * based on RequireJs
 * any issues, please contact mail@vincesnow.com
 */
/*jslint browser:true */
/*jslint devel: true */
/*jslint node: true */
define(['lib/class', 'lib/sizzle'], function (Class, Sizzle) {
    'use strict';

    var V = window.VUI;

    if (typeof V === 'object' && V.name === 'VUI' && V.version === 'v1.0 beta') {
        return V;
    }

    V = new Class();
    V.extend({
        name: 'VUI',
        version: 'v1.0 beta',
        Class: Class,
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
        },
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
        },
        isFunction: function (it) {
            return ostring.call(it) === '[object Function]';
        },
        each: function (o, callback) {
            var key;
            if (typeof o === 'object') {
                if (o.length) {
                    for (key = 0; key < o.length; key += 1) {
                        if (this.isFunction(callback)) {
                            callback(o[key], key);
                        }
                    }
                } else {
                    try {
                        for (key in o) {
                        if (o.hasOwnProperty(key)) {
                                if (this.isFunction(callback)) {
                                    callback(o[key], key);
                                }
                            }
                        }
                    } catch (e) {
                        if (this.isFunction(callback)) {
                            callback(o, 0);
                        }
                    }
                }
            } else {
                if (this.isFunction(callback)) {
                    callback(o, 0);
                }
            }
            return o;
        },
        map: function (o, callback) {
            var key,
                cb = [];
            if (typeof o === 'object') {
                if (o.length) {
                    for (key = 0; key < o.length; key += 1) {
                        if (this.isFunction(callback)) {
                            cb.push(callback(o[key], key));
                        }
                    }
                } else {
                    try {
                        for (key in o) {
                        if (o.hasOwnProperty(key)) {
                                if (this.isFunction(callback)) {
                                    cb.push(callback(o[key], key));
                                }
                            }
                        }
                    } catch (e) {
                        if (this.isFunction(callback)) {
                            cb = callback(o, 0);
                        }
                    }
                }
            } else {
                if (this.isFunction(callback)) {
                    cb = callback(o, 0);
                }
            }
            return cb;
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
                if (context.length) {
                    for (i = 0; i < context.length; i++) {
                        if (context[i].nodeType) {
                            nodes = nodes.concat(Sizzle(selector, context[i]));
                        }
                    }
                } else if (context.nodeType) {
                    nodes = Sizzle(selector, context);
                }
            } else {
                nodes = Sizzle(selector);
            }
            
        } else if (typeof selector === 'undefined') {
            nodes = []; 
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
        },
        getDomNode: function () {
            if (this[0].nodeType) {
                return this[0];
            }
        },
        getDomNodes: function () {
            var i,
                nodes = [];

            for (i = 0; i < this.length; i += 1) {
                if (this[i].nodeType) {
                    nodes.push(this[i]);
                }
            }
            return nodes;
        },
        eq: function (i) {
            var item;
            if (typeof i === 'number') {
                item = this[i];
                return q(this[i]);
            }
        },
        find: function (selector) {
            if (typeof selector === 'string') {
                return q(selector, this);
            }
        },
        parent: function () {
            var nodes = [];
        }
    };

    function q(selector, context) {
        var obj = new Query(selector, context);
        obj.constructor = Query;
        return obj;
    }

    V.mix(V, {
        q: q
    });

    window.VUI = V;

    return V;
});
