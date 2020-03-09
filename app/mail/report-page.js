const timerModule = require("tns-core-modules/timer");
const toastModule = require("nativescript-toast");
const LoadingIndicatorModule = require('@nstudio/nativescript-loading-indicator').LoadingIndicator;
const ModeLoadingIndicator = require('@nstudio/nativescript-loading-indicator').Mode;
const xLoading = new LoadingIndicatorModule();

const xViewModel = require("../global-model");
const GetModel = new xViewModel([]);

var context, framePage, 
    opsi_laporan = [
        "semua customer dan package", 
        "semua customer", 
        /*"customer aktif", 
        "customer non aktif", 
        "customer pending", */
        "semua package", 
        /*"package request",*/
        "package pickup",
        "package karantina",
        "package pengiriman"
        /*"package selesai"*/
    ]; 

function param_report_tipe(param){
    if(param == "semua customer dan package"){
        return "ALL";
    }

    if(param == "semua customer" || param == "customer aktif" || param == "customer non aktif" || param == "customer pending"){
        return "CUSTOMER";
    }

    if(param == "semua package" || param == "package request" || param == "package pickup" || param == "package karantina" || param == "package pengiriman" || param == "package selesai"){
        return "PACKAGE";
    }
}

function param_status(param){
    if(param == "semua customer dan package"){
        return "ALL";
    }

    if(param == "semua customer"){
        return "ALL";
    }

    if(param == "customer aktif"){
        return "ACTIVE";
    }

    if(param == "customer non aktif"){
        return "NON_ACTIVE";
    }

    if(param == "customer pending"){
        return "PENDING";
    }

    if(param == "semua package"){
        return "ALL";
    }

    if(param == "package request"){
        return "REQUEST";
    }

    if(param == "package pickup"){
        return "PICKUP";
    }

    if(param == "package karantina"){
        return "KARANTINA";
    }

    if(param == "package pengiriman"){
        return "PENGIRIMAN";
    }

    if(param == "package selesai"){
        return "SELESAI";
    }
}

function reset_form(){
    context.set("star_date", "");
    context.set("end_date", "");
    context.set("to", "");
    context.set("cc", "");
    context.set("bcc", "");
}

exports.onLoaded = function(args) {
    const page = args.object;
   
    framePage = page.frame;
};

exports.onNavigatingTo = function(args) {
    const page = args.object;
    context = GetModel;
    timerModule.setTimeout(function () {
        reset_form();
        context.set("items_laporan", opsi_laporan);
        context.set("laporanSelectedIndex", 0);
    }, gConfig.timeloader);

    page.bindingContext = context;
};

exports.sendMail = function(){
    let data = context;

    if(data.star_date == undefined && data.end_date == undefined && data.to == undefined){
        toastModule.makeText("Periode laporan dan Email To wajib diisi").show();
        return;
    } 

    if(data.star_date == "" && data.end_date == "" && data.to == ""){
        toastModule.makeText("Periode laporan dan Email To wajib diisi").show();
        return;
    } 

    let params = {
        star_date : data.star_date,
        end_date : data.end_date,
        report_tipe : param_report_tipe(opsi_laporan[data.laporanSelectedIndex]),
        status : param_status(opsi_laporan[data.laporanSelectedIndex]),
        to : data.to,
        cc : data.cc,
        bcc : data.bcc
    };

    xLoading.show({
        message: 'Sending report mail...',
        margin: 10,
        dimBackground: true,
        color: '#FFFFFF', 
        backgroundColor: '#FFFFFF',
        userInteractionEnabled: true,
        hideBezel: true,
        mode: ModeLoadingIndicator.Indeterminate, 
        android: {
            cancelable: false,
        },
    });

    GetModel.send_report(params).then(function (result){
        if(result.success == true){
            framePage.navigate({
                moduleName: "board/board-page",
                animated: true,
                transition: {
                    name: "fade"
                }
            });
            alert(result.message);
            reset_form();
        } else {
            alert(result.message);
        }
        xLoading.hide();
    });
}