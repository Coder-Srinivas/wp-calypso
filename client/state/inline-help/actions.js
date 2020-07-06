
/**
 * Internal dependencies
 */
import wpcom from 'lib/wp';
import {
	INLINE_HELP_SEARCH_REQUEST,
	INLINE_HELP_SEARCH_REQUEST_FAILURE,
	INLINE_HELP_SEARCH_REQUEST_SUCCESS,
	INLINE_HELP_SEARCH_REQUEST_API_RESULTS,
	INLINE_HELP_SET_SEARCH_QUERY,
	INLINE_HELP_SELECT_RESULT,
	INLINE_HELP_SELECT_NEXT_RESULT,
	INLINE_HELP_SELECT_PREVIOUS_RESULT,
	INLINE_HELP_CONTACT_FORM_RESET,
	INLINE_HELP_CONTACT_FORM_SHOW_QANDA,
	INLINE_HELP_POPOVER_SHOW,
	INLINE_HELP_POPOVER_HIDE,
	INLINE_HELP_SHOW,
	INLINE_HELP_HIDE,
	INLINE_HELP_SEARCH_RESET,
} from 'state/action-types';

import getContextualHelpResults from 'state/inline-help/selectors/get-contextual-help-results';
import getAdminHelpResults from 'state/inline-help/selectors/get-admin-help-results';
import { getSiteSlug } from 'state/sites/selectors';
import { getSelectedSiteId } from 'state/ui/selectors';
import 'state/inline-help/init';

/**
 * Set the search query in the state tree for the inline help.
 *
 * @param {string} searchQuery - query string to persist.
 * @returns {Function}            Action thunk.
 */
export function setInlineHelpSearchQuery( searchQuery = '' ) {
	return {
		type: INLINE_HELP_SET_SEARCH_QUERY,
		searchQuery,
	};
}

/**
 * Fetches search results for a given query string.
 * Triggers an API request. If this returns no results
 * then hard coded results are returned based on the context of the
 * current route (see `client/blocks/inline-help/contextual-help.js`).
 *
 * @param {string} searchQuery Search query
 * @returns {Function}        Action thunk
 */
export function requestInlineHelpSearchResults( searchQuery = '' ) {
	return ( dispatch, getState ) => {
		const state = getState();
		const siteSlug = getSiteSlug( state, getSelectedSiteId( state ) );
		const contextualResults = getContextualHelpResults( state );
		const helpAdminResults = getAdminHelpResults(state, searchQuery, siteSlug );

		// Ensure empty strings are removed as valid searches.
		searchQuery = searchQuery.trim();

		// If the search is empty return contextual results and exist
		// early to avoid unwanted network requests.
		if ( ! searchQuery ) {
			dispatch( {
				type: INLINE_HELP_SEARCH_RESET,
				searchResults: contextualResults,
			} );

			// Exit early
			return;
		}

		dispatch( {
			type: INLINE_HELP_SEARCH_REQUEST,
			searchQuery,
		} );

		wpcom
			.undocumented()
			.getHelpLinks( searchQuery )
			.then( ( { wordpress_support_links: searchResults } ) => {
				// Searches will either:
				//
				// 1. return results from the search API endpoint
				// ...or...
				// 2. return hard-coded results based on the current route.
				//
				// A INLINE_HELP_SEARCH_REQUEST_API_RESULTS action indicates
				// whether the search results came from the API or not. This
				// enables UI to indicate a "no results" status and indicate
				// that the results are contextual (if required).

				const hasAPIResults = !! ( searchResults && searchResults.length );

				dispatch( {
					type: INLINE_HELP_SEARCH_REQUEST_API_RESULTS,
					hasAPIResults,
				} );


				let items = [];
				if ( hasAPIResults ) {
					items = [ ...searchResults, ...helpAdminResults ];
				} else {
					items = [ ...contextualResults, ...helpAdminResults ];
				}

				dispatch( {
					type: INLINE_HELP_SEARCH_REQUEST_SUCCESS,
					searchQuery,
					searchResults: items,
				} );
			} )
			.catch( ( error ) => {
				dispatch( {
					type: INLINE_HELP_SEARCH_REQUEST_FAILURE,
					searchQuery,
					error,
				} );

				// Force reset flag for no API results
				dispatch( {
					type: INLINE_HELP_SEARCH_REQUEST_API_RESULTS,
					hasAPIResults: false,
				} );
			} );
	};
}
/**
 * Selects a specific result in the inline help results list.
 *
 * @param  {number}  resultIndex Index of the result to select
 * @returns {Function}        Action thunk
 */
export function selectResult( resultIndex ) {
	return ( dispatch ) => {
		dispatch( {
			type: INLINE_HELP_SELECT_RESULT,
			resultIndex,
		} );
	};
}

/**
 * Resets the inline contact form state.
 *
 * @returns {Function}  Action thunk
 */
export function resetInlineHelpContactForm() {
	return ( dispatch ) => {
		dispatch( {
			type: INLINE_HELP_CONTACT_FORM_RESET,
		} );
	};
}

/**
 * Shows the Q&A suggestions on the contact form.
 *
 * @returns {Function}  Action thunk
 */
export function showQandAOnInlineHelpContactForm() {
	return ( dispatch ) => {
		dispatch( {
			type: INLINE_HELP_CONTACT_FORM_SHOW_QANDA,
		} );
	};
}

/**
 * Selects the next result in the inline help results list.
 *
 * @returns {Function}        Action thunk
 */
export function selectNextResult() {
	return ( dispatch ) => {
		dispatch( {
			type: INLINE_HELP_SELECT_NEXT_RESULT,
		} );
	};
}

/**
 * Selects the previous result in the inline help results list.
 *
 * @returns {Function}        Action thunk
 */
export function selectPreviousResult() {
	return ( dispatch ) => {
		dispatch( {
			type: INLINE_HELP_SELECT_PREVIOUS_RESULT,
		} );
	};
}

export function setSearchResults( searchQuery, searchResults ) {
	return ( dispatch ) => {
		dispatch( {
			type: INLINE_HELP_SEARCH_REQUEST_SUCCESS,
			searchQuery,
			searchResults,
		} );
	};
}

export function showInlineHelpPopover() {
	return ( dispatch ) => {
		dispatch( {
			type: INLINE_HELP_POPOVER_SHOW,
		} );
	};
}

export function hideInlineHelpPopover() {
	return ( dispatch ) => {
		dispatch( {
			type: INLINE_HELP_POPOVER_HIDE,
		} );
	};
}

export function showInlineHelp() {
	return ( dispatch ) => {
		dispatch( {
			type: INLINE_HELP_SHOW,
		} );
	};
}

export function hideInlineHelp() {
	return ( dispatch ) => {
		dispatch( {
			type: INLINE_HELP_HIDE,
		} );
	};
}
