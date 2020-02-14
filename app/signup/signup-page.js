const toastModule = require("nativescript-toast");

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

    context.set("items_kota_tinggal", gAvaliableCity);

    page.bindingContext = context;
};

exports.login = function() {
	framePage.navigate({
        moduleName: "login/login-page",
        animated: true,
        transition: {
            name: "fade"
        }
    });
};

exports.signup = function() {
	let data = context;

	if(data.no_ktp == undefined && data.nama == undefined && data.email == undefined && data.password == undefined && data.no_telp == undefined && data.tgl_lahir == undefined && data.kota_tinggal == undefined && data.alamat == undefined){
		toastModule.makeText("Email dan password wajib diisi").show();
		return;
	} 
	
	let params = {
		no_ktp : data.no_ktp,
        nama : data.nama,
        email : data.email,
        password : data.password,
        no_telp : data.no_telp,
        tgl_lahir : data.tgl_lahir,
        kota_tinggal : gAvaliableCity[context.kotaAsalSelectedIndex],
        alamat : data.alamat
	}; 

	xLoading.show(gConfig.loadingOption);
	GetModel.signup(params).then(function (result){
        if(result.success == true){
            framePage.navigate({
		        moduleName: "login/login-page",
		        animated: true,
		        transition: {
		            name: "fade"
		        }
		    });
		    alert(result.message);
        } else {
            alert(result.message);
        }
        xLoading.hide();
    });
};
