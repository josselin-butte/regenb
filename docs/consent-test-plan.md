# Consent acceptance checks

Run against the newly published https://www.regenb.fr in a private window with extensions disabled. The preview is not evidence of the hosted site's behaviour.

1. Clear site data. Open Network (preserve log) and Application → Cookies, then visit `/`. Before clicking: no `regenb_consent`, optional cookie, analytics, marketing, replay, testing, iframe or optional third-party request. Self-hosted fonts and necessary photographs from `regenb.lovable.app` are allowed, as is necessary hosting security. A literal zero-third-party requirement conflicts with the existing photograph delivery; audit those requests separately for tracking.
2. Read and scroll behind the banner. Use Tab/Shift+Tab: every choice and the information link has visible focus. The three choices have identical dimensions and styling. Press the close button: a refusal cookie is saved.
3. Repeat in a fresh context at `/en`: the interface and `/en/cookies` information page are English. Switching languages does not reset a saved choice.
4. Choose Reject all. Reload and visit other pages: no banner, no optional requests, both purposes false in `regenb_consent`. Its date, version and six-calendar-month expiry are present. Acceptance has the same lifetime.
5. Fresh context → Customise: both switches OFF, necessary purposes always active. Keyboard toggle only External content, save: analytics false, external true. No provider is currently installed, so consenting does not create new third-party requests.
6. Choose Accept all: both purposes true. Footer Cookie settings reopens with the saved values. Dialog confines keyboard focus; Escape closes settings without saving edits, returning focus to the opener.
7. Withdraw a previously granted purpose and save: choice is saved, registered service teardown executes, declared accessible cookies are deleted, page reloads. Consent and necessary cookies remain. Cross-origin/HttpOnly cookies cannot be deleted by JavaScript; future integrations require provider-specific revocation support.
8. Set the cookie's JSON expiry/date to a valid expired six-month pair, or reduce its version: reload; the banner returns and both purposes default OFF.
9. Check narrow and wide viewports: readable banner, no clipped actions, square panel, page footer still reachable. Check reduced-motion and screen-reader labels.
10. Repeat the production network check after any optional provider is added. Registration must use `registerOptionalService` with a synchronous teardown and `deleteOptionalCookies`, list exact cookie names/domains/paths, disclose provider/retention, increment `CONSENT_VERSION` and narrowly update CSP. The host-injected `~flock.js` remains blocked even after acceptance; it is not an installed audience tool.

Automated coverage: `src/test/consent.test.ts`, `src/test/consent-manager.test.tsx`, `src/test/privacy.test.ts`. No external CMP, optional provider, remote iframe or new tracking is installed by the consent manager.