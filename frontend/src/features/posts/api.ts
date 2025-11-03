import { api } from "../../lib/api";
export const fetchPosts = async () => (await api.get("/posts")).data;
export const deletePost = async (id: number) => (await api.delete(`/posts/${id}`)).data;
