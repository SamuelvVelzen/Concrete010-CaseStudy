var nav = (function() {
    const UIStrings = {
        intro: 'introduction',
        process: 'workprocess',
        results: 'results',
        proto: 'prototyping',
        team: 'team',
        navItems: 'nav_list_item_link',
        arrow: 'arrow'
    };

    var _offsetAnchor = function() {
        if (location.hash.length !== 0) {
            window.scrollTo({
                top: window.scrollY - 56,
                left: window.scrollX,
                behavior: 'smooth'
            });
        }
    };

    var _checkNav = function(entries, observer) {
        const elArr = document.getElementsByClassName(UIStrings.navItems);

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let el = document.getElementById('nav' + entry.target.id);

                for (let i = 0; i < elArr.length; i++) {
                    elArr[i].classList.remove('active');
                }
                el.classList.add('active');
            }
        });
    };

    var addEvents = function() {
        const elArr = document.getElementsByClassName(UIStrings.navItems),
            el = document.getElementById(UIStrings.arrow),
            target = document.getElementById(UIStrings.intro);

        el.addEventListener('click', () => {
            var elTop = target.offsetTop;

            window.scrollTo({
                top: elTop - 56,
                behavior: 'smooth'
            });
        });

        for (let i = 0; i < elArr.length; i++) {
            elArr[i].addEventListener('click', () => {
                window.setTimeout(function() {
                    _offsetAnchor();
                }, 0);
            });
        }
    };

    var startObserver = function() {
        const options = {
                rootMargin: '0px',
                threshold: 0.1
            },
            intro = document.getElementById(UIStrings.intro),
            process = document.getElementById(UIStrings.process),
            results = document.getElementById(UIStrings.results),
            proto = document.getElementById(UIStrings.proto),
            team = document.getElementById(UIStrings.team);

        let observer = new IntersectionObserver(_checkNav, options);
        observer.observe(intro);
        observer.observe(process);
        observer.observe(results);
        observer.observe(proto);
        observer.observe(team);
    };

    return {
        init: function() {
            addEvents();
            startObserver();

            // Set the offset when entering page with hash present in the url
            window.setTimeout(_offsetAnchor, 0);
        }
    };
})();
