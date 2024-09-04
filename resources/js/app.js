///////////////////////////////////////////////////////////
//  resources/js/app.js
//
//  Nout much going on, import bootstrap, this will import
//  and fire up any plugins such as jQuery.
//
//  Next it will create a new App instance, see:
//
//      resources/js/core/App.js
//
//  For more info.
//

    import './bootstrap';


///////////////////////////////////////////////////////////
//  Import the main configuration.
//
//  This is a json object that is passed to the App
//  module on startup - it can be used to alter some of
//  the basic site parameters, see:
//
//      resources/js/config/objConfig.js
//
    import  objConfig               from './config/objConfig.js';


///////////////////////////////////////////////////////////
//  Import the core App - this takes control and manages
//  the application.
//
    import  App             from './core/App.js';


    $(document).ready(function()
        
        {
            
            const   __app = App(objConfig);

            if (__app.isError())
                __app.isError(true);
            
        }

    );
