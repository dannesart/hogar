import mongoose from "mongoose";
const config = useRuntimeConfig();
export default async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGODB_URI || "", {
      dbName: "hogar",
    });
    console.log("DB connection established.");
  } catch (err) {
    console.error("DB connection failed.", err);
  }
};
