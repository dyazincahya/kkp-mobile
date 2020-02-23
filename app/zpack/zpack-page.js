const timerModule = require("tns-core-modules/timer");
const LoadingIndicatorModule = require('@nstudio/nativescript-loading-indicator').LoadingIndicator;
const xLoading = new LoadingIndicatorModule();

const xViewModel = require("./zpack-model");
const GetModel = new xViewModel([]);

var context, framePage, ndata; 

function GetListSemua(keyword=null){
	GetModel.list({"keyword" : keyword, "role": gUserdata.user_role, "sess_id" : gUserdata.user_id}).then(function (result){
        if(result.success == true){
        	if(result.total > 0){
                context.set("semua_items", result.data);
        	} else {
                context.set("semua_items", []);
            }
        } else {
            context.set("semua_items", []);
        }
        xLoading.hide();
    });
}

function getListRequest(keyword=null){
    GetModel.list({"keyword" : keyword, "role": gUserdata.user_role, "sess_id" : gUserdata.user_id, "status" : "REQUEST"}).then(function (result){
        if(result.success == true){
            console.log(result);
            if(result.total > 0){
                context.set("request_items", result.data);
            } else {
                context.set("request_items", []);
            }
        } else {
            context.set("request_items", []);
        }
        xLoading.hide();
    });
}

function getListPickup(keyword=null){
    GetModel.list({"keyword" : keyword, "role": gUserdata.user_role, "sess_id" : gUserdata.user_id, "status" : "PICKUP"}).then(function (result){
        if(result.success == true){
            if(result.total > 0){
                context.set("pickup_items", result.data);
            } else {
                context.set("pickup_items", []);
            }
        } else {
            context.set("pickup_items", []);
        }
        xLoading.hide();
    });
}

function getListKarantina(keyword=null){
    GetModel.list({"keyword" : keyword, "role": gUserdata.user_role, "sess_id" : gUserdata.user_id, "status" : "KARANTINA"}).then(function (result){
        if(result.success == true){
            if(result.total > 0){
                context.set("karantina_items", result.data);
            } else {
                context.set("karantina_items", []);
            }
        } else {
            context.set("karantina_items", []);
        }
        xLoading.hide();
    });
}

function getListPengiriman(keyword=null){
    GetModel.list({"keyword" : keyword, "role": gUserdata.user_role, "sess_id" : gUserdata.user_id, "status" : "PENGIRIMAN"}).then(function (result){
        if(result.success == true){
            if(result.total > 0){
                context.set("pengiriman_items", result.data);
            } else {
                context.set("pengiriman_items", []);
            }
        } else {
            context.set("pengiriman_items", []);
        }
        xLoading.hide();
    });
}

function getListSelesai(keyword=null){
    GetModel.list({"keyword" : keyword, "role": gUserdata.user_role, "sess_id" : gUserdata.user_id, "status" : "SELESAI"}).then(function (result){
        if(result.success == true){
            if(result.total > 0){
                context.set("selesai_items", result.data);
            } else {
                context.set("selesai_items", []);
            }
        } else {
            context.set("selesai_items", []);
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
            context.set("packageTabSelected", ndata.tabSelected);
        } else {
            context.set("packageTabSelected", 0);
        }
    } else {
        context.set("packageTabSelected", 0);
    }

    context.set("semua_items", []);
    context.set("request_items", []);
    context.set("karantina_items", []);
    context.set("pengiriman_items", []);
    context.set("selesai_items", []);
    context.set("pp", false);
    context.set("urole", gUserdata.user_role);
 
    xLoading.show(gConfig.loadingOption);
    timerModule.setTimeout(function () {
        GetListSemua();
        getListRequest();
        getListPickup();
        getListKarantina();
        getListPengiriman();
        getListSelesai();
    }, gConfig.timeloader);

    page.bindingContext = context;
};

exports.onPullResfresh = function (args){
    var pullRefresh = args.object;

    GetListSemua();
    getListRequest();
    getListPickup();
    getListKarantina();
    getListPengiriman();
    getListSelesai();
    setTimeout(() => {
        pullRefresh.refreshing = false;
    }, 1000);
}

exports.onSubmit = function(args) {
    var k = args.object.text;
    xLoading.show(gConfig.loadingOption);
    GetListSemua(k);
    getListRequest(k);
    getListPickup(k);
    getListKarantina(k);
    getListPengiriman(k);
    getListSelesai(k);
};

exports.onClear = function() {
    GetListSemua();
    getListRequest();
    getListPickup();
    getListKarantina();
    getListPengiriman();
    getListSelesai();
};

exports.newData=function(){
    framePage.navigate({
        moduleName: "zpack/zpack-add-page",
        animated: true,
        transition: {
            name: "fade"
        }
    });
};

exports.onItemTap=function(args){
    let itemTap = args.view;
    let itemTapData = itemTap.bindingContext;

    if(gUserdata.user_role == 'customer'){
        if(itemTapData.package_status == "REQUEST"){
            framePage.navigate({
                moduleName: "zpack/zpack-edit-page",
                context: { data: itemTapData },
                animated: true,
                transition: {
                    name: "fade"
                }
            });
        } else {
            framePage.navigate({
                moduleName: "zpack/zpack-detail-page",
                context: { data: itemTapData },
                animated: true,
                transition: {
                    name: "fade"
                }
            });
        }
    } else {
        framePage.navigate({
            moduleName: "zpack/zpack-detail-page",
            context: { data: itemTapData },
            animated: true,
            transition: {
                name: "fade"
            }
        });
    }
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

exports.onKarantina = function(args){
    let dataid = args.object.get("dataid");
    prompt({
        title: "KARANTINA",
        message: "Silahkan masukan tagihan biaya karantina",
        okButtonText: "Ya",
        cancelButtonText: "Batal",
        cancelable: true,
        inputType: "number", // email, number, text, password, or email
        capitalizationType: "none" // all, none, sentences or words
    }).then((r) => {
        if(r.result){
            xLoading.show(gConfig.loadingOption);
            GetModel.karantina({"id" : dataid, "tagihan" : r.text}).then(function (result){
                if(result.success == true){
                    getListPickup();
                    getListKarantina();
                    context.set("packageTabSelected", 3);
                } else {
                    context.set("packageTabSelected", 2);
                }
                alert(result.message);
                xLoading.hide();
            });
        }
    });
}

exports.onPengiriman = function(args){
    let dataid = args.object.get("dataid");
    framePage.navigate({
        moduleName: "zpack/zpack-pengiriman-page",
        context: { dataid: dataid },
        animated: true,
        transition: {
            name: "fade"
        }
    });
}

exports.onSelesai = function(args){
    let dataid = args.object.get("dataid");
    confirm({
        title: "SELESAI",
        message: "Apa barang ini sudah diterima?",
        okButtonText: "Ya",
        cancelButtonText: "Batal"
    }).then((result) => {
        if(result){
            xLoading.show(gConfig.loadingOption);
            GetModel.selesai({"id" : dataid}).then(function (result){
                if(result.success == true){
                    getListPengiriman();
                    getListSelesai();
                    context.set("packageTabSelected", 5);
                } else {
                    context.set("packageTabSelected", 4);
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
}