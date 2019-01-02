<?php
add_action('wp_head','js_variables');

function js_variables(){
    $variables = array (
        'ajax_url' => admin_url('admin-ajax.php')
    );
    echo(
        '<script type="text/javascript">window.wp_data = ' . json_encode($variables) . ';</script>'
    );
}

add_action( 'wp_ajax_get_sugal', 'get_sugal_callback' ); // For logged in users
add_action( 'wp_ajax_nopriv_get_sugal', 'get_sugal_callback' ); // For anonymous users

function get_sugal_callback(){
    $page = (int) $_POST['page'];
    if (isset($page)){
        $images_ids = get_post_gallery($page, false)['ids'];
        $images_ids_arr = explode(',', $images_ids);
        $images = [];
        foreach ($images_ids_arr as $key => $value){
            $images[$key] = wp_get_attachment_image_url($value, 'full');
        }
        $sugal = [];
        $sugal['description'] = get_post_meta($page, 'description', true);
        $sugal['images'] = $images;
        echo json_encode( array('status'=>'ok', 'sugal' => $sugal ));
    }else{
        echo json_encode( array('status'=>'request error', 'request' => $_REQUEST));
    }
    wp_die();
}