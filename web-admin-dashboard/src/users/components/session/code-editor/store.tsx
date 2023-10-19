import { syncedStore, getYjsValue } from "@syncedstore/core";
import { WebrtcProvider } from "y-webrtc";

// (optional, define types for TypeScript)

// Create your SyncedStore store
export const store = syncedStore({ codeTextStore: {}, fragment: "xml" });

// Create a document that syncs automatically using Y-WebRTC
const doc: any = getYjsValue(store);

export const webrtcProvider = new WebrtcProvider(`peerprep`, doc);

export const disconnect = webrtcProvider.disconnect();
export const connect = webrtcProvider.connect();
