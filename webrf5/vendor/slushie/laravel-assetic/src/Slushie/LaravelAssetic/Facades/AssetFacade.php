<?php
/**
 * Author: Josh Leder <slushie@gmail.com>
 * Created: 10/7/13 @ 11:22 AM
 */


namespace Slushie\LaravelAssetic\Facades;


use Illuminate\Support\Facades\Facade;

class AssetFacade extends Facade {
  protected static function getFacadeAccessor() { return 'asset'; }
}