/**
 * Created by raov on 12/03/17.
 */

var Utils = {
    getPageCount : function(countPerPage, totalCount){
        return Math.ceil(totalCount/countPerPage);
    },
    getArrayTill : function(till){
        var array = [];
        for(i=1; i<= till; i++){
            array.push(i);
        }
        return array;
    },
    getPreviousNextPage : function(pageCount, currentPageIndex){
        var pagination = {
            pre : "none",
            next : "none"
        };
        if(parseInt(pageCount) > 1){
            if(parseInt(currentPageIndex) === 1){
                pagination.pre = "none";
                pagination.next = parseInt(currentPageIndex)+1;
            }else{
                pagination.pre = parseInt(currentPageIndex) - 1;
                pagination.next = parseInt(currentPageIndex) + 1;
            }
        }
        return pagination;
    }
}
