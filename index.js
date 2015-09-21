module.exports = {
    book: {
        assets: './assets',
        js: [
            'plugin.js'
        ],
        html: {
            "head:end": function () {
                // window["gitbook-plugin-github-buttons"]
                return '<script>' +
                    'window["gitbook-plugin-github-buttons"] = ' + JSON.stringify(this.options.pluginsConfig["github-buttons"]) +
                    '</script>';
            }
        }
    }

};
