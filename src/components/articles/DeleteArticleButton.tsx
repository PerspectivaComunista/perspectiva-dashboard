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
import { deleteArticlePostAction } from "@/app/(dashboard)/articles/actions";
import { useRouter } from "next/navigation";
import { signOutAction } from "@/app/(authentication)/authentication/actions";
import Article from "@/utils/types/article";

export function DeleteArticleButton({ id }: { id: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  const deleteArticle = async (closeModal: () => void) => {
    try {
      await deleteArticlePostAction({ id: id });
      closeModal();

      router.refresh();
      toast.success("Articolul a fost sters cu succes.");
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
                Sterge contul de articolul
              </ModalHeader>
              <ModalBody>
                <form
                  action={(event) => deleteArticle(onClose)}
                  className="flex flex-col gap-4 mb-5 h-full w-full justify-center"
                >
                  <h3>
                    Esti sigur ca vrei sa stergi acest articol? Actiunea este
                    ireversibila.
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
