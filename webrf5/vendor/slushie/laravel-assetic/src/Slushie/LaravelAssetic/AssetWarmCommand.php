<?php

namespace Slushie\LaravelAssetic;

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

class AssetWarmCommand extends Command {

	/**
	 * The console command name.
	 *
	 * @var string
	 */
	protected $name = 'asset:warm';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Generate asset output to disk.';

  /**
   * Create a new command instance.
   */
	public function __construct()
	{
		parent::__construct();
	}

	/**
	 * Execute the console command.
	 *
	 * @return void
	 */
	public function fire()
	{
    /** @var Asset $assets */
    $assets = $this->laravel['asset'];

		$group = $this->argument('group');
    if (is_null($group)) {
      $group = $assets->listGroups();
    }
    else {
      $group = (array)$group;
    }

    foreach ($group as $name) {
      $this->info("Generating asset group '$name'");
      $collection = $assets->createGroup($name, $this->option('overwrite'));

      $this->line("Wrote output to public/" . $collection->getTargetPath());
    }
	}

	/**
	 * Get the console command arguments.
	 *
	 * @return array
	 */
	protected function getArguments()
	{
		return array(
			array('group', InputArgument::OPTIONAL, 'Name of the asset group to warm.'),
		);
	}

	/**
	 * Get the console command options.
	 *
	 * @return array
	 */
	protected function getOptions()
	{
		return array(
			array('overwrite', null, InputOption::VALUE_NONE,
        'Force overwrite of output.'),
		);
	}

}