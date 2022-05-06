<?php
/**
 * Plugin Name:       Share on Twitter Block
 * Description:       A Gutenberg block that lets you easily create tweetable content for your readers.
 * Plugin URI:        https://richtabor.com/share-on-twitter-block?utm_source=wp-plugins&utm_medium=share-on-twitter-block&utm_campaign=plugin-uri
 * Requires at least: 5.7
 * Requires PHP:      7.0
 * Version:           0.2.5
 * Author:            RichTabor.com
 * Author URI:        https://richtabor.com/?utm_source=wp-plugins&utm_medium=share-on-twitter-block&utm_campaign=author-uri
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       share-on-twitter-block
 *
 * @package           tabor/share-on-twitter-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/
 */
function sotb_share_on_twitter_block_init() {
	register_block_type_from_metadata( __DIR__ );
}
add_action( 'init', 'sotb_share_on_twitter_block_init' );
