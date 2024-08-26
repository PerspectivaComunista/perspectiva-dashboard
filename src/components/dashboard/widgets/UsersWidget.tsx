const { getFirestore } = require("firebase-admin/firestore");
import { firebaseServerApp } from "@/lib/firebase/server";
import DashboardCard from "../DashboardCard";
import Link from "next/link";
import Image from "next/image";
import DashboardCardTable from "../DashboardCardTable";
import User from "@/utils/types/user";
import capitalizeString from "@/utils/functions/capitalizeString";

export const revalidate = 0;

// const getUsers = async (): Promise<User[]> => {
// 	const db = getFirestore(firebaseServerApp);
// 	const response = await db.collection('users').get();
// 	const users = response.docs.map((doc: any) => doc.data()) as User[];
// 	users.sort((a, b) => b.created_at.toMillis() - a.created_at.toMillis());

// 	return users;
// };

export default async function UsersWidget() {
  // const users = await getUsers();

  // const rows = users.slice(0, 5).map((user) => ({
  // 	key: user.id,
  // 	name: capitalizeString(user.name) + ' ' + capitalizeString(user.surname),
  // 	email: user.email,
  // }));

  // const columns = [
  // 	{
  // 		key: 'name',
  // 		label: 'Nume',
  // 	},
  // 	{
  // 		key: 'email',
  // 		label: 'Email',
  // 	},
  // ];
  return (
    <DashboardCard large>
      {/* <Link href="/users" className="flex justify-between items-center mb-2">
				<div className="flex flex-col">
					<h3 className="text-md font-medium">Utilizatori</h3>
					<small className="text-xs text-gray-400">
						{users.length} {users.length === 1 ? 'utilizator' : 'utilizatori'}
					</small>
				</div>
				<Image src="/icons/forward.png" alt="forward" width={36} height={36} />
			</Link>
			<DashboardCardTable rows={rows} columns={columns} /> */}
    </DashboardCard>
  );
}
