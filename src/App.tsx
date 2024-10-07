import { Routes, Route } from "react-router-dom";
import Authlayout from "./_auth/Authlayout";
import Rootlayout from "./_root/Rootlayout";
import Signin from "./_auth/Forms/Signin";
import Signup from "./_auth/Forms/Signup";
import {
  Home,
  AllUsers,
  CreatePost,
  EditPost,
  Explore,
  PostDetails,
  Profile,
  Saved,
  UpdateProfile,
} from "./_root/Pages";
import { Toaster } from "@/components/ui/toaster";
import "./global.css";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* Public Routes */}
        <Route element={<Authlayout />}>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        {/* Private Routes */}
        <Route element={<Rootlayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;
