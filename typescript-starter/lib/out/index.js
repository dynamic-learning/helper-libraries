"use strict";
var Lib = /** @class */ (function () {
    function Lib() {
    }
    Lib.prototype.display = function () {
        circle(width / 2, height / 2, 20);
        var sub = new Sub();
        sub.display();
    };
    return Lib;
}());
var Sub = /** @class */ (function () {
    function Sub() {
    }
    Sub.prototype.display = function () {
        circle(width / 3, height / 2, 20);
    };
    return Sub;
}());
