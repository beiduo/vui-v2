/**
 * VUI framework V1
 * node module
 */
/*jslint browser:true */
/*jslint devel: true */
/*jslint node: true */
define(['vui/core', 'lib/sizzle'], function (V, Sizzle) {
    'use strict';
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

    function q(selector, context) {
        var obj = new Query(selector, context);
        obj.constructor = Query;
        return obj;
    }

    V.mix(V, {
        q: q
    });

    return q;
});
