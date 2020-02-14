const ObservableArray = require("data/observable-array").ObservableArray;
const httpModule = require("tns-core-modules/http");

function xViewModel(items) {
    var viewModel = new ObservableArray(items);

    viewModel.list = function (data={}) {
        return httpModule.request({
            url: gUrl + "package",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify(data)
        }).then(function (response) {
            return response.content.toJSON();
        }, function (e) {
            console.log("Error occurred " + e);
        });
    };

    viewModel.save = function (data={}) {
        return httpModule.request({
            url: gUrl + "package/save",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify(data)
        }).then(function (response) {
            return response.content.toJSON();
        }, function (e) {
            console.log("Error occurred " + e);
        });
    };

    viewModel.pickup = function (data={}) {
        return httpModule.request({
            url: gUrl + "package/pickup",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify(data)
        }).then(function (response) {
            return response.content.toJSON();
        }, function (e) {
            console.log("Error occurred " + e);
        });
    };

    viewModel.karantina = function (data={}) {
        return httpModule.request({
            url: gUrl + "package/karantina",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify(data)
        }).then(function (response) {
            return response.content.toJSON();
        }, function (e) {
            console.log("Error occurred " + e);
        });
    };

    viewModel.pengiriman = function (data={}) {
        return httpModule.request({
            url: gUrl + "package/pengiriman",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify(data)
        }).then(function (response) {
            return response.content.toJSON();
        }, function (e) {
            console.log("Error occurred " + e);
        });
    };

    viewModel.selesai = function (data={}) {
        return httpModule.request({
            url: gUrl + "package/selesai",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify(data)
        }).then(function (response) {
            return response.content.toJSON();
        }, function (e) {
            console.log("Error occurred " + e);
        });
    };

    return viewModel;
}

module.exports = xViewModel;
