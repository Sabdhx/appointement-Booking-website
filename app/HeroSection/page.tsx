import FormComponent from "./formComponent/FormComponent";

function page() {
  async function handleSubmit(formData: FormData) {
    "use server";
    const input = formData.get("Input");
    console.log("✅ Server received input:", input);
    // You can now save this to a DB or do anything server-side
  }

  return (
    <div className="text-center">
      <div className="mt-[30vh]">
        <h1 className="text-[50px] font-bold">
          Universal Appointment Booking System
        </h1>
        <FormComponent handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default page;
