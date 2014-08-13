<?php
    require('../../../../../runtime.php');

    if (!class_exists('PerchAssets_Assets', false)) {
        include_once(PERCH_CORE.'/apps/assets/PerchAssets_Assets.class.php');
        include_once(PERCH_CORE.'/apps/assets/PerchAssets_Asset.class.php');
    }

    if (PerchUtil::count($_FILES)) {

        $Tag = new PerchXMLTag('<perch:content id="miu_image_upload_image" disable-asset-panel="true" detect-type="true" />');
        $Tag->set('input_id', 'miu_image_upload_image');

        $API = new PerchAPI(1.0, 'miu_image_upload');
        
        if ($_POST['image']=='false'){
            $is_image = false;
            $Tag->set('type', 'file');  
        }else{
            $is_image = true;
            $Tag->set('type', 'image');
        }

        /* -------- GET THE RESOURCE BUCKET TO USE ---------- */
        $bucket_name  = 'default';

        if (isset($_POST['bucket']) && $_POST['bucket']!='') {
            $bucket_name = $_POST['bucket'];
        }

        $Tag->set('bucket', $bucket_name);

       
        if ($is_image) {
            $width = false;
            if (isset($_POST['width'])) $width = (int)$_POST['width'];
            $Tag->set('width', $width);
        
            $height = false;
            if (isset($_POST['height'])) $height = (int)$_POST['height'];
            $Tag->set('height', $height);

            $crop = false;
            if (isset($_POST['crop']) && $_POST['crop']=='true') $crop = true;
            $Tag->set('crop', $crop);
            
            $quality = false;
            if (isset($_POST['quality'])) $quality = (int)$_POST['quality'];
            $Tag->set('quality', $quality);

            $sharpen = false;
            if (isset($_POST['sharpen'])) $sharpen = (int)$_POST['sharpen'];
            $Tag->set('sharpen', $sharpen);

            $density = 1;
            if (isset($_POST['density'])) $density = (int)$_POST['density'];
            $Tag->set('density', $density); 

        }

        $Assets  = new PerchAssets_Assets;
        
        $message = false;
        $assetID = false;
        $Asset = false;
               
        $Form = new PerchForm('edit');

        $Resources = new PerchResources;

        $data = array();
        $FieldType = PerchFieldTypes::get($Tag->type(), $Form, $Tag, array($Tag));
        $var       = $FieldType->get_raw();

        if (PerchUtil::count($var)) {
            
            $ids = $Resources->get_logged_ids();
            $Resources->mark_group_as_library($ids);
            $assetID = $ids[0];
            $Asset = $Assets->find($assetID);

            if (isset($_POST['miu_image_upload_title']) && $_POST['miu_image_upload_title']!='') {
                $Asset->update(array('resourceTitle'=>$_POST['miu_image_upload_title']));    
            }
            
            $Asset->reindex();

            if (PerchUtil::count($ids)) {

                if (!PerchSession::is_set('resourceIDs')) {
                    $logged_ids = array();
                    PerchSession::set('resourceIDs', $logged_ids);
                }else{
                    $logged_ids = PerchSession::get('resourceIDs');
                }

                foreach($ids as $assetID) {
                    if (!in_array($assetID, $logged_ids)) {
                        $logged_ids[] = $assetID;
                    }
                }
                PerchSession::set('resourceIDs', $logged_ids);
            }


            if ($is_image) {
                $result = $Assets->get_resize_profile($Asset->id(), $width, $height, ($crop?'1':'0'), false, $density);
                if ($result) {
                    echo $result['web_path'];
                }else{
                    echo $Asset->web_path();
                }
                exit;
            }else{
                echo $Asset->web_path();
                exit;
            }

            
        }
       
    }

    echo 'FAIL';