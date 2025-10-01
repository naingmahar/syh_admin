import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';


export const FirebaseUploadFile = async (
        file: File, 
        fileName: string,
        fileType: any, 
        cb: (loadingPercent: string, downloadUrl?: string, err?: string) => any
    ) => {
    console.log("Uploading file:", file, fileName, fileType);
    const storageRef = ref(storage, `${fileType}/${fileName}.${file.type.split('/')[1]}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
        (snapshot) => {
            // Handle progress
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            cb(progress.toFixed(0));
            console.log('Upload is ' + progress + '% done');
        },
        (error) => {
            // Handle unsuccessful uploads
            console.error("Upload failed:", error);
            cb('0', undefined, error.message);
        },
        () => {
            // Handle successful uploads on complete
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                cb('100', downloadURL);
            });
        }
    );

};