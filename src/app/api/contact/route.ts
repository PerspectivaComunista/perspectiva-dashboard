const nodemailer = require("nodemailer");

export async function POST(request: Request) {
  const body = await request.json();
  // get the name,email and message  from the request body
  const { name, email, title, message } = body;

  // check if the name, email and message fields are valid
  if (!name) {
    return new Response(
      JSON.stringify({
        message: "The name field is required",
      }),
      { status: 400 }
    );
  }

  if (!email) {
    return new Response(
      JSON.stringify({
        message: "The email field is required",
      }),
      { status: 400 }
    );
  }

  if (!title) {
    return new Response(
      JSON.stringify({
        message: "The title field is required",
      }),
      { status: 400 }
    );
  }

  if (!message) {
    return new Response(
      JSON.stringify({
        message: "The message field is required",
      }),
      { status: 400 }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "mail.wolfdigitalmedia.ro",
      port: 465,
      secure: true,
      auth: {
        user: "iovasile@wolfdigitalmedia.ro",
        pass: "wm=6$6]JHgL$",
      },
    });

    await transporter.sendMail({
      from: `"${name}" < ${email} >`,
      to: "iovasile@wolfdigitalmedia.ro",
      subject: `Perspectiva Comunistă Mobile - Contact - ${title}`,
      text: `${message}\n\n--\n\nAcest mesaj a fost trimis din formularul de contact din aplicatia Perspectiva Comunistă Mobile.`,
    });
    return new Response(
      JSON.stringify({
        message: "The email has been sent successfully!",
      }),
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return new Response(
      JSON.stringify({
        message: `The email could not be sent. Please try again later. ${e}`,
      }),
      { status: 500 }
    );
  }
}
