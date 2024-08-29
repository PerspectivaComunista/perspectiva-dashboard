"use client";

import { useDisclosure } from "@nextui-org/use-disclosure";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import {
  Button,
  DatePicker,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import PrimaryFormButton from "../shared/PrimaryFormButton";
import { toast } from "sonner";
import {
  getAuthors,
  updateArticlePostAction,
} from "@/app/(dashboard)/articles/actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseStorage } from "@/lib/firebase/client";
import Article from "@/utils/types/article";
import { parseDate } from "@internationalized/date";
import AddText from "../shared/AddText";
import Author from "@/utils/types/author";

export function EditArticleButton({ article }: { article: Article }) {
  const [authors, setAuthors] = useState<Author[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [deletedArticle, setDeletedArticle] = useState(false);
  const [writeText, setWriteText] = useState(article.text);

  const [selectedAuthor, setSelectedAuthor] = useState<string>("");

  useEffect(() => {
    const getAuthorsState = async () => {
      const authorsList = await getAuthors();

      setAuthors(authorsList);

      if (authorsList.length > 0) {
        const currentAuthor = authorsList.find(
          (author) => author.id === article.author
        );

        if (currentAuthor) {
          setSelectedAuthor(currentAuthor.id);
        }
      }
    };

    getAuthorsState();
  }, [article.author]);

  const handleAuthorChange = (value: string) => {
    setSelectedAuthor(value);
  };

  const editArticle = async (formData: FormData, closeModal: () => void) => {
    if (deletedArticle) {
      closeModal();
      setDeletedArticle(false);
    }
    if (imageFile) {
      formData.append("image", imageFile);
    } else {
      formData.append("coverUrl", article.coverUrl);
    }

    try {
      await updateArticlePostAction({
        id: article.id,
        data: formData,
        writeText,
        author: selectedAuthor,
      });

      closeModal();

      setImageFile(null);
      router.refresh();
      toast.success("Locația a fost editata cu succes.");
    } catch (e) {
      console.log(e);
      toast.error("Am intampinat o eroare. Te rugam sa incerci mai tarziu.");
    }
  };

  return (
    <>
      <Button onPress={onOpen} variant="flat" size="sm" color="primary">
        Editeaza articolul
      </Button>
      <Modal
        placement="top"
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
                Editeaza
              </ModalHeader>
              <ModalBody>
                <form
                  action={(event) => editArticle(event, onClose)}
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
                    defaultValue={article.title}
                  />

                  <Select
                    id="authorSelect"
                    value={selectedAuthor}
                    onChange={(e) => handleAuthorChange(e.target.value)}
                    label="Autor"
                    required
                  >
                    {authors.map((author) => (
                      <SelectItem key={author.id} value={author.id}>
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
                      ) : article.coverUrl ? (
                        <img
                          alt="Cover image"
                          src={article.coverUrl}
                          className="w-full h-full object-contain rounded-lg"
                        />
                      ) : (
                        <span className="mt-2 block text-sm font-semibold text-gray-900">
                          Adauga o imagine
                        </span>
                      )}
                    </button>
                  </div>

                  <AddText setWriteText={setWriteText} writeText={writeText} />

                  <PrimaryFormButton label="Editează" />
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
