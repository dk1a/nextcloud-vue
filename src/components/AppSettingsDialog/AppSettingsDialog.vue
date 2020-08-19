<!--
 - @copyright Copyright (c) 2020 Marco Ambrosini <marcoambrosini@pm.me>
 -
 - @author Marco Ambrosini <marcoambrosini@pm.me>
 -
 - @license GNU AGPL version 3 or any later version
 -
 - This program is free software: you can redistribute it and/or modify
 - it under the terms of the GNU Affero General Public License as
 - published by the Free Software Foundation, either version 3 of the
 - License, or (at your option) any later version.
 -
 - This program is distributed in the hope that it will be useful,
 - but WITHOUT ANY WARRANTY; without even the implied warranty of
 - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 - GNU Affero General Public License for more details.
 -
 - You should have received a copy of the GNU Affero General Public License
 - along with this program. If not, see <http://www.gnu.org/licenses/>.
 -
 -->

<script>
import Modal from '../Modal'
import { emit, subscribe, unsubscribe } from '@nextcloud/event-bus'
import isMobile from '../../mixins/isMobile'

export default {

	name: 'AppSettingsDialog',

	components: {
		Modal,
	},

	mixins: [isMobile],

	data() {
		return {
			open: true,
		}
	},

	computed: {

		content() {
			return document.querySelector()
		},

		showNavigation() {
			if (isMobile) {
				return false
			} else return 0
		},
	},

	mounted() {
		subscribe('toggle-settings', this.toggleSettings)
		// Emit an event with the initial state of the settings
		emit('settings-toggled', {
			open: this.open,
		})
	},

	methods: {

		/**
		 * Toggle the settings dialog
		 *
		 * @param {Boolean} [bool] set the state instead of inverting the current one
		 */
		toggleSettings(bool) {
			this.open = bool
			const bodyStyles = getComputedStyle(document.body)
			const animationLength = parseInt(bodyStyles.getPropertyValue('--animation-quick')) || 100
			setTimeout(() => {
				emit('settings-toggled', {
					open: this.open,
				})
				// We wait for 1.5 times the animation length to give the animation time to really finish.
			}, 1.5 * animationLength)
		},

		/**
		 * Builds the settings navigation menu
		 * @param {object} slots The default slots object passed from the render function.
		 * @returns {array} the navigation items
		 */
		getSettingsNavigation(slots) {
			// Array of navigationitems strings
			const navigationItems = slots.filter(vNode => vNode.componentOptions).map(vNode => vNode.componentOptions.propsData.sectionTitle)
			// Check for the uniqueness of section titles
			navigationItems.forEach((element, index) => {
				const newArray = [...navigationItems]
				newArray.splice(index, 1)
				if (newArray.indexOf(element) !== -1) {
					throw new Error(`Duplicate section title found: ${element}. Settings navigation sections must have unique section titles.`)
				}
			})
			return navigationItems
		},

		/**
		 * Scrolls the content to the selected settings section.absolute
		 * @param {string} item the name of the section
		 */
		handleSettingsNavigationClick(item) {

		},
	},

	render(createElement) {

		const createListElemtent = (item) => createElement('li', { attrs: {
			class: 'navigation-list__item',
		} }, [ createElement('a', {
			attrs: {
				href: '#',
				class: 'link',
			},
			on: {
				click: this.handleSettingsNavigationClick(item),
			} }, item)])

		return createElement('Modal', {
			attrs: {
				open: true,
			},
		}, [
			createElement('div', {
				attrs: {
					class: 'app-settings',
				},
			}, [
				createElement('div', {
					attrs: {
						class: 'app-settings__navigation',
					},
				}, [ createElement('ul', {
					attrs: {
						class: 'navigation-list',
					},
				}, this.getSettingsNavigation(this.$slots.default).map(item => {
					console.debug('item: ' + item)
					return createListElemtent(item)
				}))]),
				createElement('div', { attrs: {
					class: 'app-settings__content',
				} }, this.$slots.default),
			]),
		])
	},

	unmounted() {
		unsubscribe('toggle-settings', this.toggleSettings)
	},

}

</script>

<style lang="scss" scoped>
.app-settings {
	padding:8px;
	display: flex;
	height: 600px;
	width: 100%;
	&__navigation {
		width: 200px;
		margin-right: 20px;
	}
	&__content {
		width: 400px;
	}
}

.navigation-list {
	&__item {
		height: 44px;
		margin: 4px;
		line-height: 44px;
		border-radius: var(--border-radius-pill);
		font-weight: bold;
		padding: 0 20px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		cursor: pointer;
		&:hover, &:focus {
			background-color: var(--color-background-hover)
		}
		&:active {
			background-color: var(--color-primary-active);
			color: var(--color-primary-text);
		}
	}
}
</style>
