<?php

class PerchBlog_Util extends PerchAPI_Factory
{
	protected $table     = 'blog_posts';
	protected $pk        = 'postID';
	protected $singular_classname = 'PerchBlog_Post';
	
	protected $resource_bucket = 'default';
	protected $import_folder = false;
	
	public function find_importable_files()
	{
		return PerchUtil::get_dir_contents(PerchUtil::file_path(PERCH_PATH.'/addons/apps/'.$this->api->app_id.'/import_data/'), true);
	}

	public function import_from_posterous($folder, $format='html', $bucket='default', $sectionID=1)
	{
		$folder_path = PerchUtil::file_path(PERCH_PATH.'/addons/apps/'.$this->api->app_id.'/import_data/'.$folder);
		$this->import_folder = $folder_path;

		if (is_dir($folder_path)) {
			$wordpress_file = PerchUtil::file_path($folder.'/wordpress_export_1.xml');
			if (file_exists(PerchUtil::file_path(PERCH_PATH.'/addons/apps/'.$this->api->app_id.'/import_data/'.$wordpress_file))) {

				$this->resource_bucket = $bucket;

				return $this->import_from_wp($wordpress_file, 'html', array($this, 'posterous_process_images'), $sectionID);
			}
		}else{

		}
	}


	public function posterous_process_images($post, $Template)
	{
		$html = $post['postDescHTML'];

		// find posterous URLs
		// <img alt="Img_8371" height="333" src="http://getfile0.posterous.com/getfile/files.posterous.com/temp-2012-02-04/ybzoAslvztsefCumHsmxEuFjiEutyFpnhGanxcfyunylvDaoAhgpAxChyrnp/IMG_8371.jpg.scaled500.jpg" width="500"/>
		// <a href="http://getfile0.posterous.com/getfile/files.posterous.com/temp-2012-02-04/ybzoAslvztsefCumHsmxEuFjiEutyFpnhGanxcfyunylvDaoAhgpAxChyrnp/IMG_8371.jpg.scaled1000.jpg">
		 
		$s = '/<img[^>]*src="[^"]*posterous\.com[^"]*"[^>]*>/';
		$count	= preg_match_all($s, $html, $matches);

		$PerchImage = $this->api->get('Image');
		$image_folder = $this->import_folder.'/image/';

		$Perch = Perch::fetch();
		$bucket = $Perch->get_resource_bucket($this->resource_bucket);

		if ($count) {
			foreach($matches as $match) {
				$Tag = new PerchXMLTag($match[0]);

				// Find the file name
				$parts = explode('/', $Tag->src());
				$filename = array_pop($parts);
				$linkpath = str_replace($filename, '', $Tag->src());
				$fileparts = explode('.scaled', $filename);
				$filename = array_shift($fileparts);
				$linkpath .= $filename;

				// Find the temp-YYYY-MM-DD part of the path to find the image folder
				$s = '/\/temp-([0-9]{4})-([0-9]{2})-[0-9]{2}\//';
				$count = preg_match($s, $Tag->src(), $path_matches);

				if ($count) {
					
					$folder = PerchUtil::file_path($image_folder.$path_matches[1].'/'.$path_matches[2].'/');
					$files = PerchUtil::get_dir_contents($folder, false);

					if (PerchUtil::count($files)) {

						$l = strlen($filename);

						$image_file = false;

						foreach($files as $file) {
							PerchUtil::debug(substr($file, -$l));
							if (substr($file, -$l)==$filename) {
								$image_file = PerchUtil::file_path($folder.$file);
								break;
							}
						}

						if ($image_file) {
							$new_image_file = PerchUtil::file_path($bucket['file_path'].'/'.$file);
							copy($image_file, $new_image_file);

							$new_image = $PerchImage->resize_image($new_image_file, (int)$Tag->width(), (int)$Tag->height());
							
							$img_html = '<img src="'.$new_image['web_path'].'" width="'.$new_image['w'].'" height="'.$new_image['h'].'" alt="'.PerchUtil::html($Tag->alt()).'" />' ;

							if (defined('PERCH_XHTML_MARKUP') && PERCH_XHTML_MARKUP==false) {
		    					$img_html = str_replace(' />', '>', $img_html);
							}

							$html = str_replace($match[0], $img_html, $html);

							// find links to the bigger version
							$s = '/<a[^>]*href="'.preg_quote($linkpath, '/').'[^"]*"[^>]*>/';
							$s = preg_replace('#getfile[0-9]{1,2}#', 'getfile[0-9]{1,2}', $s);
							$count	= preg_match_all($s, $html, $link_matches);

							if ($count) {
								$big_image = $PerchImage->resize_image($new_image_file, (int)$Tag->width()*2, (int)$Tag->height()*2);
								$link_html = '<a href="'.$big_image['web_path'].'">';

								foreach($link_matches as $link_match) {
									$html = str_replace($link_match[0], $link_html, $html);
								}
							}else{
								PerchUtil::debug('FAIL', 'error');
								PerchUtil::debug($new_image);
								PerchUtil::debug($s);
								PerchUtil::debug($link_matches);
							}
						}

					}

				}


			}
		}


		$post['postDescHTML'] = $html;
		$post['postDescRaw'] = $html;

		return $post;
	}



	public function import_from_wp($wordpress_file, $format="textile", $callback=false, $sectionID=1)
	{
		$out = array();

	    // LOAD XML
	    $xml = simplexml_load_file(PerchUtil::file_path(PERCH_PATH.'/addons/apps/'.$this->api->app_id.'/import_data/'.$wordpress_file));


	    // AUTHORS
	    $Authors = new PerchBlog_Authors($this->api);
	    
	    foreach($xml->channel->children('wp', true) as $tag) {
	        if ($tag->getName()=='author') {
	            $data = array();
	            $data['authorEmail']        = (string) $tag->author_email;
	            $data['authorSlug']  		= PerchUtil::urlify((string) $tag->author_display_name);
	            $data['authorGivenName']    = (string) $tag->author_first_name;
	            $data['authorFamilyName']   = (string) $tag->author_last_name;
	            $data['authorImportRef']	= (string) $tag->author_login;

	            if ($data['authorGivenName']=='') {
	            	$data['authorGivenName'] = (string) $tag->author_login;
	            }

	            $Author = $Authors->find_or_create_by_email((string) $tag->author_email, $data);

	            if ($Author) {
	            	$out[] = array('type'=>'success',
									'messages'=>array(
											'Author ' . (string) $tag->author_display_name,
											'Successfully imported'
										));
	            }
	            
	        }
	    }

	    
	    // POSTS
	    $Posts   = new PerchBlog_Posts($this->api);

		$Template = $this->api->get('Template');
		$Template->set('blog/post.html', 'blog');

	    foreach($xml->channel->item as $item) {

	        $post = array();
	        $post['postTitle']  = (string) $item->title;
	        $post['postTags']	= '';

	        $post['postLegacyURL'] = parse_url((string) $item->link, PHP_URL_PATH);
	        
	        $post_type = false;
	        
	        foreach($item->children('wp', true) as $tag) {
	            $tagName = $tag->getName();
	            
	            switch($tagName) {
	                case 'post_id':
	                    $post['postImportID']  = (string) $tag;
	                    break;
	                    
	                case 'post_type':
	                    $post_type = (string) $tag;
	                    break;
	                
	                    
	                case 'post_date_gmt':
	                	$val = strtotime((string)$tag);
	                    if ($val) $post['postDateTime'] = date('Y-m-d H:i:s', $val);
	                    break;
	                
	                case 'post_date':
	                    $val = strtotime((string)$tag);
	                    if ($val) $post['postDateTime'] = date('Y-m-d H:i:s', $val);
	                    break;
	                    
	                case 'comment_status':
	                    $val = (string) $tag;
	                    if ($val=='open') {
	                        $post['postAllowComments']  = '1';
	                    }else{
	                        $post['postAllowComments']  = '0';
	                    }
	                    break;
	                    
	                case 'post_name':
	                    $post['postSlug'] = (string) $tag;
	                    break;
	                
	                case 'status':
	                    $val = (string) $tag;
	                    $post['postStatus'] = 'Draft';
	                    if ($val=='publish') $post['postStatus'] = 'Published';
	                    break;
	            }
	        
	        }
	        
	        // if it's not of type 'post', skip.
	        if ($post_type!='post') continue;
	        
	        // At this point, check we don't already have the post (as we know have the postImportID to identify it)
	        if (isset($post['postImportID'])) {
	        $Post = $Posts->find_by_importID($post['postImportID']);
		        if (is_object($Post)) {
		        	$out[] = array('type'=>'success',
										'messages'=>array(
												'Post ' . $Post->postTitle(),
												'Already imported'
											));

		        	continue;

		        }
		    }
	        	        
	        
	        foreach($item->children('dc', true) as $tag) {
	            $tagName = $tag->getName();
	            
	            switch($tagName) {
	                case 'creator':
	                    $val = (string) $tag;
	                    $Author = $Authors->get_one_by('authorImportRef', $val);
	                    
	                    if (is_object($Author)) {
	                        $post['authorID'] = $Author->id();
	                    }
	                    break;
	            }
	        }
	        
	        foreach($item->children('content', true) as $tag) {
	            $tagName = $tag->getName();
	            
	            switch($tagName) {
	                case 'encoded':

	                    $raw  = (string) $tag;
	                    
	                    if ($format=='textile') {
	                    	$html = PerchUtil::text_to_html($raw);
							$post['postDescRaw']        = $raw;
	                    	$post['postDescHTML']       = $html;
	                    }else{
	                    	$post['postDescRaw']        = $raw;
	                    	$post['postDescHTML']       = $raw;
	                    }
	                                    
	                    
	                    break;
	            }
	        }
	        
	        foreach($item->children('excerpt', true) as $tag) {
	            $tagName = $tag->getName();
	            
	            switch($tagName) {
	                case 'encoded':
	                    
	                    $raw  = (string) $tag;
	                    $html = PerchUtil::text_to_html($raw);

	                    $fields = array();
	                    $fields['excerpt'] = array();

	                    if ($format=='textile') {
							$fields['excerpt']['raw']       = $raw;
	                    	$fields['excerpt']['processed'] = $html;
	                    }else{
	                    	$fields['excerpt']['raw']       = $html;
	                    	$fields['excerpt']['processed'] = $html;
	                    }

	                    $post['postDynamicFields'] = PerchUtil::json_safe_encode($fields);


	                    break;
	            }
	        }

	        // Callbacks
	        if ($callback) {
	        	$post = call_user_func($callback, $post, $Template);
	        }
	        
	        	               
	        // Section
	        $post['sectionID'] = $sectionID;

	        // Create the post
	        $Post = $Posts->create($post, $Template);
	        
	        if (is_object($Post)) {

	        	$out[] = array('type'=>'success',
									'messages'=>array(
											'Post ' . $Post->postTitle(),
											'Successfully imported'
										));

	            
	            // CATEGORIES AND TAGS
	            $Categories = new PerchBlog_Categories($this->api);
	            $Tags = new PerchBlog_Tags($this->api);

	            $postTags = array();
	            $cat_ids  = array();
	        
	            foreach($item->category as $category) {
	                
	                $attributes = $category->attributes();
	                
	                $slug = (string) $attributes['nicename'];
	                $label = (string) $category;
	                
	                switch((string)$attributes['domain']) {
	                    case 'post_tag':
	                        $Tag = $Tags->find_or_create($slug, $label);
	                        if (is_object($Tag)) {
	                            $postTags[] = $Tag->tagSlug();

	                            $out[] = array('type'=>'success',
									'messages'=>array(
											'Tag ' . $Tag->tagSlug(),
											'Successfully imported'
										));
	                        }
	                        break;
	                        
	                    case 'category':
	                        $Category = $Categories->find_or_create($slug, $label);
	                        if (is_object($Category)) {
	                            $cat_ids[] = $Category->id();

	                            $out[] = array('type'=>'success',
									'messages'=>array(
											'Category ' . $label,
											'Successfully imported'
										));
	                        }
	                        break;   
	                }
	            }
	            
	            if (PerchUtil::count($postTags)) {
	            	$post['postTags'] = implode(', ', $postTags);
	            }

	            if (PerchUtil::count($cat_ids)) {
	            	$post['cat_ids'] = $cat_ids;
	            }

	            $Post->Template = $Template;
	            $Post->update($post);
	            
	            
	            // COMMENTS
	            $Comments = new PerchBlog_Comments($this->api);
	            foreach($item->children('wp', true) as $tag) {
	                $tagName = $tag->getName();

	                if ($tagName == 'comment') {
	                    
	                    if ((string)$tag->comment_type=='pingback') {
	                        continue; // this is a pingback, so skip it.
	                    }
	                    
	                    $html = PerchUtil::text_to_html((string)$tag->comment_content);
	                    
	                    $comment = array();
						$comment['postID']               = $Post->id();
						$comment['commentName']          = (string) $tag->comment_author;
						$comment['commentEmail']         = (string) $tag->comment_author_email;
						$comment['commentURL']           = (string) $tag->comment_author_url;
						$comment['commentIP']            = ip2long((string) $tag->comment_author_IP);
						$comment['commentDateTime']      = date('Y-m-d H:i:s', strtotime((string) $tag->comment_date_gmt));
						$comment['commentHTML']          = $html;
						$comment['commentSpamData']      = '';
						$comment['commentDynamicFields'] = '';

	                    if ((string)$tag->comment_approved == '1') {
	                        $comment['commentStatus'] = 'LIVE';                        
	                        $Comment = $Comments->create($comment);


	                        $out[] = array('type'=>'success',
									'messages'=>array(
											'Comment from ' . $comment['commentName'],
											'Successfully imported'
										));
	                    }
	                    
	                }
	            }

	            $Post->update_comment_count();
	         	

	        }
	        
	        

	        
	        
	    }	    

	    return $out;
	}

}


