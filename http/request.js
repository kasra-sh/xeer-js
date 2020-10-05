const T = require("../core/types");
const {$, $$} = require("../dom/query")

/**
 * Http Content class
 * @field type - Content Type
 * @field data - Content Data
 */
class HttpContent{
    type
    data
    constructor(type, data) {
        this.type = type;
        this.data = data;
    }
}

/**
 * Http request class
 */
class HttpRq{
    /**
     * @param {HttpMethod} m
     */
    setMethod(m) {
        this.method = m.toUpperCase();
    };
    setUrl(u) {
        this.url = encodeURI(u);
    };
    setArg(n, v) {
        this.args[n] = v;
    };
    buildUrlEncoded(args) {
        let ue = "";
        args = args || this.args;

        let argNames = Object.keys(args);
        if (argNames.length>0) {
            for (let i = 0; i < argNames.length; i++) {
                ue += encodeURIComponent(argNames[i]) + '=' + encodeURIComponent(args[argNames[i]]);
                if (i < argNames.length - 1) {
                    ue += '&';
                }
            }
        }
        return ue;
    };
    setHeader(n, v) {
        this.headers[n] = v.toString();
    };

    getHeader(n) {
        return this.headers[n];
    };
    setContent(contentType, data) {
        this.content.type = contentType.toLowerCase();
        this.content.data = data;
    };

    jsonContent(data) {
        let str = "";
        if (typeof data === "string") {
            str = data;
        } else {
            str = JSON.stringify(data);
        }
        this.setContent('json', str);
        this.setHeader('Content-Type', 'application/json');
    };

    xmlContent(data) {
        if (T.isStr(data))
            this.setContent('xml', data);
        else this.setContent('xml', data.outerHTML);
        this.setHeader('Content-Type', 'application/xml');
    };
    /**
     *
     * @param form {string|Node|Element} form id
     */
    formContent(form) {
        let formElement = $$(form)[0];
        let frm = new FormData(formElement);
        this.formMultiPartContent(frm);
    };

    /**
     * @param frm {FormData} custom form data object
     */
    formMultiPartContent(frm) {
        this.setContent('form_multipart', frm);
        // this.setHeader('Content-Type', 'multipart/form-data; boundary=' + frm.boundary)
    };

    // application/x-www-form-urlencoded
    formUrlEncodedContent(data) {
        this.setContent('form_urlencoded', this.buildUrlEncoded(data));
        this.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    };

    /**
     *
     * @param {HttpMethod?} method
     * @param url {String?}
     * @param args {{name: value}?}
     * @param headers {{name: value}?}
     * @param content {HttpContent?}
     */
    constructor(method='GET', url, args, headers, content) {
        this.args = args || {};
        this.headers = headers || {};
        this.content = content || new HttpContent('#urlencoded', {});

        this.setMethod(method);

        this.setUrl(url);
    }

}

module.exports = {HttpContent, HttpRq};
