import { create } from "zustand";
import api from "../api";

const useAPI = create((set) => ({
    video: null,
    isLoadingVideo: false,

    getVideo: async (data) => {
        try {
            set({isLoadingVideo: true})
            const res = await api.post("/api/text-to-sign", data, { responseType: "blob" } );
            set({video: res.data, isLoadingVideo: false})
            console.log(video)
        } catch (error) {
            set({isLoadingVideo: false})

        }
    }

}));

export default useAPI