const xViewModel = require("./popup-model");
var GetModel = new xViewModel([]);

var context;


exports.onLoaded = function(args) {
    const page = args.object;
    context = GetModel;
    
    context.set("popup", false);

    page.bindingContext = context;
}

exports.OpenPopup = function(){
    context.set("popup", true);
    context.set("items", [
        {
            name: "Item 1",
            description: "Description for Item 1"
        },
        {
            name: "Item 2",
            description: "Description for Item 2"
        },
        {
            name: "Item 3",
            description: "Description for Item 3"
        },
        {
            name: "Item 4",
            description: "Description for Item 4"
        },
        {
            name: "Item 5",
            description: "Description for Item 5"
        },
        {
            name: "Item 6",
            description: "Description for Item 6"
        },
        {
            name: "Item 7",
            description: "Description for Item 7"
        },
        {
            name: "Item 8",
            description: "Description for Item 8"
        },
        {
            name: "Item 9",
            description: "Description for Item 9"
        },
        {
            name: "Item 10",
            description: "Description for Item 10"
        },
        {
            name: "Item 11",
            description: "Description for Item 11"
        },
        {
            name: "Item 12",
            description: "Description for Item 12"
        },
        {
            name: "Item 13",
            description: "Description for Item 13"
        },
        {
            name: "Item 14",
            description: "Description for Item 14"
        },
        {
            name: "Item 15",
            description: "Description for Item 15"
        },
        {
            name: "Item 16",
            description: "Description for Item 16"
        }
    ]);
};

exports.ClosePopup = function(){
    context.set("popup", false);
};

exports.onItemTapFromPopup=function(args){
    let itemTap = args.view;
    let itemTapData = itemTap.bindingContext;

    context.set("popupname", itemTapData.name);
    context.set("popupdescription", itemTapData.description);

    context.set("popup", false);
    alert("Data berhasil di binding");
};

