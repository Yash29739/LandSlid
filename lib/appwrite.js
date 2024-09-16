import {Client,Account,ID,Avatars, Databases, Query} from 'react-native-appwrite'

export const config={
    endpoint:'https://cloud.appwrite.io/v1',
    platform:'com.demo.aora',
    projectId:'66e50428000d796b816f',
    databaseId:'66e50799002cc9cce0f3',
    userCollectionId:'66e507ba0035c9509a42',
    videoCollection:'66e5080100233677d66e',
    storageId:'66e50ae100230c01aace',
}

const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)

    const account = new Account(client);
    const avatars = new Avatars(client);
    const databases =new Databases(client);

export const createUser=async( email,password,username)=>{
       try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );
        if (!newAccount){
            throw Error;  
        } 

        const avatarUrl = avatars.getInitials(username)
        await signIn(email,password);

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId:newAccount.$id,
                email,
                username,
                avatar:avatarUrl

            }
        )
        return newUser;
       } catch (error) {
        console.log(error);
        console.log('inside of createuser');
        throw new Error(error);
       }
}

export const signIn = async (email,password)=>{
        try {
            const session = await account.createEmailPasswordSession(email, password);
            return session;
        } catch (error) {
            throw new Error(error);
        }
}

export const getCurrentUser = async() => {
    try {
        const currentAccount = await account.get();
        if(currentAccount) throw Error;

        const currentUser= await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId',currentAccount.$id)]
        )
        if(!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
    }
}