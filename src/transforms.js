/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';

const transforms = {
	to: [
		{
			type: 'block',
			blocks: [ 'core/paragraph' ],
			transform: ( { content } ) =>
				createBlock( 'core/paragraph', {
					content,
				} ),
		},
		{
			type: 'block',
			blocks: [ 'core/pullquote' ],
			transform: ( { content } ) =>
				createBlock( 'core/pullquote', {
					value: `<p>${ content }</p>`,
				} ),
		},
		{
			type: 'block',
			blocks: [ 'core/quote' ],
			transform: ( { content } ) =>
				createBlock( 'core/quote', {
					value: `<p>${ content }</p>`,
				} ),
		},
	],
	from: [
		{
			type: 'enter',
			regExp: /^::ctt$/,
			transform: () => createBlock( 'tabor/share-on-twitter' ),
		},
		{
			type: 'prefix',
			prefix: '::ctt',
			transform: ( content ) => {
				return createBlock( 'tabor/share-on-twitter', {
					content,
				} );
			},
		},
		{
			type: 'block',
			blocks: [ 'core/paragraph' ],
			transform: ( {
				content,
				align,
				fontSize,
				textColor,
				backgroundColor,
			} ) => {
				return createBlock( 'tabor/share-on-twitter', {
					content,
					textColor,
					backgroundColor,
					fontSize,
					textAlign: align,
				} );
			},
		},
		{
			type: 'block',
			blocks: [ 'core/heading' ],
			transform: ( { content } ) => {
				return createBlock( 'tabor/share-on-twitter', {
					content,
				} );
			},
		},
	],
};

export default transforms;
