///////////////////////////////////////////////////////////
//  resources/js/core/App.js
//

    import  Err                 from './Err.js';


    import  Menu                from './Menu.js';
    import  Display             from './Display.js';
    import  Nav                 from './Nav.js';
    import  Sprinkles           from './Sprinkles.js';
    import  Services            from './Services.js';
    import  Projects            from './Projects.js';
    import  FileManager         from './FileManager.js';
    import  Slider              from './Slider.js';
    import  MultiSlider         from './MultiSlider.js';
    import ProjectPreview       from './ProjectPreview.js';

    import  Form                from './Form.js';
    import  Tabs                from './Tabs.js';


///////////////////////////////////////////////////////////
//  App module.
//
//  Returns a handle to the isError method of the Err
//  module for error checking.
//
    const   App = (

        objConfig

    ) =>
    {

        const   _err            = Err(objConfig);

        const   _menu           = Menu(_err);
        const   _display        = Display(_err, _menu);
        const   _nav            = Nav(_err, _menu);
        const   _sprinkles      = Sprinkles(_err);

        let     _loginForm;
        let     _dashTabs;

        let     _chpwForm;
        let     _servicesForm;
        let     _projectsForm;
        let     _fileManager;
        let     _serviceManager;
        let     _projectsManager;
        let     _serviceSlider;
        let     _projectsSlider;
        let     _projectPreview;


        const   __initialise = () =>
        {

//  Sprinkle is a small app that is used to animate text
//  in sequence - this is a tweaked and trimmed version
//  that is used to display the animated telephone links.
//
            _sprinkles.newSprinkles(
                '07592 647 273',
                'NavbarBanner',
                'navbar-tel',
                'NavbarTel',
                'span'
            );
            _sprinkles.newSprinkles(
                '07592 647 273',
                'TelLink',
                'tellink-tel',
                'NavbarTel',
                'span'
            );

            _sprinkles.sprinkleEvery(
                10000, 'navbar-tel', { 'color': '#FFF' }, { 'color': '#ADDB30' }, 0, 1500, 200, 'linear', false
            );
            _sprinkles.sprinkleEvery(
                10000, 'tellink-tel', { 'color': '#FFF' }, { 'color': '#ADDB30' }, 0, 1500, 200, 'linear', false
            );

//  Some custom functionality for specific pages - example, we
//  want to create a Form validation object if there's a form
//  being displayed (the /Login route, for example).
// 

            if (window.location.pathname.replace('/', '') === 'Home')
            {
                _projectPreview = ProjectPreview(_err);
            }

            if (window.location.pathname.replace('/', '') === 'Login')
                _loginForm  = Form(_err, 'login', "Login", false, [ 'loginname', 'loginpassword' ])
            
//  Dashboard requires a Tabs object.
//
            if (window.location.pathname.replace('/', '') === 'Dashboard')
            {
                _dashTabs = Tabs(_err);

                _chpwForm = Form(_err, 'PasswordManager', 'Password Manager', false, [ 'password', 'newpassword', 'confirmpassword' ]);
            
                _servicesForm = Form(_err, 'CreateNewService', 'Create New Service', false, [ 'service_name', 'service_long', 'service_short', 'service_image' ]);
                _projectsForm = Form(_err, 'CreateNewProject', 'Create New Project', false, [ 'project_name', 'project_short', 'project_images' ]);
                
                _fileManager = FileManager(_err);
                _serviceManager = Services(_err);
                _projectsManager = Projects(_err);

                _display.registerTabs(_dashTabs);
            }

            if (window.location.pathname.replace('/', '') === 'Services')
            {
                _serviceSlider = Slider(
                    
                    _err,
                    'ServicesSlider',
                    10000

                );
            }

            if (window.location.pathname.replace('/', '') === 'Projects')
            {
                _projectsSlider = MultiSlider(
                    
                    _err

                );
            }

            window.scrollTo(0, 1);

            return;

        };


        __initialise();


        return {
            
            isError:                _err.isError

        };

    };


    export default App;
