define([], function () {
    var Assert = {
        /**
         * Assert if the object has a particlar key and it is a particular type
         * @param  {Object} obj The Object ob which assert is performed
         * @param  {String} key The Key which should be present
         * @param  {String} type The type of the property
         */
        assertKey: function (obj, key, type, msg1, msg2) {
            if(typeof obj[key] === 'undefined') {
                msg1 = msg1 || "Expected " + obj + " to have key `" + key + "`";
                msg2 = msg2 || "Expected " + obj[key] + " to be of type " + type;
                Assert.fail(msg1);

                if(typeof type!== 'undefined' && typeof obj[key] !== type) {
                    Assert.fail(msg2);
                }
            }
        },

        fail: function (msg) {
            throw 'Assert Failed : ' + msg;
        }
    };

    return Assert;
});