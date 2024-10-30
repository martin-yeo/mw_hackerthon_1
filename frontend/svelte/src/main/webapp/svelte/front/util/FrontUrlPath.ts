class FrontUrlPath {
    // private frontApiPrefix = 'http://127.0.0.1:3000/api/front'; // api path 기입, nodejs 인 경우
    private frontApiPrefix = 'http://127.0.0.1:8000/api/front'; // api path 기입, python 인 경우
    // private frontApiPrefix = 'http://127.0.0.1:8080/api/front'; // api path 기입, java 인 경우

    public currentPath = '';

    front = {
        pageCount : [5, 10, 25, 50],
        template: {
            list : `${this.frontApiPrefix}/list`,
            one : `${this.frontApiPrefix}/one`, // reg_no 붙일 것
            insert : `${this.frontApiPrefix}/insert`,
            update : `${this.frontApiPrefix}/update`,
            delete : `${this.frontApiPrefix}/delete`
        }
    }
}

export default new FrontUrlPath();