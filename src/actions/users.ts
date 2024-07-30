'use server';

import { firebaseServerApp } from '@/lib/firebase/server';
import User from '@/utils/types/user';
import { getFirestore } from 'firebase-admin/firestore';

export async function getAllUsersAction(): Promise<User[]> {
	const db = getFirestore(firebaseServerApp);
	const response = await db.collection('users').get();
	const users = response.docs.map((doc: any) => doc.data()) as User[];

	return users;
}
