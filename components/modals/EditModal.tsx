import React, {useCallback, useEffect, useState} from 'react';
import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import useEditModal from "@/hooks/useEditModal";
import {toast} from "react-hot-toast";
import {tr} from "date-fns/locale";
import axios from "axios";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import ImageUpload from "@/components/ImageUpload";

function EditModal() {

    const { data: currentUser } = useCurrentUser();
    const { mutate: mutateFetchedUser } = useUser(currentUser?.id)
    const editModal = useEditModal();

    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const [username, setUsername] = useState('')
    const [profileImage, setProfileImage] = useState('')
    const [coverImage, setCoverImage] = useState('')

    // Initialize all the existing fields
    useEffect(() => {
        setName(currentUser?.name);
        setUsername(currentUser?.username);
        setBio(currentUser?.bio)
        setProfileImage(currentUser?.profileImage);
        setCoverImage(currentUser?.coverImage);
    },[currentUser]);

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            await axios.patch('/api/edit', {
                name,
                username,
                bio,
                profileImage,
                coverImage
            });

            mutateFetchedUser();

            toast.success('Updated');

            editModal.onClose();

        } catch (error){
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false)
        }
    }, [name, bio, username, profileImage, coverImage, editModal, mutateFetchedUser]);


    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <ImageUpload
                value={profileImage}
                disabled={isLoading}
                onChange={(image) => setProfileImage(image)}
                label="Upload profile image"
            />

            <ImageUpload
                value={coverImage}
                disabled={isLoading}
                onChange={(image) => setCoverImage(image)}
                label="Upload cover image"
            />
            <Input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={isLoading}
            />
            <Input
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                disabled={isLoading}
            />
            <Input
                placeholder="Bio"
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                disabled={isLoading}
            />
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={editModal.isOpen}
            title="Edit your profile"
            actionLabel="Save"
            onClose={editModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
        />
    );
}

export default EditModal;