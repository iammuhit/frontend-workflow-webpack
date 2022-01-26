import Template from 'lodash.template';

export const env = (key, value) => {
    let res = process.env[key] ? process.env[key] : value;

    if (res === 'true') res = true;
    if (res === 'false') res = false;
    if (res === null) res = null;
    if (!isNaN(Number(res))) res = Number(res);

    return res;
};

export const url = {
    build: (base_url, uri = '', query = {}, fragment = '') => {
        let url = typeof base_url !== 'undefined' ? base_url : '/';
        let query_string = Object.keys(query).map((key) => [key, query[key]].join('=')).join('&');
    
        url = uri.length ? url + uri : url;
        url = query_string.length ? [url, query_string].join('?') : url;
        url = fragment.length ? [url, fragment].join('#') : url;
    
        return url;
    },
};

export const banner = (banner, data) => new Template(banner)(data);

export default { env, url, banner };