import Pusher from "pusher-js"
import { create } from "zustand";


type PusherStore ={
  pusherClient : Pusher
}

export const usePusherStore = create<PusherStore>((set) => ({
  pusherClient: new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_SERVER_CLUSTER!,
  }),
}));