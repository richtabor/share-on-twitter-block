/**
 * WordPress dependencies
 */
import {
	Dropdown,
	ToolbarButton,
	FormTokenField,
	SVG,
	Path,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { DOWN } from '@wordpress/keycodes';

/**
 * Constants
 */
const POPOVER_PROPS = {
	className: 'tabor-ctt-attributes-dropdown',
	isAlternate: true,
	position: 'bottom right',
};

/**
 * Dropdown for adding hastags.
 */
export default function HashtagDropdown( { onChange, attribute } ) {
	const contextualLabel = attribute
		? __( 'Change hashtag(s)', 'share-on-twitter-block' )
		: __( 'Add hashtag(s)', 'share-on-twitter-block' );

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
							<SVG fill="none" viewBox="0 0 24 24">
								<Path
									clipRule="evenodd"
									d="m9.06486 13.8245h4.62914l1.0464-3.84325h-4.5185zm-1.73183 0 1.13025-3.84325h-2.47248c-.58649 0-.87974-.30833-.87974-.92498 0-.47003.45663-.70463 1.37072-.70463h2.444c.16086-.71636.40384-1.69161.73144-2.92576.17929-.56806.54038-.85209 1.08338-.85209.2035 0 .372.08211.5052.24549.1324.16338.1985.34436.1985.54125 0 .24716-.0804.65519-.2404 1.22242-.2715.98195-.429 1.57096-.4726 1.76869h4.4909c.2103-.74652.4968-1.74356.8613-2.99111.16-.52449.4625-.78674.9074-.78674.5186 0 .7775.2413.7775.72223 0 .41976-.2555 1.43858-.7683 3.05562h1.8056c.6292 0 .9442.23125.9442.69457 0 .64766-.3485.97189-1.0465.97189-.0921 0-.2354-.0058-.4306-.0176-.1944-.01255-.3377-.01925-.4298-.01925h-1.3523l-.982 3.84325h1.8894c.4507 0 .7683.0335.9534.1013.3209.124.4818.3704.4818.7407 0 .568-.2689.8521-.8052.8521h-2.9819l-.8328 3.0087c-.1675.599-.5127.899-1.0372.899-.5061 0-.76-.2438-.76-.7323 0-.3636.1023-.8948.3059-1.5919.284-.9694.4356-1.4972.4541-1.5835h-4.62997c-.18516.7222-.50941 1.7838-.9719 3.1846-.1793.4391-.48176.6577-.90739.6577-.49433 0-.74149-.2438-.74149-.7314 0-.2405.07122-.5898.21365-1.0465.21616-.6912.43149-1.3791.64765-2.0644h-1.76869c-.51192 0-.7683-.3058-.7683-.9166 0-.2405.10473-.4357.31503-.584.1793-.129.39462-.1935.64765-.1935z"
									fill="currentColor"
									fillRule="evenodd"
								/>
							</SVG>
						}
						showTooltip
					></ToolbarButton>
				);
			} }
			renderContent={ () => (
				<>
					<FormTokenField
						label={ __( 'Hashtag(s)', 'share-on-twitter-block' ) }
						value={ attribute }
						tokenizeOnSpace={ true }
						onChange={ onChange }
					/>
					<p className="components-form-token-field__custom-help">
						{ __(
							'Do not use the # symbol.',
							'share-on-twitter-block'
						) }
					</p>
				</>
			) }
		/>
	);
}
