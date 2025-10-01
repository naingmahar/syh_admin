import { useEffect, useState } from "react"
import { collection, getDocs,doc, deleteDoc } from 'firebase/firestore';
import { db, FSDBCollectionName } from "../../utils/firebase";
import { IBook } from "../../types/models/IBook";
import CoCoTable from "../../componet/themes/coco/table";
import { booksState } from "../../feature/recoilState";
import { useRecoilState } from "recoil";

export const BookListPage = () => {
    const [dataList, setDataList] = useRecoilState(booksState);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getData = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, FSDBCollectionName.BOOKS));
            const fetchedData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setDataList(fetchedData as IBook[] || []);
        } catch (e: any) {
            setError("Error getting documents: " + e.message);
        } finally {
            console.log("Fetched Data List", dataList);
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, [])

    const deleteBook = async (bookId:string) => {
        try {
          // Create a reference to the specific document
          const docRef = doc(db, FSDBCollectionName.BOOKS, bookId);
      
          // Call deleteDoc to remove the document
          await deleteDoc(docRef);
      
          console.log('Document successfully deleted!');
        } catch (error) {
          console.error('Error removing document: ', error);
        }
      };

    const deleteAction = (id: string) => {
        deleteBook(id).then(() => {
            // Refresh the data list after deletion
            const updatedList = dataList.filter(book => book.id !== id);
            setDataList(updatedList);  
            alert("Book deleted successfully"); 
        })
        .catch((error) => {
            alert("Error deleting book: " + error.message);
        });
    }

    if (loading) return <div className="p-5">Loading...</div>
    if (error) return <div className="p-5 text-red-500">Error: {error}</div>
    if (!dataList || dataList.length === 0) return <div className="p-5">No Data Found</div>

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold">Book List Page</h1>
            <CoCoTable
                className="mt-6 p-10"
                headerStaus={false}
                header={["Title", "Author", "Genre", "Cover Image", "PDF Link","Details"]}
                types={[
                    { itemKey: "title", type: "string" }, 
                    { itemKey: "author", type: "string" }, 
                    { itemKey: "genre", type: "string" }, 
                    { itemKey: "coverImageUrl", type: "image" }, 
                    { itemKey: "samplePdfUrl", type: "link" },
                    { itemKey: "id", type: "details", detailsLink: (data) => `/owner/books/${data.id}` },
                    { itemKey: "id", type: "delete", deleteAction: (data) => deleteAction(data.id) } 
                ]}
                mobileUiPlugin={(row) => <div className="p-5 border mb-5 rounded-lg shadow-lg" key={row.id}>
                    <h2 className="text-lg font-bold">{row.title || "No Title"}</h2>
                    <p className="text-sm text-gray-600">{row.author || "No Author"}</p>
                    <p className="text-sm text-gray-600">Published Date: {row.publishedDate || "N/A"}</p>
                    <p className="text-sm text-gray-600">Number of Pages: {row.numberOfPages || "N/A"}</p>
                    <p className="text-sm text-gray-600">Publisher: {row.publisher || "N/A"}</p>
                </div>}
                data={dataList}
            />
            
        </div>
    )
}
export default BookListPage