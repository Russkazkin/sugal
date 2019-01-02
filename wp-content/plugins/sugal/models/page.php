<?php
function gallery_page_render($pages){
    $pages_arr = explode(',', $pages);
    $galleries = [];
    foreach ($pages_arr as $key => $page){
        $page = trim($page);
        $galleries[$key] = array(
            'id' => $page,
            'gallery' => get_post_gallery($page, false),
            'title' => get_the_title($page),
            'location' => get_post_meta($page, 'location', true),
            'description' => get_post_meta($page, 'description', true),
        );
    }
    include_once (WP_PLUGIN_DIR . '/sugal/views/page.tpl.php');
    return gallery_page_tpl($galleries);
    // print_r($galleries);
}