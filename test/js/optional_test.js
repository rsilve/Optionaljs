/**
 * Created by robert on 27/03/15.
 */

var should = require('should');
var Optional = require('../../src/js/optional');

describe('Optional', function(){

    describe('#empty()', function(){
        it('should return an immutable empty option', function(){
            Optional.empty().isEmpty().should.be.true;
            Optional.empty().map(function() {return false}).getOrElse(true).should.be.true;
            var o = Optional.empty();
            o.newProperty = function() {};
            o.should.not.have.properties('newProperty')
        })
    });

    describe('#of()', function(){
        it('should return an immutable not empty option', function(){
            Optional.of(1).isEmpty().should.be.false;
            Optional.of(1).get().should.be.equal(1);
            Optional.of(1).map(function() {return true}).getOrElse(false).should.be.true;
            (function() {Optional.of(null)}).should.be.throw();
            var o = Optional.of(1);
            o.newProperty = function() {};
            o.should.not.have.properties('newProperty')
        })
    });

    describe('#ofNullable()', function(){
        it('should return an immutable not empty option given a not null value', function(){
            Optional.ofNullable(1).isEmpty().should.be.false;
            Optional.ofNullable(1).get().should.be.equal(1);
            Optional.ofNullable(1).map(function() {return true}).getOrElse(false).should.be.true;
            var o = Optional.ofNullable(1);
            o.newProperty = function() {};
            o.should.not.have.properties('newProperty')
        });
        it('should return an  empty option given a null value', function(){
            Optional.ofNullable(null).isEmpty().should.be.true;
            Optional.ofNullable(null).map(function() {return false}).getOrElse(true).should.be.true;
        })
    });

    describe('#map()', function(){
        it('should have a map method that transform an option in option', function(){
            Optional.of(1).map(function(v) {return v+1}).getOrElse(0).should.be.equal(2);
        })
    });

    describe('#flatten()', function(){
        it('should have a flatten method that flatten an option  of option in option', function(){
            Optional.of(Optional.of(1)).flatten().get().should.be.equal(1);
            Optional.of(Optional.empty()).flatten().isEmpty().should.be.true;
            (function() { Optional.of(1).flatten()}).should.throw;
        })
    });

    describe('#flatMap()', function(){
        it('should have a flatMap method that transform an option  of option in option', function(){
            Optional.of(1).flatMap(function(v) {return Optional.of(v+1)}).getOrElse(0).should.be.equal(2);
            (function() {Optional.of(1).flatMap(function(v) {return v+1})}).should.throw;
        })
    });

    describe('#get()', function(){
        it('should have a get method that return value of not empty option', function(){
            Optional.of(1).get().should.be.equal(1);
            (function() { Optional.empty().get() }).should.throw()
        })
    });

    describe('#getOrElse()', function(){
        it('should have a getOrElse method that return value for empty option', function(){
            Optional.empty().getOrElse(1).should.be.equal(1);
            Optional.of(1).getOrElse(2).should.be.equal(1);
        })
    });


});