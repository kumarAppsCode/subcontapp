define(['ojs/ojpagingdataproviderview','ojs/ojarraydataprovider'], (PagingDataProviderView,ArrayDataProvider) => {
  'use strict';

  class PageModule {


    pagingSearch(array) {
      let data = new PagingDataProviderView(new ArrayDataProvider(
      array, {
        idAttribute: 'header_id'
        }));
      return data;
    };




  }
  
  return PageModule;
});
