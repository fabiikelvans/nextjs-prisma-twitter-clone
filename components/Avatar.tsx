import React, {useCallback} from 'react';
import useUser from "@/hooks/useUser";
import {useRouter} from "next/navigation";
import Image from "next/image";

interface AvatarProps {
    userId: string;
    isLarge?: boolean;
    hasBorder?: boolean;
}
function Avatar({ userId, isLarge, hasBorder }: AvatarProps) {

    const router = useRouter();

    const { data: fetchedUser } = useUser(userId);

    const onClick = useCallback((event: any) => {
        event.stopPropagation();

        const url = `/users/${userId}`;

        router.push(url);
    }, [router, userId]);

    return (
        <div className={`
        ${hasBorder ? 'border-4 border-black' : ''}
        ${isLarge ? 'h-32' : 'h-12'}
        ${isLarge ? 'w-32' : 'w-12'}
        rounded-full hover:opacity-90 transition cursor-pointer relative
        `}>
            <Image
                src={fetchedUser?.profileImage || '/images/placeholder.png'}
                style={{ objectFit: 'cover', borderRadius: '100%'}}
                alt={'Avatar'}
                fill
                onClick={onClick}

            />
        </div>
    );
}

export default Avatar;