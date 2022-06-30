import emailjs from "emailjs-com";
export const serviceID = process.env.NEXT_PUBLIC_SERVICE_ID;
export const templateID = process.env.NEXT_PUBLIC_TEMPLATE_ID;
const publicKey = process.env.NEXT_PUBLIC_MAIL_PUBLIC_KEY;

export const sendEmail = async ({ name, email, message = "" }) => {
  const result = await emailjs
    .send(
      serviceID,
      templateID,
      {
        to_name: name,
        from_name: "WayruPurseManager",
        to_email: email,
        message,
      },
      publicKey
    )
    .then(
      (result) => {
        // console.log(result.text);
        return result;
      },
      (error) => {
        // console.log(error.text);
        return false;
      }
    );
  return result;
  //   emailjs.sendForm(serviceID, templateID, "wayru-team", publicKey).then(
  //     (result) => {
  //       console.log(result.text);
  //     },
  //     (error) => {
  //       console.log(error.text);
  //     }
  //   );
};
