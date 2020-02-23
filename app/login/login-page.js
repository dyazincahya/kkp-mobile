const toastModule = require("nativescript-toast");

const SecureStorage = require("nativescript-secure-storage").SecureStorage;
var ssModule = new SecureStorage();

const LoadingIndicatorModule = require('@nstudio/nativescript-loading-indicator').LoadingIndicator;
const xLoading = new LoadingIndicatorModule();

const xViewModel = require("../global-model");
var GetModel = new xViewModel([]);

var context, framePage; 

function reset_form(){
    context.set("email", "");
    context.set("password", "");
}

exports.onLoaded = function(args) {
    framePage = args.object.frame;
};

exports.onNavigatingTo = function(args) {
    const page = args.object; 

    context = GetModel; 
    gUserdata = {};

    context.set("email", "k@example.com");
    context.set("password", "123");

    page.bindingContext = context;
};

exports.login = function(args) {
	let data = context;
	if(data.email == undefined && data.password == undefined){ 
		toastModule.makeText("Email dan password wajib diisi").show();
		return;
	} 

	let params = {
		email: data.email,
		password: data.password
	}; 
    gUserdata = {};
	xLoading.show(gConfig.loadingOption);
	GetModel.signin(params).then(function (result){
        if(result.success == true){
            console.log(result.data);
        	gUserdata = result.data;
            if(result.data.user_role == "admin"){
                framePage.navigate({
    		        moduleName: "bottom/bottom-admin-page",
                    clearHistory: true,
    		        animated: true,
    		        transition: {
    		            name: "fade"
    		        }
    		    });
            } else {
                framePage.navigate({
                    moduleName: "bottom/bottom-page",
                    clearHistory: true,
                    animated: true,
                    transition: {
                        name: "fade"
                    }
                });
            }
        } else {
            alert(result.message);
        }
        xLoading.hide();
    });
}

exports.signup = function() {
    framePage.navigate({
        moduleName: "signup/signup-page",
        animated: true,
        transition: {
            name: "fade"
        }
    });
};

exports.forgotpassword = function() {
    framePage.navigate({
        moduleName: "forgot-password/forgot-password-page",
        animated: true,
        transition: {
            name: "fade"
        }
    });
};
