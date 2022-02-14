/**
 * WordPress dependencies
 */
import {
	Dropdown,
	ToolbarButton,
	TextControl,
	SVG,
	Path,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { DOWN } from '@wordpress/keycodes';
import { Icon, check } from '@wordpress/icons';

/**
 * Constants
 */
const POPOVER_PROPS = {
	className: 'tabor-ctt-attributes-dropdown',
	isAlternate: true,
	position: 'bottom right',
};

/**
 * Dropdown for adding a username.
 */
export default function UsernameDropdown( { onChange, attribute } ) {
	const contextualLabel = attribute
		? __( 'Change username', 'share-on-twitter-block' )
		: __( 'Add username', 'share-on-twitter-block' );

	return (
		<Dropdown
			popoverProps={ POPOVER_PROPS }
			renderToggle={ ( { onToggle, isOpen } ) => {
				const openOnArrowDown = ( event ) => {
					if ( ! isOpen && event.keyCode === DOWN ) {
						event.preventDefault();
						event.stopPropagation();
						onToggle();
					}
				};

				return (
					<ToolbarButton
						aria-expanded={ isOpen }
						aria-haspopup="true"
						label={ contextualLabel }
						className="tabor-ctt-button-w-validation"
						onClick={ onToggle }
						onKeyDown={ openOnArrowDown }
						icon={
							<SVG fill="none" viewBox="0 0 24 24">
								<Path
									d="m11.9999 3.75c4.5584 0 8.2681 3.70964 8.2681 8.268v.0113c0 .0063-.0002.0126-.0005.019l.0005-.0303c0 .0143-.0004.0285-.0012.0427 0 .0029-.0002.0059-.0004.009-.1331 1.9918-1.5706 3.6125-3.2023 3.6125-.7047 0-1.3749-.3006-1.8854-.8455-.1143-.1219-.2189-.2537-.3134-.394-.6918.8014-1.7196 1.31-2.8654 1.31-2.07949 0-3.77067-1.6755-3.77067-3.7363 0-2.07948 1.69275-3.77067 3.77067-3.77067.8429 0 1.622.27785 2.2506.7468.0264-.39556.3554-.70922.7591-.70922.4213 0 .7611.34137.7611.76104v2.97205c0 .0922-.0034.1836-.0101.2741.0048.6001.1963 1.152.5284 1.5064.155.166.4165.3633.7735.3633.8179 0 1.6031-1.0215 1.6831-2.1893l.0003.0471c0-3.71903-3.0269-6.74593-6.746-6.74593-3.71899 0-6.7459 3.02534-6.7459 6.74593 0 3.7003 3.02691 6.7099 6.7459 6.7099 1.461 0 2.9064-.4854 4.0714-1.3686.3351-.2521.8127-.1894 1.068.1472.2536.3351.1863.8127-.1472 1.0664-1.4281 1.0821-3.2008 1.6771-4.9922 1.6771-4.55832 0-8.26797-3.694-8.26797-8.232 0-4.55836 3.70965-8.268 8.26797-8.268zm0 6.01936c-1.2402 0-2.2486 1.00844-2.2486 2.24864 0 1.2199 1.0084 2.2142 2.2486 2.2142 1.1729 0 2.1385-.8879 2.2399-2.0174.0003-.0786.0032-.1576.0082-.237l.0006.0402c0-1.2402-1.0085-2.24864-2.2487-2.24864z"
									fill="currentColor"
								/>
							</SVG>
						}
						showTooltip
					>
						{ attribute ? (
							<Icon
								icon={ check }
								size="14"
								className="tabor-ctt-button-w-validation__check"
							/>
						) : null }
					</ToolbarButton>
				);
			} }
			renderContent={ () => (
				<>
					<TextControl
						label={ __(
							'Twitter handle',
							'share-on-twitter-block'
						) }
						help={ __(
							'Do not include the @ symbol.',
							'share-on-twitter-block'
						) }
						value={ attribute }
						onChange={ onChange }
					/>
				</>
			) }
		/>
	);
}
