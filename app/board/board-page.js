const timerModule = require("tns-core-modules/timer");
const LoadingIndicatorModule = require('@nstudio/nativescript-loading-indicator').LoadingIndicator;
const xLoading = new LoadingIndicatorModule();

const xViewModel = require("../global-model");
var GetModel = new xViewModel([]);

var context, framePage; 

function GetDataBoard(){
	GetModel.board({}).then(function (result){
        if(result.success == true){
        	context.set("cust_non_active", result.data.customer.non_active);
		    context.set("cust_active", result.data.customer.active);
		    context.set("cust_pending", result.data.customer.pending);

		    context.set("pack_request", result.data.package.request);
            context.set("pack_pickup", result.data.package.pickup);
		    context.set("pack_karantina", result.data.package.karantina);
		    context.set("pack_pengiriman", result.data.package.pengiriman);
		    context.set("pack_selesai", result.data.package.selesai);
        } else {
            alert(result.message);
        }
        xLoading.hide();
    });
}

exports.onLoaded = function(args) {
    const page = args.object;
   
    framePage = page.frame;
};

exports.onNavigatingTo = function (args) {
    const component = args.object;
    context = GetModel;

    context.set("cust_non_active", 0);
    context.set("cust_active", 0);
    context.set("cust_pending", 0);

    context.set("pack_req_pickup", 0);
    context.set("pack_karantina", 0);
    context.set("pack_pengiriman", 0);
    context.set("pack_selesai", 0);

    xLoading.show(gConfig.loadingOption);
    timerModule.setTimeout(function () {
        GetDataBoard();
    }, gConfig.timeloader);

    // context.set("user_nama", gUserdata)

    component.bindingContext = context; 
};

exports.onRefresh = function (){
    xLoading.show(gConfig.loadingOption);
    timerModule.setTimeout(function () {
        GetDataBoard();
    }, gConfig.timeloader);
};

exports.report = function (){
    framePage.navigate({
        moduleName: "mail/report-page",
        animated: true,
        transition: {
            name: "fade"
        }
    });
};