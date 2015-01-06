'use strict';

(function() {
    $(function () {
        registerEventHandler();
        showLoginRegisterView();
    });



//-----------------------------------EVENTHANDLER---------------------------------------------------

    function registerEventHandler(){
        $("#btnShowListOfGames").click(showGameListView);
        $("#btnRegisterView").click(showRegisterView);
        $("#btnLoginView").click(showLoginView);
        $("#btnRegisterLogin").click(showLoginView);
        $("#btnLoginRegister").click(showRegisterView);
        $("#register-button").click(registerClicked);
        $("#login-button").click(loginClicked);
    }



//-----------------------------------VIEWS---------------------------------------------------

   function showLoginRegisterView(){
       $("#loginRegisterMenu").show();
       $("#registerUser").hide();
       $("#loginUser").hide();
       $("#gameListDisplay").hide();
       $("#gameListDisplayLogin").hide();
   }

   function showRegisterView(){
        $("#loginRegisterMenu").hide();
        $("#registerUser").show();
       $("#loginUser").hide();
       $("#gameListDisplay").hide();
       $("#gameListDisplayLogin").hide();
    }

    function showLoginView(){
        $("#loginRegisterMenu").hide();
        $("#registerUser").hide();
        $("#loginUser").show();
        $("#gameListDisplay").hide();
        $("#gameListDisplayLogin").hide();
    }

    function showGameListView(){
        $("#loginRegisterMenu").show();
        $("#registerUser").hide();
        $("#loginUser").hide();
        $("#gameListDisplay").show();
        $("#gameListDisplayLogin").hide();
        //TODO
    }


   function showLoginGameList(){
       $("#loginRegisterMenu").hide();
       $("#registerUser").hide();
       $("#loginUser").hide();
       $("#gameListDisplay").hide();
       $("#gameListDisplayLogin").show();
       var currentUser = userSession.getCurrentUser();
       $("body > header span").text(" -" + currentUser.username);
   }
    //------------------------REGISTER--------------




    function registerClicked() {
        var username = $("#username").val();
        var firstPassword = $("#password").val();
        var confirmPassword = $("#confirm-password").val();
        var password;
        if (firstPassword == confirmPassword) {
            var password = firstPassword;
        }
        else{
            showErrorMsg("Password does not match.");
        }
        ajaxRequester.register(username, password,
            function (data) {
                data.username = username;
                authSuccess(data);
            },
            registerError);

    }


    function registerError(){
        showErrorMsg("Register failed.");
    }




    //----------------------LOGIN-------------------




    function loginClicked(){
        var username = $("#loginUsername").val();
        var password = $("#loginPassword").val();
        ajaxRequester.login(username, password, authSuccess, loginError);
    }

    function loginError(){
        showErrorMsg("Login failed.");
    }

    //-------------------AUTHENTICATION------------------






    function authSuccess(data){
        showInfoMsg("SUCCESS.");
        userSession.login(data);
        showLoginGameList();

    }





    //------------------------MSG---------------------





    function showInfoMsg(msg){
      alert(msg);
    }

    function showErrorMsg(msg){
       alert(msg);
    }
}());
