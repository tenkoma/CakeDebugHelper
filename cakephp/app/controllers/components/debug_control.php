<?php
/**
 * @description setting debug level on initialize
 */
class DebugControlComponent extends Object {
    var $isEnable = null;

    function initialize(&$controller) {
        if ($this->isLocalIp()) {
            $debugLevel = $this->getRemoteDebugLevel();
            Configure::write('debug', $debugLevel);
        }
    }

    function startup(&$controller) {
    }

    /**
     * check execute CakePHP on local machine
     */
    function isLocalIp() {
        if (env('REMOTE_ADDR') == '127.0.0.1') {
            return true;
        }
        if (preg_match('/^192\.168\./', env('REMOTE_ADDR'))) {
            return true;
        }
        return false;
    }

    /**
     * switchable debug level by specified host name
     * usage: call from $controller->beforeFilter
     * @param array $hostNames
     */
    function enableByHostName($hostNames=array()) {
        if (in_array(env('SERVER_NAME'), $hostNames)) {
            $this->isEnable = true;
        }
    }

    /**
     * get debug level setting by extension
     * @return int debug level
     */
    function getRemoteDebugLevel() {
        if (!isset($_COOKIE['CAKEDEBUG_SESSION'])) {
            return 0;
        }
        return $_COOKIE['CAKEDEBUG_SESSION'];
    }
}
