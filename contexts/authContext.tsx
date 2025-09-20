import { auth, firestore } from "@/config/firebase";
import { AuthContextType, UserType } from "@/types";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { createContext, useEffect } from "react";


const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [user, setUser] = React.useState<UserType>(null);
    const router = useRouter();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (fireBaseUser) => {
            //console.log("Firebase User: ", fireBaseUser);
            if(fireBaseUser){
                setUser({
                    uid: fireBaseUser?.uid,
                    email: fireBaseUser?.email,
                    name: fireBaseUser?.displayName
                });
                updateUserData(fireBaseUser.uid);
                router.replace("/(tabs)");
            } else {
                //no user found
                setUser(null);
                router.replace("/(auth)/welcome")
            }
        });

        return () => unsub();
    }, []);

    const login = async (email: string, password: string) => {
        // implement login logic here
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return { success: true };
        } catch (error: any) {
            let msg = error.message;
            console.log("Error Message: ", msg);
            if(msg.includes('(auth/invalid-email)')){
                msg = "Please check the email you have entered!";
            }
            if(msg.includes('(auth/invalid-credential)')){
                msg = "Incorrect Credentials!";
            }

            return { success: false, msg };
        }
    };

    const register = async (email: string, password: string, name: string) => {
        // implement registration logic here
        try {
            let response = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(firestore, "users", response.user.uid), {
                uid: response?.user?.uid,
                name,
                email,
                //createdAt: new Date(),
                //updatedAt: new Date()
            });
            return { success: true };
        } catch (error: any) {
            let msg = error.message;
            if(msg.includes('(auth/email-already-in-user)')){
                msg = "This email is already in use!";
            }
            return { success: false, msg };
        }
    };

    const updateUserData = async (uid: string) => {
        // implement updateUserData logic here
        try {
            // update user data in firestore
            const docRef = doc(firestore, "users", uid);
            const docSnapshot = await getDoc(docRef);
            if(docSnapshot.exists()) {
                const data = docSnapshot.data();
                const userData: UserType = {
                    uid: data?.uid,
                    email: data?.email || null,
                    name: data?.name || null,
                    image: data?.image || null,
                }
                setUser({ ...userData });
            }
        } catch (error: any) {
            let msg = error.message;
           // return { success: false, errorMessage };
           console.log("Error updating user data:", msg);
        }
    };

    const contextValue: AuthContextType = {
        user,
        setUser,
        login,
        register,
        updateUserData,
    }


    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}


export const useAuth = (): AuthContextType => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};