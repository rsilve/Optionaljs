(function (factory) {

    // Enable multiple loading tool

    if (define && typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory());
    } else if (module && typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        // Node js
        module.exports = factory();
    } else {

        window.Optional = factory()
    }

})(function () {

    // private constructor
    function Option(val) {
        var _value = val;

        /**
         * return wether is empty or not
         * @returns {boolean}
         */
        this.isEmpty = function() {
            return _value === undefined;
        };

        /**
         * return the value if not empty
         * else throw an error
         * @returns {*}
         */
        this.get = function () {
            if (this.isEmpty()) {
                throw new Error('NoSuchElementError');
            }
            return _value;
        };

        /**
         * transform an option to a new option
         * by apply parameter function to value if not empty
         * @param fn {function}
         * @returns {Option}
         */
        this.map = function (fn) {
            if (this.isEmpty()) {
                return empty();
            }
            if (typeof fn == 'function') {
                return ofNullable(fn(_value));
            }
            return ofNullable(_value[fn](_value));
        };

        /**
         * Flatten an Option of Option to simple Option
         * @returns {Option}
         */
        this.flatten = function() {
            if (_value.isEmpty()) {
                return empty();
            }
            return _value;
        };

        /**
         * transform an option a new option
         * by apply parameter function to value if not empty
         * and flatten
         *
         * @param fn {function}
         * @returns {Option}
         */
        this.flatMap = function(fn) {
            return this.map(fn).flatten();
        };

        /**
         * Return the option value if not empty
         * or the value give in arguments
         *
         * @param other
         * @returns {*}
         */
        this.getOrElse = function (other) {
            return this.isEmpty() ? other : _value ;
        };

        /**
         * To String ...
         * @returns {string}
         */
        this.toString = function() {
            return this.isEmpty() ? "Optional.empty()" : "Optional("+_value.toString()+")";
        };

    }

    /**
     * return immutable empty option
     */
    function empty() {
        return Object.freeze(new Option());
    }

    /**
     * return immutable non empty option
     */
    function of(val) {
        if (val === undefined || val === null) {
            throw new Error('NoSuchElementError');
        }
        return Object.freeze(new Option(val));
    }

    /**
     * return immutable option
     */
    function ofNullable(val) {
        var inst = val !== null && val !== undefined  ? of(val) : empty();
        return Object.freeze(inst);
    }

    return {
        empty: empty,
        of: of,
        ofNullable: ofNullable
    }
});
