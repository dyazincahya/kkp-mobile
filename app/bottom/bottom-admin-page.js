const frameModule = require("ui/frame");

const xViewModel = require("../global-model");
var GetModel = new xViewModel([]);

var context, ndata, framePage; 

exports.onLoaded = function(args) {
    const page = args.object;
    framePage = page.frame;

    context = GetModel

    if(page.navigationContext){
        ndata = page.navigationContext;
        if(ndata.tabSelected){
            context.set("tabSelected", ndata.tabSelected);
        } else {
            context.set("tabSelected", 0);
        }
    } else {
        context.set("tabSelected", 0);
    }

    page.bindingContext = context;
}; 

exports.logout = function(){
    confirm({
        title: "LOGOUT",
        message: "Apa kamu yakin ingin melakukan logout?",
        okButtonText: "Ya",
        cancelButtonText: "Batal"
    }).then((result) => {
        if(result){
            gUserdata = {};
            framePage.navigate({
                moduleName: "login/login-page",
                clearHistory: true,
                animated: true,
                transition: { 
                    name: "fade"
                }
            });
        }
    });
};