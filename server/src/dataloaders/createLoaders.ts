import { fileLinkLoader } from "./fileLinkLoader";
import { filesLoader } from "./filesLoader";
import { imageLinksLoader } from "./imageLinksLoader";
import { imagesLoader } from "./imagesLoader";
import { recipientLoader } from "./recipientLoader";
import { senderLoader } from "./senderLoader";

export const createLoaders = () => {
  return {
    recipient: recipientLoader(),
    sender: senderLoader(),
    images: imagesLoader(),
    files: filesLoader(),
    fileLink: fileLinkLoader(),
    imageLinks: imageLinksLoader(),
  };
};
