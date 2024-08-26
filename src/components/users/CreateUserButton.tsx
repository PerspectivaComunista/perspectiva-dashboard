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
import { Checkbox, Input } from "@nextui-org/react";
import PrimaryFormButton from "../shared/PrimaryFormButton";
import { toast } from "sonner";
import { createUserAction } from "@/app/(dashboard)/users/actions";
import { useRouter } from "next/navigation";

export function CreateUserButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  const createUser = async (formData: FormData, closeModal: () => void) => {
    const user = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      surname: formData.get("surname") as string,
    };

    try {
      await createUserAction({
        name: user.name,
        email: user.email,
        phone: user.phone,
        surname: user.surname,
      });
      closeModal();
      router.refresh();
      toast.success("Utilizatorul a fost creat cu succes.");
    } catch (e) {
      console.log(e);
      toast.error("Am intampinat o eroare. Te rugam sa incerci mai tarziu.");
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        variant="flat"
        size="md"
        color="success"
        radius="sm"
      >
        Creeaza utilizator
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
                Creeaza un utilizator nou
              </ModalHeader>
              <ModalBody>
                <form
                  action={(event) => createUser(event, onClose)}
                  className="flex flex-col gap-4 mb-5 h-full w-full justify-center"
                >
                  <Input
                    name="name"
                    label="Prenumele"
                    size="md"
                    radius="sm"
                    type="text"
                    autoFocus
                    required
                  />
                  <Input
                    name="surname"
                    label="Nume de familie"
                    size="md"
                    radius="sm"
                    type="text"
                    autoFocus
                    required
                  />
                  <Input
                    name="phone"
                    label="Nr. de telefon"
                    size="md"
                    radius="sm"
                    type="text"
                    autoFocus
                    required
                  />
                  <Input
                    name="email"
                    type="email"
                    label="Email"
                    size="md"
                    radius="sm"
                    required
                  />

                  <PrimaryFormButton label="Creează" />
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
