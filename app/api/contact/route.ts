import { Resend } from "resend";



export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "kishore@enandgate.com",
      subject: `New message from ${name}`,
      html: `
        <p><strong>Email:</strong> ${email}</p>
        <p>${message}</p>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}