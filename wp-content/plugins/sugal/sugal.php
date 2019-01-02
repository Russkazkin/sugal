<?php
/**
 * Plugin Name: Sugal
 * Description: Шорткод
 */
add_shortcode('sugal', 'sugal_init');
function sugal_init($attr){

    include_once (WP_PLUGIN_DIR . '/sugal/models/page.php');

    $attr = shortcode_atts( array(
        'pages' => null,
    ), $attr );

    if ($attr['pages']){
        return gallery_page_render($attr['pages']);
    }else{
        return 'Параметры шорткода не заданы!';
    }
}

add_action('wp_enqueue_scripts', 'sugal_styles_and_scripts');
function sugal_styles_and_scripts(){
    wp_enqueue_style('fotorama-style', WP_PLUGIN_URL . '/sugal/libs/fotorama/fotorama.css');
    wp_enqueue_script('fotorama-script', WP_PLUGIN_URL . '/sugal/libs/fotorama/fotorama.js', array('jquery'));
    wp_enqueue_style('sugal-style', WP_PLUGIN_URL . '/sugal/css/sugal.css');
    wp_enqueue_script('sugal-script', WP_PLUGIN_URL . '/sugal/js/sugal.js', array('jquery'));
}

include_once (WP_PLUGIN_DIR . '/sugal/models/ajax.php');

add_action('admin_menu', 'register_sugal_submenu');

function register_sugal_submenu() {
    add_submenu_page( 'tools.php', 'Настройки галереи Sugal', 'Sugal', 'manage_options', 'sugal-submenu', 'sugal_submenu_callback' );
}

function sugal_submenu_callback() {
    // контент страницы
    echo '<div class="wrap">';
    echo '<h2>'. get_admin_page_title() .'</h2>';
    echo '</div>';
}