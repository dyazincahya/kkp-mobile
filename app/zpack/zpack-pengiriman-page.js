const timerModule = require("tns-core-modules/timer");
const LoadingIndicatorModule = require('@nstudio/nativescript-loading-indicator').LoadingIndicator;
const xLoading = new LoadingIndicatorModule();

const xViewModel = require("./zpack-model");
const GetModel = new xViewModel([]);

var context, framePage, ndata; 

function reset_form(){
    context.set("tagihan", "");
    context.set("no_resi", "");
}

exports.onLoaded = function(args) {
    const page = args.object;
   
    framePage = page.frame;
};

exports.onNavigatingTo = function(args) {
    const page = args.object;
    context = GetModel;
    ndata = page.navigationContext;

    reset_form();
    
    page.bindingContext = context;
};

exports.saveData = function(){
    let data = context;
    let params = {
        id : ndata.dataid,
        tagihan : data.tagihan,
        no_resi : data.no_resi
    };

    xLoading.show(gConfig.loadingOption);
    GetModel.pengiriman(params).then(function (result){
        if(result.success == true){
            framePage.navigate({
                moduleName: "zpack/zpack-page",
                context: { tabSelected: 4 },
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