'use strict';

const axios = require('axios');

/**
 * Stateless New Relic rest client
 */
class StatusPageClient {
    constructor(pageId, apiKey) {
        this.SP_API_URL = "https://api.statuspage.io/v1/pages/" + pageId;
        this.SP_API_KEY = apiKey;
        this.config = {
            headers: {"Authorization": "OAuth " + this.SP_API_KEY}
        };
    }

    /**
     * Returns true if the client can talk to Status Page API
     * @returns {boolean}
     */
    async healthCheck() {
        //TODO: Implement
        return true;
    }

    /**
     * Returns a list of all the components on the status page
     * @returns {Object} List of components
     */
    async getStatusPageComponents() {
        let statusPageComponents = {};

        try {
            console.log('[SP Client] getStatusPageComponents');

            const url = this.SP_API_URL + "/components.json";
            const response = await axios.get(url, this.config);

            if (response.status === 200) {
                const data = response.data;

                console.log("[SP Client] Statuspage.io components: ", data.length);

                for (let i = 0; i < data.length; i++) {
                    const component = data[i];
                    const componentName = component.name.toLowerCase();

                    statusPageComponents[componentName] = component;
                }
            }
            else {
                console.log("[SP Client] Invalid response from statuspage.io API. Status code: " + response.status);
            }
        } catch (error) {
            console.error('[SP Client] error', error);
        }

        return statusPageComponents;
    }
}

module.exports = StatusPageClient;