/**
 * Http Response class
 * @property json {Object}
 * @property xml {XMLDocument}
 *
 */
class HttpRs {
    /**
     * @constructor
     * @param {XMLHttpRequest} xhr
     */
    constructor(xhr) {
        this.xhr = xhr
        this.status = {
            code: xhr.status,
            text: xhr.statusText
        };
        this.headers = xhr.getAllResponseHeaders();
        this.contentLength = xhr.response.length || 0;
        this.data = xhr.response;
        this.json = undefined
        this.xml = undefined
        if (xhr.responseType === 'text' || xhr.responseType === '')
            this.text = xhr.responseText;
        Object.defineProperty(this, 'json', {
            get() {
                try {
                    if (!xhr.responseJSON) {
                        xhr.responseJSON = JSON.parse(this.xhr.responseText);
                    }
                } catch (e) {
                    console.log(e);
                }
                return xhr.responseJSON
            }
        });

        Object.defineProperty(this, 'xml', {
            get() {
                try {
                    if (!xhr.responseXML && !xhr.responseXml) {
                        let parser = new DOMParser();
                            xhr.responseXml = parser.parseFromString(self.text,"text/xml");
                    }
                }catch (e) {
                    console.log(e)
                }

                return xhr.responseXml;
            }
        })
    }

}
module.exports = {HttpRs};