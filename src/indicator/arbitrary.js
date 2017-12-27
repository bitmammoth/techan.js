'use strict';

module.exports = function(indicatorMixin, accessor_ohlc) {  // Injected dependencies
  return function(n) { // Closure function

    var p = {};  // Container for private, direct access mixed in variables

    if(arguments.length === 1) p.name = n;

    function indicator(data) {
      return data.map(ma).filter(function(d) { return d.value !== null; });
    }

    function ma(d, i) {
      var value;
      if (typeof p.name != 'undefined') {
        value = p.accessor(d, p.name);
      } else {
        value = p.accessor(d);
      }
      return { date: p.accessor.d(d), value: value };
    }

    // Mixin 'superclass' methods and variables
    indicatorMixin(indicator, p)
      .accessor(accessor_ohlc());

    return indicator;
  };
};