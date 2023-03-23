import useSWR from 'swr'
// @ts-ignore
import fetcher from "@/libs/fetcher";
const useUsers = () => {
    const { data, error, isLoading, mutate } = useSWR('/api/users', fetcher);

    return {
        data,
        error,
        isLoading,
        mutate
    }
}

export default useUsers;