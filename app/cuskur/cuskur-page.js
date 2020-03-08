const timerModule = require("tns-core-modules/timer");
const LoadingIndicatorModule = require('@nstudio/nativescript-loading-indicator').LoadingIndicator;
const xLoading = new LoadingIndicatorModule();

const xViewModel = require("./cuskur-model");
const GetModel = new xViewModel([]);

var context, framePage, ndata; 

function getAllCustomer(keyword=null){
    GetModel.customer({"keyword" : keyword}).then(function (result){
        if(result.success == true){
            if(result.total > 0){
                context.set("customer_items", result.data);
            } else {
                context.set("customer_items", []);
            }
        } else {
            context.set("customer_items", []);
        }
        xLoading.hide();
    });
}

function getAllKurir(keyword=null){
    GetModel.kurir({"keyword" : keyword}).then(function (result){
        if(result.success == true){
            if(result.total > 0){
                context.set("kurir_items", result.data);
            } else {
                context.set("kurir_items", []);
            }
        } else {
            context.set("kurir_items", []);
        }
        xLoading.hide();
    });
}

exports.onLoaded = function(args) {
    const page = args.object;
   
    // CLEAR FOCUS KEYBOARD 
    const searchbar = page.getViewById('searchBar');
    if (searchbar.android) {
        searchbar.android.setFocusable(false);
        searchbar.android.clearFocus();
    }
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
 
    xLoading.show(gConfig.loadingOption);
    timerModule.setTimeout(function () {
        getAllCustomer();
        getAllKurir();
    }, gConfig.timeloader);

    page.bindingContext = context;
};

exports.onPullResfresh = function (args){
    var pullRefresh = args.object;

    getAllCustomer();
    setTimeout(() => {
        pullRefresh.refreshing = false;
    }, 1000);
}

exports.onSubmit = function(args) {
    var k = args.object.text;
    getAllCustomer(k);
    getAllKurir(k);
};

exports.onClear = function() {
    //some code here
    getAllCustomer();
    getAllKurir();
};

exports.loadButton= function(args){
    var btn = args.object;
    btn.android.setFocusable(false);
}

exports.onApprove = function(args){
    let dataid = args.object.get("dataid");
    confirm({
        title: "APPROVE",
        message: "Apa kamu yakin ingin menyetujui dan mengaktifkan akun ini?",
        okButtonText: "Ya",
        cancelButtonText: "Batal"
    }).then((result) => {
        if(result){
            xLoading.show(gConfig.loadingOption);
            GetModel.update_status({"id" : dataid, "status" : 1}).then(function (result){
                if(result.success == true){
                    getAllCustomer();
                    context.set("cuskurTabSelected", 0);
                }
                alert(result.message);
                xLoading.hide();
            });
        }
    });
}

exports.onActive = function(args){
    let dataid = args.object.get("dataid");
    confirm({
        title: "ACTIVE",
        message: "Apa kamu yakin ingin mengaktifkan akun ini?",
        okButtonText: "Ya",
        cancelButtonText: "Batal"
    }).then((result) => {
        if(result){
            xLoading.show(gConfig.loadingOption);
            GetModel.update_status({"id" : dataid, "status" : 1}).then(function (result){
                if(result.success == true){
                    getAllCustomer();
                    context.set("cuskurTabSelected", 0);
                }
                alert(result.message);
                xLoading.hide();
            });
        }
    });
}

exports.onInactive = function(args){
    let dataid = args.object.get("dataid");
    console.log(dataid);
    return;
    confirm({
        title: "NON ACTIVE",
        message: "Apa kamu yakin ingin menonaktifkan akun ini?",
        okButtonText: "Ya",
        cancelButtonText: "Batal"
    }).then((result) => {
        if(result){
            xLoading.show(gConfig.loadingOption);
            GetModel.update_status({"id" : dataid, "status" : "OFF"}).then(function (result){
                if(result.success == true){
                    getAllCustomer();
                    context.set("cuskurTabSelected", 0);
                }
                alert(result.message);
                xLoading.hide();
            });
        }
    });
}

exports.addKurir = function(){
    framePage.navigate({
        moduleName: "cuskur/kurir-add-page",
        animated: true,
        transition: {
            name: "fade"
        }
    });
};

exports.onItemTapKurir=function(args){
    let itemTap = args.view;
    let itemTapData = itemTap.bindingContext;

    framePage.navigate({
        moduleName: "cuskur/kurir-edit-page",
        context: { data: itemTapData },
        animated: true,
        transition: {
            name: "fade"
        }
    });
};

exports.onDelete = function(args){
    let dataid = args.object.get("dataid");
    confirm({
        title: "DELETE",
        message: "Apa kamu yakin ingin menghapus kurir ini?",
        okButtonText: "Ya",
        cancelButtonText: "Batal"
    }).then((result) => {
        if(result){
            xLoading.show(gConfig.loadingOption);
            GetModel.kurir_delete({"id" : dataid}).then(function (result){
                if(result.success == true){
                    getAllKurir();
                    context.set("cuskurTabSelected", 1);
                }
                alert(result.message);
                xLoading.hide();
            });
        }
    });
}
