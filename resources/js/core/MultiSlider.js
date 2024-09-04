///////////////////////////////////////////////////////////
//  resouorces/js/core/MultiSlider.js
//

    const   MultiSlider = (

        err

    ) =>
    {

        let     __projects = [];

        let     __currentProject = window.location.hash;

        let     __lockServices = true;

        const   __initialise = () =>
        {

            __listProjects();

            if (__currentProject !== '')
                window.location.hash = __currentProject;

            if (__currentProject.substr(0, 1) === '#')
                __currentProject = __currentProject.substr(1);
                
            if (! __projectExists(__currentProject))
                window.location.hash = __currentProject = __projects[0].id;

            __showSlides();

            // $('.SlideThumb').on('click', e => {
            //     e.preventDefault();
            //     let __id = e.target.id.split('-')[1];
            //     $(`#${e.target.id}`).attr('href', `Projects#${__id}`);
            // })


            $('.ProjectSlideThumb').on('mouseover', e => {
                let __id = e.target.id.split('-')[1];
                
                if (__id === __currentProject)
                    return;

                $(`#ProjectThumb-${__id}`).stop().animate({
                    'opacity': '0.99'
                }, 500, "linear");
            });

            $('.ProjectSlideThumb').on('mouseout', e => {
                let __id = e.target.id.split('-')[1];
                
                if (__id === __currentProject)
                    return;

                $(`#ProjectThumb-${__id}`).stop().animate({
                    'opacity': '0.50'
                }, 500, "linear");
            });

            $('.ProjectSlideService').on('mouseover', function() {
                if (__lockServices)
                    return;

                $(this).stop().animate({
                    'opacity': '0.99'
                }, 500, "linear");
            });

            $('.ProjectSlideService').on('mouseout', function() {
                if (__lockServices)
                    return;
                    
                $(this).stop().animate({
                    'opacity': '0.75'
                }, 500, "linear");
            });
        };
        

        const   __projectExists = projectName =>
        {

            for (let __p = 0; __p < __projects.length; __p++)
            {
                if (projectName === __projects[__p].id)
                    return true;
            }

            return false;

        };


        const   __currentProjectIndex = () =>
        {
            let     _p;

            for (_p = 0; _p < __projects.length; _p++)
            {
                if (__projects[_p].id === __currentProject)
                    break;
            }

            return _p;
        };


        const   __setNextProject = () =>
        {

            let __projectIndex = __currentProjectIndex();

            // if (__projectIndex === 65535)
            //     __projectIndex = 0;
            // else
            // {
                if ((__projectIndex + 1) >= __projects.length)
                    __projectIndex = 0;
                else
                    __projectIndex++;
            // }

            window.location.hash = __currentProject = __projects[__projectIndex].id;

        };


        const   __setPrevProject = () =>
        {
            
            let __projectIndex = __currentProjectIndex();

            if (__projectIndex <= 0)
                __projectIndex = (__projects.length - 1);
            else
                __projectIndex--;

            window.location.hash = __currentProject = __projects[__projectIndex].id;

        };


        const   __countProjectImages = (id) =>
        {

            let _count = 65535;

            while (true)
            {
                if ($(`#ProjectSlideImage-${_count}-${id}`).length)
                {
                    if (_count == 65535)
                        _count = 0;
                    else
                        _count++;
                }
                else
                    break;
            }

            return _count;

        };


        const   __countProjectServices = (id) =>
        {

            let _count = 0;

            while (true)
            {
                if ($(`#ProjectService-65535-${_count}-${id}`).length)
                    _count++;
                else
                    break;
            }

            return _count;

        };


        const   __listProjects = () =>
        {

            $('.ProjectSlides').each((index, el) => {
                let __obj = {};
                
                __obj.id = $(el).attr('id').split('-')[1];
                __obj.images = __countProjectImages(__obj.id);
                __obj.services = __countProjectServices(__obj.id);

                __projects.push(__obj);
            });

        };


        const   __prepSlide = (
            index,
            id = __currentProject
        ) =>
        {

            $(`#ProjectSlideImage-${index}-${id}`).css({
                'display': 'block',
                'opacity': '0.01'
            });

            if (index >= 65535)
            {
            
                $('.ProjectSlideThumb').stop().animate({
                    'opacity': '0.50'
                }, 500, "linear", () => {

                    $(`#ProjectThumb-${id}`).stop().animate({
                        'opacity': '0.99'
                    }, 500, "linear");
                });
            }
        };


        const   __showSlides = (
            
            id = __currentProject
            
        ) =>
        {

            let __index = 65535;

            $(`#ProjectSlides-${id}`).css({
                'display': 'block',
                'opacity': '0.99'
            });

            $('.ProjectSlideImage').css({
                'display': 'none',
                'opacity': '0.01'
            });

            __prepSlide(__index, id);
            __lockServices = true;

            $(`#ProjectSlideImage-${__index}-${id}`).stop().animate({
                'opacity': '0.99'
            }, 1000, "linear", () => {
                $(`#ProjectSlideInfo-${__index}-${id}`).css({
                    'opacity': '0.01',
                    'left': '100%',
                    'display': 'block'
                });
                
                $(`#ProjectSlideInfo-${__index}-${id}`).stop().animate({
                    'opacity': '0.75',
                    'left': '10%'
                }, 1000, "linear");

                __popServices((__countProjectServices(id) - 1), id);

                setTimeout(() => {
                    __unpopServices(0, id);
                }, 9000);

                setTimeout(() => {
                    $(`#ProjectSlideInfo-${__index}-${id}`).stop().animate({
                        'opacity': '0.01',
                        'left': '-100%'
                    }, 1000, "linear", () => {
                        $(`#ProjectSlideInfo-${__index}-${id}`).css({
                            'display': 'none'
                        });
                    });
                }, 9000, "linear");
            });

            setTimeout(() => {
                $(`#ProjectSlideImage-${__index}-${id}`).stop().animate({
                    'opacity': '0.01'
                }, 1000, "linear", function() {
                    $(`#ProjectSlideImage-${__index}-${id}`).css({
                        'display': 'none'
                    });
                    __showSlide(0, id);

                });
            }, 10000);

        };


        const   __popServices = (

            index,
            id

        ) =>
        {

            if (index < 0)
            {
                __lockServices = false;
                return;
            }

            $(`#ProjectService-65535-${index}-${id}`).stop().animate({
                'opacity': '0.75'
            }, 500, "linear");

            setTimeout(() => {
                __popServices((index - 1), id);
            }, 200);
        };


        const   __unpopServices = (

            index,
            id

        ) =>
        {

            if (! $(`#ProjectService-65535-${index}-${id}`).length)
                return;

            $(`#ProjectService-65535-${index}-${id}`).stop().animate({
                'opacity': '0.01'
            }, 500, "linear");

            setTimeout(() => {
                __unpopServices((index + 1), id);
            }, 200);
        };

        const   __showSlide = (

            index,
            id,
            delay = 10000

        ) =>
        {


            __prepSlide(index, id);
            __nextSlide(index, id);

        };


        const   __nextSlide = (

            index,
            id
             
        ) =>
        {

            // $(`#ProjectSlideImage-${index}-${id}`).stop().animate({
            //     'opacity': '0.01'
            // }, 1000, "linear", function() {
            //     $(`#ProjectSlideImage-${index}-${id}`).css({
            //         'display': 'none'
            //     });

                // if (index >= 65535)
                //     index = 0;

                // __setNextProject();

                $(`#ProjectSlideImage-${index}-${id}`).css({
                    'display': 'block',
                    'opacity': '0.01'
                });

                $(`#ProjectSlideInfo-${index}-${id}`).css({
                    'opacity': '0.01',
                    'left': '100%',
                    'display': 'block'
                })

                $(`#ProjectSlideImage-${index}-${id}`).stop().animate(
                {
                    'opacity': '0.99'
                }, 1000, "linear", () => {

                    $(`#ProjectSlideInfo-${index}-${id}`).stop().animate({
                        'left': '10%',
                        'opacity': '0.99'
                    }, 1000, "linear");

                    setTimeout(() => {
                        $(`#ProjectSlideInfo-${index}-${id}`).stop().animate({
                            'left': '-100%',
                            'opacity': '0.99'
                        }, 1000, "linear");
                    }, 4000);

                    setTimeout(() => 
                    {
                        // $(`#ProjectSlideImage-${index}-${id}`).stop().animate({
                        //     'opacity': '0.01'
                        // }, 1000, "linear", () => {
                            // $(`#ProjectSlideImage-${index}-${id}`).css({
                            //     'display': 'none'
                            // });
                            if (! $(`#ProjectSlideImage-${index + 1}-${id}`).length)
                            {
                                $(`#ProjectSlides-${id}`).stop().animate({
                                    'opacity': '0.01',
                                }, 1000, "linear", () => {
                                $(`#ProjectSlides-${id}`).css('display', 'none');
                                __setNextProject();
                                __showSlides(__currentProject);
                                });
                            }
                            else
                            {
                                $(`#ProjectSlideImage-${index}-${id}`).stop().animate({
                                    'opacity': '0.01',
                                }, 1000, "linear", () => {
                                $(`#ProjectSlideImage-${index}-${id}`).css('display', 'none');
                                //__setNextProject();
                                __prepSlide(index + 1);
                                //__showSlides(__currentProject);
                                __nextSlide(index + 1, id);
                                });
                            }
                        // });
                    }, 5000);
                // });
            });

        };


        __initialise();


        return {

            //

        };

    };


    export default MultiSlider;
