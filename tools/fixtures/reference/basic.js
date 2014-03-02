define([
    "core/rfclass"
], function (RFClass) {
    function Dashboard () {
        RFClass.call(this);

        var self = this,
            base = {},
            Public,
            raw = self._raw,
            Protected,
            pro = self.pro,
            _bp = {};

        Public = {

        };

        Protected = {

        };


        raw._registerClassName("Dashboard");
        raw._registerPublic(base, Public);
        raw._registerProtected (_bp, Protected);
    }

    return Dashboard;
});