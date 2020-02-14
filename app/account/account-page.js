const XViewModel = require("./account-view-model");

function onNavigatingTo(args) {
    const component = args.object;
    component.bindingContext = new XViewModel();
}

exports.onNavigatingTo = onNavigatingTo;
