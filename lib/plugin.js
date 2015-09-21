// LICENSE : MIT
"use strict";

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

require(['gitbook'], function (gitbook) {
    function addBeforeHeader(element) {
        jQuery('.book-header > h1').before(element);
    }

    function createButton(_ref) {
        var user = _ref.user;
        var repo = _ref.repo;
        var type = _ref.type;
        var size = _ref.size;
        var count = _ref.count;

        var width = size === "large" ? "170px" : "160xp";
        var height = size === "large" ? "30" : "20xp";
        var extraParam = type === "watch" ? "&v=2" : "";
        return '<iframe src="https://ghbtns.com/github-btn.html?user=' + user + '&repo=' + repo + '&type=' + type + '&count=' + count + '&size=' + size + extraParam + '" frameborder="0" scrolling="0" width="' + width + '" height="' + height + '"></iframe>';
    }

    function insertGitHubLink(_ref2) {
        var user = _ref2.user;
        var repo = _ref2.repo;
        var types = _ref2.types;
        var size = _ref2.size;
        var count = _ref2.count;

        types.reverse().forEach(function (type) {
            var elementString = createButton({
                user: user,
                repo: repo,
                type: type,
                size: size,
                count: count
            });
            addBeforeHeader(elementString);
        });
    }

    function init(config) {
        var repoPath = config.github.repo;

        var _repoPath$split = repoPath.split("/");

        var _repoPath$split2 = _slicedToArray(_repoPath$split, 2);

        var user = _repoPath$split2[0];
        var repo = _repoPath$split2[1];

        if (repoPath == null) {
            console.log("Should set github.repo");
            return;
        }
        var types = config.github.types || ["star", "watch"];
        var size = config.github.size || "large";
        var count = typeof config.github.count === "undefined" ? "true" : "false";
        insertGitHubLink({
            user: user,
            repo: repo,
            types: types,
            size: size,
            count: count
        });
    }

    // injected by html hook
    function getPluginConfig() {
        return window["gitbook-plugin-github-buttons"];
    }

    gitbook.events.bind('page.change', function () {
        init(getPluginConfig());
    });
});
//# sourceMappingURL=plugin.js.map