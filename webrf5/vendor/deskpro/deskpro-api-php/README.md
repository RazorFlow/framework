DeskPRO PHP SDK
=======================

The DeskPRO PHP SDK is a simple class to access and interact with DeskPRO's REST API. It wraps the actual requests up in an easy-to-use API of simple PHP calls.

For more information on the underlying REST API, please see our [API documentation](http://support.deskpro.com/kb/17-deskpro-api).


PHP SDK Requirements
--------------------

The PHP SDK requires PHP >= 5.2 with the cURL extension.


Using The PHP SDK
-----------------

The best way to get started with the PHP SDK is to view the fully functioning examples in the [examples folder](https://github.com/DeskPRO/deskpro-api-php/tree/master/examples).

The following larger projects may also serve as a useful reference
* [New ticket from a web form](https://github.com/DeskPRO/api-app-ticket-form)
* [Convert your tickets to PDF documents](https://github.com/DeskPRO/api-app-ticket-pdfs)

Full documentation on using the PHP SDK is maintained with our [API documentation](http://support.deskpro.com/kb/17-deskpro-api). 

Specific PHP SDK documentation can be found [here](https://support.deskpro.com/kb/articles/97-deskpro-api-wrapper-php).


Quick Start
-----------

**1.** Clone or download this repository and put the source files somewhere in  your project.

**2.** Include the `deskpro-api.php` file:

    require 'deskpro-api.php';

**3.** Create a new instance of the API class:

    $api = new \DeskPRO\Api('http://example.com/deskpro', '123:XYZ');

**4.** Use `$api` to send API requests to your DeskPRO helpdesk. Refer to the `examples` directory for fully-functional examples.


Using Composer
--------------

You can also install the API library through composer: [https://packagist.org/packages/deskpro/deskpro-api-php](https://packagist.org/packages/deskpro/deskpro-api-php)

    $ php composer.phar require deskpro/deskpro-api-php dev-master
