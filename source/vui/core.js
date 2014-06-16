/**
 * VUI framework V1
 * for personal use and research, but feel free to grab anything you want
 * based on RequireJs
 * any issues, please contact mail@vincesnow.com
 */
/*jslint browser:true */
/*jslint devel: true */
/*jslint node: true */
define(['lib/sizzle', 'lib/class'], function (Sizzle, Class) {
    'use strict';

    var V = window.VUI;

    if (typeof V === 'object' && V.name === 'VUI' && V.version === 'v1.0 beta') {
        return V;
    }

    V = new Class();
    V.extend({
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
    });

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

    window.VUI = V;

    return V;
});
