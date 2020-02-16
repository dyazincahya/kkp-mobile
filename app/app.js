const application = require("tns-core-modules/application");
const ModeLoadingIndicator = require('@nstudio/nativescript-loading-indicator').Mode;

let serverhosting = "https://kkp.vuspicture.com/cahya/";
let localhosting = "http://127.0.0.1/kkp-backend/index.php/";

global.gUrl = serverhosting;
global.gConfig = {
    "timeloader"        		: 100,
    "timepullrefresh"   		: 1000,
    "loadingOption" 	: {
	    message: 'Loading...',
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
	}
};
global.gUserdata = {};
global.gAvaliableCity = ["jakarta timur", "jakarta barat", "jakarta selatan", "jakarta pusat", "jakarta utara", "tanggerang", "depok", "bekasi"];
global.gDestinationCity = ["sulawesi selatan", "bali", "jawa tengah", "jawa timur", "kalimantan timur", "riau"]; 

application.run({ moduleName: "app-root" }); 

/*
Do not place any code after the application has been started as it will not 
be executed on iOS.
*/
