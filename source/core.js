/**
 * VUI framework V1
 * for personal use and research, but feel free to grab anything you want
 * based on RequireJs
 * Created by mail@vincesnow.com on 14-5-16.
 */
/*jslint browser:true */
/*jslint devel: true */
/*jslint node: true */
define(['sizzle'], function (Sizzle) {
    'use strict';
    var V;

    V = {
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
        q: function (selector, context) {
            
        }
    });

    return V;
});
