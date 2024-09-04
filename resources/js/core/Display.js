///////////////////////////////////////////////////////////
//  resources/js/core/Display.js
//
//  Some elements on the display will stretch/squash
//  depending on the current scroll position.
//
//  The extremes can be set in the respective .scss files,
//  example - file:
//
//      resources/css/style/header.scss
//
//  Defined the Header element woth a min-height and a
//  max-height property. The Header element will be shown
//  at max height when the scroll position is 0 - it will
//  shrink to min-height as we scroll down.
//
//  The Footer is an inversion of this, starting at min
//  height and staying at min height until we get to the
//  bottom of the page, as we reach the bottom the
//  Footer will grow to max height.
//
//  The Navbar also shrinks/grows but follows the Header,
//  it always attaches to the bottom of the header and
//  will only shrink/grow when the header is at min
//  height.
//
//  Sounds more complex than it is, seeing it work in
//  the browser will help clarify.
//


    const   Display = (

        err,
        menu

    ) =>
    {

//  We gather a bunch of info about the current display,
//  it's size, the size of the page, etc.
//
        let     _scrollPos;

        let     _displayHeight;
        let     _displayWidth;

        let     _documentLength;

        let     _headerMin;
        let     _headerMax;
        let     _headerDiff;
        let     _headerHeight;

        let     _navbarMin;
        let     _navbarMax;
        let     _navbarDiff;
        let     _navbarHeight;

        let     _footerMin;
        let     _footerMax;
        let     _footerDiff;
        let     _footerHeight;


        let     __registerTabs = false;


        const   __initialise = () =>
        {

            window.scrollTo(0, 0);

//  We want to call this on startup and any time there
//  is a scroll or resize event.
//
            __updateDisplay();

//  Update on scroll and resize, this will re-calculate
//  everything and adjust to different displays.
//
            $(window).on('resize', () => {
                __updateDisplay();

                if (__registerTabs)
                    __registerTabs.setContentHeight();
            });
            $(window).on('scroll', () => {
                __updateDisplay();

                if (__registerTabs)
                    __registerTabs.setContentHeight();
            });

        };


///////////////////////////////////////////////////////////
//  __getDocumentLength()
//
//  Returns the full length of the document in pixels.
//
        const   __getDocumentLength = () =>
        {
            
            let body            = document.body;
            let html            = document.documentElement;
        
            return Math.max(
                body.scrollHeight,
                body.offsetHeight, 
                html.clientHeight,
                html.scrollHeight,
                html.offsetHeight
            );

        };


///////////////////////////////////////////////////////////
//  __updateDisplay()
//
//  Gathers all of the information about the display,
//  the base elements (Header, Navbar and Footer) before
//  calling __refreshDisplay().
//
        const   __updateDisplay = () =>
        {

            _displayHeight = window.innerHeight;
            _displayWidth = window.innerWidth;

            //err.debugMsg(` >> Display height = ${_displayHeight}, width = ${_displayWidth}, document length = ${_documentLength}`);

            _headerMin = parseInt($('Header').css('min-height'));
            _headerMax = parseInt($('Header').css('max-height'));
            _headerDiff = (_headerMax - _headerMin);

            //err.debugMsg(` >> Header max: ${_headerMax}, Header min: ${_headerMin}`);

            _navbarMin = parseInt($('#Navbar').css('min-height'));
            _navbarMax = parseInt($('#Navbar').css('max-height'));
            _navbarDiff = (_navbarMax - _navbarMin);

            //err.debugMsg(` >> Navbar max: ${_navbarMax}, Navbar min: ${_navbarMin}`);

            _footerMin = parseInt($('#Footer').css('min-height'));
            _footerMax = parseInt($('#Footer').css('max-height'));
            _footerDiff = (_footerMax - _footerMin);

            //err.debugMsg(` >> Footer max: ${_footerMax}, Footer min: ${_footerMin}`);

//  All empties are set to the max-height of their
//  respective element.
//
            $('#EmptyHeader').css('height', `${_headerMax}px`);
            $('#EmptyNavbar').css('height', `${_navbarMax}px`);
            $('#EmptyFooter').css('height', `${_footerMax}px`);

            _documentLength = __getDocumentLength();

            __refreshDisplay();

        };


///////////////////////////////////////////////////////////
//  __refreshDisplay()
//
//  Stores the current scroll position then refreshes
//  each individual element.
//
        const   __refreshDisplay = () =>
        {

            _scrollPos              = window.scrollY;

           // err.debugMsg(` > Refreshing display - scrcoll Y = ${_scrollPos}...`);

            __refreshHeader();
            __refreshNavbar();
            __refreshFooter();
            __refreshModal();
            __refreshMenu();
            __refreshSlides();

        };


        const   __refreshSlides = () =>
        {

            const e = ('#Slider');

            if (! e)
                return;

            $('#Slider').each(() => {
                const   __id = $(this).attr('id').split('-')[1];

                $(`#ServiceSlideText-${__id}`).css('height', $(`#ServiceSlideImage-${__id}`).height());
            });

        };


///////////////////////////////////////////////////////////
//  __refreshHeader()
//
//  Refresh the Header element based on the current
//  set of data collected by the __updateDisplay()
//  function.
//
        const   __refreshHeader = () =>
        {

            if (! _scrollPos)
                _headerHeight = _headerMax;
            else if (_scrollPos > _headerDiff)
                _headerHeight = _headerMin;
            else
                _headerHeight = (_headerMax - _scrollPos);

            $('#Header').css('height', `${_headerHeight}px`);

        };


///////////////////////////////////////////////////////////
//  __refreshNavbar()
//
//  Refresh the Navbar element based on the current
//  set of data collected by the __updateDisplay()
//  function.
//
        const   __refreshNavbar = () =>
        {

            if (_scrollPos < _headerDiff)
                _navbarHeight = _navbarMax;
            else
            {
                if (_scrollPos < (_headerDiff + _navbarDiff))
                    _navbarHeight = (_navbarMax - (_scrollPos - _headerDiff));
                else
                    _navbarHeight = _navbarMin;
            }

            $('#Navbar').css({
                'top': `${_headerHeight}px`,
                'height': `${_navbarHeight}px`
            });

        };


///////////////////////////////////////////////////////////
//  __refreshFooter()
//
//  Refresh the Footer element based on the current
//  set of data collected by the __updateDisplay()
//  function.
//
        const   __refreshFooter = () =>
        {

            const   __pageBottom = (_scrollPos + _displayHeight);
            const   __pageRemaining = (_documentLength - __pageBottom);

            if (__pageRemaining === 0) 
                _footerHeight = _footerMax;
            else
            {
                if (__pageRemaining >= _footerDiff)
                    _footerHeight = _footerMin;
                else
                    _footerHeight = (_footerMax - __pageRemaining);
            }

            $('#Footer').css('height', `${_footerHeight}px`);

        };


        const   __refreshModal = () =>
        {
            
            $('.Modal').css({
                'top': `${_headerHeight + _navbarHeight}px`,
                'height': `${_displayHeight - (_headerHeight + _navbarHeight + _footerHeight)}px`
            });

            // $('#CreateNewService').css({
            //     'display': 'block'
            // });

        };


///////////////////////////////////////////////////////////
//  __refreshMenu()
//
        const   __refreshMenu = () =>
        {

            if (menu.menuState() !== -1)
            {
                $('#Menu').css({
                    'top': `${_headerHeight + _navbarHeight}px`,
                    'height': `${_displayHeight - (_headerHeight + _navbarHeight + _footerHeight)}px`
                });
            }

        };


        const   _registerTabs = tabs =>
        {

            __registerTabs = tabs;

        };


///////////////////////////////////////////////////////////
//  _displayInfo()
//
//  Public method - this will return all of the data
//  gathered by the last call to __updateDisplay().
//
        const   _displayInfo = () =>
        {

            return {

                'scrollPos':        _scrollPos,

                'displayHeight':    _displayHeight,
                'displayWidth':     _displayWidth,

                'headerMax':        _headerMax,
                'headerMin':        _headerMin,
                'headerDiff':       _headerDiff,
                'headerHeight':     _headerHeight,

                'navbarMax':        _navbarMax,
                'navbarMin':        _navbarMin,
                'navbarDiff':       _navbarDiff,
                'navbarHeight':     _navbarHeight,

                'footerMax':        _footerMax,
                'footerMin':        _footerMin,
                'footerDiff':       _footerDiff,
                'footerHeight':     _footerHeight

            };

        };


        __initialise();


        return {
            
            displayInfo:            _displayInfo,

            registerTabs:           _registerTabs

        };

    };


    export default Display;
