import { redirect } from "next/navigation";

export default function Page() {
  // Server redirect to landing page root
  redirect("/userpage/landingpage");
}
