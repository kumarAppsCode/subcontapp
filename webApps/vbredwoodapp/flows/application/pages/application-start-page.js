define(['ojs/ojpagingdataproviderview','ojs/ojarraydataprovider'], (PagingDataProviderView,ArrayDataProvider) => {
  'use strict';

  class PageModule {


    pagingSearch(array) {
      var data = new PagingDataProviderView(new ArrayDataProvider(
      array, {
        idAttribute: 'header_id'
        }));
      return data;
    };


//  isFormValid(form) {
//       let tracker = document.getElementById(form);
//       if (tracker.valid === "valid") {
//         return true;
//       } else {
//         tracker.showMessages();

//         tracker.focusOn("@firstInvalidShown");
        
//         return false;
//       }
//     }
//   }


exportFormat(array) {
   console.log("XX2----1>" + JSON.stringify(array));
    var payload = {};
    let ldata = 0;
    var arr = [];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    for (var i = 0; i < array.length; i++) {
        {
            if (array[i].application_date != null) {
                array[i].application_date = array[i].application_date.substring(0, 10);
                var k = new Date(array[i].application_date);
                let formatted_date = k.getDate() + "-" + months[k.getMonth()] + "-" + k.getFullYear();
                console.log("formattt" + formatted_date);
                array[i].application_date = formatted_date.toString();
            } else {
                array[i].application_date = null;
            }
        }


        ldata = ldata + 1;
    }
    console.log("ldata==>ldata==> Start==>" + ldata);
    payload.item = array;
    console.log("XX2----1>Final TEST==>333333333333333333333333333" + JSON.stringify(payload));
    console.log("ldata==>ldata==>" + ldata);
    return {
        'payload': payload
    };
};


 isFormValid(form) {
  let tracker = document.getElementById(form);
  if (tracker.valid === "valid") {
    return true;
  } else {
    tracker.showMessages();
    tracker.focusOn("@firstInvalidShown");
    return false;
  }
};






}


  
  return PageModule;
});