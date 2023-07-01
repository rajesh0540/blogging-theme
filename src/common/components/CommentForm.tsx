import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// Components
import Button from "../components/Button";

export type CommentFormValues = {
  content: string;
  author_name: string;
  author_email: string;
  author_url: string;
};

export type CommentSubmitHandler = (comment: CommentFormValues) => void;

type CommentFormProps = {
  loading?: boolean;
  onSubmit?: CommentSubmitHandler;
};

const CommentForm: React.FC<CommentFormProps> = ({
  loading = false,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CommentFormValues>();

  const submitForm: SubmitHandler<CommentFormValues> = (data) => {
    onSubmit?.(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="my-[25px] ">
        <label className="block mb-2 text-[16px] text-gray-700">
          Comment *
        </label>
        <textarea
          {...register("content", { required: "Comment is required" })}
          className={`box-border block w-full px-4 py-2 border border-gray-300 rounded-sm  ${
            errors.content ? "border-red-500" : ""
          }`}
          id="content"
          placeholder="Something to say?"
        ></textarea>
        {errors.content && (
          <span className="text-red-600 mt-1 text-[13px]">
            {errors.content.message}
          </span>
        )}
      </div>
      <div className=" my-[25px]">
        <label className="block mb-2 text-[16px] text-gray-700">Name *</label>
        <input
          {...register("author_name", { required: "Name is required" })}
          className={`box-border block w-full px-4 py-2 border border-gray-300 rounded-sm  ${
            errors.author_name ? "border-red-500" : ""
          }`}
          id="author_name"
          placeholder="John Doe"
        />
        {errors.author_name && (
          <span className="text-red-600 mt-1 text-[13px]">
            {errors.author_name.message}
          </span>
        )}
      </div>
      <div className=" my-[25px]">
        <label className="block mb-2 text-[16px] text-gray-700">Email *</label>
        <input
          {...register("author_email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email format",
            },
          })}
          className={`box-border block w-full px-4 py-2 border border-gray-300 rounded-sm  ${
            errors.author_email ? "border-red-500" : ""
          }`}
          id="author_email"
          placeholder="johndoe@mail.com"
        />

        {errors.author_email && (
          <span className="text-red-600 mt-1 text-[13px]">
            {errors.author_email.message}
          </span>
        )}
      </div>
      <div className=" my-[25px]">
        <label className="block mb-2 text-[16px] text-gray-700">
          Website *
        </label>
        <input
          {...register("author_url", { required: "Url is required" })}
          className={`box-border block w-full px-4 py-2 border border-gray-300 rounded-sm  ${
            errors.author_url ? "border-red-500 " : ""
          }`}
          id="author_url"
          placeholder="https://www.example.com"
        />
        {errors.author_url && (
          <span className="text-red-600 mb-1 text-[13px]">
            {errors.author_url.message}
          </span>
        )}
      </div>

      {/* <Button variant="center" type="submit">
        {" "}
        {loading ? "Submitting Comment..." : "Submit"}
      </Button> */}

      <button
        type="submit"
        className="px-4 py-1 text-white rounded-md bg-primary "
        disabled={loading}
      >
        {loading ? "Submitting Comment..." : "Submit"}
      </button>
    </form>
  );
};

export default CommentForm;
