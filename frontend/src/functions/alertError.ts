import { NotificationType, toasty } from "@/components";

export function alertError(error: any) {
  toasty({ message: `${error?.response?.data?.message}`, type: NotificationType.ERROR });
}