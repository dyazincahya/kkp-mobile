const timerModule = require("tns-core-modules/timer");
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
    context.set("tujuan", ndata.data.package_tujuan);
    context.set("alamat", ndata.data.package_alamat); 
    context.set("status", ndata.data.package_status); 
    context.set("last_update", ndata.data.package_last_update);
    context.set("customer_nama", ndata.data.package_customer_nama);
    context.set("customer_no_telp", ndata.data.package_customer_no_telp);
    context.set("customer_kota_tinggal", ndata.data.package_customer_kota_tinggal);
    context.set("customer_alamat", ndata.data.package_customer_alamat);
    context.set("kurir_nama", ndata.data.package_kurir_nama);
 
    timerModule.setTimeout(function () {

    }, gConfig.timeloader);

    page.bindingContext = context;
};