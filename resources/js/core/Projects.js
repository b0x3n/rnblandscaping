///////////////////////////////////////////////////////////
//  resouorces/js/core/Projects.js
//

    const   Projects = (

        err

    ) =>
    {
        const   __initialise = () =>
        {
            $('#project_name').val('');
            $('#project_short').val('');
            $('#project_services').val('');
            $('#project_images').val('');
            $('#project_image_info').val('');
            $('#project_input_file').val('');

            __renderSelectedImages();
            
            $('#btnAddProject').on('click', () => {
                $('#project_name').val('');
                $('#project_short').val('');
                $('#project_services').val('');
                $('#project_images').val('');
                $('#project_image_info').val('');
                $('#project_input_file').val('');
                //$('#ServiceEditorImage').css('background-image', 'url(public/build/images/imageplaceholder.png)');

                $('#CreateNewProjectModal').css({
                    'display': 'flex',
                    'opacity': '0.01'
                });

                $('#CreateNewProjectModal').stop().animate({
                    'opacity': '0.99'
                });     

                $('#CreateNewProject').css({
                    'display': 'block'
                });

                $('#CreateNewProjectdelete').css('display', 'none');
                $('#CreateNewProjectcontinue').html('Continue');
            });

            $('#CreateNewProjectcancel').on('click', e => {
                e.preventDefault();
                $('#CreateNewProjectModal').stop().animate({
                    'opacity': '0.01'
                }, 500, "linear", () => {
                    $('#CreateNewProjectModal').css('display', 'none');
                });
            });

            $('#AddProjectImage').on('click', e => {
                $('#project_input_file').val('');
                $('#FilePickerModal').css({
                    'display': 'block'
                });
                $('#FilePickerModal').stop().animate({
                    'opacity': '0.99'
                }, 500, "linear", () => {
                    $('#FilePicker').css('display', 'block');
                });
            });

            $('#project_input_file').on('change', function() {
                __addImage($('#project_input_file').val());
            });

            $('.cbxBox,.cbxLabel').on('click', e => {
                __updateServices();
            });

            $('.ProjectRow').on('click', e => {
                let __id = e.target.id.split('-')[1];

                $('#project_name').val($(`#ProjectName-${__id}`).html().trim().replace(' ', '_'));
                $('#project_short').val($(`#ProjectShort-${__id}`).html().trim());
                $('#project_images').val($(`#ProjectImageInner-${__id}`).html().trim().replace(/,/g, ';'));
                $('#project_services').val($(`#ProjectServices-${__id}`).html().trim().replace(/,/g, ';').replace(' ', '_'));
                $('#project_image_info').val($(`#ProjectImageInfo-${__id}`).html().trim());
                $('#project_input_file').val('');

                let __projectName = $(`#ProjectName-${__id}`).html().trim().replace(' ', '_');
                let __projectId = $(`#ProjectId-${__id}`).html().trim();

                e.preventDefault();
                
                $('#CreateNewProjectModal').css({
                    'display': 'flex',
                    'opacity': '0.01'
                });

                $('#CreateNewProjectModal').stop().animate({
                    'opacity': '0.99'
                });     

                $('#CreateNewProject').css({
                    'display': 'block'
                });

                $('#CreateNewProjectdelete').css('display', 'block');
                $('#CreateNewProjectcontinue').html('Save');
                $('#CreateProjectHeader').html(`Edit Project ${__projectName} - ${__projectId}`);
                
                //alert(__id);
                __renderSelectedImages();
                __applyServices();

                $('#project_name').trigger('change');
            });

            $('#CreateNewProjectdelete').on('click', e => {
                e.preventDefault();

                let __parts = $('#CreateProjectHeader').html().trim().split(' ');
                let __id = __parts[__parts.length - 1];


                $('#DeleteProject').attr('action', `/project-delete/${__id}`);
                $('#DeleteProject').attr('method', 'POST');
                $('#DeleteProject').submit();
            });

            $('#CreateNewProjectcontinue').on('click', e => {
                e.preventDefault();

                const   __parts = $('#CreateProjectHeader').html().split(' ');
                const   __id = __parts[__parts.length - 1];
                const   __mode = $('#CreateNewProjectcontinue').html().trim();

                if (__mode === 'Save')
                {
                    $('#CreateNewProject').attr('action', `/project-update/${__id}`);
                    $('#CreateNewProject').attr('method', 'POST');
                }
                else
                {
                    $('#CreateNewProject').attr('action', `/project-create`);
                    $('#CreateNewProject').attr('method', 'POST');
                }

                let __val = $(`#project_name`).val().replace(/ /g, '_');

                //alert(__val);

                $('#project_name').val(__val);

                $('#CreateNewProject').submit();
            });

            __renderSelectedImages();

        };


        const   __applyServices = () =>
        {

            let __services = $('#project_services').val().trim();
            
            __services = __services.split(';');
            
            __services.forEach(__service => {
                if (__service !== '')
                {
                    __service = __service.trim();
                    document.getElementById(`ProjectServiceBox-${__service}`).checked = true;
                }
            });

        };


        const   __addImage = imagePath =>
        {

            $('#project_input_file').val('');

            if (__isImage(imagePath))
            {
                alert(`Image ${imagePath} has already been attached to this Project`);
                return;
            }

            let __paths = $('#project_images').val();
            let __info = $('#project_image_info').val();
            
            __paths += `${imagePath};`;
            __info += `;`;

            $('#project_images').val(__paths);
            $('#project_image_info').val(__info);

            __renderSelectedImages();

        };

        
        const   __isImage = imagePath =>
        {

            let __paths = $('#project_images').val().split(';');

            for (let __p = 0; __p < __paths.length; __p++)
            {
                let __path = __paths[__p].replace(';', '').trim();
                if (__path === imagePath)
                    return true;
            };

            return false;

        };


        const   __renderSelectedImages = () =>
        {

            let __images = $('#project_images').val().split(';');
            let __info = $('#project_image_info').val().split(';');
            let __html = '';

            __images.forEach((image, index) => {
                let __i = __info[index];

                if (__i === '')
                    __i = 'No information is available for this image - click to add some text';

                if (image.trim() !== "")
                {
                    __html += `
                        <div 
                            id="ProjectImage_${index}-${image.split('.')[0]}" 
                            class="ProjectImageThumbnail"
                            style="background-image: url(public/build/images/${image});"
                            title="${__i}"
                        >
                            <div class="ProjectImageThumbDelete" id="ProjectImageDelete_${index}-${image.split('.')[0]}">X</div>
                        </div>
                    `;
                }
            });

            $('#SelectedProjectImages').html(__html);

            __enableThumbClickEvents();
        };


        const   __enableThumbClickEvents = () =>
        {

            $('.ProjectImageThumbnail').off('click');
            $('.ProjectImageThumbDelete').off('click');

            $('.ProjectImageThumbnail').on('click', e => {
                if (e.target.id.split('-')[0] === 'ProjectImageDelete')
                    return;

                let _id = e.target.id.split('-')[1];

                let _in = prompt('Write a brief description: ');

                _in = _in.trim();

                if (! _in && _in !== '')
                    return;
                if (_in === '')
                    _in = 'No information is available for this image - click to add some text';

                __updateImageInfo(_id, _in);
            });

            $('.ProjectImageThumbDelete').on('click', e => {
                let __id = e.target.id.split('-')[1];

                __removeProjectImage(__id);
            });

        };


        const   __removeProjectImage = id =>
        {

            let __paths = $('#project_images').val().split(';');
            let __info = $('#project_image_info').val().split(';');

            let __newPaths = '';
            let __newInfo = '';

            for (let __p = 0; __p < __paths.length; __p++)
            {
                __paths[__p] = __paths[__p].replace(';', '').trim();
                __info[__p] = __info[__p].replace(';', '').trim();
                let __path = __paths[__p].split('.')[0];

                if (__path === id)
                    continue;

                __newPaths += `${__paths[__p]};`;
                __newInfo += `${__info[__p]};`;
            }

            $('#project_images').val(__newPaths);
            $('#project_image_info').val(__newInfo);

            __renderSelectedImages();

        };


        const   __updateImageInfo = (

            id,
            input

        ) =>
        {

            let __paths = $('#project_images').val().split(';');
            let __info = $('#project_image_info').val().split(';');

            let __newPaths = '';
            let __newInfo = '';

            for (let __p = 0; __p < __paths.length; __p++)
            {
                __paths[__p] = __paths[__p].replace(';', '').trim();
                __info[__p] = __info[__p].replace(';', '').trim();
                let __path = __paths[__p].split('.')[0];

                if (__path === id)
                    __info[__p] = input.replace(';', '').trim();

                __newPaths += `${__paths[__p]};`;
                __newInfo += `${__info[__p]};`;
            }

            $('#project_images').val(__newPaths);
            $('#project_image_info').val(__newInfo);

            __renderSelectedImages();

        };


        const   __updateServices = () =>
        {

            let __services = '';

            $('.cbxBox').each((i, e) => {
                if ($(e).is(':checked'))
                    __services += `${$(e).attr('id').split('-')[1]};`;
            });

            $('#project_services').val(__services);

        };


        __initialise();


        return {

            //

        };

    };


    export default Projects;
