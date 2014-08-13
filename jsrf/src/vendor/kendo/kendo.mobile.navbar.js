/**
 * Copyright 2014 Telerik AD
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function(f, define){
    define([ "./kendo.core" ], f);
})(function(){

(function($, undefined) {
    var kendo = window.kendo,
        mobile = kendo.mobile,
        ui = mobile.ui,
        roleSelector = kendo.roleSelector,
        Widget = ui.Widget;

    function createContainer(align, element) {
        var items = element.find("[" + kendo.attr("align") + "=" + align + "]");

        if (items[0]) {
            return $('<div class="km-' + align + 'item" />').append(items).prependTo(element);
        }
    }

    function toggleTitle(centerElement) {
        var siblings = centerElement.siblings(),
            noTitle = !!centerElement.children("ul")[0],
            showTitle = (!!siblings[0] && $.trim(centerElement.text()) === "");

        centerElement.prevAll().toggleClass("km-absolute", noTitle);
        centerElement.toggleClass("km-show-title", showTitle);
        centerElement.toggleClass("km-fill-title", showTitle && !$.trim(centerElement.html()));
        centerElement.toggleClass("km-no-title", noTitle);
        centerElement.toggleClass("km-hide-title", centerElement.css("visibility") == "hidden" && !siblings.children().is(":visible"));
    }

    var NavBar = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            element = that.element;

            that.container().bind("show", $.proxy(this, "refresh"));

            element.addClass("km-navbar").wrapInner($('<div class="km-view-title km-show-title" />'));
            that.leftElement = createContainer("left", element);
            that.rightElement = createContainer("right", element);
            that.centerElement = element.find(".km-view-title");
        },

        options: {
            name: "NavBar"
        },

        title: function(value) {
            this.element.find(roleSelector("view-title")).text(value);
            toggleTitle(this.centerElement);
        },

        refresh: function(e) {
            var view = e.view;
            if (view.options.title) {
                this.title(view.options.title);
            } else {
                toggleTitle(this.centerElement);
            }
        },

        destroy: function() {
            Widget.fn.destroy.call(this);
            kendo.destroy(this.element);
        }
    });

    ui.plugin(NavBar);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });