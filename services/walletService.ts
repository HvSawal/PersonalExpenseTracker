import { firestore } from "@/config/firebase";
import { ResponseType, WalletType } from "@/types";
import { collection, deleteDoc, doc, getDocs, query, setDoc, where, writeBatch } from "firebase/firestore";
import { uploadFileToCloudinary } from "./imageService";

export const createOrUpdateWallet = async (
    walletData: Partial<WalletType>
): Promise<ResponseType> => {
    try {
        let walletToSave = {...walletData};


        // check if there is an image
        if(walletData.image){
            const imageUploadRespone = await uploadFileToCloudinary(walletData.image, "wallets");
            if(!imageUploadRespone.success){
                return {success: false, msg: imageUploadRespone.msg || "Failed to upload the wallet icon"};
            }
            walletToSave.image = imageUploadRespone.data;
        }

        if(!walletData?.id){
            //new wallet
            walletToSave.amount = 0;
            walletToSave.totalIncome = 0;
            walletToSave.totalExpenses = 0;
            walletToSave.created = new Date();
        }

        const walletRef = walletData?.id ? doc(firestore, "wallets", walletData?.id) : doc(collection(firestore, "wallets"));

        await setDoc(walletRef, walletToSave, {merge: true}); //updates only the data provided
        return {success: true, data: {...walletToSave, id: walletRef.id}};

    } catch (error: any) {
        console.log("Error creating/updating the wallet: ", error);
        return {success: false, msg: error.message};
    }
}

export const deleteWallet = async (walletId: string): Promise<ResponseType> => {
    try {
        const walletRef = doc(firestore, "wallets", walletId);
        await deleteDoc(walletRef);

        // delete all transactions related to this wallet
        deleteTransactionsByWalletId(walletId);

        return {success: true, msg: "Wallet deleted successfully"};

    } catch (error: any) {
        console.log("Error deleting the wallet: ", error);
        return {success: false, msg: error.message};
    }
}


export const deleteTransactionsByWalletId = async (walletId: string): Promise<ResponseType> => {
    try {

        let hasMoreTransactions = true;
        while(hasMoreTransactions){

            const transactionQuery = query(
                collection(firestore, 'transactions'), 
                where('walletId', '==', walletId)
            );

            const transactionSnapshot = await getDocs(transactionQuery);

            if(transactionSnapshot.size == 0){
                hasMoreTransactions = false;
                break;
            }

            const batch = writeBatch(firestore);
            transactionSnapshot.forEach ((transactionDoc) => {
                batch.delete(transactionDoc.ref);
            });

            await batch.commit();

            console.log(`${transactionSnapshot.size} transactions deleted in this batch`);
        }

        return { success: true, msg: "All Transactions deleted successfully!"};


    } catch (error: any) {
        console.log("Error deleting the wallet: ", error);
        return {success: false, msg: error.message};
    }
}