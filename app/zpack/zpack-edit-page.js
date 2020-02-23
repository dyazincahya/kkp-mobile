const timerModule = require("tns-core-modules/timer");
const toastModule = require("nativescript-toast");
const LoadingIndicatorModule = require('@nstudio/nativescript-loading-indicator').LoadingIndicator;
const xLoading = new LoadingIndicatorModule();

const xViewModel = require("./zpack-model");
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

    console.log(ndata.data);
    context.set("items_kota_tujuan", gDestinationCity);

    context.set("nama", ndata.data.package_nama);
    context.set("keterangan", ndata.data.package_keterangan);
    context.set("tujuanSelectedIndex", gDestinationCity.indexOf(ndata.data.package_tujuan.toLowerCase())); //tujuanSelectedIndexChanged
    context.set("alamat", ndata.data.package_alamat); 
 
    timerModule.setTimeout(function () {

    }, gConfig.timeloader);

    page.bindingContext = context;
};

exports.updateData = function(){
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
};