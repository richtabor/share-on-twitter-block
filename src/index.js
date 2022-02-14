/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { SVG, Path } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import metadata from '../block.json';
import edit from './edit';
import save from './save';
import transforms from './transforms';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( 'tabor/share-on-twitter', {
	...metadata,
	icon: (
		<SVG fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<Path
				d="m14.0092 9.07969-11.29736 3.83551c-.34868.1395-.55789.5579-.41842.9066.06974.2092.20921.4184.41842.4882l4.95132 2.0223 2.02237 4.9513c.20921.4185.62767.5579.97627.4185.2093-.0698.3487-.2093.4185-.4185l3.8355-11.29733c.1395-.41842-.0697-.83684-.4184-.90658-.1395-.06973-.279-.06973-.4882 0zm-4.25394-4.60263c-.27894-.27895-.7671-.27895-1.04605 0s-.27895.76711 0 1.04605l2.02239 2.02237c.2789.27895.7671.27895 1.046 0 .279-.27894.279-.7671 0-1.04605zm7.74084 7.74084c-.279-.279-.7672-.279-1.0461 0-.2789.2789-.2789.7671 0 1.046l2.0224 2.0224c.2789.2789.7671.2789 1.046 0 .279-.279.279-.7671 0-1.0461zm-4.1145-6.41584c0 .41842.3487.76711.6973.76711.4185 0 .7672-.34869.7672-.76711v-2.85921c0-.34868-.3487-.69737-.7672-.69737-.3486 0-.6973.34869-.6973.69737zm4.8118 3.34737c-.4184 0-.7671.34868-.7671.7671 0 .34867.3487.69737.7671.69737h2.8592c.3487 0 .6974-.3487.6974-.69737 0-.41842-.3487-.7671-.6974-.7671zm-1.7434-2.65c-.2789.27895-.2789.76711 0 1.04605.2789.27895.7671.27895 1.0461 0l2.0223-2.02237c.279-.27894.279-.7671 0-1.04605-.2789-.27895-.7671-.27895-1.046 0zm-11.43684 7.18287 8.08944-2.7894-2.7894 8.0894-1.39478-3.4868c-.06973-.2092-.20921-.3487-.41842-.4184z"
				fill="currentColor"
			/>
		</SVG>
	),
	example: {
		attributes: {
			content: __(
				'Add tweetable content for your readers to share with the Share on Twitter block by Rich Tabor.'
			),
			contentJustification: 'center',
		},
	},
	transforms,
	edit,
	save,
} );
