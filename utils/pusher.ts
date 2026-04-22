import Pusher from "pusher";

const appId = process.env.APP_ID as string;
const key = process.env.APP_KEY as string;
const secret = process.env.APP_SECRET as string;
const cluster = process.env.APP_CLUSTER as string;

export const pusher = new Pusher({
  appId: appId,
  key: key,
  secret: secret,
  cluster: cluster,
  useTLS: true,
});
