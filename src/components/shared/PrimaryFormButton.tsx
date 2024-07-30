"use client";
import { Button } from "@nextui-org/button";
import { useFormStatus } from "react-dom";

// buttons are abstracted to their own components so that useFormStatus can hook into the form and display a loading indicator

export default function Component({
  color,
  label,
  size,
}: {
  color?:
    | "success"
    | "warning"
    | "secondary"
    | "default"
    | "primary"
    | "danger"
    | undefined;
  label?: string;
  size?: "sm" | "md" | "lg";
}) {
  const { pending } = useFormStatus();
  return (
    <Button
      isLoading={pending}
      size={size ?? "lg"}
      color={color ?? "success"}
      variant="flat"
      type="submit"
      radius="sm"
    >
      {!pending && (label ?? "Continua")}
    </Button>
  );
}
