"use client";

import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/use-disclosure";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Input } from "@nextui-org/react";
import PrimaryFormButton from "../shared/PrimaryFormButton";
import { toast } from "sonner";
import { updateUserAction } from "@/app/(dashboard)/users/actions";
import { useRouter } from "next/navigation";
import User from "@/utils/types/user";

export function EditUserButton({
  id,
  email,
  name,
  surname,
  phone,
}: {
  id: string;
  email: string;
  name: string;
  surname: string;
  phone: string;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  const updateUser = async (formData: FormData, closeModal: () => void) => {
    const data = {
      id: id,
      email: formData.get("email") as string,
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      surname: formData.get("surname") as string,
    };

    try {
      await updateUserAction({
        id: data.id,
        email: data.email,
        name: data.name,
        phone: data.phone,
        surname: data.surname,
      });
      closeModal();
      router.refresh();
      toast.success("Utilizatorul a fost modificat cu succes.");
    } catch (e) {
      toast.error(
        "Am intampinat o eroare la modificarea utilizatorului. Te rugam sa incerci mai tarziu."
      );
    }
  };

  return (
    <>
      <Button onPress={onOpen} variant="flat" size="sm" color="primary">
        Modifica
      </Button>
      <Modal
        placement="top-center"
        size="3xl"
        closeButton={null}
        className="p-5"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modifica informatiile utilizatorului
              </ModalHeader>
              <ModalBody>
                <form
                  action={(event) => updateUser(event, onClose)}
                  className="flex flex-col gap-4 mb-5 h-full w-full justify-center"
                >
                  <Input
                    name="name"
                    label="Prenumele"
                    size="md"
                    radius="sm"
                    type="text"
                    defaultValue={name}
                    autoFocus
                    required
                  />
                  <Input
                    name="surname"
                    label="Nume de familie"
                    size="md"
                    radius="sm"
                    defaultValue={surname}
                    type="text"
                    autoFocus
                    required
                  />
                  <Input
                    name="phone"
                    label="Nr. de telefon"
                    size="md"
                    radius="sm"
                    defaultValue={phone}
                    type="text"
                    autoFocus
                    required
                  />
                  <Input
                    name="email"
                    type="email"
                    label="Email"
                    defaultValue={email}
                    size="md"
                    radius="sm"
                    required
                  />
                  <PrimaryFormButton color="primary" label="Editează" />
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
