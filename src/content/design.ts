/**
 * Prototype-derived design previews (brief, rule 2; Grownz D23). The three phone renders in the
 * approved prototype's hero composite are design mockups, not app screens. Each is cropped by
 * scripts/capture-prototype.ts into public/screens/proto-*.png and shown only inside a phone
 * frame with a "Design preview" badge. Real captures from prm.linkist.ai replace them as soon as
 * the Phase 1 audit has a signed-in session.
 */
export type ProtoScreen = 'proto-home' | 'proto-profile' | 'proto-share';

export const PROTO_CAPTIONS: Record<ProtoScreen, string> = {
  'proto-home': 'Home: ICP Matches Found, a nudge about Julian at GITEX, Opportunity Radar, Network Pulse and Relationship Health',
  'proto-profile': 'A public profile page with tags, a personal Linkist address and social links',
  'proto-share': 'Share Contact: a QR code and Tap to Link',
};

export const PROTO_ALT: Record<ProtoScreen, string> = {
  'proto-home': 'Design preview of the Linkist home screen with ICP matches, a follow-up nudge, Opportunity Radar, Network Pulse and Relationship Health',
  'proto-profile': 'Design preview of a public Linkist profile page',
  'proto-share': 'Design preview of the Share Contact screen with a QR code and Tap to Link',
};

export const DESIGN_NOTE = 'Design preview from the approved prototype. Layout, copy and figures can change before the screens ship; every figure shown is an example.';
