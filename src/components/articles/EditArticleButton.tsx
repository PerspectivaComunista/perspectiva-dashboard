// "use client";

// import { Button } from "@nextui-org/button";
// import { useDisclosure } from "@nextui-org/use-disclosure";
// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
// } from "@nextui-org/modal";
// import { Input } from "@nextui-org/react";
// import PrimaryFormButton from "../shared/PrimaryFormButton";
// import { toast } from "sonner";
// import { updateArticlePostAction } from "@/app/(dashboard)/articles/actions";
// import { useRouter } from "next/navigation";
// import Article from "@/utils/types/article";

// export function EditArticleButton({
//   author,
//   coverUrl,
//   text,
//   title,
//   id,
// }: {
//   author: string;
//   coverUrl: string;
//   text: string;
//   title: string;
//   id: string;
// }) {
//   const { isOpen, onOpen, onOpenChange } = useDisclosure();
//   const router = useRouter();

//   const updateArticle = async (formData: FormData, closeModal: () => void) => {
//     const data = {
//       id: id,
//       author: formData.get("author") as string,
//       text: formData.get("text") as string,
//       title: formData.get("title") as string,
//       coverUrl: formData.get("coverUrl") as string,
//     };

//     try {
//       await updateArticlePostAction({
//         id: data.id,
//         author: data.author,
//         text: data.text,
//         title: data.title,
//         coverUrl: data.coverUrl,
//       });
//       closeModal();
//       router.refresh();
//       toast.success("Articolul a fost modificat cu succes.");
//     } catch (e) {
//       toast.error(
//         "Am intampinat o eroare la modificarea articolului. Te rugam sa incerci mai tarziu."
//       );
//     }
//   };

//   return (
//     <>
//       <Button onPress={onOpen} variant="flat" size="sm" color="primary">
//         Modifica
//       </Button>
//       <Modal
//         placement="top-center"
//         size="3xl"
//         closeButton={null}
//         className="p-5"
//         isOpen={isOpen}
//         onOpenChange={onOpenChange}
//       >
//         <ModalContent>
//           {(onClose) => (
//             <>
//               <ModalHeader className="flex flex-col gap-1">
//                 Modifica informatiile articolului
//               </ModalHeader>
//               <ModalBody>
//                 <form
//                   action={(event) => updateArticle(event, onClose)}
//                   className="flex flex-col gap-4 mb-5 h-full w-full justify-center"
//                 >
//                   <Input
//                     name="name"
//                     label="Prenumele"
//                     size="md"
//                     radius="sm"
//                     type="text"
//                     defaultValue={name}
//                     autoFocus
//                     required
//                   />

//                   <PrimaryFormButton color="primary" label="Editează" />
//                 </form>
//               </ModalBody>
//             </>
//           )}
//         </ModalContent>
//       </Modal>
//     </>
//   );
// }
