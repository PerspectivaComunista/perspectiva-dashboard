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
import { DatePicker, Input } from "@nextui-org/react";
import PrimaryFormButton from "@/components/shared/PrimaryFormButton";
import { toast } from "sonner";
import { updateInstagramPostAction } from "@/app/(dashboard)/instagram/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Post from "@/utils/types/post";
import Link from "next/link";
import Image from "next/image";
import { DeleteInstagramButton } from "./DeleteInstagramButton";

export function EditInstagramPostButton({ instagram }: { instagram: Post }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [deletedInstagram, setDeletedInstagram] = useState(false);

  const editInstagramPost = async (
    formData: FormData,
    closeModal: () => void
  ) => {
    if (deletedInstagram) {
      closeModal();
      setDeletedInstagram(false);
    }
    if (imageFile) {
      formData.append("image", imageFile);
    } else {
      formData.append("imageUrl", instagram.imageUrl);
    }

    try {
      await updateInstagramPostAction({
        id: instagram.id,
        createdAt: instagram.createdAt,
        data: formData,
      });

      closeModal();

      setImageFile(null);
      router.refresh();
      toast.success("Promoția a fost editată cu succes.");
    } catch (e) {
      console.log(e);
      toast.error("Am întâmpinat o eroare. Te rugăm să încerci mai târziu.");
    }
  };

  return (
    <>
      <button
        onClick={onOpen}
        className="shadow-xl relative group overflow-hidden"
      >
        <Image
          src={instagram.imageUrl}
          width={300}
          height={300}
          className="w-full object-contain"
          alt={"posts"}
          priority
        />
        <p className="text-white bg-red text-lg absolute bottom-0 py-1 pl-4 w-full transition-all duration-1000 ease-in-out transform -translate-x-full group-hover:translate-x-0">
          Vezi postarea &gt;&gt; &gt;
        </p>
      </button>

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
                Editează instagram post
              </ModalHeader>
              <ModalBody>
                <form
                  action={(event) => editInstagramPost(event, onClose)}
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
                    defaultValue={instagram.url}
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
                      ) : instagram.imageUrl ? (
                        <img
                          alt="Cover image"
                          src={instagram.imageUrl}
                          className="w-full h-full object-contain rounded-lg"
                        />
                      ) : (
                        <span className="mt-2 block text-sm font-semibold text-gray-900">
                          Selectează o imagine
                        </span>
                      )}
                    </button>
                  </div>

                  <PrimaryFormButton label="Editează" />
                  <DeleteInstagramButton
                    instagram={instagram}
                    setDeletedInstagram={setDeletedInstagram}
                  />
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
