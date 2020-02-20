const toastModule = require("nativescript-toast");

const SecureStorage = require("nativescript-secure-storage").SecureStorage;
var ssModule = new SecureStorage();

const LoadingIndicatorModule = require('@nstudio/nativescript-loading-indicator').LoadingIndicator;
const xLoading = new LoadingIndicatorModule();

const xViewModel = require("../global-model");
var GetModel = new xViewModel([]);

var context, framePage; 

exports.onLoaded = function(args) {
    framePage = args.object.frame;
};

exports.onNavigatingTo = function(args) {
    const page = args.object; 

    context = GetModel; 

    page.bindingContext = context;
};

exports.submit = function() {
	let data = context;
	if(data.email == undefined){ 
		toastModule.makeText("Email wajib diisi").show();
		return;
	} 

    if(data.email == ""){ 
        toastModule.makeText("Email wajib diisi").show();
        return;
    } 

	let params = {
		email: data.email
	};

	xLoading.show(gConfig.loadingOption);
	GetModel.forgot_password(params).then(function (result){
        if(result.success == true){
        	gUserdata = result.data;
            framePage.navigate({
		        moduleName: "login/login-page",
		        animated: true,
		        transition: {
		            name: "fade"
		        }
		    });
        }
        alert(result.message);
        xLoading.hide();
    });
} 

exports.signin = function() {
    framePage.navigate({
        moduleName: "login/login-page",
        animated: true,
        transition: {
            name: "fade"
        }
    });
};

exports.signup = function() {
    framePage.navigate({
        moduleName: "signup/signup-page",
        animated: true,
        transition: {
            name: "fade"
        }
    });
};
