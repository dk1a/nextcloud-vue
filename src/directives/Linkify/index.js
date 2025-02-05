/**
 * @author Raimund Schlüßler
 * @copyright 2020 Raimund Schlüßler <raimund.schluessler@mailbox.org>
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU AFFERO GENERAL PUBLIC LICENSE
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU AFFERO GENERAL PUBLIC LICENSE for more details.
 *
 * You should have received a copy of the GNU Affero General Public
 * License along with this library.  If not, see <http://www.gnu.org/licenses/>.
 *
 */
import linkifyStr from 'linkifyjs/string'

// Use function shorthand for same behavior on bind and update
// https://vuejs.org/v2/guide/custom-directive.html#Function-Shorthand
export const directive = function(el, binding) {
	el.innerHTML = linkifyStr(binding.value, {
		defaultProtocol: 'https',
	})
}

export default directive
