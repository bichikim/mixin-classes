/* eslint-disable no-proto */
define("index", ["require", "exports", "tslib"], function (require, exports, tslib_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function Mixin() {
        var classes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            classes[_i] = arguments[_i];
        }
        var first = classes[0], _classes = classes.slice(1);
        var target = first;
        _classes.forEach(function (classOne) {
            target = _mix(target, classOne);
        });
        return target;
    }
    exports.Mixin = Mixin;
    exports.mixinSymbol = Symbol('mixin');
    exports.getMixin = function (myClass, name) {
        return new Proxy({}, {
            get: function (target, prop) {
                var mixin = myClass[exports.mixinSymbol];
                if (mixin === null || mixin === undefined) {
                    return undefined;
                }
                var mixinTarget = mixin[name];
                if (mixinTarget === null || mixinTarget === undefined) {
                    return undefined;
                }
                var propTarget = mixinTarget[prop];
                if (typeof propTarget === 'function') {
                    return propTarget.bind(myClass);
                }
                return propTarget;
            },
        });
    };
    /**
     * Mix two classes
     * @param Source
     * @param Base
     */
    var _mix = function (Source, Base) {
        var Mixed = /** @class */ (function () {
            function Mixed() {
                var _a, _b, _c, _d;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var source = new ((_a = Source.prototype.constructor).bind.apply(_a, tslib_1.__spreadArrays([void 0], args)))();
                var base = new ((_b = Base.prototype.constructor).bind.apply(_b, tslib_1.__spreadArrays([void 0], args)))();
                Object.assign(this, source);
                Object.assign(this, base);
                Object.setPrototypeOf(Object.getPrototypeOf(this), (_c = {},
                    _c[exports.mixinSymbol] = (_d = {},
                        _d[Source.name] = Object.getPrototypeOf(source),
                        _d[Base.name] = Object.getPrototypeOf(base),
                        _d),
                    _c.__proto__ = tslib_1.__assign(tslib_1.__assign({}, Object.getPrototypeOf(base)), { __proto__: Object.getPrototypeOf(source) }),
                    _c));
            }
            return Mixed;
        }());
        return Mixed;
    };
});
//# sourceMappingURL=index.js.map