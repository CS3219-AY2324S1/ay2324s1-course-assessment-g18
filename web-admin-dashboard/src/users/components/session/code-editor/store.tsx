import { syncedStore } from "@syncedstore/core";


// Create your SyncedStore store
export const store = syncedStore({ codeTextStore: {}, fragment: "xml" });





// // Create your SyncedStore store
// export const store = syncedStore({ codeTextStore: {}, fragment: "xml" });

// // Create a document that syncs automatically using Y-WebRTC
// const doc: any = getYjsValue(store);

// export const webrtcProvider = new WebrtcProvider(`peerprep`, doc);

// export const disconnect = webrtcProvider.disconnect();
// export const connect = webrtcProvider.connect();