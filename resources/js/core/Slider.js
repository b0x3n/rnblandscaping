///////////////////////////////////////////////////////////
//  resources/js/core/Slider.js
//

    const   Slider = (

        err,
        parentEl,
        slideDuration = 10000

    ) =>
    {

        const   __el = $(`#${parentEl}`);
        let     __slides = [];

        const   __slideDuration = slideDuration;
        let     __timeoutHandler = false;

        let     __currentSlide;
        let     __slideState;

        const   SLIDE_STATE_LOCKED      = 0;
        const   SLIDE_STATE_ENABLED     = 1;
        const   SLIDE_STATE_PAUSED      = 2;


        const   __initialise = () =>
        {

            if (! __el)
                return err.setError(`Error in Slider: Parent element '${parentEl}' not found`);

            __currentSlide = 0;
            __slideState = SLIDE_STATE_LOCKED;

            __registerSlides();

            if (window.location.hash)
                __findSlide(window.location.hash.substr(1));

            __displaySlide();

        };


        const   __registerSlides = () =>
        {

            $(`#${parentEl}`).children().each(function()
            {
                const   __id = ($(this).attr('id').split('-')[1]);

                const   __slide = {
                    'id': __id,
                    'slide': `#ServiceSlide-${__id}`,
                    'text': `#ServiceSlideText-${__id}`,
                    'title': `#ServiceSlideTitle-${__id}`,
                    'image': `#ServiceSlideImage-${__id}`,
                    'short': `#ServiceSlideShort-${__id}`,
                    'long': `#ServiceSlideLong-${__id}`,
                    'thumb': `#SlideThumb-${__id}`
                };

                $(__slide.text).css('height', `${$(__slide.image).css('height')}`);

                __slides.push(__slide);
            });

            __initMouseEvents();
            
        };


        const   __findSlide = slideId =>
        {

            __slides.forEach((slide, index) => {
                if (slideId === slide.id)
                    return __currentSlide = index;
            });

        };


        const   __setSlide = slideId =>
        {

            console.log(`Clicked slide ${slideId}`);
            if (__timeoutHandler)
            {
                clearTimeout(__timeoutHandler);
                __timeoutHandler = false;
            }

            __hideSlide(__slides[__currentSlide], true);

            __timeoutHandler = setTimeout(() => {
                __findSlide(slideId);
    
                console.log(`Showing clicked slide ${slideId} (${__currentSlide})`)
                __timeoutHandler = false;

                __displaySlide();
            }, 3200);

        };


        const   __initMouseEvents = () =>
        {
            
            $('.SlideThumb').on('mouseover', e => {
                const   __id = e.target.id.split('-')[1];

                if (__id === __slides[__currentSlide].id)
                    return;

                $(`#SlideThumb-${__id}`).stop().animate({
                    'opacity': '0.99'
                }, 1000, "linear");
            });

            $('.SlideThumb').on('mouseout', e => {
                const   __id = e.target.id.split('-')[1];

                // if (! __slideState)
                //     return;

                if (__id === __slides[__currentSlide].id)
                    return;

                $(`#SlideThumb-${__id}`).stop().animate({
                    'opacity': '0.50'
                }, 1000, "linear");
            });

            // $(`.SlideThumb`).on('click', e => {
            //     const   __id = e.target.id.split('-')[1];
            //     __setSlide(__id);
            // });

            // $('.SlideImage,.SlideText,.SlideShortText,.SlideLongText').on('mouseover', e => {
            //     const __id = e.target.id.split('-')[1];

            //     if (__slideState !== SLIDE_STATE_ENABLED)
            //         return;

            //     __slideState = SLIDE_STATE_PAUSED;

            //     console.log(`Resetting timeout`);
            //     clearTimeout(__timeoutHandler);
            //     __timeoutHandler = false;
            // });

            // $('.SlideImage').on('mouseout', e => {
            //     if (__slideState !== SLIDE_STATE_PAUSED)
            //         return;

            //     __slideState = SLIDE_STATE_ENABLED;

            //     console.log(`Restarting timer - ${__slideDuration} ms`);
            //     __showSlide(__slides[__currentSlide], true);
            // });

        };


        const   __prepSlide = slide =>
        {

            $(slide.slide).css({
                'display': 'block'
            });

            $(`${slide.image},${slide.short},${slide.long}`).css({
                'opacity': '0.01'
            });

            $(slide.short).css({
                'margin-left': '-200%'
            });

            $(slide.long).css({
                'margin-left': '200%'
            });
            
            $(`#ServiceSlideText-${slide.id}`).css('height', $(`${slide.image}`).css('height'))

            window.location.hash = __slides[__currentSlide].id;
            
        };


        const   __showSlide = (
            
            slide,
            continuation = false
            
        ) =>
        {

            if (__timeoutHandler)
                return;
    
            console.log(`>> SHOWING SLIDE ${slide.id}`);

            // $(`#SlideThumb-${slide.id}`).animate({
            //     'opacity': '0.50'
            // }, 500, "linear");

            if (! continuation)
            {
                $(`${slide.image},#SlideThumb-${slide.id}`).stop().animate({
                    'opacity': '0.99'
                }, 1000, "linear");

                $(`${slide.short}`).animate({
                    'margin-left': '0%',
                    'opacity': '0.99'
                }, 1000, "swing");

                $(`${slide.long}`).animate({
                    'margin-left': '0%',
                    'opacity': '0.99'
                }, 3000, "swing", () => {
                    __slideState = SLIDE_STATE_ENABLED;
                });  
            }

            __timeoutHandler = setTimeout(() => {
                __hideSlide(slide);
            }, __slideDuration);

        };


        const   __hideSlide = (
            
            slide,
            isClicked = false
            
        ) =>
        {
            
            $(`#SlideThumb-${slide.id}`).animate({
                'opacity': '0.50'
            }, 1000, "linear");

            $(slide.short).animate({
                'opacity': '0.01',
                'margin-left': '100%'
            }, 1000, "swing");

            $(slide.long).animate({
                'opacity': '0.01',
                'margin-left': '-100%'
            }, 2000, "swing");

            $(`${slide.image}`).stop().animate({
                'opacity': '0.01'
            }, 2000, "linear", () => {
                $(`${slide.slide}`).css({'display': 'none'});
                
                $(`.SlideThumb`).css({
                    'opacity': '0.50'
                });

                if (! isClicked)
                {
                    __currentSlide++;

                    if (__currentSlide >= (__slides.length - 1))
                        __currentSlide = 0;
                        
                    __timeoutHandler = false;
                    __slideState = SLIDE_STATE_LOCKED;
                    __displaySlide();
                }
            });
        };


        const   __displaySlide = () =>
        {

            if (__currentSlide > (__slides.length - 1))
                __currentSlide = 0;

            const   _slide = __slides[__currentSlide];

            __prepSlide(_slide);
            __showSlide(_slide);

        };


        __initialise();


        return {

            //

        };

    };


    export default Slider;
