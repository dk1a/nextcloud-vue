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

<!--
<template>
	<Modal
		v-if="modal"
		size="full">
		<div class="app-settings">
			<nav v-if="!isMobile"
				class="app-settings__navigation">
				<template v-for="section in sections">
					<h3 :key="section.name">
						{{ section.name }}
					</h3>
				</template>
			</nav>
			<div class="app-settings__content">
				<slot />
			</div>
		</div>
	</Modal>
</template>
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
	},

	render(createElement) {

		return createElement(Modal, {
			attrs: {
				open: true,
			},
		},
		createElement('div', {
			attrs: {
				class: 'app-settings',
			},
		}, [
			createElement('div', { attrs: {
				class: 'app-settings__navigation',
			} }, 'test1'),
			createElement('div', { attrs: {
				class: 'app-settings__content',
			} }, 'test2'),
		]),
		)
	},

	unmounted() {
		unsubscribe('toggle-settings', this.toggleSettings)
	},

}
</script>

<style lang="scss" scoped>

</style>
