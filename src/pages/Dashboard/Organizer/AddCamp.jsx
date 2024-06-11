import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { imageUpload } from "../../../api/utils";
import AddCampForm from "../../../components/Form/AddCampForm";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddCamp = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState();
  const [imageText, setImageText] = useState("Upload Image");

  //Date range handler

  const { mutateAsync } = useMutation({
    mutationFn: async (campData) => {
      const { data } = await axiosSecure.post(`/camps`, campData);
      return data;
    },
    onSuccess: () => {
      console.log("Data Saved Successfully");
      toast.success("Camp Added Successfully!");
      navigate("/dashboard/manage-camps");
      setLoading(false);
    },
  });

  //   Form handler
  const handleSubmitCamp = async (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const camp_name = form.campName.value;
    const image = form.image.files[0];
    const camp_fees = form.campFees.value;
    const date = form.date.value;
    const time = form.time.value;
    const location = form.location.value;
    const healthcare_professional = form.healthcareProfessionalName.value;
    const participant_count = form.participantCount.value;
    const description = form.description.value;

    try {
      const image_url = await imageUpload(image);

      const campData = {
        camp_name,
        image: image_url,
        camp_fees,
        date,
        time,
        location,
        healthcare_professional,
        participant_count,
        description,
      };
      console.log(campData);
      await mutateAsync(campData);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  //   handle image change
  const handleImage = (image) => {
    setImagePreview(URL.createObjectURL(image));
    setImageText(image.name);
  };

  return (
    <>
      <Helmet>
        <title>Add Room | Dashboard</title>
      </Helmet>

      <AddCampForm
        handleSubmitCamp={handleSubmitCamp}
        handleImage={handleImage}
        imagePreview={imagePreview}
        imageText={imageText}
        loading={loading}
      />
    </>
  );
};

export default AddCamp;
