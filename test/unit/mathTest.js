
// https://martinfowler.com/articles/microservice-testing/

// Testy komponentowe - mikro usługi

const assert = require('assert');

describe('Math in JS', function () {

    it('should support addition', function (done) {
        

        setTimeout(function() {
        	assert.equal(1 + 1, 2);	
        	done();

        }, 1000);

    });

});
