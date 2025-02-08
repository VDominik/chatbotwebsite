"use client";

import { Suspense } from "react";
import UpdateSubscription from "../../components/UpdateSubscription";

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdateSubscription />
    </Suspense>
  );
}