import { Suspense } from "react";
import BillClient from "./BillClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BillClient />
    </Suspense>
  );
}