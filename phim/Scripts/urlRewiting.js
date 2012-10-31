$.fn.urlComponentToObject = function(ucStr, paramSeparator, nameValueSeparator) {
    var o = new Object;
    if (ucStr) {
        if (!paramSeparator) paramSeparator = "&";
        if (!nameValueSeparator) nameValueSeparator = "=";
        var params = ucStr.split(paramSeparator);
        for (var i = 0; i < params.length; i++) {
            var a = params[i].split(nameValueSeparator);
            var n = decodeURIComponent(a[0] ? a[0] : "");
            var v = decodeURIComponent(a[1] ? a[1] : "");
            if (v.match(/^0$|^[1-9]\d*$/))
                v = parseInt(v);
            if (typeof o[n] == "undefined")
                o[n] = v;
            else {
                if (typeof o[n] != "object") {
                    var t = o[n];
                    o[n] = new Array;
                    o[n].push(t);
                }
                o[n].push(v);
            }
        }
    }
    return o;
};

$.fn.getURLHashParamsAsObject = function(url, paramSeparator, nameValueSeparator) {
    var i;
    if (url && (i = url.search("#")) >= 0)
        return $.fn.urlComponentToObject(url.substr(i + 1), paramSeparator, nameValueSeparator);
    return new Object;
};

$.fn.getLocationHashParamsAsObject = function(paramSeparator, nameValueSeparator) {
    return $.fn.urlComponentToObject(window.location.hash.replace(/^#/, ""), paramSeparator, nameValueSeparator);
};

$.fn.getURLParamsAsObject = function(url) {
    var s;
    if (url && (s = url.match(/\?[^#]*/)) && s)
        return $.fn.urlComponentToObject(s[0].replace(/^\?/, ""));
    return new Object;
};

var params =$.fn.getURLHashParamsAsObject(window.location.hash);
//var params;
function sethash(hname, hvalue) 
{
    var hashstr = "";
    if (params) {
        eval('params.' + hname + '= "' + encodeURIComponent(hvalue) +'"');
        
        for (var i in params) 
        {
            hashstr = hashstr + i + '=' + params[i] + '&'
        }
        window.location.hash = hashstr.substr(0, hashstr.length - 1);
    }
}

function getHash(hname) 
{
    var hashstr = "";
    if (params) {
        for (var i in params) {
            if (i == hname) {
                hashstr = params[i];
                break;
            }
        }
    }
    return hashstr;
}

$.extend({
    getUrlVars: function() {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar: function(name) {
        return $.getUrlVars()[name];
    }
});