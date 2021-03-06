/**
 * @module
 * @memberOf core
 */
/**
 * @static
 * @param name
 * @returns {string}
 */
function kebab(name) {
    let kb = "";
    let pres = false;
    for (let i=0;i<name.length; i++) {
        let c = name.charAt(i);
        if (c === '_') {
            kb += '-';
            pres = true;
            continue;
        }
        if (c >= 'A' && c <= 'Z') {
            if (i>0 && !pres) {
                kb+='-';
            }
        }
        kb+=c.toLowerCase();
        pres = false;
    }
    return kb;
}
/**
 * @static
 * @param name
 * @returns {string}
 */
function snake(name) {
    let snk = "";
    let pres = false;
    for (let i=0;i<name.length; i++) {
        let c = name.charAt(i);
        if (c === '-') {
            snk += '_';
            pres = true;
            continue;
        }
        if (c >= 'A' && c <= 'Z') {
            if (i>0 && !pres) {
                snk+='_';
            }
        }
        snk+=c.toLowerCase();
        pres = false;
    }
    return snk;
}
/**
 * @static
 * @param name
 * @returns {string}
 */
function camel(name) {
    let cml = "";
    let pres = false;
    for (let i=0;i<name.length; i++) {
        let c = name.charAt(i);
        if (c === '-' || c === '_') {
            pres = true;
        } else if (pres === true) {
            cml+=c.toUpperCase();
            pres = false;
        } else {
            if (i === 0) {
                cml += c.toLowerCase();
            } else {
                cml += c;
            }
        }
    }
    return cml;
}
/**
 * @static
 * @param name
 * @returns {string}
 */
function pascal(name) {
    let psc = "";
    let pres = false;
    for (let i=0;i<name.length; i++) {
        let c = name.charAt(i);
        if (c === '-' || c === '_') {
            pres = true;
        } else if (pres === true) {
            psc+=c.toUpperCase();
            pres = false;
        } else {
            if (i === 0) {
                psc += c.toUpperCase();
            } else {
                psc += c;
            }
        }
    }
    return psc;
}

module.exports = {kebab, camel, pascal, snake}