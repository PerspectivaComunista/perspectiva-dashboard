'use client';
import useWindowSize from '@/utils/hooks/useWindowSize';
import { Skeleton } from '@nextui-org/react';
import { useEffect, useState } from 'react';

export default function Component({
	children,
	large,
	isLoading,
}: {
	large?: boolean;
	children?: React.ReactNode;
	isLoading?: boolean;
}) {
	const [isLarge, setIsLarge] = useState(large);

	const windowSize = useWindowSize();

	useEffect(() => {
		if (windowSize.width && windowSize.width > 680 && large) {
			setIsLarge(true);
		} else {
			setIsLarge(false);
		}
	}, [windowSize]);

	return (
		<div
			className={
				(isLarge ? 'w-[660px] ' : 'w-[320px] ') +
				'relative overflow-y-scroll overflow-x-hidden scrollbar-hide bg-white h-[320px] rounded-3xl shadow-xl hover:scale-[1.02] duration-200 ' +
				(!isLoading && 'p-4')
			}>
			{isLoading ? <Skeleton className="h-full w-full rounded-3xl bg-white" /> : children}
		</div>
	);
}
