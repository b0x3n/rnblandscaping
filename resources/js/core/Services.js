///////////////////////////////////////////////////////////
//  resouorces/js/core/Services.js
//

    const   Services = (

        err

    ) =>
    {

        const   __initialise = () =>
        {

            $('#btnAddService').on('click', e => {
                $('#service_name').val('');
                $('#service_image').val('');
                $('#service_short').val('');
                $('#service_long').val('');
                $('#ServiceEditorImage').css('background-image', 'url(public/build/images/imageplaceholder.png)');

                $('#Modal').css({
                    'display': 'flex',
                    'opacity': '0.01'
                });

                $('#Modal').stop().animate({
                    'opacity': '0.99'
                });     

                $('#CreateNewService').css({
                    'display': 'block'
                });

                $('#CreateNewServicedelete').css('display', 'none');
                $('#CreateNewServicecontinue').html('Continue');
            });

            $('#CreateNewServicecancel').on('click', e => {
                e.preventDefault();
                $('#Modal').stop().animate({
                    'opacity': '0.01'
                }, 500, "linear", () => {
                    $('#Modal').css('display', 'none');
                });
            });


            $('#ServiceEditorImage').on('click', () => {
                $('#FilePickerModal').css({
                    'display': 'block'
                });
                $('#FilePickerModal').stop().animate({
                    'opacity': '0.99'
                }, 500, "linear", () => {
                    $('#FilePicker').css('display', 'block');
                });
            });


            $('#btnFilePickerCancel').on('click', e => {
                $('#FilePickerModal').stop().animate({
                    'opacity': '0.01'
                }, 500, "linear", () => {
                    $('#FilePicker').css('display', 'none');
                    $('#FilePickerModal').css({
                        'display': 'none'
                    });
                });
            });
            
            $('.ServiceRow').on('click', e => {
                const   __id = e.target.id.split('-')[1];

                $('#service_name').val($(`#ServiceName-${__id}`).html().trim());
                $('#service_image').val($(`#ServiceImageInner-${__id}`).html().trim());
                $('#service_long').val($(`#ServiceLong-${__id}`).html().trim());
                $('#service_short').val($(`#ServiceShort-${__id}`).html().trim());
                $('#ServiceEditorImage').css('background-image', `url(public/build/images/${$('#service_image').val().trim()})`);
                //$('#ServiceEditorImage').trigger('change');
                $('#CreateNewService h1').html(`Edit service ${$('#service_name').val()} - ${$(`#ServiceId-${__id}`).html().trim()}`)
                
                $('#Modal').css({
                    'display': 'flex',
                    'opacity': '0.01'
                });

                $('#Modal').stop().animate({
                    'opacity': '0.99'
                });     

                $('#CreateNewService').css({
                    'display': 'block'
                });

                $('#CreateNewServicedelete').css('display', 'block');
                $('#CreateNewServicecontinue').html('Save');
            });

            $('#CreateNewServicedelete').on('click', e => {
                e.preventDefault();

                const   __parts = $('#CreateNewService h1').html().split(' ');
                const   __id = __parts[__parts.length - 1];

                $('#DeleteService').attr('action', `/service-delete/${__id}`);
                $('#DeleteService').attr('method', `POST`);
                $('#DeleteService').submit();
            });

            $('#CreateNewServicecontinue').on('click', e => {
                e.preventDefault();

                const   __parts = $('#CreateNewService h1').html().split(' ');
                const   __id = __parts[__parts.length - 1];
                const   __mode = $('#CreateNewServicecontinue').html().trim();

                if (__mode === 'Save')
                {
                    $('#CreateNewService').attr('action', `/service-update/${__id}`);
                    $('#CreateNewService').attr('method', 'POST');
                }
                else
                {
                    $('#CreateNewService').attr('action', `/service-create`);
                    $('#CreateNewService').attr('method', 'POST');
                }

                let __val = $(`#service_name`).val().replace(' ', '_');

                //alert(__val);

                $('#service_name').val(__val);

                $('#CreateNewService').submit();
            });

            $('.Contact-Title,.Contact-Title-Class').on('mouseover', e => {
                //alert(e.target.id);
                $(`#${e.target.id}`).stop().animate({
                    'color': '#FFF'
                }, 500, "linear");
            })

        };


        __initialise();


        return {

            //

        };

    };


    export default Services;
