CakeDebugHelper
===============

CakePHP debug level switch from Firefox

installation
------------

### install Firefox Extension

[cakedebughelper-0.1.xpi](http://github.com/downloads/tenkoma/CakeDebugHelper/cakedebughelper-0.1.xpi)

### component install
download [debug_control.php](http://github.com/tenkoma/CakeDebugHelper/raw/master/cakephp/app/controllers/components/debug_control.php) put in components directory
and enable DebugControlComponent in controller:

    <?php
    class FooController extends AppController {
        var $components = array(
            'DebugControl',
        );
    }

### core.php setting

CakeDebugHelper not work `Configure::read('debug') == 0`.

    // core.php
    Configure::write('debug', 1);
