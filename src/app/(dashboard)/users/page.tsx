// const { getFirestore } = require("firebase-admin/firestore");
// const { getAuth } = require("firebase-admin/auth");
// import { firebaseServerApp } from "@/lib/firebase/server";
// import DashboardTable from "@/components/dashboard/DashboardTable";
// import formatDate from "@/utils/functions/formatIsoString";
// import { EditUserButton } from "@/components/users/EditUserButton";
// import { DeleteUserButton } from "@/components/users/DeleteUserButton";
// import { cookies } from "next/headers";
// import { Metadata } from "next";
// import capitalizeString from "@/utils/functions/capitalizeString";
// import User from "@/utils/types/user";

// export const revalidate = 0;

// export const metadata: Metadata = {
//   title: "Perspectiva Comunistă - Utilizatori",
// };

// const getUsers = async (): Promise<User[]> => {
//   const db = getFirestore(firebaseServerApp);
//   const response = await db.collection("users").get();
//   const users = response.docs.map((doc: any) => doc.data()) as User[];
//   users.sort((a, b) => b.created_at.toMillis() - a.created_at.toMillis());

//   return users;
// };

// const getCurrentUID = async () => {
//   const auth = getAuth(firebaseServerApp);
//   const token = cookies().get("__sessionPerspectivaDashboard");
//   if (!token) return null;
//   const { uid } = await auth.verifySessionCookie(token.value);
//   return uid;
// };

// export default async function Page() {
//   const users = await getUsers();
//   const currentUID = await getCurrentUID();

//   const rows = users.map((user) => ({
//     key: user.id,
//     name: capitalizeString(user.name) + " " + capitalizeString(user.surname),
//     email: user.email,
//     phone: user.phone,
//     created_at: formatDate(user.created_at),
//     actions: (
//       <div className="flex justify-end gap-2">
//         <EditUserButton
//           id={user.id}
//           name={user.name}
//           surname={user.surname}
//           email={user.email}
//           phone={user.phone}
//         />
//         <DeleteUserButton id={user.id} isCurrentUser={user.id === currentUID} />
//       </div>
//     ),
//   }));

//   const columns = [
//     {
//       key: "name",
//       label: "Nume",
//     },
//     {
//       key: "email",
//       label: "Email",
//     },
//     {
//       key: "phone",
//       label: "Telefon",
//     },
//     {
//       key: "created_at",
//       label: "Data înregistrării",
//     },
//     {
//       key: "actions",
//       label: "",
//     },
//   ];
//   return (
//     <div
//       className={
//         "animate-appearance-in mx-auto my-[40px] max-w-[1000px] rounded-xl bg-white px-5 py-3 shadow-xl"
//       }
//     >
//       <h3 className="text-md mt-4 font-medium">
//         Total: {users.length}{" "}
//         {users.length === 1 ? "utilizator" : "utilizatori"}
//       </h3>
//       <DashboardTable rows={rows} columns={columns} />
//     </div>
//   );
// }
