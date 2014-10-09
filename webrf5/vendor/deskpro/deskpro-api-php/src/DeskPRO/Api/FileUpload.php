<?php

namespace DeskPRO\Api;

/**
 * Wrapper around a file that will be uploaded to the DeskPRO API.
 * This can wrap around an actual file on the file system or in-PHP
 * data.
 *
 * Create this object and pass it to the correct parameter in a wrapper
 * call to upload a file.
 */
class FileUpload
{

    /**
     * @var string
     */
    protected $_filename;

    /**
     * If null, filename is read for data.
     *
     * @var string|null
     */
    protected $_data;

    /**
     * MIME type (eg, text/plain).
     *
     * @var string|null
     */
    protected $_type;

    /**
     * Constructor.
     *
     * @param string $filename
     * @param string|null $data
     * @param string|null $type
     */
    public function __construct($filename, $data = null, $type = null)
    {
        $this->_filename = $filename;
        $this->_data = $data;
        $this->_type = $type;
    }

    /**
     * Gets the file name. Only returns the base name.
     *
     * @return string
     */
    public function getFilename()
    {
        if (strpos($this->_filename, '/') !== false || strpos($this->_filename, '\\') !== false) {
            return basename($this->_filename);
        } else {
            return $this->_filename;
        }
    }

    /**
     * Gets the data from memory or the filesystem.
     *
     * @return string
     */
    public function getData()
    {
        if ($this->_data === null) {
            if (!file_exists($this->_filename) || !is_readable($this->_filename)) {
                throw new DpApiException("Could not read $this->_filename to upload");
            }

            return file_get_contents($this->_filename);
        } else {
            return $this->_data;
        }
    }

    /**
     * Gets the MIME type.
     *
     * @return null|string
     */
    public function getType()
    {
        return $this->_type;
    }

}