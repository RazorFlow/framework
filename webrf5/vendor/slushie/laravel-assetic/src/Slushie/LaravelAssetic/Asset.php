<?php
/**
 * Author: Josh Leder <slushie@gmail.com>
 * Created: 10/7/13 @ 11:24 AM
 */

namespace Slushie\LaravelAssetic;

use Assetic\Asset\AssetCollection;
use Assetic\Asset\AssetInterface;
use Assetic\Asset\FileAsset;
use Assetic\Asset\GlobAsset;
use Assetic\Asset\HttpAsset;
use Assetic\AssetManager;
use Assetic\AssetWriter;
use Assetic\Factory\AssetFactory;
use Assetic\Filter\FilterInterface;
use Assetic\FilterManager;
use Config;
use URL;

/**
 * Provides a front-end for Assetic collections.
 *
 * @package Slushie\LaravelAssetic
 */
class Asset {
  public $groups = array();

  /** @var FilterManager */
  public $filters;

  /** @var AssetManager */
  public $assets;

  protected $namespace = 'laravel-assetic';

  public function __construct() {
    $this->createFilterManager();
    $this->createAssetManager();
  }

  /**
   * Create a new AssetCollection instance for the given group.
   *
   * @param string $name
   * @param bool   $overwrite force writing
   * @return \Assetic\Asset\AssetCollection
   */
  public function createGroup($name, $overwrite = false) {
    if (isset($this->groups[$name])) {
      return $this->groups[$name];
    }

    $assets = $this->createAssetArray($name);
    $filters = $this->createFilterArray($name);
    $coll = new AssetCollection($assets, $filters);

    if ($output = $this->getConfig($name, 'output')) {
      $coll->setTargetPath($output);
    }

    // check output cache
    $write_output = true;
    if (!$overwrite) {
      if (file_exists($output = public_path($coll->getTargetPath()))) {
        $output_mtime = filemtime($output);
        $asset_mtime = $coll->getLastModified();

        if ($asset_mtime && $output_mtime >= $asset_mtime) {
          $write_output = false;
        }
      }
    }

    // store assets
    if ($overwrite || $write_output) {
      $writer = new AssetWriter(public_path());
      $writer->writeAsset($coll);
    }

    return $this->groups[$name] = $coll;
  }

  /**
   * Treat group names as dynamic properties.
   *
   * @param $name
   * @return AssetCollection
   */
  public function __get($name) {
    return $this->createGroup($name);
  }

  /**
   * Generate the URL for a given asset group.
   *
   * @param $name
   * @return string
   */
  public function url($name) {
    $group = $this->createGroup($name);
    return URL::asset($group->getTargetPath());
  }

  /**
   * Returns an array of group names.
   *
   * @return array
   */
  public function listGroups() {
    $groups = Config::get($this->namespace . '::groups', array());
    return array_keys($groups);
  }

  /**
   * Create an array of AssetInterface objects for a group.
   *
   * @param $name
   * @throws \InvalidArgumentException for undefined assets
   * @return array
   */
  protected function createAssetArray($name) {
    $config = $this->getConfig($name, 'assets', array());
    $assets = array();
    foreach ($config as $asset) {
      // existing asset definition
      if ($this->assets->has($asset)) {
        $assets[] = $this->assets->get($asset);
      }
      // looks like a file
      elseif (str_contains($asset, array('/', '.', '-'))) {
        $assets[] = $this->parseAssetDefinition($asset);
      }
      // unknown asset
      else {
        throw new \InvalidArgumentException("No asset '$asset' defined");
      }
    }

    return $assets;
  }

  /**
   * Create an array of FilterInterface objects for a group.
   *
   * @param $name
   * @return array
   */
  protected function createFilterArray($name) {
    $config = $this->getConfig($name, 'filters', array());
    $filters = array();
    foreach ($config as $filter) {
      $filters[] = $this->filters->get($filter);
    }

    return $filters;
  }

  /**
   * Creates the filter manager from the config file's filter array.
   *
   * @return FilterManager
   */
  protected function createFilterManager() {
    $manager = new FilterManager();
    $filters = Config::get($this->namespace . '::filters', array());
    foreach ($filters as $name => $filter) {
      $manager->set($name, $this->createFilter($filter));
    }

    return $this->filters = $manager;
  }

  /**
   * Create a filter object from a value in the config file.
   *
   * @param callable|string|FilterInterface $filter
   * @return FilterInterface
   * @throws \InvalidArgumentException when a filter cannot be created
   */
  protected function createFilter($filter) {
    if (is_callable($filter)) {
      return call_user_func($filter);
    }
    else if (is_string($filter)) {
      return new $filter;
    }
    else if (is_object($filter)) {
      return $filter;
    }
    else {
      throw new \InvalidArgumentException("Cannot convert $filter to filter");
    }
  }

  protected function createAssetManager() {
    $manager = new AssetManager;
    $config = Config::get($this->namespace . '::assets', array());

    foreach ($config as $key => $refs) {
      if (!is_array($refs)) {
        $refs = array($refs);
      }

      $asset = array();
      foreach ($refs as $ref) {
        $asset[] = $this->parseAssetDefinition($ref);
      }

      if (count($asset) > 0) {
        $manager->set($key,
          count($asset) > 1
            ? new AssetCollection($asset)
            : $asset[0]
        );
      }
    }

    return $this->assets = $manager;
  }

  /**
   * Create an asset object from a string definition.
   *
   * @param string $asset
   * @return AssetInterface
   */
  protected function parseAssetDefinition($asset) {
    if (starts_with($asset, 'http://')) {
      return new HttpAsset($asset);
    }
    else if (str_contains($asset, array('*', '?'))) {
      return new GlobAsset($this->absolutePath($asset));
    }
    else {
      return new FileAsset($this->absolutePath($asset));
    }
  }

  protected function getConfig($group, $key, $default = null) {
    return Config::get($this->namespace . "::groups.$group.$key", $default);
  }

  /**
   * Returns the absolute path for a string. Relative paths are made
   * absolute relative to the public folder. Absolute paths are
   * returned without change.
   *
   * @param string $relative_or_absolute
   * @return string
   */
  protected function absolutePath($relative_or_absolute) {
    // already absolute if path starts with / or drive letter
    if (preg_match(',^([a-zA-Z]:|/),', $relative_or_absolute)) {
      return $relative_or_absolute;
    }

    return public_path($relative_or_absolute);
  }

}