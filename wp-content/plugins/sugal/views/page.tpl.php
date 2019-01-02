 <?php
function gallery_page_tpl($arr){
    ob_start(); ?>
    <div class="sugal-gallery">
    <?php foreach ($arr as $gallery ):?>
        <div class="sugal-gallery-thumb-wrap" data-page-id="<?= $gallery['id'];?>">
            <div class="sugal-gallery-thumb" style="background-image: url('<?= get_the_post_thumbnail_url($gallery['id'], "medium");?>')">
                <div class="sugal-gallery-thumb-label">
                    <div class="sugal-gallery-thumb-label-bg"></div>
                    <div class="sugal-gallery-thumb-label-title"><?= $gallery['title']?></div>
                    <div class="sugal-gallery-thumb-label-description"><?= $gallery['location']?> (<?= count($gallery['gallery']['src']);?> фото)</div>
                </div>
            </div>
        </div>
    <?php endforeach;?>
    </div>
    <?php return ob_get_clean();
} ?>