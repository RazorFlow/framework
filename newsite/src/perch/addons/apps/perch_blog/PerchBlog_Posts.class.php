<?php

class PerchBlog_Posts extends PerchAPI_Factory
{
    protected $table     = 'blog_posts';
	protected $pk        = 'postID';
	protected $singular_classname = 'PerchBlog_Post';
	
	protected $default_sort_column = 'postDateTime';
    protected $created_date_column = 'postDateTime';
	
	public $static_fields   = array('postTitle', 'postSlug', 'postDateTime', 'postDescRaw', 'postDescHTML', 'postTags', 'postStatus', 
                                        'authorID', 'authorGivenName', 'authorFamilyName', 'authorEmail', 'authorSlug', 'postURL', 'postAllowComments', 'sectionID', 'sectionSlug');

    public static $preview_mode = false;
	
    function __construct($api=false) 
    {
        $this->cache = array();
        parent::__construct($api);

        if (self::$preview_mode) {
            PerchBlog_Cache::disable();
        }
    }
    
    public function all($Paging=false)
    {
        if ($Paging && $Paging->enabled()) {
            $sql = $Paging->select_sql();
        }else{
            $sql = 'SELECT';
        }
        
        $sql .= ' * 
                FROM ' . $this->table;
                
        if (isset($this->default_sort_column)) {
            $sql .= ' ORDER BY ' . $this->default_sort_column . ' DESC';
        }
        
        if ($Paging && $Paging->enabled()) {
            $sql .=  ' '.$Paging->limit_sql();
        }
        
        $results = $this->db->get_rows($sql);
        
        if ($Paging && $Paging->enabled()) {
            $Paging->set_total($this->db->get_count($Paging->total_count_sql()));
        }
        
        return $this->return_instances($results);
    }

    
    /*
        Get a single post by its ID
    */
    public function find($postID, $is_admin=false) 
    {
        $Cache = PerchBlog_Cache::fetch();
        
        if ($Cache->exists('p'.$postID)) {
            return $Cache->get('p'.$postID);
        }else{
            $sql = 'SELECT * FROM '.PERCH_DB_PREFIX.'blog_posts WHERE postID='.$this->db->pdb($postID);
            
            if (!$is_admin && self::$preview_mode==false) {
                $sql .= ' AND postStatus=\'Published\' AND postDateTime<='.$this->db->pdb(date('Y-m-d H:i:00')).' ';
            }

            $row = $this->db->get_row($sql);

            if(is_array($row)) {
                $sql = 'SELECT categoryID FROM '.PERCH_DB_PREFIX.'blog_posts_to_categories WHERE postID = '.$this->db->pdb($postID);
                $result = $this->db->get_rows($sql);
                $a = array();
                if(is_array($result)) {
                    foreach($result as $cat_row) {
                        $a[] = $cat_row['categoryID'];
                    }
                }
                $row['cat_ids'] = $a;
            }

            $r = $this->return_instance($row);
            
            $Cache->set('p'.$postID, $r);
            
            return $r;
        }
        
        return false;
    }

    /**
     * Admin function - find by importID. Used by importer tool.
     * @param  [type] $importID [description]
     * @return [type]           [description]
     */
    public function find_by_importID($importID)
    {
        $sql = 'SELECT * FROM '.PERCH_DB_PREFIX.'blog_posts WHERE postImportID='.$this->db->pdb($importID);
        $row = $this->db->get_row($sql);

        return $this->return_instance($row);
    }
    
    /*
        Get a single post by its Slug
    */
    public function find_by_slug($postSlug) 
    {
        $Cache = PerchBlog_Cache::fetch();
        
        if ($Cache->exists('p'.$postSlug)) {
            return $Cache->get('p'.$postSlug);
        }else{
            if (self::$preview_mode) {
                $sql = 'SELECT * FROM '.PERCH_DB_PREFIX.'blog_posts WHERE postSlug= '.$this->db->pdb($postSlug);
            }else{
                $sql = 'SELECT * FROM '.PERCH_DB_PREFIX.'blog_posts WHERE postStatus=\'Published\' AND postDateTime<='.$this->db->pdb(date('Y-m-d H:i:00')).' AND postSlug= '.$this->db->pdb($postSlug);
            }
            
            $row = $this->db->get_row($sql);
        
            if(is_array($row)) {
                $sql = 'SELECT categoryID FROM '.PERCH_DB_PREFIX.'blog_posts_to_categories WHERE postID = '.$this->db->pdb($row['postID']);
                $result = $this->db->get_rows($sql);
                $a = array();
                if(is_array($result)) {
                    foreach($result as $cat_row) {
                        $a[] = $cat_row['categoryID'];
                    }
                }
                $row['cat_ids'] = $a;
            }
        
            $r = $this->return_instance($row);
            
            $Cache->set('p'.$postSlug, $r);
            
            return $r;
        }
        
        return false;
    }
    
    
	/**
	* takes the post data and inserts it as a new row in the database.
	*/
    public function create($data, $Template=false)
    {
        if (!isset($data['postDateTime'])) $data['postDateTime'] = date('Y-m-d H:i:s');
        
        if (isset($data['postTitle'])) {
            $data['postSlug'] = PerchUtil::urlify(date('Y m d', strtotime($data['postDateTime'])). ' ' . $data['postTitle']);
        }
        
        if (isset($data['cat_ids']) && is_array($data['cat_ids'])) {
            $cat_ids = $data['cat_ids'];
        }else{
            $cat_ids = false;
        }
        
        unset($data['cat_ids']);
        
        $postID = $this->db->insert($this->table, $data);
       
		if ($postID) {
			if(is_array($cat_ids)) {
				for($i=0; $i<sizeOf($cat_ids); $i++) {
				    $tmp = array();
				    $tmp['postID'] = $postID;
				    $tmp['categoryID'] = $cat_ids[$i];
				    $this->db->insert(PERCH_DB_PREFIX.'blog_posts_to_categories', $tmp);
				}
			}
			
			// Split tag string into array
			if($data['postTags'] != '') {
				$a = explode(',',$data['postTags']);
				if (is_array($a)) {
 					for($i=0; $i<sizeOf($a); $i++) {
						$tmp = array();
						$tmp['postID'] = $postID;
					
						$tag_str = trim($a[$i]);
					//does this tag exist
					$sql = 'SELECT tagID, tagTitle FROM '.PERCH_DB_PREFIX.'blog_tags WHERE tagTitle = '.$this->db->pdb($tag_str).' LIMIT 1';
					
					$row = $this->db->get_row($sql);
					
					
					if(is_array($row)) {
						$tmp['tagID'] = $row['tagID'];
					}else{
						$tag = array();
						$tag['tagTitle'] = $tag_str;
						$tag['tagSlug'] = PerchUtil::urlify($tag_str);
						$tmp['tagID'] = $this->db->insert(PERCH_DB_PREFIX.'blog_tags', $tag);
					}

 			    	
 			    		$this->db->insert(PERCH_DB_PREFIX.'blog_posts_to_tags', $tmp);
 					}
 				}
			
			}
			
            return $this->find($postID, true);
		}				
        return false;
	}
      
    public function get_custom($opts)
    {
        $posts       = array();
        $Post        = false;
        $single_mode = false;
        $where       = array();
        $order       = array();
        $limit       = '';
        
        
        // find specific _id
	    if (isset($opts['_id'])) {
	        $single_mode = true;
	        $Post = $this->find($opts['_id']);
	    }else{        
	        // if not picking an _id, check for a filter
	        if (isset($opts['filter']) && isset($opts['value'])) {
	            
	            
	            $key = $opts['filter'];
	            $raw_value = $opts['value'];
	            $value = $this->db->pdb($opts['value']);
	            
	            $match = isset($opts['match']) ? $opts['match'] : 'eq';
                switch ($match) {
                    case 'eq': 
                    case 'is': 
                    case 'exact': 
                        $where[] = $key.'='.$value;
                        break;
                    case 'neq': 
                    case 'ne': 
                    case 'not': 
                        $where[] = $key.'!='.$value;
                        break;
                    case 'gt':
                        $where[] = $key.'>'.$value;
                        break;
                    case 'gte':
                        $where[] = $key.'>='.$value;
                        break;
                    case 'lt':
                        $where[] = $key.'<'.$value;
                        break;
                    case 'lte':
                        $where[] = $key.'<='.$value;
                        break;
                    case 'contains':
                        $v = str_replace('/', '\/', $raw_value);
                        $where[] = $key." REGEXP '[[:<:]]'.$v.'[[:>:]]'";
                        break;
                    case 'regex':
                    case 'regexp':
                        $v = str_replace('/', '\/', $raw_value);
                        $where[] = $key." REGEXP '".$v."'";
                        break;
                    case 'between':
                    case 'betwixt':
                        $vals  = explode(',', $raw_value);
                        if (PerchUtil::count($vals)==2) {
                            $where[] = $key.'>'.trim($this->db->pdb($vals[0]));
                            $where[] = $key.'<'.trim($this->db->pdb($vals[1]));
                        }
                        break;
                    case 'eqbetween':
                    case 'eqbetwixt':
                        $vals  = explode(',', $raw_value);
                        if (PerchUtil::count($vals)==2) {
                            $where[] = $key.'>='.trim($this->db->pdb($vals[0]));
                            $where[] = $key.'<='.trim($this->db->pdb($vals[1]));
                        }
                        break;
                    case 'in':
                    case 'within':
                        $vals  = explode(',', $raw_value);
                        $tmp = array();
                        if (PerchUtil::count($vals)) {
                            foreach($vals as $value) {
                                if ($item[$key]==trim($value)) {
                                    $tmp[] = $item;
                                    break;
                                }
                            }
                            $where[] = $key.' IN '.$this->implode_for_sql_in($tmp);
                        }
                        break;
                }
	        }
	    }

        // section
        if (isset($opts['section'])) {
            $Sections = new PerchBlog_Sections;

            if (is_numeric($opts['section'])) {
                $Section = $Sections->find($opts['section']);
            }else{
                $Section = $Sections->find_by_slug($opts['section']);
            }

            if (is_object($Section)) {
                $where[] = ' sectionID='.$this->db->pdb($Section->id());
            }else{
                $where[] = ' sectionID IS NULL ';
            }
        }


        // author
        if (isset($opts['author'])) {
            $Authors = new PerchBlog_Authors;

            if (is_numeric($opts['author'])) {
                $Author = $Authors->find($opts['author']);
            }else{
                $Author = $Authors->find_by_slug($opts['author']);
            }

            if (is_object($Author)) {
                $where[] = ' authorID='.$this->db->pdb($Author->id());
            }else{
                $where[] = ' authorID IS NULL ';
            }
        }
    
	    // sort
	    if (isset($opts['sort'])) {
	        $desc = false;
	        if (isset($opts['sort-order']) && $opts['sort-order']=='DESC') {
	            $desc = true;
	        }else{
	            $desc = false;
	        }
	        $order[] = $opts['sort'].' '.($desc ? 'DESC' : 'ASC');
	    }
    
	    if (isset($opts['sort-order']) && $opts['sort-order']=='RAND') {
            $order = array('RAND()');
        }
    
	    // limit
	    if (isset($opts['count'])) {
	        $count = (int) $opts['count'];
        
	        if (isset($opts['start'])) {
                $start = (((int) $opts['start'])-1). ',';
	        }else{
	            $start = '';
	        }
        
	        $limit = $start.$count;
	    }
	    
	    if ($single_mode){
	        $posts = array($Post);
	    }else{
	        
	        // Paging
	        $Paging = $this->api->get('Paging');

            if (isset($opts['pagination-var']) && $opts['pagination-var']!='') {
                $Paging->set_qs_param($opts['pagination-var']);
            }

	        if ((!isset($count) || !$count) || (isset($opts['start']) && $opts['start']!='')) {
	            $Paging->disable();
	        }else{
	            $Paging->set_per_page($count);
	            if (isset($opts['start']) && $opts['start']!='') {
	                PerchUtil::debug('setting start pos: '.$opts['start']);
	                $Paging->set_start_position($opts['start']);
	            }
	        }
	        
    	    $sql = $Paging->select_sql() . ' p.* FROM '.$this->table.' p ';
	    
            // categories
            if (isset($opts['category'])) {
                $cats = $opts['category'];
                if (!is_array($cats)) $cats = array($cats);

                $do_cat = array();
                $do_not_cat = array();

                foreach($cats as $cat) {
                    if (substr($cat, 0, 1)=='!') {
                        $do_not_cat[] = ltrim($cat, '!');
                    }else{
                        $do_cat[] = $cat;
                    }
                }
        
                if (is_array($cats)) {
                    $sql .= ' LEFT JOIN '.PERCH_DB_PREFIX.'blog_posts_to_categories p2c ON p.postID=p2c.postID LEFT JOIN '.PERCH_DB_PREFIX.'blog_categories c ON p2c.categoryID=c.categoryID ';
                    

                    if (PerchUtil::count($do_cat)) {
                        $where[] = ' categorySlug IN ('.$this->implode_for_sql_in($do_cat).') ';
                    }

                    if (PerchUtil::count($do_not_cat)) {
                        $where[] = ' p.postID NOT IN (
                                SELECT p2.postID FROM '.$this->table.' p2, '.PERCH_DB_PREFIX.'blog_posts_to_categories p2c2, '.PERCH_DB_PREFIX.'blog_categories c2 
                                    WHERE p2.postID=p2c2.postID  AND p2c2.categoryID=c2.categoryID AND c2.categorySlug IN ('.$this->implode_for_sql_in($do_not_cat).') 
                                )';
                    }
                   
                }
            }
            
            // tags
            if (isset($opts['tag'])) {
                $tags = $opts['tag'];
                if (!is_array($tags)) $tags = array($tags);

                $do_tag = array();
                $do_not_tag = array();

                foreach($tags as $tag) {
                    if (substr($tag, 0, 1)=='!') {
                        $do_not_tag[] = ltrim($tag, '!');
                    }else{
                        $do_tag[] = $tag;
                    }
                }

        
                if (is_array($tags)) {


                    $sql .= ' LEFT JOIN '.PERCH_DB_PREFIX.'blog_posts_to_tags p2t ON p.postID=p2t.postID LEFT JOIN '.PERCH_DB_PREFIX.'blog_tags t ON p2t.tagID=t.tagID ';
                    

                    if (PerchUtil::count($do_tag)) {
                        $where[] = ' tagSlug IN ('.$this->implode_for_sql_in($do_tag).') ';
                    }

                    if (PerchUtil::count($do_not_tag)) {
                        $where[] = ' p.postID NOT IN (
                                SELECT p2.postID FROM '.$this->table.' p2, '.PERCH_DB_PREFIX.'blog_posts_to_tags p2t2, '.PERCH_DB_PREFIX.'blog_tags t2 
                                    WHERE p2.postID=p2t2.postID  AND p2t2.tagID=t2.tagID AND t2.tagSlug IN ('.$this->implode_for_sql_in($do_not_tag).') 
                                )';
                    }

                }
            }
	    	
            if (self::$preview_mode) {
                $sql .= ' WHERE 1=1 ';  
            }else{
                $sql .= ' WHERE  postStatus=\'Published\' AND postDateTime<='.$this->db->pdb(date('Y-m-d H:i:00')).' ';  
            }

	    	          
	    	
    	    if (count($where)) {
    	        $sql .= ' AND ' . implode(' AND ', $where);
    	    }
	    
    	    if (count($order)) {
    	        $sql .= ' ORDER BY '.implode(', ', $order);
    	    }
	        
	        if ($Paging->enabled()) {
	            $sql .= ' '.$Paging->limit_sql();
	        }else{
	            if ($limit!='') {
        	        $sql .= ' LIMIT '.$limit;
        	    }
	        }
	        	    	    
    	    $rows    = $this->db->get_rows($sql);

            if ($Paging->enabled()) {
                $Paging->set_total($this->db->get_count($Paging->total_count_sql()));
            }

            // each 
            if (PerchUtil::count($rows) && isset($opts['each']) && is_callable($opts['each'])) {
                $content = array();
                foreach($rows as $item) {
                    $tmp = $opts['each']($item); 
                    $content[] = $tmp;
                }
                $rows = $content;
            }
    	        	        	        	    
    	    $posts  = $this->return_instances($rows);

        }
	    
	    
        if (isset($opts['skip-template']) && $opts['skip-template']==true) {
            
            if ($single_mode) return $Post;
            
            $out = array();
            if (PerchUtil::count($posts)) {
                foreach($posts as $Post) {
                    $out[] = $Post->to_array();
                }
            }
            return $out; 
	    }
	    
	    // template
	    if (isset($opts['template']) && $opts['template']!=false) {
	        $template = 'blog/'.str_replace('blog/', '', $opts['template']);
	    }else{
            if (PerchUtil::count($posts)==1) {
                $template = 'blog/'.$posts[0]->postTemplate();
            }else{
                $template = 'blog/post.html';    
            }
	    }
	    
	    if (isset($Paging) && $Paging->enabled()) {
            $paging_array = $Paging->to_array($opts);
            // merge in paging vars
    	    if (PerchUtil::count($posts)) {
    	        foreach($posts as &$Post) {
    	            foreach($paging_array as $key=>$val) {
    	                $Post->squirrel($key, $val);
    	            }
    	        }
    	    }
        }
        	    
	    $Template = $this->api->get("Template");
	    $Template->set($template, 'blog');

        if (PerchUtil::count($posts)) {
            $html = $Template->render_group($posts, true);
        }else{
            $Template->use_noresults();
            $html = $Template->render(array());
        }
	    
        

	    return $html;
    }
    
    /**
     * gets the listing by category
     * @param varchar $slug
     */
    public function get_by_category_slug($slug, $sectionID=false)
    {
        $sql = 'SELECT p.*
                FROM '.$this->table.' p, '.PERCH_DB_PREFIX.'blog_categories c, '.PERCH_DB_PREFIX.'blog_posts_to_categories p2c
                WHERE p.postID=p2c.postID AND p2c.categoryID=c.categoryID
                    AND c.categorySlug='.$this->db->pdb($slug).'
                    AND p.postStatus=\'Published\'
                    AND p.postDateTime<='.$this->db->pdb(date('Y-m-d H:i:00'));

        if ($sectionID) $sql .= ' AND p.sectionID='.$this->db->pdb($sectionID);

        $sql .= ' ORDER BY '.$this->default_sort_column.' DESC';

        $rows   = $this->db->get_rows($sql);

        return $this->return_instances($rows);
    }
 
    public function get_by_category_slug_for_admin_listing($slug, $Paging)
    {
        $sql = $Paging->select_sql(). ' p.*
                FROM '.$this->table.' p, '.PERCH_DB_PREFIX.'blog_categories c, '.PERCH_DB_PREFIX.'blog_posts_to_categories p2c
                WHERE p.postID=p2c.postID AND p2c.categoryID=c.categoryID
                    AND c.categorySlug='.$this->db->pdb($slug).'
                ORDER BY '.$this->default_sort_column.' DESC';

        if ($Paging && $Paging->enabled()) {
            $sql .=  ' '.$Paging->limit_sql();
        }
        
        $rows = $this->db->get_rows($sql);
        
        if ($Paging && $Paging->enabled()) {
            $Paging->set_total($this->db->get_count($Paging->total_count_sql()));
        }

        return $this->return_instances($rows);
    }


    public function get_by_section_slug_for_admin_listing($slug, $Paging)
    {
        
        $sql = $Paging->select_sql(). ' p.*
                FROM '.$this->table.' p, '.PERCH_DB_PREFIX.'blog_sections s
                WHERE p.sectionID=s.sectionID
                    AND s.sectionSlug='.$this->db->pdb($slug).'
                ORDER BY '.$this->default_sort_column.' DESC';
        

        if ($Paging && $Paging->enabled()) {
            $sql .=  ' '.$Paging->limit_sql();
        }
        
        $rows = $this->db->get_rows($sql);
        
        if ($Paging && $Paging->enabled()) {
            $Paging->set_total($this->db->get_count($Paging->total_count_sql()));
        }

        return $this->return_instances($rows);
    }

    public function get_by_status($status='PUBLISHED', $sectionID=false, $Paging=false)
    {
        switch(strtoupper($status)) {
            case 'PUBLISHED':
                $status = 'Published';
                break;

            default:
                $status = 'Draft';
                break;
        }

        if ($Paging) {
            $sql = $Paging->select_sql();
        }else{
            $sql = 'SELECT';
        }

        $sql .= ' p.*
                FROM '.$this->table.' p
                WHERE p.postStatus='.$this->db->pdb($status);

        if ($sectionID) $sql .= ' AND p.sectionID='.$this->db->pdb($sectionID);

        $sql .= ' ORDER BY '.$this->default_sort_column.' DESC';

        if ($Paging && $Paging->enabled()) {
            $sql .=  ' '.$Paging->limit_sql();
        }
        
        $rows = $this->db->get_rows($sql);
        
        if ($Paging && $Paging->enabled()) {
            $Paging->set_total($this->db->get_count($Paging->total_count_sql()));
        }

        return $this->return_instances($rows);
    }

    private function implode_for_sql_in($rows)
    {
        foreach($rows as &$item) {
            $item = $this->db->pdb($item);
        }
        
        return implode(', ', $rows);
    }
    
    public function get_years($sectionID=false) 
    {
        $Cache = PerchBlog_Cache::fetch();

        $cache_key = 'get_years';
        if ($sectionID) $cache_key.='_'.$sectionID;
        
        if ($Cache->exists($cache_key)) {
            return $Cache->get($cache_key);
        }
        
 	    $sql = 'SELECT year(postDateTime) as year, COUNT(*) AS year_qty
    	        FROM '.$this->table .' 
    	        WHERE postStatus=\'Published\'
                    AND postDateTime<='.$this->db->pdb(date('Y-m-d H:i:00'));

        if ($sectionID) $sql .= ' AND sectionID='.$this->db->pdb($sectionID);

    	$sql .= ' GROUP BY year
    	        ORDER BY year DESC';
    	
    	$rows   = $this->db->get_rows($sql);

        $Cache->set($cache_key, $rows);
        
    	return $rows;
    	
    }
    
    public function get_months_for_year($year, $sectionID=false) 
    {
        
        $Cache = PerchBlog_Cache::fetch();

        $cache_key = 'months_for_year_'.$year;
        if ($sectionID) $cache_key.='_'.$sectionID;
        
        
        if ($Cache->exists($cache_key)) {
            return $Cache->get($cache_key);
        }

    	$sql = 'SELECT DISTINCT 
    	            year(postDateTime) AS year,
    	            month(postDateTime) AS month,
    	            CONCAT(year(postDateTime),"-",month(postDateTime),"-01") AS postDateTime,
    	            COUNT(*) AS month_qty
                FROM '.$this->table .' p
            	WHERE year(postDateTime) = '.$this->db->pdb($year).' 
            	    AND p.postStatus=\'Published\'
                    AND p.postDateTime<='.$this->db->pdb(date('Y-m-d H:i:00'));

        if ($sectionID) $sql .= ' AND p.sectionID='.$this->db->pdb($sectionID);

        $sql .= ' GROUP BY year, month
            	ORDER BY month DESC';
            	
        $rows   = $this->db->get_rows($sql);
    	
    	$Cache->set($cache_key, $rows);
    	
    	return $rows;
    }
    
}
