///////////////////////////////////////////////////////////
//  resources/js/core/Form.js
//

    const   Form = (

        err,
        formId,
        formHeader,
        formInfo,
        formFields,
        buttons = [ 'continue' ]

    ) =>
    {



        const   __checkForm = () =>
        {
            
            $(`#${formId}${buttons[0]}`).css({
                'opacity': '0.99',
                'cursor': 'pointer'
            });

            $(`#${formId}${buttons[0]}`).attr('title', 'Click here to continue');

            formFields.forEach(field => {
                if ($(`#${field}`).val().length === 0)
                {
                    $(`#${formId}${buttons[0]}`).css({
                        'opacity': '0.50',
                        'cursor': 'default'
                    });
                }

                $(`#${formId}${buttons[0]}`).attr('title', 'Complete the form to continue')
            });

        };

        const   __formEl = $(`#${formId}`);
        
        if (! __formEl)
            return err.setError(`Error in Form(): Form ${formId} not found`);

        __formEl.on('change', e => {
            __checkForm();
        });        
        __formEl.on('keyup', e => {
            __checkForm();
        });    

        __checkForm();

        return true;

    };


    export default Form;
