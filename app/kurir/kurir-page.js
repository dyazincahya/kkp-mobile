const XViewModel = require("./kurir-model");

function onNavigatingTo(args) {
    const component = args.object;
    component.bindingContext = new XViewModel();
}

exports.onNavigatingTo = onNavigatingTo;
