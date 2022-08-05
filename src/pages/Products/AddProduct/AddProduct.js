import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { instance } from "../../../api/axiosInstance";
import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";
import InputComponent from "../../../components/InputComponent";
import InputError from "../../../components/InputError";
import LoaderComponent from "../../../components/LoaderComponent/LoaderComponent";
import useFetchCategoryData from "../../../utils/useCategoryHook";
import classes from "./AddProduct.module.css";

const URL_VALIDATION =
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
const PRICE_VALIDATION = /^(\d+(\.\d+)?)$/;

const AddProduct = () => {
  const { categories, loading } = useFetchCategoryData();
const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = (data) => {
    const obj = {
      id: Math.random().toString(),
      developerEmail: 'anshul.gupta36@gmail.com',
      ...data,
    };
    instance.post('/products', obj);
    navigate('/');
    console.log(obj, "obj");
    console.log(JSON.stringify(data), "data");
  };
  
  if (loading) {
    return <LoaderComponent />;
  }

  return (
    <section className={classes.add_product_section}>
      <h1 className="text-center mb-5 font-bold">Create Product</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          {...register("name", {
            required: true,
          })}
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <InputComponent
              placeholder="Product Name"
              onChange={onChange}
              value={value}
              required
              name="name"
              autoFocus={true}
            />
          )}
        />
        <InputError>
          {errors.name &&
            errors.name?.type === "required" &&
            "Product name is required"}
        </InputError>
        <Controller
          {...register("description", {
            required: true,
          })}
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <InputComponent
              placeholder="Description"
              onChange={onChange}
              value={value}
              required
              name="description"
            />
          )}
        />
        <InputError>
          {errors.description &&
            errors.description?.type === "required" &&
            "Product description is required"}
        </InputError>
        <Controller
          {...register("avatar", {
            required: URL_VALIDATION ? "Enter URL" : false,
            pattern: URL_VALIDATION,
          })}
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <InputComponent
              placeholder="Image URL"
              onChange={onChange}
              value={value}
              required
              name="avatar"
            />
          )}
        />
        <InputError>
          {errors.avatar &&
            errors.avatar?.type === "pattern" &&
            "Enter correct URL"}
        </InputError>
        <Controller
          {...register("category", {
            required: true,
          })}
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <select
              value={value}
              onChange={onChange}
              placeholder="Categories"
              className="w-full"
            >
              <option value="">Categories</option>
              {categories?.map((option) => (
                <option key={option?._id} value={option?.name}>
                  {option?.name}
                </option>
              ))}
            </select>
          )}
        />
        <InputError>
          {errors.category?.type === "required" && "Category is required"}
        </InputError>

        <Controller
          {...register("price", {
            required: true,
            pattern: PRICE_VALIDATION,
          })}
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <InputComponent
              placeholder="Price"
              onChange={onChange}
              value={value}
              required
              name="price"
            />
          )}
        />
        <InputError>
          {errors.price &&
            errors.price?.type === "pattern" &&
            "Please enter a valid number"}
        </InputError>
        {console.log(errors)}
        <ButtonComponent title="Submit" type="submit" className="btn mt-4" />
      </form>
    </section>
  );
};

export default AddProduct;
