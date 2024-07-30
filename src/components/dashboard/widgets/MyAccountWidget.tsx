const { getFirestore } = require('firebase-admin/firestore');
const { getAuth } = require('firebase-admin/auth');
import { firebaseServerApp } from '@/lib/firebase/server';
import DashboardCard from '../DashboardCard';
import Image from 'next/image';
import { cookies } from 'next/headers';
import User from '@/utils/types/user';

export const revalidate = 0;

const getCurrentUser = async (): Promise<User | null> => {
	const auth = getAuth(firebaseServerApp);
	const token = cookies().get('__session');
	if (!token) return null;
	const { uid } = await auth.verifySessionCookie(token.value);
	const db = getFirestore(firebaseServerApp);
	const response = await db.collection('users').doc(uid).get();
	const user = response.data() as User;
	return user;
};

export default async function MyAccountWidget() {
	const user = await getCurrentUser();

	return (
		<DashboardCard>
			<div className="flex flex-col justify-between h-full">
				<div className="flex flex-col">
					<h3 className="text-md font-medium">Contul meu</h3>
					<small className="text-xs text-gray-400 capitalize">{user?.role}</small>
				</div>

				<div>
					<p className="text-xl font-bold">
						{user?.firstName} {user?.lastName}
					</p>
					<p>{user?.email}</p>
				</div>
			</div>
			<Image
				className="absolute left-1/2 translate-x-[-50%] top-1/2 translate-y-[-66%]"
				src="/logo.png"
				alt="logo"
				width={120}
				height={120}
			/>
		</DashboardCard>
	);
}
