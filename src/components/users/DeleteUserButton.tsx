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
import PrimaryFormButton from "../shared/PrimaryFormButton";
import { toast } from "sonner";
import { deleteUserAction } from "@/app/(dashboard)/users/actions";
import { useRouter } from "next/navigation";
import { signOutAction } from "@/app/(authentication)/authentication/actions";
import User from "@/utils/types/user";

export function DeleteUserButton({
  id,
  isCurrentUser,
}: {
  id: string;
  isCurrentUser: boolean;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  const deleteUser = async (closeModal: () => void) => {
    try {
      await deleteUserAction({ id: id });
      closeModal();
      if (isCurrentUser) {
        await signOutAction();
      }
      router.refresh();
      toast.success("Utilizatorul a fost sters cu succes.");
    } catch (e) {
      console.log(e);
      toast.error(
        "Am intampinat o eroare la stergerea utilizatorului. Te rugam sa incerci mai tarziu."
      );
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        variant="flat"
        size="sm"
        color="danger"
        className="m-0"
      >
        Sterge
      </Button>
      <Modal
        placement="top-center"
        size="xl"
        closeButton={null}
        className="p-5"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {isCurrentUser
                  ? "Sterge contul tau de utilizator"
                  : "Sterge contul de utilizator"}
              </ModalHeader>
              <ModalBody>
                <form
                  action={(event) => deleteUser(onClose)}
                  className="flex flex-col gap-4 mb-5 h-full w-full justify-center"
                >
                  <h3>
                    {isCurrentUser
                      ? "Esti sigur ca vrei sa iti stergi contul de utilizator? Vei fi deconectat. Actiunea este ireversibila."
                      : "Esti sigur ca vrei sa stergi acest utilizator? Actiunea este ireversibila."}
                  </h3>
                  <PrimaryFormButton color="danger" label="Șterge" />
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
