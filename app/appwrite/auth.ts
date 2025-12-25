import {account, appwriteConfig, database} from "~/appwrite/client";
import {OAuthProvider, Query} from "appwrite";
import {redirect} from "react-router";


export const loginWithGoogle=async ()=>{
    try {
        account.createOAuth2Session(OAuthProvider.Google)

    }catch (e){
        console.log('loginWithGoogle',e);
    }
}
export const getUser=async ()=>{
    try {
        //we get user information
        const user =await account.get();
        //if no user redirect
        if(!user)return redirect('/sign-in');
        const {documents}=await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [
                //we return the document were user is currently logged in
                Query.equal('accountId', user.$id),
                Query.select(['name','email','imageUrl','joinedAt','accountId'])
            ]
        )

    }catch (e){
        console.log(e);
    }
}

export const logoutUser=async ()=>{
    try {
        await account.deleteSession('current');
        return true;

    }catch (e){
        console.log('logoutUser Error',e);
        return false;
    }
}

export const getGooglePicture=async ()=>{
    try {
        //extracting picture
        const session= await account.getSession('current');
        //get OAUTH token from session
        const oAuthToken=session.providerAccessToken;
        if(!oAuthToken){
            console.log('No OAuth token available' );
            return null;
        }
        const response=await fetch(
            'https://people.googleapis.com/v1/people/me?personFields=photos',
            {
                headers:{
                    Authorization: `Bearer ${oAuthToken}`
                }
            });
        if(!response.ok){
            console.log('Failed to fetch profile photo from google people API');
            return null;
        }
        const data=await response.json();
        //extract the profile photo from URL response
        const photoUrl=data.photos && data.photos.length>0
        ? data.photos[0].url:
            null;

        return photoUrl;

    }catch (e){
        console.log('Google picture error getGooglePicture',e);
    }
}
export const storeUserData=async ()=>{
    try {

    }catch (e){
        console.log(e);
    }
}
export const getExistingUser=async ()=>{
    try {

    }catch (e){
        console.log(e);
    }
}