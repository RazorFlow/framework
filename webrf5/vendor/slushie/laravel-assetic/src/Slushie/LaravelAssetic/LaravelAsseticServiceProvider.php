<?php namespace Slushie\LaravelAssetic;

use Artisan;
use Illuminate\Support\ServiceProvider;

class LaravelAsseticServiceProvider extends ServiceProvider {

	/**
	 * Indicates if loading of the provider is deferred.
	 *
	 * @var bool
	 */
	protected $defer = false;

	/**
	 * Bootstrap the application events.
	 *
	 * @return void
	 */
	public function boot()
	{
		$this->package('slushie/laravel-assetic');
	}

	/**
	 * Register the service provider.
	 *
	 * @return void
	 */
	public function register()
	{
    $this->app['asset'] = $this->app->share(function() {
      return new Asset;
    });

    $this->app['command.asset.warm'] = $this->app->share(function() {
      return new AssetWarmCommand();
    });

    $this->commands('command.asset.warm');
  }

	/**
	 * Get the services provided by the provider.
	 *
	 * @return array
	 */
	public function provides()
	{
		return array('asset');
	}

}