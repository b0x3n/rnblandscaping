///////////////////////////////////////////////////////////
//  resources/js/core/Nav.js
//

    const   Nav = (

        err,
        menu
 
    ) =>
    {

        const   __initialise = () =>
        {

//  Set up click handler for nav and menu links...
//
            $('#NavbarInner a, #Menu a, .ProjectSlideThumb, .ProjectSlideThumbImage,.ProjectSlideThumbTitle, .ContentHomeServiceTitle,.ContentHomeServiceThumb').on('click', e => {

                const   __link = e.target.id.split('-')[1];

                e.preventDefault();

                if  (e.target.id.split('-')[0] === 'MenuLink')
                {
                    menu.hideMenu(() => {
                    });
                    __fadeContentOut(() => {
                        window.location.href = `/${__link}`;
                    }, 650);
                }
                else if (e.target.id.split('-')[0].substr(0, 7) === 'Service' || e.target.id.split('-')[0].substr(0, 19) === 'ProjectSlideService')
                {
                    let __id = e.target.id.split('-')[1];
                    __fadeContentOut(() => {
                        window.location.href = `/Services#${e.target.id.split('-')[1]}`;
                        //window.location.reload()
                    }, 650);
                }
                else if (e.target.id.split('-')[0].substr(0, 7) === 'Project')
                {
                    __fadeContentOut(() => {
                        window.location.href = `/Projects#${e.target.id.split('-')[1]}`;
                        window.location.reload()
                    }, 650);
                }
                else
                {
                    __fadeContentOut(() => {
                        window.location.href = `/${__link}`;
                    }, 650);
                }
            
            });

            $('.ProjectPreview, .ProjectPreviewImage, .ProjectPreviewText').on('click', e => {
                const   __id = e.target.id.split('-')[1];
                const   __title = $(`#ProjectPreviewTitle-${__id}`).html().trim().replace(/ /g, '_');

                __fadeContentOut(() => {
                    window.location.href = `/Projects#${__title}`;
                    // window.location.reload()
                }, 650);
            });

            $('.ContentHomeService').on('mouseover', e => {
                const   __id = e.target.id.split('-')[1];

                $(`#ServicePreview-${__id}`).stop().animate({
                    'opacity': '0.99'
                }, 500, "linear");
            });

            $('.ContentHomeService').on('mouseout', e => {
                const   __id = e.target.id.split('-')[1];

                $(`#ServicePreview-${__id}`).stop().animate({
                    'opacity': '0.50'
                }, 500, "linear");
            });

            $('.ContactHomeService').on('mouseover', e => {
                const   __id = e.target.id.split('-')[1];

                $(`#ContactPreview-${__id}`).stop().animate({
                    'opacity': '0.99'
                }, 500, "linear");
            });

            $('.ContactHomeService').on('mouseout', e => {
                const   __id = e.target.id.split('-')[1];

                $(`#ContactPreview-${__id}`).stop().animate({
                    'opacity': '0.50'
                }, 500, "linear");
            });

            $('.SlideThumb,.SlideThumbImage,.SlideThumbTitle').on('click', e => {
                // if (e.target.id.substr(0, 7) === 'Service')
                // {
                    e.preventDefault();

                    const   __id = e.target.id.split('-')[1];
                 
                    //alert(__id);
                    menu.hideMenu(() => {
                    });
                    __fadeContentOut(() => {
                        window.location.href = `/Services#${__id}`;
                        window.location.reload();
                    }, 650);
               //}
            });

            $('.ProjectSlideService').on('click', e => {
                let __id = $(`#${e.target.id}`).html().replace(/ /g, '_');

                __fadeContentOut(() => {
                    window.location.href = `/Services#${__id}`;
                    //window.location.reload();
                }, 650);
            })


            __fadeContentIn(() => {
                console.log(`Done`);
            }, 500);

            //__highlightLinks();
            __initSocialMediaLinks();
            __initMouseEvents();

            __initLogoAnimation();

        };


        const   __initLogoAnimation = () =>
        {

            $('#HeaderTitle').on('mouseover', () => {
                $('#HeaderIconOuter').removeClass('RotateLogoOuter');
                $('#HeaderIconMiddle').removeClass('RotateLogoMiddle');
                $('#HeaderIconInner').removeClass('RotateLogoInner');
                $('#HeaderIconOuter').addClass('ResetLogoOuter');
                $('#HeaderIconMiddle').addClass('ResetLogoMiddle');
                $('#HeaderIconInner').addClass('ResetLogoInner');
            });
            
            $('#HeaderTitle').on('mouseout', () => {
                $('#HeaderIconOuter').removeClass('ResetLogoOuter');
                $('#HeaderIconMiddle').removeClass('ResetLogoMiddle');
                $('#HeaderIconInner').removeClass('ResetLogoInner');
                $('#HeaderIconOuter').addClass('RotateLogoOuter');
                $('#HeaderIconMiddle').addClass('RotateLogoMiddle');
                $('#HeaderIconInner').addClass('RotateLogoInner');
            });

            $('#HeaderTitle div').on('click', () => {
                $('#NavbarLink-Home').trigger('click');
            });

        };


        const   __fadeContentOut = (

            callback = false,
            delay = 1000

        ) =>
        {

            const   __path = window.location.pathname.replace('/', '');

            $(`#NavbarLink-${__path}, #MenuLink-${__path}`).animate({
                'color': '#ADDB30'
            }, 500, "linear");
            
            $('#Content').animate(
                {
                    'opacity': '0.01'
                },
                delay,
                "linear",
                () => {
                    if (callback)
                        callback();
                }
            );

        };

        const   __fadeContentIn = (

            callback = false,
            delay = 1000

        ) =>
        {

            const   __path = window.location.pathname.replace('/', '');

            $(`#NavbarLink-${__path}, #MenuLink-${__path}`).animate({
                'color': '#FFF'
            }, 500, "linear");

            $('#Content').animate(
                {
                    'opacity': '0.99'
                },
                delay,
                "linear",
                () => {
                    if (callback)
                        callback();
                }
            );

        };


        const   __highlightLinks = () =>
        {

            const   _currentPage = window.location.pathname.replace('/', '');

            $(`#NavbarLink-${_currentPage}`).css('color', '#FFF');

        };


        const   __initMouseEvents = () =>
        {

            $('#Navbar a, #Menu a').on('mouseover', e => {

                const   id = e.target.id.split('-')[1];

                if (id === window.location.pathname.replace('/', ''))
                    return;

                if (e.target.id.split('-')[0] === 'MenuLink')
                {
                    if (menu.menuState() !== 1)
                        return;
                }
                    
                $(`#${e.target.id}`).stop().animate({
                    'color': '#FFF'
                }, 500, "linear", () => { console.log('DONE!!!'); });

            });

            $('#Navbar a, #Menu a').on('mouseout', e => {

                const   id = e.target.id.split('-')[1];

                if (id === window.location.pathname.replace('/', ''))
                    return;

                if (e.target.id.split('-')[0] === 'MenuLink')
                {
                    if (menu.menuState() !== 1)
                        return;
                }
                    
                $(`#${e.target.id}`).stop().animate({
                    'color': '#ADDB30'
                }, 500, "linear", () => { console.log('DONE!!!'); });

            });

        };


        const   __initSocialMediaLinks = () =>
        {

            $('#FacebookLink, #InstagramLink, #LinkedInLink').on('mouseover', e => {
                let __id = $(e.target).attr('id');
                $(`#${__id}`).stop().animate({
                    'opacity': '0.99'
                }, 500, "linear");
            });

            $('#FacebookLink, #InstagramLink, #LinkedInLink').on('mouseout', e => {
                let __id = $(e.target).attr('id');
                $(`#${__id}`).stop().animate({
                    'opacity': '0.50'
                }, 500, "linear");
            });

        };


        __initialise();


        return {
            //
        };

    };


    export default Nav;
