import axiosInstance from '@/config/axios.config'
import { useQuery } from '@tanstack/react-query'
import { AxiosRequestConfig } from 'axios';

interface IProps {
    queryKey: string[];
    url: string;
    config?: AxiosRequestConfig;
}

const CustomHook = ({ queryKey, url, config }: IProps) => {
    return (
        useQuery({
            queryKey,
            queryFn: async () => {
                const response = await axiosInstance.get(url, config);
                return response.data;
            }
        })
    )
}
export default CustomHook;