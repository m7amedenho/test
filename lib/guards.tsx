import { notFound } from "next/navigation";

/** بديل بسيط لا يخترع محتوى */
export function notFoundText(message = "هذا المحتوى غير متاح حاليًا — سيظهر فور توفره في نظام إدارة المحتوى.") {
  notFound();
  return <p className="container-site py-20 text-center text-sm text-ink/50">{message}</p>;
}
