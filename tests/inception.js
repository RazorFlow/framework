require(["prop/propertybase", "prop/propertylist"], function(PropertyBase, PropertyList) {
function Level1Props () {
        PropertyBase.call (this);

        this.register ({
            foo: null,
            l2: new Level2Props (),
            l2arr: new PropertyList (Level2Props)
        })
    }

    function Level2Props () {
        PropertyBase.call (this);

        this.register ({
            bar: 10,
            l3: new Level3Props (),
            l3arr: new PropertyList (Level3Props)
        })
    }

    function Level3Props () {
        PropertyBase.call (this);

        this.register ({
            item: null
        })
    }
    
    function Level4Props () {
        PropertyBase.call (this);

        this.register ({
            item: null,
            item2: null
        })
    }
    describe ("Propertybase Tests", function() {
        var l1, l2, l3;
        beforeEach(function() {
            l1 = new Level1Props ();
            l1.setValue ('foo', 40);
            l1.setValue ('l2.bar', 50);
            l1.setValue ('l2.l3.item', 50);
            
            l2 = new Level2Props ();
            l2.setValue ('bar', 42);
            
            l3 = new Level3Props ();
            l3.setValue ('item', 43);
            
            l1.pushItemToList('l2arr', l2);
            l1.pushItemToList ('l2arr', {
                bar: 51,
                l3: {
                    item: 52
                },
                l3arr: [
                    {
                        item: 53
                    }
                ]
            })
            l1.pushItemToList('l2arr[0].l3arr', l3);
        });
        it("Should pushItemToList out an object", function() {
            var x = new Level1Props();
        });

        it("Should setValue and getValue values", function() {
            var x = new Level1Props();
            x.setValue ("foo", 42);
            x.setValue ("l2.bar", 45);
            x.setValue ("l2.l3.item", 46);

            expect(x.getValue("foo")).toBe(42);
            expect(x.getValue("l2.bar")).toBe(45);
            expect(x.getValue("l2.l3.item")).toBe(46);
        });
        
        it ("Should pushItemToList and pop values", function() {
            var x = new Level1Props ();
            
            var x1 = new Level2Props ();
            x1.setValue ('bar', 42);
            
            var x2 = new Level2Props ();
            x2.setValue ('bar', 43);
            
            x.pushItemToList('l2arr', x1);
            x.pushItemToList('l2arr', x2);
            
            expect(x.getValue("l2arr[0].bar")).toBe(42);
            expect(x.getValue("l2arr[1].bar")).toBe(43);
        });
        
        it ("Should setValue values deep inside a proplist", function() {
            var x = new Level1Props ();
            
            var x1 = new Level2Props ();
            x1.setValue ('bar', 42);
            
            var x2 = new Level3Props ();
            x2.setValue ('item', 43);
            
            x.pushItemToList('l2arr', x1);
            x.pushItemToList('l2arr[0].l3arr', x2);
            
            expect(x.getValue("l2arr[0].bar")).toBe(42);
            expect(x.getValue("l2arr[0].l3arr[0].item")).toBe(43);
        });
        
        it ("Should let us setValue values deep", function () {
            l1.setValue ("l2arr[0].bar", 52);
            l1.setValue ("l2arr[0].l3arr[0].item", 53);
            
            expect(l1.getValue("l2arr[0].bar")).toBe(52);
            expect(l1.getValue("l2arr[0].l3arr[0].item")).toBe(53);
        });
        it ("Should shallow-subscribe to values", function () {
            var l1spy = jasmine.createSpy ("l1spy");
            l1.subscribe ("foo", l1spy);
            
            // Now change the value, triggering the callback
            l1.setValue("foo", 75);
            
            expect(l1spy).toHaveBeenCalled ();
            expect(l1spy).toHaveBeenCalledWith (75, 40);
        });
        
        it ("Deep subscribe from root object", function () {
            var l2spy = jasmine.createSpy ("l2spy");
            
            l1.subscribe ("l2arr[0].bar", l2spy);
            
            l1.setValue("l2arr[0].bar", 75);
            expect (l2spy).toHaveBeenCalled();
            expect(l2spy).toHaveBeenCalledWith (75, 42);
            
            l2.setValue ('bar', 85);
            expect (l2spy).toHaveBeenCalled();
            expect(l2spy).toHaveBeenCalledWith (85, 75);
        });
        
        it ("triggers events on pushItemToList", function () {
            var l2spy = jasmine.createSpy ("l2spy");
            
            l1.subscribe ("l2arr", l2spy);
            
            var newItem = new Level2Props();
            l1.pushItemToList ('l2arr', newItem);
            expect (l2spy).toHaveBeenCalled();
            expect(l2spy).toHaveBeenCalledWith (newItem, null);
            
        });

        
        it ("works with setObject", function() {
            var x1 = new Level1Props();
            
            x1.setRootObject ({
                foo: 42,
                l2: {
                    bar: 50,
                    l3: {
                        item: 56
                    }
                },
                l2arr: [
                {
                    bar: 45,
                    l3arr: [
                    {
                        item: 46
                    }
                    ]
                }
                ]
            });
            
            expect (x1.getValue ('foo')).toBe (42);
            expect (x1.getValue ('l2.bar')).toBe (50);
            expect (x1.getValue ('l2.l3.item')).toBe (56);
        });
        
        it ("gets the root object", function() {
            var obj1 = l1.getRootObject ();
            
            expect (obj1['foo']).toBe (40)
            expect (obj1['l2']['bar']).toBe (50)
            expect (obj1['l2']['l3']['item']).toBe (50)
            
            expect (obj1['l2arr'][0]['l3arr'][0]['item']).toBe (43);
            expect (obj1['l2arr'][1]['l3arr'][0]['item']).toBe (53);
        });
        
        it ("Works with keyed arrays", function () {
            var x1 = new Level1Props ();
            
            var x21 = new Level2Props ();
            x21.setValue ('bar', 42);
            
            x1.addItemToList ('l2arr', 'p1', x21);
            x1.addItemToList ('l2arr', 'p2', {
                bar: 43
            });
            
            expect (x1.getValue ('l2arr[p1].bar')).toBe (42);
            expect (x1.getValue ('l2arr[p2].bar')).toBe (43);
        });
        
        it("Performs list subscribe with push", function() {
            var x1 = new Level1Props ();
            x1.setRootObject ({
                l2arr: [
                    {bar: 42},
                    {bar: 43}
                ]
            });
            
            var initSpy = jasmine.createSpy('initSpy')
            var updateSpy = jasmine.createSpy('updateSpy')
            
            x1.listSubscribe("l2arr", {
                init: initSpy,
                update: updateSpy
            });
            
            // expect (initSpy.calls.length).toBe (2);
            // expect (initSpy.calls[0].args[1].bar).toBe (42);
            // expect (initSpy.calls[1].args[1].bar).toBe (43);
            
            // x1.pushItemToList ('l2arr', {bar: 44});
            // expect (initSpy.calls.length).toBe (3);
            // expect (initSpy.calls[2].args[1].bar).toBe (44);
            
            // x1.setValue ('l2arr[1].bar', 45);
            // expect(updateSpy).toHaveBeenCalled();
            // expect (updateSpy.calls[0].args[0]).toBe (1);
            // expect (updateSpy.calls[0].args[1].bar).toBe (45);
        });
        it("Performs list subscribe with add", function() {
            var x1 = new Level1Props ();
            x1.setRootObject ({
                l2arr:{
                    alpha:{bar: 42},
                    beta:{bar: 43}
                }
            });
            
            var initSpy = jasmine.createSpy('initSpy')
            var updateSpy = jasmine.createSpy('updateSpy')
            
            x1.listSubscribe("l2arr", {
                init: initSpy,
                update: updateSpy
            });
            
            // expect (initSpy.calls.length).toBe (2);
            // expect (initSpy.calls[0].args[0]).toBe ('alpha');
            // expect (initSpy.calls[1].args[0]).toBe ('beta');
            
            // expect (initSpy.calls[0].args[1].bar).toBe (42);
            // expect (initSpy.calls[1].args[1].bar).toBe (43);
            
            // x1.addItemToList ('l2arr','gamma', {bar: 44});
            // expect (initSpy.calls.length).toBe (3);
            // expect (initSpy.calls[2].args[0]).toBe ('gamma');
            // expect (initSpy.calls[2].args[1].bar).toBe (44);
            
            // x1.setValue ('l2arr[beta].bar', 45);
            // expect(updateSpy).toHaveBeenCalled();
            // expect (updateSpy.calls[0].args[0]).toBe ('beta');
            // expect (updateSpy.calls[0].args[1].bar).toBe (45);
        });

        it("Checks that things are set ", function() {
            var x1 = new Level4Props ();
            
            x1.setValue ('item', 42);
            
            expect (x1.isSet('item')).toBe(true);
            expect (x1.isSet('item2')).toBe(false);
        });
        
        it("Resets in a list", function() {
            var x1 = new Level1Props ();
            x1.setRootObject ({
                l2arr:{
                    alpha:{bar: 42},
                    beta:{bar: 43}
                }
            }); 
            
            x1.resetKeyInAll ("l2arr", "bar");
            
            expect(x1.getValue("l2arr[alpha].bar")).toBe (10);
            expect(x1.getValue("l2arr[beta].bar")).toBe (10);
        });
        
        // it ("SetValue works responsively", function() {
        //     var x1 = new Level1Props ();
            
        //     x1.setValue ("foo", {
        //         xs: 42,
        //         sm: 43
        //     });
        //     x1.setValue ("l2.bar", {
        //         xs: 44,
        //         sm: 45
        //     });
            
        //     // override the media for testing
        //     window.device.media = "xs";
        //     expect(x1.getValue("foo")).toBe (42);
        //     expect(x1.getValue("l2.bar")).toBe (44);
            
        //     var rootObj = x1.getRootObject();
        //     expect(rootObj.foo).toBe(42);
        //     expect(rootObj.l2.bar).toBe(44);
            
        //     window.device.media = "sm";
        //     expect(x1.getValue("foo")).toBe (43);
        //     expect(x1.getValue("l2.bar")).toBe (45);
            
        //     var rootObj = x1.getRootObject();
        //     expect(rootObj.foo).toBe(43);
        //     expect(rootObj.l2.bar).toBe(45);
        // });
        
        // it("setRootObject works responsively", function() {
        //     var x1 = new Level1Props ();
            
        //     x1.setRootObject({
        //         foo: {
        //             xs: 42,
        //             sm: 43
        //         },
        //         l2: {
        //             bar: {
        //                 xs: 44,
        //                 sm: 45
        //             }
        //         }
        //     });
            
        //     // override the media for testing
        //     window.device.media = "xs";
        //     expect(x1.getValue("foo")).toBe (42);
        //     expect(x1.getValue("l2.bar")).toBe (44);
            
        //     var rootObj = x1.getRootObject();
        //     expect(rootObj.foo).toBe(42);
        //     expect(rootObj.l2.bar).toBe(44);
            
        //     window.device.media = "sm";
        //     expect(x1.getValue("foo")).toBe (43);
        //     expect(x1.getValue("l2.bar")).toBe (45);
            
        //     var rootObj = x1.getRootObject();
        //     expect(rootObj.foo).toBe(43);
        //     expect(rootObj.l2.bar).toBe(45);
        // });

        // it("even deeper propbases are responsive", function() {
        //     var x1 = new Level1Props ();
            
        //     x1.setRootObject({
        //         foo: {
        //             xs: 42,
        //             sm: 43
        //         },
        //         l2: {
        //             xs: {bar: 44},
        //             sm: {bar: 45}
        //         }
        //     });
            
        //     // override the media for testing
        //     window.device.media = "xs";
        //     expect(x1.getValue("foo")).toBe (42);
        //     expect(x1.getValue("l2.bar")).toBe (44);
            
        //     var rootObj = x1.getRootObject();
        //     expect(rootObj.foo).toBe(42);
        //     expect(rootObj.l2.bar).toBe(44);
            
        //     window.device.media = "sm";
        //     expect(x1.getValue("foo")).toBe (43);
        //     expect(x1.getValue("l2.bar")).toBe (45);
            
        //     var rootObj = x1.getRootObject();
        //     expect(rootObj.foo).toBe(43);
        //     expect(rootObj.l2.bar).toBe(45);
        // });

        // it("proplists are responsive using pushItemToList", function() {
        //     var x1 = new Level1Props ();
            
        //     x1.pushItemToList('l2arr', {
        //         bar: {
        //             xs: 42,
        //             sm: 43
        //         }
        //     });
        //     x1.pushItemToList('l2arr', {
        //         xs: {bar: 44},
        //         sm: {bar: 45}
        //     })
            
        //     // override the media for testing
        //     window.device.media = "xs";
        //     expect(x1.getValue("l2arr[0].bar")).toBe (42);
        //     expect(x1.getValue("l2arr[1].bar")).toBe (44);
            
        //     var rootObj = x1.getRootObject();
        //     expect(rootObj.l2arr[0].bar).toBe(42);
        //     expect(rootObj.l2arr[1].bar).toBe(44);
            
        //     window.device.media = "sm";
        //     expect(x1.getValue("l2arr[0].bar")).toBe (43);
        //     expect(x1.getValue("l2arr[1].bar")).toBe (45);
            
        //     var rootObj = x1.getRootObject();
        //     expect(rootObj.l2arr[0].bar).toBe(43);
        //     expect(rootObj.l2arr[1].bar).toBe(45);
        // })

        // it("proplists are responsive using setRootObject", function() {
        //     var x1 = new Level1Props ();
        //     x1.setRootObject({
        //         l2arr: [
        //             {
        //                 bar: {
        //                     xs: 42,
        //                     sm: 43
        //                 }
        //             },
        //             {
        //                 xs: {bar: 44},
        //                 sm: {bar: 45}
        //             }
        //         ]
        //     })
            
        //     // override the media for testing
        //     window.device.media = "xs";
        //     expect(x1.getValue("l2arr[0].bar")).toBe (42);
        //     expect(x1.getValue("l2arr[1].bar")).toBe (44);
            
        //     var rootObj = x1.getRootObject();
        //     expect(rootObj.l2arr[0].bar).toBe(42);
        //     expect(rootObj.l2arr[1].bar).toBe(44);
            
        //     window.device.media = "sm";
        //     expect(x1.getValue("l2arr[0].bar")).toBe (43);
        //     expect(x1.getValue("l2arr[1].bar")).toBe (45);
            
        //     var rootObj = x1.getRootObject();
        //     expect(rootObj.l2arr[0].bar).toBe(43);
        //     expect(rootObj.l2arr[1].bar).toBe(45);
        // })

        // TODO: Support this format as well..
        // 
        // it("proplists are responsive using setRootObject type 2", function() {
        //     var x1 = new Level1Props ();
        //     x1.setRootObject({
        //         l2arr: {
        //             xs: [{bar:42},{bar:44}],
        //             sm: [{bar:43},{bar:45}]
        //         }
        //     })
            
        //     // override the media for testing
        //     window.device.media = "xs";
        //     expect(x1.getValue("l2arr[0].bar")).toBe (42);
        //     expect(x1.getValue("l2arr[1].bar")).toBe (44);
            
        //     var rootObj = x1.getRootObject();
        //     expect(rootObj.l2arr[0].bar).toBe(42);
        //     expect(rootObj.l2arr[1].bar).toBe(44);
            
        //     window.device.media = "sm";
        //     expect(x1.getValue("l2arr[0].bar")).toBe (43);
        //     expect(x1.getValue("l2arr[1].bar")).toBe (45);
            
        //     var rootObj = x1.getRootObject();
        //     expect(rootObj.l2arr[0].bar).toBe(43);
        //     expect(rootObj.l2arr[1].bar).toBe(45);
        // })



        
    });

	window.jasmineEnv.execute();
});