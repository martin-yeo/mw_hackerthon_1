class FrontUrlPath {
    private frontApiPrefix = '/api/front';
    public currentPath = '';

    front = {
        pageCount : [5, 10, 25, 50],
        member : {
            login : `${this.frontApiPrefix}/member/login`,
            join : `${this.frontApiPrefix}/member/join`,
            modify : `${this.frontApiPrefix}/member/modify`,
            withdraw : `${this.frontApiPrefix}/member/withdraw`,
            chkID : `${this.frontApiPrefix}/member/check_member_id`,
            chkPW : `${this.frontApiPrefix}/member/check_member_pw`,
            chkNickname : `${this.frontApiPrefix}/member/check_member_nickname`,
            auth : `${this.frontApiPrefix}/member/auth`,
            reqAuth : `${this.frontApiPrefix}/member/req_auth`,
            getMemberInfo : `${this.frontApiPrefix}/member/member_info`,
            chkMgrConsole : `${this.frontApiPrefix}/member/check_manager_console`
        },
        product: {
            // productList: `${this.frontApiPrefix}/product/list`
            purchaseProductList: `${this.frontApiPrefix}/product/purchase_list`,
            purchaseProductInfo: `${this.frontApiPrefix}/product/purchase_info`,
            estimateProductPurchase: `${this.frontApiPrefix}/product/estimate_purchase`,
            registerPaymentInfo: `${this.frontApiPrefix}/product/register_payment_info`,
            productPurchaseHistoryList: `${this.frontApiPrefix}/product/purchase_history_list`,
            productPurchaseHistoryOne: `${this.frontApiPrefix}/product/purchase_history`,
        },
        product_option: {
            purchaseProductOptionList: `${this.frontApiPrefix}/product_option/options`
        },
        product_feature : {
            main : `${this.frontApiPrefix}/product_feature/main`,
            list : `${this.frontApiPrefix}/product_feature/list`
        },
        notice : {
            list : `${this.frontApiPrefix}/notice/list`,
            one : `${this.frontApiPrefix}/notice`, // + article reg_no 붙일 것
        },
        customer : {
            list : `${this.frontApiPrefix}/customer/list`,
            one : `${this.frontApiPrefix}/customer`, // + article reg_no 붙일 것
            insert : `${this.frontApiPrefix}/customer/insert`,
        },
        suggest : {
            insert : `${this.frontApiPrefix}/suggest/insert`,
        },
        faq : {
            main : `${this.frontApiPrefix}/faq/main`,
            list : `${this.frontApiPrefix}/faq/list`,
            one : `${this.frontApiPrefix}/faq`, // + article reg_no 붙일 것
        },
        privacy : `${this.frontApiPrefix}/privacy`,
        terms : `${this.frontApiPrefix}/terms`,
        keyword: {
            register : `${this.frontApiPrefix}/keyword/register`,
            search : `${this.frontApiPrefix}/keyword/search`,
            relativeSearch : `${this.frontApiPrefix}/keyword/search_relative_keyword`,
            searchContentsCount : `${this.frontApiPrefix}/keyword/search_contents_count`,
            latest: `${this.frontApiPrefix}/keyword/latest`,
            extract: `${this.frontApiPrefix}/keyword/extract`,
            extractHealthCheck: `${this.frontApiPrefix}/keyword/extract/health_check`,
            trend: {
                category: `${this.frontApiPrefix}/keyword/trend/category`,
                search: `${this.frontApiPrefix}/keyword/trend/search`,
            },
            searchShoppingInfo: `${this.frontApiPrefix}/keyword/search_shopping_info`
        },
        corp_info: {
            footer : `${this.frontApiPrefix}/corp_info/footer`,
            quote : `${this.frontApiPrefix}/corp_info/quote`,
            bank_account : `${this.frontApiPrefix}/corp_info/bank_account`,
        }
    }
}

export default new FrontUrlPath();