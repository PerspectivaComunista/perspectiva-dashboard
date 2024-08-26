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
import PrimaryFormButton from "@/components/shared/PrimaryFormButton";
import { toast } from "sonner";
import { deleteYoutubeAction } from "@/app/(dashboard)/youtube/actions";
import { useRouter } from "next/navigation";
import Post from "@/utils/types/post";

export function DeleteYoutubeButton({
  youtube,
  setDeletedYoutube,
}: {
  youtube: Post;
  setDeletedYoutube: (deleted: boolean) => void;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  const deleteOffer = async (closeModal: () => void) => {
    try {
      await deleteYoutubeAction({ id: youtube.id });
      closeModal();
      setDeletedYoutube(true);
      router.refresh();
      toast.success("Postarea a fost ștearsă cu succes.");
    } catch (e) {
      console.log(e);
      toast.error(
        "Am întâmpinat o eroare la ștergerea postarii. Te rugăm să încerci mai târziu."
      );
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        variant="flat"
        size="lg"
        color="danger"
        className="m-0 "
      >
        Șterge
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
                Șterge oferta
              </ModalHeader>
              <ModalBody>
                <form
                  action={(event) => deleteOffer(onClose)}
                  className="flex flex-col gap-4 mb-5 h-full w-full justify-center"
                >
                  <h3>
                    Esti sigur ca vrei sa stergi această ofertă? Actiunea este
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
