///////////////////////////////////////////////////////////
//  resources/js/core/FileManager.js
//

    import Form                     from './Form.js';


    const   FileManager = (

        err

    ) =>
    {

        const   __initialise = () =>
        {

            $('#btnUploadFile').on('click', e => {
                e.preventDefault();

                $('#StoreNewImage').trigger('click');
            });

            $('#StoreNewImage').on('change', e => {
                if ($('#StoreNewImage').val() !== '')
                    $('#FileManagerUploadFile').submit();
            });

            $('.FileManagerThumbDelete').on('click', e => {
                const   __id = e.target.id.split('-')[1];

                $('#FileManagerDeleteFile').attr('action', `/image-delete/${__id}`);
                $('#FileManagerDeleteFile').submit();
            });
            
            $('.FileManagerThumb,.FileManagerThumbDelete').on('mouseover', e => {
                let __id = e.target.id;
                if (__id.split('-')[0] === 'btnDeleteImage')
                {
                    const   __el = $(`#${e.target.id}`).parent();
                    __id = document.getElementById(e.target.id).parentElement.id;
                }

                __id = __id.split('.')[0];
                
                $(`#${__id}`).stop().animate({
                    'opacity': '0.99'
                }, 500);
            });
            
            $('.FileManagerThumb').on('mouseout', e => {
                let __id = e.target.id;
                if (__id.split('-')[0] === 'btnDeleteImage')
                {
                    const   __el = $(`#${e.target.id}`).parent();
                    __id = document.getElementById(e.target.id).parentElement.id;
                }

                __id = __id.split('.')[0];
                
                $(`#${__id}`).stop().animate({
                    'opacity': '0.50'
                }, 500);
            });

            $('.FileManagerThumb').on('click', e => {
                if (e.target.id.split('-')[0] === 'FileImg')
                {
                    $('#FilePickerModal').stop().animate({
                        'opacity': '0.01'
                    }, 500, "linear", () => {
                        $('#FilePickerModal,#FilePicker').css(
                            {'display': 'none'}
                        );

                        let     __path = $(`#${e.target.id}`).html().trim();
                        $('#ServiceEditorImage').css('background-image', `url(public/build/images/${__path})`);
                        $('#service_image').val(__path);
                        if ($('#project_input_file'))
                        {
                            $('#project_input_file').val(__path);
                            $('#project_input_file').trigger('change');
                        }    
                        $('#service_image').trigger('keyup');
                    });
                }
            });
        };

    
        __initialise();


        return {

            //

        };

    }


    export default FileManager;
