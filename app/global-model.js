const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
const httpModule        = require("tns-core-modules/http");

function xViewModel(items) {
    var viewModel = new ObservableArray(items);

    viewModel.signin = function (data={}) { 
        return httpModule.request({
            url: gUrl + "signin",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify(data)
        }).then(function (response) {
            return response.content.toJSON();
        }, function (e) {
            console.log("Error occurred " + e);
        });
    };

    viewModel.forgot_password = function (data={}) { 
        return httpModule.request({
            url: gUrl + "signin/forgot_password",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify(data)
        }).then(function (response) {
            return response.content.toJSON();
        }, function (e) {
            console.log("Error occurred " + e);
        });
    };

    viewModel.signup = function (data={}) {
        return httpModule.request({
            url: gUrl + "signup",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify(data)
        }).then(function (response) {
            return response.content.toJSON();
        }, function (e) {
            console.log("Error occurred " + e);
        });
    };

    viewModel.board = function (data={}) {
        return httpModule.request({
            url: gUrl + "board",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify(data)
        }).then(function (response) {
            return response.content.toJSON();
        }, function (e) {
            console.log("Error occurred " + e);
        });
    };

    viewModel.account_update = function (data={}) {
        return httpModule.request({
            url: gUrl + "signin/account_update",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify(data)
        }).then(function (response) {
            return response.content.toJSON();
        }, function (e) {
            console.log("Error occurred " + e);
        });
    };

    viewModel.send_report = function (data={}) {
        return httpModule.request({
            url: gUrl + "email/send_report",
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
