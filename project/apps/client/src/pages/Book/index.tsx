
import { ELABELS } from "../../assets/static_string"
import { IconKey } from "../../componet/atoms/icons"
import CoCoFormPage from "../../componet/themes/coco/formPage"
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { db, FSDBCollectionName } from "../../utils/firebase";

export const BookPage = () =>{

    const addData = async (data:any) => {
        try {
          const docRef = await addDoc(collection(db, FSDBCollectionName.BOOKS), data);
           const keywordsRef = await collection(db, FSDBCollectionName.KEYWORDS);
           const keywordsIdDocRef = doc(keywordsRef, data.title);
           const keywordsAuthorDocRef = doc(keywordsRef, data.author);
            await setDoc(keywordsIdDocRef, { type: "title" });
            await setDoc(keywordsAuthorDocRef, { type: "author" });
            console.log("Document written with ID: ", docRef.id);
          alert("Book added successfully!");
        } catch (e) {
          console.error("Error adding document: ", e);
            alert("Error adding book: " + e);
        }
      };

    return(
        <div className="p-5">
            {/* <h1 className="text-2xl font-bold">Book Page</h1> */}
             {/* @ts-ignore */}
            <CoCoFormPage 
                formData={[
                    {fieldName:"title",label:ELABELS.bookTitle,icon:IconKey.book,type:"text"},   
                    {fieldName:"author",label:ELABELS.bookAuthor,icon:IconKey.author,type:"text"},
                    {fieldName:"publishedDate",label:ELABELS.bookPublishedDate,icon:IconKey.publishedDate,type:"text"},
                    {fieldName:"numberOfPages",label:ELABELS.bookNumberOfPages,icon:IconKey.numberOfPages,type:"text"},
                    {fieldName:"publisher",label:ELABELS.bookPublisher,icon:IconKey.publisher,type:"text"},
                    {fieldName:"popularRating",label:ELABELS.popularRating,icon:IconKey.publisher,type:"dropdown",dropDownItem:[
                        {label:"⭐",key:"1"},
                        {label:"⭐ ⭐",key:"2"},
                        {label:"⭐ ⭐ ⭐",key:"3"},
                        {label:"⭐ ⭐ ⭐ ⭐",key:"4"},
                        {label:"⭐ ⭐ ⭐ ⭐ ⭐",key:"5"},
                    ]},
                    {fieldName:"language",label:ELABELS.bookLanguage,icon:IconKey.language,type:"dropdown",dropDownItem:[
                        {label:"Myanmar",key:"Myanmar"},
                        {label:"English",key:"English"},
                        {label:"Thai",key:"Thai"},
                        {label:"Spanish",key:"Spanish"},
                        {label:"French",key:"French"},
                        {label:"German",key:"German"},
                        {label:"Chinese",key:"Chinese"},
                        {label:"Japanese",key:"Japanese"},
                        {label:"Russian",key:"Russian"},
                        {label:"Arabic",key:"Arabic"},
                        {label:"Portuguese",key:"Portuguese"},
                        {label:"Italian",key:"Italian"},
                        {label:"Hindi",key:"Hindi"},
                        {label:"Bengali",key:"Bengali"},
                        {label:"Korean",key:"Korean"},
                        {label:"Vietnamese",key:"Vietnamese"},
                        {label:"Turkish",key:"Turkish"},
                        {label:"Dutch",key:"Dutch"},
                        {label:"Greek",key:"Greek"},
                        {label:"Swedish",key:"Swedish"},
                        {label:"Norwegian",key:"Norwegian"},
                        {label:"Danish",key:"Danish"},
                        {label:"Finnish",key:"Finnish"},
                        {label:"Polish",key:"Polish"},
                        {label:"Czech",key:"Czech"},
                        {label:"Hungarian",key:"Hungarian"},
                        {label:"Romanian",key:"Romanian"},
                        {label:"Slovak",key:"Slovak"},
                        {label:"Ukrainian",key:"Ukrainian"},
                        {label:"Hebrew",key:"Hebrew"},
                        {label:"Indonesian",key:"Indonesian"},
                        {label:"Malay",key:"Malay"},
                        {label:"Thai",key:"Thai"},
                        {label:"Filipino",key:"Filipino"},
                        {label:"Other",key:"Other"},
                    ]},
                    {fieldName:"description",label:ELABELS.bookDescription,icon:IconKey.description,type:"textarea"},
                    {fieldName:"genre",label:ELABELS.bookGenre,icon:IconKey.genre,type:"dropdown",dropDownItem:[
                        {label:"Fiction",key:"Fiction"},
                        {label:"Mystery",key:"Mystery"},
                        {label:"Biography",key:"Biography"},
                        {label:"Thriller",key:"Thriller"},
                        {label:"Historical",key:"Historical"},
                       {label:"Language",key:"Language"},
                        {label:"Technology",key:"Technology"},
                        {label:"Business",key:"Business"},
                        {label:"Law",key:"Law"},
                        {label:"Politics",key:"Politics"},
                        {label:"Health",key:"Health"},
                        {label:"Cooking",key:"Cooking"},
                        {label:"Comics",key:"Comics"},
                        {label:"Drama",key:"Drama"},
                        {label:"Religion",key:"Religion"},
                        {label:"Mathematics",key:"Mathematics"},
                        {label:"Poems",key:"Poems"},
                        {label:"comdey",key:"comdey"},
                        {label:"Short Stories",key:"Short Stories"},
                        {label:"Audiobooks",key:"Audiobooks"},
                        {label:"eBooks",key:"eBooks"},
                        {label:"Magazines",key:"Magazines"},
                        {label:"Newspapers",key:"Newspapers"},
                        {label:"Journals",key:"Journals"},
                        {label:"Novels",key:"Novels"},
                        {label:"Series",key:"Series"},
                        {label:"Other",key:"Other"},
                    ]},
                    {fieldName:"price",label:ELABELS.bookPrice,icon:IconKey.price,type:"text"},
                    {fieldName:"coverImageUrl",label:ELABELS.bookCoverImageUrl,icon:IconKey.book,type:"firebaseFileUpload"},
                    {fieldName:"samplePdfUrl",label:ELABELS.pdf,icon:IconKey.pdf,type:"firebaseFileUpload"},
                ]} 
                onSubmit={(data)=>{
                    console.log(data)
                    addData({...data,date: new Date()})
                }} 
                onCancel={()=>{}} 
                title={ELABELS.bookTitle} 
                subTitle={ELABELS.bookUploadDescription} 
             />
        </div>
    )
}
export default BookPage