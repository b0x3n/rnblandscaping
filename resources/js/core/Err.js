///////////////////////////////////////////////////////////
//  Err.js
//
//  Basic error handling module.
//

    const   Err = config => {

///////////////////////////////////////////////////////////
//  _errorMessage records any error messages passed to
//  the _setError() method.
//
//  If _errorMessage is not false, then additional
//  messages are appended to _errorMessage separated
//  with \n bytes.
//
        let     _errorMessage;


///////////////////////////////////////////////////////////
//  If _debugMode is false, then any messages passed to
//  _debugMsg() will be discarded (not reported).
//
//  This can be set via the config object passed to
//  Err.
//
        let     _debugMode;


///////////////////////////////////////////////////////////
//  __initialise()
//
//  Basic setup.
//
        const   __initialise = () => {

            _errorMessage = false;  // No errors to report
            _debugMode = false;     // Assume debugging is off

            if (config) {
                if (config.hasOwnProperty('debugMode'))
                    _debugMode = config['debugMode'];

                _debugMsg(`Debugging enabled`);
            }

        };


///////////////////////////////////////////////////////////
//  _setError()
//
//  Record an error message in _errorMessage.
//
//  The errorMessage parameter can be false, in which
//  case _errorMessage will also be set to false,
//  clearing any errors already recorded.
//
//  In any case - this method always returns false, this
//  means nothing, just allows us to report an error and
//  return false in a single line:
//
//      // Summink bad 'appuned!
//      return err.setError('There was a problem!');
//
        const   _setError = (

            errorMessage = false

        ) => {

            if (! errorMessage)
                errorMessage = false;
            else {
                if (! _errorMessage)
                    _errorMessage = errorMessage;
                else
                    _errorMessage += `\n${errorMessage}`;
            }

            return false;

        };


///////////////////////////////////////////////////////////
//  _isError()
//
//  Essentially - it returns _errorMessage which will be
//  either false (no errors) or not (there's one or more
//  errors).
//
//  We can set reportError to true, in which case is there
//  are errors in _errorMessage then they will be reported
//  via the console.error() method.
//
//  We can set reportCallback to specify a method other
//  than console.error() to be used for error reporting.
//
        const   _isError = (

            reportError = false,
            reportCallback = false

        ) => {

            if (_errorMessage) {
                if (reportError) {
                    _errorMessage.split('\n').forEach(msg => {
                        if (reportCallback)
                            reportCallback(msg);
                        else
                            console.error(msg);
                    });
                }
            }

            return _errorMessage;

        };


///////////////////////////////////////////////////////////
//  _debugMsg()
//
//  Dump a debug message to console.debug, if debugCallback
//  is not false then it's a function to be used to
//  dump the message other than console.debug().
//
//  This method only outputs the message when _debugMode
//  is true.
//
//  In any case - this method always returns _debugMode.
//
        const   _debugMsg = (

            msg,
            debugCallback = false

        ) => {

            if (! _debugMode)
                return _debugMode;

            if (debugCallback)
                debugCallback(msg);
            else
                console.debug(msg);

            return _debugMode;

        };


        __initialise();


        return {

            setError:                   _setError,
            isError:                    _isError,
            debugMsg:                   _debugMsg

        };

    };


    export default Err;
