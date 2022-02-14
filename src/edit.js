/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	BlockControls,
	RichText,
	AlignmentControl,
} from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import IconDropdown from './dropdown-icon';
import UsernameDropdown from './dropdown-username';
import HashtagDropdown from './dropdown-hashtag';
import TwitterIcon from './icons';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
function ShareOnTwitterBlock( {
	mergeBlocks,
	setAttributes,
	onReplace,
	attributes,
	postLink,
} ) {
	const {
		content,
		cta,
		icon,
		username,
		hashtags,
		textAlign,
		permalink,
	} = attributes;

	useEffect( () => {
		if ( permalink === undefined ) {
			setAttributes( { permalink: postLink } );
		}
	}, [ permalink ] );

	const blockProps = useBlockProps( {
		className: classnames( {
			[ `has-text-align-${ textAlign }` ]: textAlign,
		} ),
	} );

	const textParam = content ? `&text=${ encodeURIComponent( content ) }` : '';

	const usernameParam = username
		? `&via=${ username }&related=${ username }`
		: '';

	const hashtagsParam = hashtags ? `&hashtags=${ hashtags }` : '';

	const intentURL = `https://twitter.com/intent/tweet?${ textParam }&url=${ permalink }${ usernameParam }${ hashtagsParam }`;

	function onChange( attribute ) {
		return ( newValue ) => {
			setAttributes( { [ attribute ]: newValue } );
		};
	}

	return (
		<>
			<BlockControls group="block">
				<AlignmentControl
					value={ textAlign }
					onChange={ ( nextAlign ) => {
						setAttributes( { textAlign: nextAlign } );
					} }
				/>
			</BlockControls>
			<BlockControls group="other">
				<IconDropdown
					selectedIcon={ icon }
					onChange={ onChange( 'icon' ) }
				/>
				<UsernameDropdown
					attribute={ username }
					onChange={ ( nextValue ) => {
						setAttributes( { username: nextValue } );
					} }
				/>
				<HashtagDropdown
					attribute={ hashtags }
					onChange={ ( nextValue ) => {
						setAttributes( { hashtags: nextValue } );
					} }
				/>
			</BlockControls>
			<div { ...blockProps }>
				<RichText
					identifier="content"
					className="wp-block-tabor-share-on-twitter__content"
					tagName="a"
					href={ intentURL }
					value={ content }
					multiline={ false }
					onChange={ onChange( 'content' ) }
					onMerge={ mergeBlocks }
					onReplace={ onReplace }
					onRemove={ () => onReplace( [] ) }
					aria-label={
						content
							? __(
									'Share on Twitter block',
									'share-on-twitter-block'
							  )
							: __(
									'Empty block; start writing to add a Share on Twitter element',
									'share-on-twitter-block'
							  )
					}
					data-empty={ content ? false : true }
					placeholder={ __(
						'Share on Twitter text',
						'share-on-twitter-block'
					) }
					withoutInteractiveFormatting
					allowedFormats={ [] }
				/>
				<div className="wp-block-tabor-share-on-twitter__cta">
					<RichText
						identifier="cta"
						multiline={ false }
						className="wp-block-tabor-share-on-twitter__cta-text"
						tagName="a"
						value={ cta }
						href={ intentURL }
						onChange={ onChange( 'cta' ) }
						aria-label={ __( 'Call to action text' ) }
						placeholder={ __(
							'Call to action text',
							'share-on-twitter-block'
						) }
						allowedFormats={ [] }
						withoutInteractiveFormatting
						data-empty={ cta ? false : true }
						__unstableMobileNoFocusOnMount
					/>
					{ icon !== 0 && (
						<span className="wp-block-tabor-share-on-twitter__cta-icon">
							<TwitterIcon level={ icon } />
						</span>
					) }
				</div>
			</div>
		</>
	);
}

const applyWithSelect = withSelect( ( select ) => {
	const { getPermalink } = select( 'core/editor' );

	return {
		postLink: getPermalink(),
	};
} );

export default compose( [ applyWithSelect ] )( ShareOnTwitterBlock );
