const timerModule = require("tns-core-modules/timer");
const toastModule = require("nativescript-toast");
const LoadingIndicatorModule = require('@nstudio/nativescript-loading-indicator').LoadingIndicator;
const xLoading = new LoadingIndicatorModule();

const xViewModel = require("./zpack-model");
const GetModel = new xViewModel([]);

var context, framePage; 

function reset_form(){
    context.set("nama", "");
    context.set("keterangan", "");
    context.set("alamat", "");
}

exports.onLoaded = function(args) {
    const page = args.object;
    framePage = page.frame; 
};

exports.onNavigatingTo = function(args) {
    const page = args.object;
    context = GetModel;

    context.set("items_kota_tujuan", gDestinationCity);
 
    timerModule.setTimeout(function () {
        reset_form();
    }, gConfig.timeloader);

    page.bindingContext = context;
};

exports.saveData = function(){
    let data = context;

    if(data.nama == undefined && data.keterangan == undefined  && data.alamat == undefined && data.tujuanSelectedIndex == undefined){
        toastModule.makeText("Semua inputan wajib diisi").show();
        return;
    } 

    if(data.nama == "" && data.keterangan == ""  && data.alamat == "" && data.tujuanSelectedIndex == ""){
        toastModule.makeText("Semua inputan wajib diisi").show();
        return;
    } 

    let params = {
        nama : data.nama,
        keterangan : data.keterangan,
        tujuan : gDestinationCity[data.tujuanSelectedIndex],
        alamat : data.alamat,
        customer_id : gUserdata.user_id,
    };

    xLoading.show(gConfig.loadingOption);
    GetModel.save(params).then(function (result){
        if(result.success == true){
            framePage.navigate({
                moduleName: "zpack/zpack-page",
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
}