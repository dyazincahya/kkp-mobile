const timerModule = require("tns-core-modules/timer");
const toastModule = require("nativescript-toast");
const LoadingIndicatorModule = require('@nstudio/nativescript-loading-indicator').LoadingIndicator;
const xLoading = new LoadingIndicatorModule();

const xViewModel = require("../global-model");
var GetModel = new xViewModel([]);

var context, ud = gUserdata, framePage; 

exports.onLoaded = function(args) {
    framePage = args.object.frame;
};

exports.onNavigatingTo = function (args) {
    const component = args.object;
    context = GetModel;

    context.set("user_role", ud.user_role);
    context.set("items_kota_tinggal", gAvaliableCity);
    if(ud.user_role == "admin")
    {
    	context.set("user_nama", ud.user_nama);
    	context.set("user_email", ud.user_email);
    } else if(ud.user_role == "customer")
    {
    	context.set("user_no_ktp", ud.user_no_ktp);
    	context.set("user_nama", ud.user_nama);
    	context.set("user_email", ud.user_email);
    	context.set("user_no_telp", ud.user_no_telp);
    	context.set("user_tgl_lahir", ud.user_tgl_lahir);
    	context.set("kotaAsalSelectedIndex", gAvaliableCity.indexOf(ud.user_kota_tinggal));
    	context.set("user_alamat", ud.user_alamat);
    } else if(ud.user_role == "kurir")
    {
    	context.set("user_no_ktp", ud.user_no_ktp);
    	context.set("user_nama", ud.user_nama);
    	context.set("user_email", ud.user_email);
    	context.set("user_no_telp", ud.user_no_telp);
    }

    component.bindingContext = context; 
};

exports.saveData = function(){
    let data = context;
    var params = {};

    if(data.user_password != "" || data.user_password_confirm != ""){
        if(data.user_password != data.user_password_confirm){
            toastModule.makeText("Contifm password tidak salah!").show();
            return;
        }
    }

    if(ud.user_role == "admin")
    {
        if(data.user_nama == undefined){
            toastModule.makeText("Semua inputan wajib diisi").show();
            return;
        } 

        if(data.user_nama == ""){
            toastModule.makeText("Semua inputan wajib diisi").show();
            return;
        } 

        params = {
            user_id: ud.user_id,
            user_role: ud.user_role,
            user_nama: data.user_nama,
            user_password: data.user_password,
        };
    } else if(ud.user_role == "kurir") 
    {
        if(data.user_nama == undefined && data.user_no_telp == undefined){
            toastModule.makeText("Semua inputan wajib diisi").show();
            return;
        } 

        if(data.user_nama == "" && data.user_no_telp == ""){
            toastModule.makeText("Semua inputan wajib diisi").show();
            return;
        } 

        params = {
            user_id: ud.user_id,
            user_role: ud.user_role,
            user_nama: data.user_nama,
            user_password: data.user_password,
            user_no_telp: data.user_no_telp,

        };
    } else if(ud.user_role == "customer") 
    {
        if(data.no_ktp == undefined && data.nama == undefined && data.password == undefined && data.no_telp == undefined && data.tgl_lahir == undefined && data.kotaAsalSelectedIndex == undefined && data.alamat == undefined){
            toastModule.makeText("Semua inputan wajib diisi").show();
            return;
        } 

        if(data.no_ktp == "" && data.nama == "" && data.password == "" && data.no_telp == "" && data.tgl_lahir == "" && data.alamat == ""){
            toastModule.makeText("Semua inputan wajib diisi").show();
            return;
        } 
        params = {
            user_id: ud.user_id,
            user_role: ud.user_role,
            user_nama: data.user_nama,
            user_password: data.user_password,
            user_no_telp: data.user_no_telp,
            user_tgl_lahir: data.user_tgl_lahir,
            user_kota_tinggal: data.user_kota_tinggal,
            user_alamat: data.user_alamat,

        };
    }

    xLoading.show(gConfig.loadingOption);
    GetModel.account_update(params).then(function (result){
        alert(result.message);
        xLoading.hide();
    });
};