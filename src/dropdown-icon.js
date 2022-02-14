/**
 * WordPress dependencies
 */
import {
	Dropdown,
	Toolbar,
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { DOWN } from '@wordpress/keycodes';

/**
 * Internal dependencies
 */
import TwitterIcon from './icons';

/**
 * Constants
 */
const ICONS = [ 0, 1, 2, 3, 4 ];
const POPOVER_PROPS = {
	className: 'tabor-ctt-icon-dropdown',
	isAlternate: true,
	position: 'bottom right',
};

/**
 * Dropdown for selecting a icon.
 */
export default function IconDropdown( { selectedIcon, onChange } ) {
	const contextualLabel =
		selectedIcon !== 0
			? __( 'Change icon', 'share-on-twitter-block' )
			: __( 'Add icon', 'share-on-twitter-block' );

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
						onClick={ onToggle }
						onKeyDown={ openOnArrowDown }
						icon={
							selectedIcon !== 0 ? (
								<TwitterIcon level={ selectedIcon } />
							) : (
								<TwitterIcon level={ 1 } />
							)
						}
						showTooltip
					></ToolbarButton>
				);
			} }
			renderContent={ () => (
				<Toolbar
					className="block-library-heading-level-toolbar tabor-ctt-icon-toolbar"
					label={ contextualLabel }
				>
					<ToolbarGroup
						isCollapsed={ false }
						controls={ ICONS.map( ( targetIcon ) => {
							const isActive = targetIcon === selectedIcon;
							return {
								icon: (
									<TwitterIcon
										level={ targetIcon }
										isPressed={ isActive }
									/>
								),
								isActive,
								onClick() {
									onChange( targetIcon );
								},
							};
						} ) }
					/>
				</Toolbar>
			) }
		/>
	);
}
