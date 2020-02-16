const toastModule = require("nativescript-toast");

const LoadingIndicatorModule = require('@nstudio/nativescript-loading-indicator').LoadingIndicator;
const xLoading = new LoadingIndicatorModule();

const xViewModel = require("../global-model");
var GetModel = new xViewModel([]);

var context, framePage; 

function reset_form(){
    context.set("no_ktp", "");
    context.set("nama", "");
    context.set("email", "");
    context.set("password", "");
    context.set("no_telp", "");
    context.set("tgl_lahir", "");
    // context.set("kotaAsalSelectedIndex", 0);
    context.set("alamat", "");
}

exports.onLoaded = function(args) {
    framePage = args.object.frame;
};

exports.onNavigatingTo = function(args) {
    const page = args.object; 

    context = GetModel; 

    context.set("items_kota_tinggal", gAvaliableCity);
    reset_form();

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

	if(data.no_ktp == undefined && data.nama == undefined && data.email == undefined && data.password == undefined && data.no_telp == undefined && data.tgl_lahir == undefined && data.kotaAsalSelectedIndex == undefined && data.alamat == undefined){
		toastModule.makeText("Semua inputan wajib diisi").show();
		return;
	} 

    if(data.no_ktp == "" && data.nama == "" && data.email == "" && data.password == "" && data.no_telp == "" && data.tgl_lahir == "" && data.alamat == ""){
        toastModule.makeText("Semua inputan wajib diisi").show();
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
        reset_form();
        xLoading.hide();
    });
};
