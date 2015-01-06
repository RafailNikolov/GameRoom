'use strict';

var ajaxRequester = (function() {
    var baseUrl = "https://api.parse.com/1/";

    var headers =
    {
        "X-Parse-Application-Id": "WD0bap12kLBCkXMudCArRPKRz5th9WhBzgY1TboN",
        "X-Parse-REST-API-Key": "QHYi3x4SiS5j6SjKzfINmF9XAFQ8O85gfMr6xNCM"
    };

    var login = function(username, password, success, error){
        jQuery.ajax({
            method: "GET",
            headers: headers,
            url: baseUrl + "login",
            data: {username: username, password: password},
            success: success,
            error: error
        });
    }

    function register(username, password, success, error){
        jQuery.ajax({
            method: "POST",
            headers: headers,
            url: baseUrl + "users",
            data: JSON.stringify({username: username, password: password}),
            success: success,
            error: error
        });
    }

    return {
        login: login,
        register: register
    };


}());
