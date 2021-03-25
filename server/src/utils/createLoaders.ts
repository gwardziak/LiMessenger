import { attachmentsLoader } from "./attachmentsLoader";
import { linkLoader } from "./linkLoader";
import { recipientLoader } from "./recipientLoader";
import { senderLoader } from "./senderLoader";

export const createLoaders = () => {
  return {
    recipient: recipientLoader(),
    sender: senderLoader(),
    attachments: attachmentsLoader(),
    link: linkLoader(),
  };
};
