angular.module('starter.factories', [])

.factory('LoanFactory', function() {
  return {
    loans: function () {
      return [
        {
          id: "557f45445061725273040000",
          friend_email: "teste@teste.com",
          friend_name: null,
          loaned_item: "Qlqr coisa",
          created_at: "15/11/2014"
        },
        {
          id: "5580317750617256f1000000",
          friend_email: "teste@teste.com",
          friend_name: null,
          loaned_item: "Qlqr coisa 2",
          created_at: "17/12/2014"
        },
        {
          id: "5580317d50617256f1010000",
          friend_email: "teste1@teste.com",
          friend_name: null,
          loaned_item: "Qlqr coisa 3",
          created_at: "25/05/2015"
        }
        ];
    },

    // get: function(index) {
    //   return this.loans()[index];
    // }
  }
})
