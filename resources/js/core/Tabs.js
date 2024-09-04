///////////////////////////////////////////////////////////
//  resources/js/core/Tabs.js
//

    const   Tabs = (

        err

    ) =>
    {

        let     _tabs = [];
        let     _currentTab;


        const   __initialise = () =>
        {

            __listTabs();

            if (window.location.hash === '')
                _currentTab = _tabs[0];
            else
            {
                _currentTab = window.location.hash.substr(1);

                if (_tabs.indexOf(_currentTab) < 0)
                    _currentTab = _tabs[0];
            }

            window.location.hash = _currentTab;

            __initialiseTabs();
            //$(`#Tab${_tabs.length - 1}`).trigger('click');
            __refreshTabs();

            _setContentHeight();

        };


        const   __initialiseTabs = () =>
        {

            $('.Tab').on('click', e => {
                const   __id = parseInt(e.target.id.substr(3));

                if (__id >= (_tabs.length - 1))
                    return;

                let _tmp = _tabs[(_tabs.length - 1)];
                _tabs[(_tabs.length - 1)] = _tabs[__id];
                _tabs[__id] = _tmp;

                _tabs.forEach((t, i) => {
                    console.log(`Reordered >>>>> ${i} = ${t}`);
                })

                _currentTab = window.location.hash = _tabs[(_tabs.length - 1)];

                __refreshTabs();
            });

            $('.Tab').on('mouseover', e => {
                const   __id = parseInt(e.target.id.substr(3));
                if (__id < (_tabs.length - 1))
                {
                    $(`#Tab${__id}`).stop().animate({
                        'color': '#FFF'
                    });
                }
            });

            $('.Tab').on('mouseout', e => {
                const   __id = parseInt(e.target.id.substr(3));

                if (__id < (_tabs.length - 1))
                {
                    $(`#Tab${__id}`).stop().animate({
                        'color': '#E0E0E0'
                    });
                }
            });

        };


        const   __listTabs = () =>
        {

            let __hash = window.location.hash.substr(1);

            if (__hash === '')
                __hash = window.location.hash = 'Account-Manager';

            $(`#TabsHeader`).children().each((index, tab) => {
                if (__hash === '')
                    _tabs.push($(tab).attr('name'));
                else
                {
                    if ($(tab).attr('name') !== __hash)
                        _tabs.push($(tab).attr('name'));
                }
            });

            if (__hash !== '')
                _tabs.push(__hash);

        };


        const  __refreshTabs = () =>
        {

            $(`.TabContent`).css({
                'visibility': 'hidden',
                'display': 'none'
            });

            for (let __tab = 0; __tab < _tabs.length; __tab++)
            {
                $(`#Tab${__tab}`).html(`${_tabs[__tab].replace('-', '&nbsp;')}`);
            }            
            
            $(`#TabContent${_currentTab}`).css({
                'visibility': 'visible',
                'display': 'block'
            });
            if (! $(`#Tab${_tabs.length - 1}`).hasClass('TabSelected'))
                $(`#Tab${_tabs.length - 1}`).addClass('TabSelected');
        };


        const   _setContentHeight = () =>
        {

            const   __tabHeaderHeight = parseInt($('#TabsHeader').css('height').replace('px'));
            const   __dashboardHeight = parseInt($('#Dashboard').css('height').replace('px', ''));

            $('.TabContent').css('height', `${__dashboardHeight - __tabHeaderHeight}px`);

        };


        __initialise();


        return {

            setContentHeight:           _setContentHeight

        };

    };


    export default Tabs;
