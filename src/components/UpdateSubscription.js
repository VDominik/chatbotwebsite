import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function UpdateSubscription() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Retrieve query parameters using useSearchParams
  const session_id = searchParams.get("session_id");
  const email = searchParams.get("email");

  useEffect(() => {
    if (session_id && email) {
      // Call the update-subscription endpoint to store the subscription ID
      fetch("/api/update-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: session_id, email }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Subscription updated:", data);
          // Optionally, redirect to your dashboard or show a success message
          router.push("/dashboard");
        })
        .catch((err) => {
          console.error("Error updating subscription:", err);
        });
    }
  }, [session_id, email, router]);

  return <div>Processing your subscription... Please wait.</div>;
}