const timerModule = require("tns-core-modules/timer");
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
    context = GetModel;

    if(page.navigationContext){
        ndata = page.navigationContext;
        if(ndata.tabSelected){
            context.set("cuskurTabSelected", ndata.tabSelected);
        } else {
            context.set("cuskurTabSelected", 0); 
        }
    } else {
        context.set("cuskurTabSelected", 0);
    }
 
    // xLoading.show(gConfig.loadingOption);
    timerModule.setTimeout(function () {

    }, gConfig.timeloader);

    page.bindingContext = context;
};

/*exports.onItemTap=function(args){
    let itemTap = args.view;
    let itemTapData = itemTap.bindingContext;
};

exports.onPickup = function(args){
    let dataid = args.object.get("dataid");
    confirm({
        title: "PICKUP",
        message: "Apa kamu yakin inin mempickup request ini?",
        okButtonText: "Ya",
        cancelButtonText: "Batal"
    }).then((result) => {
        if(result){
            xLoading.show(gConfig.loadingOption);
            GetModel.pickup({"id" : dataid, "kurir_id" : gUserdata.user_id}).then(function (result){
                if(result.success == true){
                    getListRequest();
                    getListPickup();
                    context.set("packageTabSelected", 2);
                } else {
                    context.set("packageTabSelected", 1);
                }
                alert(result.message);
                xLoading.hide();
            });
        }
    });
}

exports.loadButton= function(args){
    var btn = args.object;
    btn.android.setFocusable(false);
}*/