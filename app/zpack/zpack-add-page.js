const timerModule = require("tns-core-modules/timer");
const LoadingIndicatorModule = require('@nstudio/nativescript-loading-indicator').LoadingIndicator;
const xLoading = new LoadingIndicatorModule();

const xViewModel = require("./zpack-model");
const GetModel = new xViewModel([]);

var context, framePage; 

exports.onLoaded = function(args) {
    const page = args.object;
   
    framePage = page.frame;
};

exports.onNavigatingTo = function(args) {
    const page = args.object;
    context = GetModel;

    context.set("items_kota_tujuan", gDestinationCity);
 
    timerModule.setTimeout(function () {

    }, gConfig.timeloader);

    page.bindingContext = context;
};

exports.saveData = function(){
    let data = context;
    let params = {
        nama : data.nama,
        keterangan : data.keterangan,
        tujuan : gDestinationCity[context.tujuanSelectedIndex],
        alamat : context.alamat,
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