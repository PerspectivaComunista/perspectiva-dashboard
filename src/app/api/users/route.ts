export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get('id');

	if (!id) {
		return new Response(
			JSON.stringify({
				message: 'The id parameter is required',
			}),
			{ status: 400 }
		);
	}

	const { getAuth } = await import('firebase-admin/auth');
	const { firebaseServerApp } = require('@/lib/firebase/server');

	try {
		const auth = getAuth(firebaseServerApp);
		const user = await auth.getUser(id);

		return new Response(JSON.stringify(user), { status: 200 });
	} catch (error: any) {
		if (error.code === 'auth/user-not-found') {
			return new Response(
				JSON.stringify({
					message: 'User not found',
				}),
				{ status: 404 }
			);
		}
		return new Response(JSON.stringify(error), { status: 500 });
	}
}

export async function DELETE(request: Request) {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get('id');

	if (!id) {
		return new Response(
			JSON.stringify({
				message: 'The id parameter is required',
			}),
			{ status: 400 }
		);
	}

	const { getAuth } = require('firebase-admin/auth');
	const { getFirestore } = require('firebase-admin/firestore');
	const { firebaseServerApp } = require('@/lib/firebase/server');

	try {
		const db = getFirestore(firebaseServerApp);
		const auth = getAuth(firebaseServerApp);

		await auth.deleteUser(id);

		const docRef = db.collection('users').doc(id);

		if (!(await docRef.get()).exists) {
			return new Response(
				JSON.stringify({
					message: 'User not found',
				}),
				{ status: 404 }
			);
		}

		await docRef.delete();

		return new Response(
			JSON.stringify({
				message: 'User deleted successfully',
			}),
			{ status: 200 }
		);
	} catch (error) {
		return new Response(JSON.stringify(error), { status: 500 });
	}
}
