/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies.
 */
import TwitterIcon from './icons';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( { attributes } ) {
	const {
		content,
		cta,
		icon,
		username,
		hashtags,
		textAlign,
		permalink,
	} = attributes;

	const className = classnames( {
		[ `has-text-align-${ textAlign }` ]: textAlign,
	} );

	const usernameParam = username
		? `&via=${ username }&related=${ username }`
		: '';

	const hashtagsParam = hashtags ? `&hashtags=${ hashtags }` : '';

	const intentURL = `https://twitter.com/intent/tweet?text=${ encodeURIComponent(
		content
	) }&url=${ permalink }${ usernameParam }${ hashtagsParam }`;

	return (
		<div { ...useBlockProps.save( { className } ) }>
			<RichText.Content
				value={ content }
				tagName="a"
				href={ intentURL }
				className="wp-block-tabor-share-on-twitter__content"
			/>
			<div className="wp-block-tabor-share-on-twitter__cta">
				<RichText.Content
					value={ cta }
					tagName="a"
					href={ intentURL }
					className="wp-block-tabor-share-on-twitter__cta-text"
				/>
				{ icon !== 0 && (
					<span className="wp-block-tabor-share-on-twitter__cta-icon">
						<TwitterIcon level={ icon } />
					</span>
				) }
			</div>
		</div>
	);
}
