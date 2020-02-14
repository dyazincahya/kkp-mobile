const ObservableArray = require("data/observable-array").ObservableArray;

function xViewModel(items) {
    var viewModel = new ObservableArray(items);

    return viewModel;
}

module.exports = xViewModel;
