const timerModule = require("tns-core-modules/timer");
const toastModule = require("nativescript-toast");
const LoadingIndicatorModule = require('@nstudio/nativescript-loading-indicator').LoadingIndicator;
const xLoading = new LoadingIndicatorModule();

const xViewModel = require("./cuskur-model");
const GetModel = new xViewModel([]);

var context, framePage, ndata; 

exports.onLoaded = function(args) {
    const page = args.object;
    framePage = page.frame;
};

exports.onNavigatingTo = function(args) {
    const page = args.object;
    ndata = page.navigationContext;
    context = GetModel;

    xLoading.show(gConfig.loadingOption);
    timerModule.setTimeout(function () {
        context.set("no_ktp", ndata.data.kurir_no_ktp); 
        context.set("nama", ndata.data.kurir_nama); 
        context.set("no_telp", ndata.data.kurir_no_telp); 
        context.set("email", ndata.data.kurir_email);
        xLoading.hide();
    }, gConfig.timeloader);

    page.bindingContext = context;
};

exports.updateData = function(){
    let data = context;

    if(data.no_ktp == undefined && data.nama == undefined  && data.no_telp == undefined && data.email == undefined && data.password == undefined){
        toastModule.makeText("Semua inputan wajib diisi").show();
        return;
    } 

    if(data.no_ktp == "" && data.nama == ""  && data.no_telp == "" && data.email == "" && data.password == ""){
        toastModule.makeText("Semua inputan wajib diisi").show();
        return;
    } 

    let params = {
        id : ndata.data.kurir_id,
        no_ktp : data.no_ktp,
        nama : data.nama,
        no_telp : data.no_telp,
        email : data.email,
        password : data.password
    };

    xLoading.show(gConfig.loadingOption);
    GetModel.kurir_update(params).then(function (result){
        if(result.success == true){
            framePage.navigate({
                moduleName: "cuskur/cuskur-page",
                context: { tabSelected: 1 },
                animated: true,
                transition: {
                    name: "fade"
                }
            });
        }
        alert(result.message);
        xLoading.hide();
    });
};