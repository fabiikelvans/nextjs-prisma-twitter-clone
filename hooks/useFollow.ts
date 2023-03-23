import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import useLoginModal from "@/hooks/useLoginModal";
import {useCallback, useMemo} from "react";
import {tr} from "date-fns/locale";
import {toast} from "react-hot-toast";
import axios from "axios";

const useFollow = (userId: string) => {
    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
    const { mutate: mutateFetchedUser } = useUser(userId);

    const loginModal = useLoginModal();

    const isFollowing = useMemo(() => {
        const list = currentUser?.followingIds || [];

        return list.includes(userId);
    }, [userId, currentUser?.followingIds]);

    const toggleFollow = useCallback(async () => {
        if (!currentUser){
            return loginModal.onOpen();
        }

        try{
            let request;

            if (isFollowing){
                request = () => axios.delete('/api/follow', {data: { userId }});
                toast.success('Successfully followed')

            } else {
                request = () => axios.post('/api/follow',  { userId });
                toast.success('Unfollowed')

            }

            await request();

            mutateCurrentUser();
            mutateFetchedUser();


        } catch (error){
            toast.error('Something went wrong')
        }
    }, [currentUser, isFollowing, userId, mutateCurrentUser, mutateFetchedUser, loginModal]);

    return{
        isFollowing,
        toggleFollow
    }
}

export default useFollow