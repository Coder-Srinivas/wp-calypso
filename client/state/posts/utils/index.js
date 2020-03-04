export { appendToPostEditsLog } from 'state/posts/utils/append-to-post-edits-log';
export { applyPostEdits } from 'state/posts/utils/apply-post-edits';
export { getDeserializedPostsQueryDetails } from 'state/posts/utils/get-deserialized-posts-query-details';
export { getEditedTime } from 'state/posts/utils/get-edited-time';
export { getEditURL } from 'state/posts/utils/get-edit-url';
export { getFeaturedImageId } from 'state/posts/utils/get-featured-image-id';
export { getNormalizedPostsQuery } from 'state/posts/utils/get-normalized-posts-query';
export { getPagePath } from 'state/posts/utils/get-page-path';
export { getPermalinkBasePath } from 'state/posts/utils/get-permalink-base-path';
export { getPreviewURL } from 'state/posts/utils/get-preview-url';
export { getSerializedPostsQuery } from 'state/posts/utils/get-serialized-posts-query';
export { getSerializedPostsQueryWithoutPage } from 'state/posts/utils/get-serialized-posts-query-without-page';
export { getTermIdsFromEdits } from 'state/posts/utils/get-term-ids-from-edits';
export { getVisibility } from 'state/posts/utils/get-visibility';
export { isAuthorEqual } from 'state/posts/utils/is-author-equal';
export { isBackDated } from 'state/posts/utils/is-back-dated';
export { isBackDatedPublished } from 'state/posts/utils/is-back-dated-published';
export { isDateEqual } from 'state/posts/utils/is-date-equal';
export { isDiscussionEqual } from 'state/posts/utils/is-discussion-equal';
export { isFutureDated } from 'state/posts/utils/is-future-dated';
export { isPage } from 'state/posts/utils/is-page';
export { isPending } from 'state/posts/utils/is-pending';
export { isPrivate } from 'state/posts/utils/is-private';
export { isPublished } from 'state/posts/utils/is-published';
export { isScheduled } from 'state/posts/utils/is-scheduled';
export { isStatusEqual } from 'state/posts/utils/is-state-equal';
export { isTermsEqual } from 'state/posts/utils/is-terms-equal';
export { mergePostEdits } from 'state/posts/utils/merge-post-edits';
export {
	areAllMetadataEditsApplied,
	getUnappliedMetadataEdits,
} from 'state/posts/utils/metadata-edits';
export { normalizePostForApi } from 'state/posts/utils/normalize-post-for-api';
export { normalizePostForDisplay } from 'state/posts/utils/normalize-post-for-display';
export { normalizePostForEditing } from 'state/posts/utils/normalize-post-for-editing';
export { normalizePostForState } from 'state/posts/utils/normalize-post-for-state';
export { normalizeTermsForApi } from 'state/posts/utils/normalize-terms-for-api';
export { removeSlug } from 'state/posts/utils/remove-slug';
export { userCan } from 'state/posts/utils/user-can';