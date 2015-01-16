'use strict';

var gameApp = (function() {
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
        $("#btnLogout").click(logoutClicked);
        $("#btnGame1").click(snakeGameView);
        $("#btnGame2").click(tetrisGameView);
        $("#btnProfile").click(profileView);
        $("#btnGames").click(showLoginGameList);
    }



//-----------------------------------VIEWS---------------------------------------------------

   function showLoginRegisterView(){
       var currentUser = userSession.getCurrentUser();
       if(currentUser){
           showLoginGameList();
       }
       else {
           $("#loginRegisterMenu").show();
           $("#registerUser").hide();
           $("#loginUser").hide();
           $("#gameListDisplay").hide();
           $("#gameListDisplayLogin").hide();
           $("#profileView").hide();
       }
   }

   function showRegisterView(){
        $("#loginRegisterMenu").hide();
        $("#registerUser").show();
       $("#loginUser").hide();
       $("#gameListDisplay").hide();
       $("#gameListDisplayLogin").hide();
       $("#profileView").hide();

   }

    function showLoginView(){
        $("#loginRegisterMenu").hide();
        $("#registerUser").hide();
        $("#loginUser").show();
        $("#gameListDisplay").hide();
        $("#gameListDisplayLogin").hide();
        $("#profileView").hide();

    }

    function showGameListView(){
        $("#loginRegisterMenu").show();
        $("#registerUser").hide();
        $("#loginUser").hide();
        $("#gameListDisplay").show();
        $("#gameListDisplayLogin").hide();
        $("#profileView").hide();

    }


   function showLoginGameList(){
       $("#loginRegisterMenu").hide();
       $("#registerUser").hide();
       $("#loginUser").hide();
       $("#gameListDisplay").hide();
       $("#gameListDisplayLogin").show();
       $("#profileView").hide();
       var currentUser = userSession.getCurrentUser();
       $('#gameListDisplayLogin > span').text("User : " +currentUser.username);
       $('#userProfile').text('asfasfasfasfasf');

   }
   function snakeGameView(){
       $("#loginRegisterMenu").hide();
       $("#registerUser").hide();
       $("#loginUser").hide();
       $("#gameListDisplay").hide();
       $("#gameListDisplayLogin").hide();
       $("#canvas").show();
       $("#profileView").hide();
       snakeGame();
   }

    function tetrisGameView(){
        $("#loginRegisterMenu").hide();
        $("#registerUser").hide();
        $("#loginUser").hide();
        $("#gameListDisplay").hide();
        $("#gameListDisplayLogin").hide();
        $("#canvas").show();
        $("#profileView").hide();
        tetrisGame();
    }

    function profileView(){
        $("#profileView").show();
        $("#loginRegisterMenu").hide();
        $("#registerUser").hide();
        $("#loginUser").hide();
        $("#gameListDisplay").hide();
        $("#gameListDisplayLogin").hide();
        var currentUser = userSession.getCurrentUser();
        $("#userWelcome").text('Welcome ' + currentUser.username);
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


//------------------------LOGOUT-------------------------------


    function logoutClicked(){
        userSession.logout();
        showLoginRegisterView();

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
