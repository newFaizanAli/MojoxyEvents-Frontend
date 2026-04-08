import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";
import { User, UserFormData } from "../../types";
import { useUsersStore } from "../../store";
import { Button, Input, Label, Radio, Switch } from "../../components/ui/forms";
import { SuspenseComp } from "../../components/shared";

const UserForm = () => {
  const [user, setUser] = useState<User | null>(null);
  const { addUser, updateUser, fetchUserById } = useUsersStore();

  const location = useLocation()
  const user_id = location.state?.user_id || null;

  const defaultValues: UserFormData = {
    name: "",
    email: "",
    role: "user",
    phone: "",
    isActive: true,
    password: "*System12345",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<UserFormData>({ defaultValues });


  useEffect(() => {
    const loadUser = async () => {
      if (!user_id) {
        setUser(null);
        reset(defaultValues);
        return;
      }

      const fetched = await fetchUserById(user_id);
      if (!fetched) return;

      setUser(fetched);

      reset({
        ...defaultValues,
        ...fetched,
      });
    };

    loadUser();
  }, [user_id]);

  const onSubmit = (data: UserFormData) => {
    const payload: Omit<User, "_id"> = { ...data };

    if (user) {
      updateUser(user._id!, payload);
      reset(defaultValues);
    } else {
      addUser(payload);
      reset(defaultValues);
    }
  };

  const formFields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
    },
    {
      name: "phone",
      label: "Phone",
      type: "text",
      required: false,
    },
  ]

  return (
    <SuspenseComp>
      <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4  lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 ">
            {user ? "Edit" : "Add"} User Information
          </h4>
          <p className="mb-6 text-sm text-gray-500  lg:mb-7">
            {user
              ? "Update user details to keep your user up-to-date."
              : "Fill the form to add a new user."}
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="custom-scrollbar h-[300px] overflow-y-auto px-2 pb-3">
            <h5 className="mb-5 text-lg font-medium text-gray-800  lg:mb-6">
              User Information
            </h5>
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              {formFields?.map((field) => (
                <div key={field.name}>
                  <Label>{field.label}</Label>
                  <Input type={field.type} {...register(field.name as keyof UserFormData,
                    { required: field.required, })}
                  />
                  {errors[field.name as keyof UserFormData] && (
                    <p className="text-red-500">
                      {errors[field.name as keyof UserFormData]?.message}
                    </p>
                  )}
                </div>
              ))}
              <div>
                <Label>Type</Label>
                <div className="flex gap-2">
                  {["user", "artist", "admin"].map((role) => (
                    <Radio
                      key={role}
                      id={`type-${role}`}
                      name="role"
                      value={role}
                      label={role.charAt(0).toUpperCase() + role.slice(1)}
                      inputRef={
                        register("role", {
                          required: "Role is required",
                        }).ref
                      }
                      onInputChange={register("role").onChange}
                      checked={watch("role") === role}
                    />
                  ))}
                </div>
                {errors.role && (
                  <p className="text-red-500">{errors.role.message}</p>
                )}
              </div>
              <div>
                <Label>Is Active</Label>
                <div className="flex gap-5 px-2">
                  <Switch
                    label={watch("isActive") ? "Active" : "Blocked"}
                    defaultChecked={watch("isActive")}
                    onChange={(value) => setValue("isActive", value)}
                  />
                </div>
                {errors.isActive && (
                  <p className="text-red-500">{errors.isActive.message}</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button size="sm" variant="primary" type="submit">
              {user ? "Update" : "Save"} User
            </Button>
          </div>
        </form>
      </div>
    </SuspenseComp>
  );
};

export default UserForm;
