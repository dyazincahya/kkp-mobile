const frameModule = require("ui/frame");

const xViewModel = require("../global-model");
var GetModel = new xViewModel([]);

var context, ndata;

exports.loaded = function(args) {
    const page = args.object;

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
