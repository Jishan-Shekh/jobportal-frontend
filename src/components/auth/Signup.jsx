import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import bgImage from "../../assets/login.jpg";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null, // ✅ FIXED
  });

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({
      ...input,
      file: e.target.files?.[0] || null, // ✅ SAFE FIX
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    // ✅ MUST MATCH BACKEND "file"
    if (input.file instanceof File) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));

      // ❌ DO NOT set multipart headers manually
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Error");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Navbar />

      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border p-4 my-10 rounded-md"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>

          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              name="fullname"
              value={input.fullname}
              placeholder="Enter your full name here"
              onChange={changeEventHandler}
            />
          </div>

          <div className="my-2">
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Enter your email"
              value={input.email}
              onChange={changeEventHandler}
            />
          </div>

          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={input.phoneNumber}
              onChange={changeEventHandler}
            />
          </div>

          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
            />
          </div>

          <RadioGroup className="flex gap-4 my-5">
            <div className="flex items-center gap-2">
              <Input
                type="radio"
                name="role"
                value="student"
                onChange={changeEventHandler}
              />
              <Label>Student</Label>
            </div>

            <div className="flex items-center gap-2">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                onChange={changeEventHandler}
              />
              <Label>Recruiter</Label>
            </div>
          </RadioGroup>

          <div className="my-3">
            <Label>Profile</Label>
            <Input type="file" accept="image/*" onChange={changeFileHandler} />
          </div>

          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="animate-spin mr-2" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Signup
            </Button>
          )}

          <span className="text-sm">
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
