import React from "react";
import { Button, Checkbox, Textarea } from "@/components/ui";
import { TextField } from "@/components/ui/text-field";
import Title from "@/components/custom/Title";
import { CircleX } from "lucide-react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { askQuestionsValidationSchema } from "@/schemas/validationSchemas";

interface AskQuestionsProps {
  onClose: () => void;
}

type FormFields = Yup.InferType<typeof askQuestionsValidationSchema>;

const AskQuestions: React.FC<AskQuestionsProps> = ({ onClose }) => {
  const {
    formState: { errors, isSubmitting },
    control,
    setValue,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(askQuestionsValidationSchema),
    defaultValues: {
      keepMeUpdated: false,
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log("Data: ", data);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate the request to asking a question
    onClose();
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative bg-white rounded-[8px] md:w-[655px] w-full"
    >
      <div className="flex flex-col gap-4 max-h-[90vh] lg:max-h-none overflow-y-auto p-4 md:p-6">
        <div>
          <Title title="Ask Questions" className="!text-lg leading-6" />
        </div>
        <div className="absolute top-0 right-0 p-2 z-10">
          <CircleX
            fill="#ffffff"
            color="#252525"
            strokeWidth={2}
            className="cursor-pointer h-5 w-5 hover:opacity-70"
            onClick={onClose}
          />
        </div>
        <div className="gap-y-4 flex flex-col">
          <div className="w-full col-span-3">
            <Controller
              name="customerName"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Your Name*"
                  className="custom-textfield"
                  inputClassName="bg-white rounded-[8px] h-[44px] placeholder-[#707070] !text-gray border border-[#E1E1E1]"
                  groupClassName="border border-[#E1E1E1]"
                  placeholder="Enter your name here..."
                  name="customerName"
                  id="customerName"
                  type="text"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.customerName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.customerName.message}
              </p>
            )}
          </div>

          <div className="w-full col-span-3">
            <Controller
              name="customerEmail"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Email Address*"
                  className="custom-textfield"
                  inputClassName="bg-white rounded-[8px] h-[44px] placeholder-[#707070] !text-gray border border-[#E1E1E1] text-sm"
                  groupClassName="border border-[#E1E1E1]"
                  placeholder="Enter your email here..."
                  name="customerEmail"
                  id="customerEmail"
                  type="text"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.customerEmail && (
              <p className="text-red-500 text-xs mt-1">
                {errors.customerEmail.message}
              </p>
            )}
          </div>

          <div className="w-full col-span-3">
            <Controller
              name="customerMessage"
              control={control}
              render={({ field }) => (
                <Textarea
                  label="Message*"
                  placeholder="Type your message here..."
                  value={field.value}
                  onChange={field.onChange}
                  className="bg-white border border-[#E1E1E1]"
                />
              )}
            />
            {errors.customerMessage && (
              <p className="text-red-500 text-xs mt-1">
                {errors.customerMessage.message}
              </p>
            )}
          </div>

          <div className="w-fit hover:cursor-pointer">
            <Checkbox
              onChange={(isSelected: boolean) =>
                setValue("keepMeUpdated", isSelected)
              }
            >
              Keep me up to date on news and events.
            </Checkbox>
            {errors.keepMeUpdated && (
              <p className="text-red-500 text-xs mt-1">
                {errors.keepMeUpdated.message}
              </p>
            )}
          </div>
          <div className="flex gap-3 md:gap-4 mt-4">
            <Button
              className="w-full border !border-gray text-lg"
              size="extra-large"
              onPress={onClose}
            >
              Cancel
            </Button>
            <Button
              className="w-full text-white bg-gray text-lg"
              size="extra-large"
              type="submit"
            >
              {isSubmitting ? "Loading..." : "Send"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AskQuestions;
