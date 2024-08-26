"use client";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/modal";
import { Input } from "@nextui-org/react";
import PrimaryFormButton from "@/components/shared/PrimaryFormButton";
import { toast } from "sonner";
import { createInstagramPostAction } from "@/app/(dashboard)/instagram/actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function CreateInstagramButton() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  const createInstagramPost = async (
    formData: FormData,
    closeModal: () => void
  ) => {
    if (!imageFile) {
      toast.error("Te rugam sa adaugi o imagine.");
      return;
    }

    formData.append("image", imageFile);

    try {
      await createInstagramPostAction({
        data: formData,
      });
      closeModal();
      setImageFile(null);
      router.refresh();
      toast.success("Promoția a fost creată cu succes.");
    } catch (e) {
      console.log(e);
      toast.error("Am întâmpinat o eroare. Te rugăm să încerci mai târziu.");
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
        Creeaza
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
                Creeaza o postare Instagram
              </ModalHeader>
              <ModalBody>
                <form
                  action={(event) => createInstagramPost(event, onClose)}
                  className="flex flex-col gap-4 mb-5 h-full w-full justify-center"
                >
                  <Input
                    size="md"
                    radius="sm"
                    autoFocus
                    name="url"
                    label="Url-ul postarii"
                    placeholder="https://www.instagram.com/p/..."
                    required
                    isRequired
                    type="text"
                  />

                  <div className="w-full">
                    <input
                      type="file"
                      hidden={true}
                      id="logo_image"
                      onChange={(event) => {
                        if (event.target.files?.length) {
                          setImageFile(event.target.files[0]);
                        }
                      }}
                    />
                    <small>Imagine</small>
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById("logo_image")?.click()
                      }
                      className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 h-80 text-center hover:border-gray-400 focus:outline-none"
                    >
                      {imageFile ? (
                        <img
                          alt="Cover image"
                          src={URL.createObjectURL(imageFile!)}
                          className="w-full h-full object-contain rounded-lg"
                        />
                      ) : (
                        <span className="mt-2 block text-sm font-semibold text-gray-900">
                          Adaugă o imagine
                        </span>
                      )}
                    </button>
                  </div>

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
