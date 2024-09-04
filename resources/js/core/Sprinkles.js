///////////////////////////////////////////////////////////
//  Sprinkles.js
//

    const   Sprinkles = err =>
    {

        let     __timeoutHandler = false;


        const   _newSprinkles = (

            strString,
            parentEl,
            elPrefix,
            elClass,
            elTag,
            isTelLink = true

        ) =>
        {

            let __html = '';

            if (isTelLink)
                __html = '<a href="tel:07592647273">';

            for (let __ch = 0; __ch < strString.length; __ch++)
            {
                let __htmlChar = strString.substr(__ch, 1);

                if (__htmlChar === ' ')
                    __htmlChar = '&nbsp;';

                __html += `
                    <${elTag} id="${elPrefix}-${__ch}" class="${elClass}">
                        ${__htmlChar}
                    </${elTag}>
                `;
            }

            if (isTelLink)
                $(`#${parentEl}`).html(`${__html}</a>`);
            else
                $(`#${parentEl}`).html(`${__html}`);
        };


        const   _sprinkleEvery = (
            
            everyDuration,
            elPrefix,
            objFrom,
            objTo,
            index = 0,
            duration = 200,
            delay = 100,
            easing = 'linear',
            callback = false

        ) =>
        {

            _sprinkle(
                elPrefix,
                objFrom,
                objTo,
                index ,
                duration,
                delay,
                easing,
                callback
            );

            __timeoutHandler = setTimeout(() => {
                _sprinkleEvery(
                    everyDuration,
                    elPrefix,
                    objFrom,
                    objTo,
                    index ,
                    duration,
                    delay,
                    easing,
                    callback
                );
            }, everyDuration);

        }


        const   _sprinkle = (

            elPrefix,
            objFrom,
            objTo,
            index = 0,
            duration = 200,
            delay = 100,
            easing = 'linear',
            callback = false

        ) =>
        {

            if (! document.getElementById(`${elPrefix}-${index}`))
            {
                if (callback)
                    callback();
                return;
            }

            $(`#${elPrefix}-${index}`).stop().animate(objFrom, (duration / 2), easing, () => {
                $(`#${elPrefix}-${index}`).stop().animate(objTo, (duration / 2), easing);
            });

            setTimeout(() => {
                _sprinkle(
                    elPrefix,
                    objFrom,
                    objTo,
                    (index + 1),
                    duration,
                    delay,
                    easing,
                    callback
                );
            }, delay);
        };


        return {

            newSprinkles:               _newSprinkles,
            sprinkleEvery:              _sprinkleEvery,
            sprinkle:                   _sprinkle

        };

    };


    export default Sprinkles;
