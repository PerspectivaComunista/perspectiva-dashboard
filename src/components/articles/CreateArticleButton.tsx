"use client";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/modal";
import { Input, Select, SelectItem } from "@nextui-org/react";
import PrimaryFormButton from "@/components/shared/PrimaryFormButton";
import { toast } from "sonner";

import {
  createArticlePostAction,
  getAuthors,
} from "@/app/(dashboard)/articles/actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Author from "@/utils/types/author";
import AddText from "../shared/AddText";

export function CreateArticleButton() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [writeText, setWriteText] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  const [selectedAuthor, setSelectedAuthor] =
    useState<string>("Selecteaza autor");

  useEffect(() => {
    const getAuthorsState = async () => {
      const authorsList = await getAuthors();
      setAuthors(authorsList);
    };
    getAuthorsState();
  }, []);

  const handleFidelityChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedAuthor(event.target.value);
  };

  const createArticlePost = async (
    formData: FormData,
    closeModal: () => void
  ) => {
    if (!imageFile) {
      toast.error("Te rugam sa adaugi o imagine.");
      return;
    }

    formData.append("image", imageFile);

    try {
      await createArticlePostAction({
        data: formData,
        author: selectedAuthor,
        writeText: writeText,
      });
      closeModal();
      setImageFile(null);
      router.refresh();
      toast.success("Articolul a fost creată cu succes.");
    } catch (e) {
      console.log(e);
      toast.error("Am întâmpinat o eroare. Te rugăm să încerci mai târziu.");
    }
  };

  console.log(writeText);

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
                Creeaza un articol
              </ModalHeader>
              <ModalBody>
                <form
                  action={(event) => createArticlePost(event, onClose)}
                  className="flex flex-col gap-4 mb-5 h-full w-full justify-center"
                >
                  <Input
                    size="md"
                    radius="sm"
                    autoFocus
                    name="title"
                    label="Title"
                    required
                    isRequired
                    type="text"
                  />

                  <Select
                    id="authorSelect"
                    value={selectedAuthor}
                    onChange={handleFidelityChange}
                    label="Autor"
                    required
                  >
                    {authors.map((author) => (
                      <SelectItem key={author.id} value={author.fullName}>
                        {author.fullName}
                      </SelectItem>
                    ))}
                  </Select>

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

                  <AddText setWriteText={setWriteText} />

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
