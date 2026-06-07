import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetJobById from "@/hooks/useGetJobById";

const UpdateJob = () => {

    const params = useParams();

    useGetJobById(params.id);

    const { singleJob } = useSelector(store => store.job);

    const navigate = useNavigate();

    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: ""
    });

    const changeHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {

            const res = await axios.put(
                `${JOB_API_END_POINT}/update/${params.id}`,
                input,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            );

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {

        if (singleJob) {
            setInput({
                title: singleJob.title || "",
                description: singleJob.description || "",
                requirements: singleJob.requirements?.join(",") || "",
                salary: singleJob.salary || "",
                location: singleJob.location || "",
                jobType: singleJob.jobType || "",
                experience: singleJob.experienceLevel || "",
                position: singleJob.position || ""
            });
        }

    }, [singleJob]);

    return (
        <div>

            <Navbar />

            <div className="max-w-xl mx-auto my-10">

                <h1 className="font-bold text-2xl mb-5">
                    Update Job
                </h1>

                <form onSubmit={submitHandler}>

                    <div className="grid grid-cols-2 gap-4">

                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeHandler}
                            />
                        </div>

                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeHandler}
                            />
                        </div>

                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeHandler}
                            />
                        </div>

                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="number"
                                name="salary"
                                value={input.salary}
                                onChange={changeHandler}
                            />
                        </div>

                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeHandler}
                            />
                        </div>

                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeHandler}
                            />
                        </div>

                        <div>
                            <Label>Experience</Label>
                            <Input
                                type="number"
                                name="experience"
                                value={input.experience}
                                onChange={changeHandler}
                            />
                        </div>

                        <div>
                            <Label>Position</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeHandler}
                            />
                        </div>

                    </div>

                    <Button className="w-full mt-5">
                        Update Job
                    </Button>

                </form>

            </div>

        </div>
    );
};

export default UpdateJob;