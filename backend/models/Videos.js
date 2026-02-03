import mongoose from "mongoose";

const VideosSchema = new mongoose.Schema({
    _id: String,
    name: String,
    video: String,
});

export default mongoose.model(
    "Videos",
    VideosSchema,
    "videos"
);