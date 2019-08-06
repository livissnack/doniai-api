'use strict'
const Axios = use('axios')

class DingDingController {
    async daka({request, response}) {
        const result = await Axios({
            method: 'post',
            url: url,
            data: data,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            },
            responseType: 'json',
        });
        return result;
    }
}

module.exports = DingDingController
