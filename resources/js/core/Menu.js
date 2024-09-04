///////////////////////////////////////////////////////////
//  resources/js/core/Menu.js
//

    const   MENU_STATE_HIDDEN       = -1;
    const   MENU_STATE_LOCKED       = 0;
    const   MENU_STATE_READY        = 1;


    const   Menu = (

        err

    ) =>
    {

        let     __state             = MENU_STATE_HIDDEN;

        let     __menuLinks         = [];


        const   __initialise = () =>
        {

            $('#HeaderToggle').on('mouseover', () => {
                if  (__state !== MENU_STATE_HIDDEN)
                    return;
                $('#HeaderToggle div').stop().animate({
                    'backgroundColor': '#FFF !important'
                }, 500, "linear");
            });

            $('#HeaderToggle').on('mouseout', () => {
                if  (__state !== MENU_STATE_HIDDEN)
                    return;
                $('#HeaderToggle div').stop().animate({
                    'backgroundColor': '#ADDB30 !important'
                }, 500, "linear");
            });

            $('#HeaderToggle').on('click', () => {
                if (__state === MENU_STATE_HIDDEN)
                {
                    _showMenu(() => {
                        __state = MENU_STATE_READY;
                    });
                }
                else if (__state === MENU_STATE_READY)
                {
                    _hideMenu(() => {
                        __state = MENU_STATE_HIDDEN;
                    });
                }
            });

        };


        const   _showMenu = callback =>
        {

            if (__state !== MENU_STATE_HIDDEN)
                return false;

            __state = MENU_STATE_LOCKED;

            __toggleCloser();

            const   __headerHeight = parseInt($('#Header').css('height').replace('px', ''));
            const   __navbarHeight = parseInt($('#Navbar').css('height').replace('px', ''));
            const   __footerHeight = parseInt($('#Footer').css('height').replace('px', ''));

            $('#Menu').animate({
                'top': `${__headerHeight + __navbarHeight}px`,
                'height': `${window.innerHeight - (__headerHeight + __navbarHeight + __footerHeight)}px`
            }, 500, "linear", () => {
                __popMenuLinks(() => {
                    callback();
                });
            });

            return true;

        };


        const   _hideMenu = (
            
            callback = false
            
        ) =>
        {

            if (__state !== MENU_STATE_READY)
                return false;

            __state = MENU_STATE_LOCKED;

            __toggleMenu();

            __unpopMenuLinks(() => {
                $('#Menu').animate({
                    'top': '-250%'
                }, 500, "linear", () => {
                    __state = MENU_STATE_HIDDEN;
                    if (callback)
                        callback();
                });    
            })

        };


        const   __listMenuLinks = callback =>
        {

            __menuLinks = [];

            $('#Menu').children().each((index, link) => {
                __menuLinks.push(link.id.split('-')[1]);
            });

        };


        const   __popMenuLinks = callback =>
        {

            __listMenuLinks();

            return __popMenuLink(0, 1, callback);

        };


        const   __popMenuLink = (

            linkIndex,
            increment,
            callback
        
        ) =>
        {

            if (increment > 0)
            {
                if (linkIndex >= __menuLinks.length)
                    return callback();
            }
            else
            {
                if (linkIndex < 0)
                    return callback();
            }

            let     opacity = '0.99';

            if (increment < 1)
                opacity = '0.01';

            $(`#MenuLink-${__menuLinks[linkIndex]}`).stop().animate({
                'opacity': opacity
            }, 200, "linear", () => {
                return __popMenuLink((linkIndex + increment), increment, callback);
            });

        };


        const   __unpopMenuLinks = callback =>
        {

            __listMenuLinks();

            __popMenuLink((__menuLinks.length - 1), -1, callback);

        };


        const   __toggleCloser = () =>
        {

            if (document.getElementById('HeaderToggleTop').classList.contains('ResetToggleTop'))
                $('#HeaderToggleTop').removeClass('ResetToggleTop');

            if (document.getElementById('HeaderToggleBottom').classList.contains('ResetToggleBottom'))
                $('#HeaderToggleBottom').removeClass('ResetToggleBottom');

            $('#HeaderToggleTop').stop().animate({
                'color': '#FFF'
            }, 500, "linear");

            $('#HeaderToggleTop').addClass('RotateToggleTop');

            $('#HeaderToggleMiddle').stop().animate({
                'left': '-100vw',
                'opacity': '0.01'
            }, 500, "linear");

            $('#HeaderToggleBottom').stop().animate({
                'color': '#FFF'
            }, 500, "linear");

            $('#HeaderToggleBottom').addClass('RotateToggleBottom');

            $('#HeaderToggle').attr('title', 'Close navigation menu');

        };


        const   __toggleMenu = () =>
        {

            $('#HeaderToggletop').removeClass('RotateToggleTop');
            $('#HeaderToggleBottom').removeClass('RotateToggleBottom');

            $('#HeaderToggleMiddle').css('left', "200%");

            $('#HeaderToggleMiddle').stop().animate({
                'left': '0',
                'color': '#ADDB30',
                'opacity': '0.99'
            }, 500, "linear");

            $('#HeaderToggleTop').addClass('ResetToggleTop');
            $('#HeaderToggleBottom').addClass('ResetToggleBottom');

            $('#HeaderToggleTop,#HeaderToggleMiddle,#HeaderToggleBottom').animate({
                'background-color': '#ADDB30'
            }, 1000, 'linear');

            $('#HeaderToggle').attr('title', 'View navigation menu');

        };


        const   _menuState = () =>
        {

            return __state;

        };


        __initialise();


        return {
            
            showMenu:               _showMenu,
            hideMenu:               _hideMenu,

            menuState:              _menuState

        };

    };


    export default Menu;
