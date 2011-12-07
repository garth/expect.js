/*!
 * Expect.js
 * Copyright(c) 2011 Garth Williams <garth@wi.llia.ms>
 * MIT Licensed
 *
 * Expect.js is derrived from Should.js by TJ Holowaychuk <tj@vision-media.ca>
 */

(function (exports) {

  // Taken from node's assert module, because it sucks
  // and exposes next to nothing useful.

  function deepEqual(actual, expected) {
    // 7.1. All identical values are equivalent, as determined by ===.
    if (actual === expected) {
      return true;

    // 7.2. If the expected value is a Date object, the actual value is
    // equivalent if it is also a Date object that refers to the same time.
    } else if (actual instanceof Date && expected instanceof Date) {
      return actual.getTime() === expected.getTime();

    // 7.3. Other pairs that do not both pass typeof value == "object",
    // equivalence is determined by ==.
    } else if (typeof actual != 'object' && typeof expected != 'object') {
      return actual == expected;

    // 7.4. For all other Object pairs, including Array objects, equivalence is
    // determined by having the same number of owned properties (as verified
    // with Object.prototype.hasOwnProperty.call), the same set of keys
    // (although not necessarily the same order), equivalent values for every
    // corresponding key, and an identical "prototype" property. Note: this
    // accounts for both named and indexed properties on Arrays.
    } else {
      return objEquiv(actual, expected);
    }
  }

  function isUndefinedOrNull (value) {
    return value === null || value === undefined;
  }

  function isArguments (object) {
    return Object.prototype.toString.call(object) == '[object Arguments]';
  }

  function objEquiv (a, b) {
    if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
      return false;
    // an identical "prototype" property.
    if (a.prototype !== b.prototype) return false;
    //~~~I've managed to break Object.keys through screwy arguments passing.
    //   Converting to array solves the problem.
    if (isArguments(a)) {
      if (!isArguments(b)) {
        return false;
      }
      a = pSlice.call(a);
      b = pSlice.call(b);
      return _deepEqual(a, b);
    }
    try{
      var ka = Object.keys(a),
        kb = Object.keys(b),
        key, i;
    } catch (e) {//happens when one is a string literal and the other isn't
      return false;
    }
    // having the same number of owned properties (keys incorporates hasOwnProperty)
    if (ka.length != kb.length)
      return false;
    //the same set of keys (although not necessarily the same order),
    ka.sort();
    kb.sort();
    //~~~cheap key test
    for (i = ka.length - 1; i >= 0; i--) {
      if (ka[i] != kb[i])
        return false;
    }
    //equivalent values for every corresponding key, and
    //~~~possibly expensive deep test
    for (i = ka.length - 1; i >= 0; i--) {
      key = ka[i];
      if (!_deepEqual(a[key], b[key] ))
         return false;
    }
    return true;
  }

  function i (x) {
    return x.toString();
  }

  var AssertionError = function (error)
  {
    this.message = error.message;
    this.toString = function() { return this.message; }
  }

  var Assertion = function(obj, desc) {
    this.obj = obj;

    //default options
    this.negate = false;
    this.includes = false;
    this.desc = desc || obj.toString();

    var modify = function(assertion, options) {
      var ModifiedAssertion = function() {};
      ModifiedAssertion.prototype = assertion;
      var modifiedAssertion = new ModifiedAssertion();
      var option;
      for (option in options)
      {
        modifiedAssertion[option] = options[option];
      }
      return modifiedAssertion;
    }

    //behavioural changing properties
    this.not = modify(this, { negate: true });
    this.include = modify(this, { includes: true });

    //add some sugar
    this.to = this;
    this.be = this;
    this.have = this;
    this.an = this;
    this.it = this;
    this.should = this;

    //chaining sugar
    this.and = this;
    this.with = this;

    //do some testing
    this.assert = function(expr, msg, negatedMsg){
      var msg = this.negate ? negatedMsg : msg
        , ok = this.negate ? !expr : expr;
      if (!ok) {
        throw new AssertionError({
            message: msg
        });
      }
    };

    this.exist = function(msg) {
      this.assert(null != obj,
        msg || ('expected ' + this.desc + ' to exist'),
        msg || ('expected ' + this.desc + ' to not exist'));
      return this;
    };

    this.empty = function(msg) {
      expect(this.obj).to.have.a.property('length');
      this.assert(
          0 === this.obj.length
        , msg || ('expected ' + this.desc + ' to be empty')
        , msg || ('expected ' + this.desc + ' not to be empty'));
      return this;
    };

    this.arguments = function(msg) {
      this.assert(
          '[object Arguments]' == Object.prototype.toString.call(this.obj)
        , msg || ('expected ' + this.desc + ' to be arguments')
        , msg || ('expected ' + this.desc + ' to not be arguments'));
      return this;
    };

    this.ok = function(msg) {
      this.assert(
          this.obj
        , msg || ('expected ' + this.desc + ' to be truthy')
        , msg || ('expected ' + this.desc + ' to be falsey'));
      return this;
    };

    this.true = function(msg) {
      this.assert(
          true === this.obj
        , msg || ('expected ' + this.desc + ' to be true')
        , msg || ('expected ' + this.desc + ' not to be true'));
      return this;
    };

    this.false = function(msg) {
      this.assert(
          false === this.obj
        , msg || ('expected ' + this.desc + ' to be false')
        , msg || ('expected ' + this.desc + ' not to be false'));
      return this;
    };

    this.eql = function(val, msg) {
      this.assert(
          deepEqual(val, this.obj)
        , msg || ('expected ' + this.inspect + ' to equal ' + i(val))
        , msg || ('expected ' + this.inspect + ' to not equal ' + i(val)));
      return this;
    };

    this.equal = function(val, msg) {
      this.assert(
          val === this.obj
        , msg || ('expected ' + this.desc + ' to equal ' + i(val))
        , msg || ('expected ' + this.desc + ' to not equal ' + i(val)));
      return this;
    };

    this.within = function(start, finish, msg) {
      var range = start + '..' + finish;
      this.assert(
          this.obj >= start && this.obj <= finish
        , msg || ('expected ' + this.desc + ' to be within ' + range)
        , msg || ('expected ' + this.desc + ' to not be within ' + range));
      return this;
    };

    this.a = function(type, msg) {
      this.assert(
          type == typeof this.obj
        , msg || ('expected ' + this.desc + ' to be a ' + type)
        , msg || ('expected ' + this.desc + ' not to be a ' + type));
      return this;
    };

    this.instanceof = function(constructor, msg) {
      var name = constructor.name;
      this.assert(
          this.obj instanceof constructor
        , msg || ('expected ' + this.desc + ' to be an instance of ' + name)
        , msg || ('expected ' + this.desc + ' not to be an instance of ' + name));
      return this;
    };

    this.above = function(n, msg) {
      this.assert(
          this.obj > n
        , msg || ('expected ' + this.desc + ' to be above ' + n)
        , msg || ('expected ' + this.desc + ' to be below ' + n));
      return this;
    };
    this.greaterThan = this.above;
    
    this.below = function(n, msg) {
      this.assert(
          this.obj < n
        , msg || ('expected ' + this.desc + ' to be below ' + n)
        , msg || ('expected ' + this.desc + ' to be above ' + n));
      return this;
    };
    this.lessThan = this.below;

    this.match = function(regexp, msg) {
      this.assert(
          regexp.exec(this.obj)
        , msg || ('expected ' + this.desc + ' to match ' + regexp)
        , msg || ('expected ' + this.desc + ' not to match ' + regexp));
      return this;
    };
    
    this.length = function(n, msg) {
      expect(this.obj).to.have.property('length');
      var len = this.obj.length;
      this.assert(
          n == len
        , msg || ('expected ' + this.desc + ' to have a length of ' + n + ' but got ' + len)
        , msg || ('expected ' + this.desc + ' to not have a length of ' + len));
      return this;
    };
    this.lengthOf = this.length;

    this.string = function(str, msg) {
      expect(this.obj).to.be.a('string');
      this.assert(
          ~this.obj.indexOf(str)
        , msg || ('expected ' + this.desc + ' to include ' + i(str))
        , msg || ('expected ' + this.desc + ' to not include ' + i(str)));
      return this;
    };

    this.object = function(obj, msg) {
      expect(this.obj).to.be.a('object');
      var included = true;
      for (var key in obj) {
        if (obj.hasOwnProperty(key) && !deepEqual(obj[key], this.obj[key])) {
          included = false;
          break;
        }
      }
      this.assert(
          included
        , msg || ('expected ' + this.desc + ' to include ' + i(obj))
        , msg || ('expected ' + this.desc + ' to not include ' + i(obj)));
      return this;
    };

    this.property = function(name, msg) {
      this.assert(
          undefined !== this.obj[name]
        , msg || ('expected ' + this.desc + ' to have a property ' + i(name))
        , msg || ('expected ' + this.desc + ' to not have a property ' + i(name)));
      //change the context to the given property of obj.this
      return new Assertion(this.obj[name], this.desc + ' (#' + name + ')');
    };

    this.ownProperty = function(name, msg) {
      this.assert(
          this.obj.hasOwnProperty(name)
        , msg || ('expected ' + this.desc + ' to have own property ' + i(name))
        , msg || ('expected ' + this.desc + ' to not have own property ' + i(name)));
      return this;
    };

    this.contain = function(obj, msg) {
      expect(this.obj).to.be.an.instanceof(Array);
      this.assert(
          ~this.obj.indexOf(obj)
        , msg || ('expected ' + this.desc + ' to contain ' + i(obj))
        , msg || ('expected ' + this.desc + ' to not contain ' + i(obj)));
      return this;
    };

    this.keys = function(keys, msg) {
      var str
        , ok = true;

      if (!keys.length) throw new Error('keys required');

      var actual = Object.keys(this.obj)
        , len = keys.length;

      // Inclusion
      ok = keys.every(function(key){
        return ~actual.indexOf(key);
      });

      // Strict
      if (!this.negate && !this.includes) {
        ok = ok && keys.length == actual.length;
      }

      // Key string
      if (len > 1) {
        keys = keys.map(function(key){
          return i(key);
        });
        var last = keys.pop();
        str = keys.join(', ') + ', and ' + last;
      } else {
        str = i(keys[0]);
      }

      // Form
      str = (len > 1 ? 'keys ' : 'key ') + str;

      // Have / include
      str = (this.includes ? 'include ' : 'have ') + str;

      // Assertion
      this.assert(
          ok
        , msg || ('expected ' + this.desc + ' to ' + str)
        , msg || ('expected ' + this.desc + ' to not ' + str));

      return this;
    };
    this.key = this.keys;

    this.respondTo = function(method, desc) {
      this.assert(
        'function' == typeof this.obj[method]
        , msg || ('expected ' + this.desc + ' to respond to ' + method + '()')
        , msg || ('expected ' + this.desc + ' to not respond to ' + method + '()'));
      return this;
    };
  }

  exports.expect = function(obj, desc) {
    return new Assertion(obj, desc);
  };

})(window);
