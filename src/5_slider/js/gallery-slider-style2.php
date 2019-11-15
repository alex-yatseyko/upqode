<?php
$gallery             = $property->get_gallery();
?>

<div id="property-gallery" class="iwp-property-gallery-slider-v2">
    <?php
    if ( count( $gallery ) > 0 ) :
        echo '<div class="iwp-flexslider slider flexslider">
                                        <ul class="slides iwp-pswp-gallery">';
        foreach ( $gallery as $key => $image_id ) :
            $image = wp_get_attachment_image_src( $image_id, 'iwp-1170-570' );
            ?>
            <li>
                <figure itemscope itemtype="http://schema.org/ImageObject">
                    <a href="<?php echo $image[0]; ?>" itemprop="contentUrl" data-size="<?php echo $image[1].'x'.$image[2] ?>">
                        <?php
                        ?>
                        <img src="<?php echo $image[0]; ?>" itemprop="thumbnail" alt="<?php echo get_the_title($image_id); ?>" />
                    </a>
                </figure>
            </li>
        <?php
        endforeach;
        echo '</ul>
                                </div>';
        echo '<div class="iwp-flexslider carousel flexslider">
                                        <ul class="slides">';
        foreach ( $gallery as $key => $image_id ) :
            $image = wp_get_attachment_image_src( $image_id, 'thumbnail' );
            $image_url = $image[0];
            ?>
            <li><img src="<?php echo $image_url; ?>" alt="<?php echo get_the_title($image_id); ?>" /></li>
        <?php
        endforeach;
        echo '</ul>
                                </div>';
    endif;
    ?>
    <div class="buttons">
        <input type="button" value="Назад" class="prev">
        <input type="button" value="Вперёд" class="next">
    </div>
</div>