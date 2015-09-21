// LICENSE : MIT
"use strict";
require(['gitbook'], function (gitbook) {
    function addBeforeHeader(element) {
        jQuery('.book-header > h1').before(element)
    }

    function createButton({
        user,
        repo,
        type,
        size,
        count
        }) {
        var width = size === "large" ? "170px" : "160xp";
        var height = size === "large" ? "30" : "20xp";
        var extraParam = type === "watch" ? "&v=2" : "";
        return `<iframe src="https://ghbtns.com/github-btn.html?user=${user}&repo=${repo}&type=${type}&count=${count}&size=${size}${extraParam}" frameborder="0" scrolling="0" width="${width}" height="${height}"></iframe>`;
    }


    function insertGitHubLink({
        user,
        repo,
        types,
        size,
        count
        }) {
        types.reverse().forEach(type => {
            var elementString = createButton({
                user,
                repo,
                type,
                size,
                count
            });
            addBeforeHeader(elementString);
        });
    }

    gitbook.events.bind('start', function (e, config) {
        var repoPath = config.github.repo;
        var [user, repo] = repoPath.split("/");
        if (repoPath == null) {
            console.log("Should set github.repo");
            return;
        }
        var types = config.github.types || ["star", "watch"];
        var size = config.github.size || "large";
        var count = typeof config.github.count === "undefined" ? "true" : "false";
        insertGitHubLink({
            user,
            repo,
            types,
            size,
            count
        });
    });

    gitbook.events.bind('page.change', function () {
        insertGitHubLink();
    });
});
