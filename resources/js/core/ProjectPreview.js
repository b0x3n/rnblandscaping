///////////////////////////////////////////////////////////
//  resources/js/core/ProjectPreview.js
//

    const   ProjectPreview = (

        err

    ) =>
    {

        const   __initialise = () =>
        {

            __startPreview(0);

        };


        const   __startPreview = index =>
        {
            if (! $(`#ProjectPreview-${index}`).length)
                index = 0;

            $(`#ProjectPreview-${index}`).css({
                'display': 'block'
            });

            $(`#ProjectPreviewText-${index}`).animate({
                'opacity': '0.99'
            }, 1000, "linear", function()
            {

                $(`#ProjectPreviewTitle-${index}`).animate({
                    'opacity': '0.99'
                }, 1000, "linear");

                $(`#ProjectPreviewTextBefore-${index},#ProjectPreviewTextAfter-${index}`).css({
                    'left': '100%'
                }, 1000, "linear");

                $(`#ProjectPreviewBefore-${index}`).css({
                    'opacity': '0.01'
                });

                $(`#ProjectPreviewBefore-${index}`).animate({
                    'opacity': '0.99'
                }, 1500, "linear");

                $(`#ProjectPreviewTextBefore-${index}`).animate({
                    'opacity': '0.99',
                    'left': '1vh'
                }, 1500, "linear");

                setTimeout(() => {

                    $(`#ProjectPreviewTextBefore-${index}`).animate({
                        'opacity': '0.01',
                        'left': '-100%'
                    }, 1500, "linear");

                    $(`#ProjectPreviewBefore-${index}`).animate({
                        'opacity': '0.01'
                    }, 1500, "linear", function()
                    {

                        // $(`#ProjectPreviewTitle-${index}`).animate({
                        //     'opacity': '0.99'
                        // }, 1000, "linear");

                        $(`#ProjectPreviewTextAfter-${index}`).animate({
                            'opacity': '0.99',
                            'left': '1vh'
                        }, 1500, "linear");

                        $(`#ProjectPreviewAfter-${index}`).css({
                            'opacity': '0.01'
                        });
        
                        $(`#ProjectPreviewAfter-${index}`).animate({
                            'opacity': '0.99'
                        }, 1500, "linear");

                        setTimeout(() => {
                            $(`#ProjectPreviewTextAfter-${index}`).animate({
                                'opacity': '0.01',
                                'left': '-100%'
                            }, 1500, "linear");
                            $(`#ProjectPreviewText-${index}`).animate({
                                'opacity': '0.01'
                            }, 1500, "linear");
        
                            $(`#ProjectPreviewAfter-${index}`).animate({
                                'opacity': '0.01'
                            }, 1500, "linear", () => {
                                // $(`#ProjectPreview-${index}`).animate({
                                //     'opacity': '0.01'
                                // }, 1000, "linear", function() {
                                    $(`#ProjectPreview-${index}`).css({
                                        'display': 'none'
                                    });

                                     __startPreview((index + 1))
                                // })
                            });
                        }, 8000);
                    });
                }, 8000);

            });
        };


        __initialise();


        return {

            //

        };

    };


    export default ProjectPreview;
