import { useRecoilValue } from 'recoil';
import { booksState } from '../../feature/recoilState';


const BookDetailsPage = () => {
    const allBooks = useRecoilValue(booksState);
    console.log("All Books from Recoil State:", allBooks);
    // Extract book ID from URL
    const book = allBooks.find(b => String(b.id) === window.location.pathname.split("/").pop() );
    console.log("Book Details", book , window.location.pathname.split("/").pop());
    if (!book) {
        return <div className="p-5">Book not found.({window.location.pathname.split("/").pop()})</div>;
    }
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-10 flex flex-col md:flex-row gap-8">
        {/* Left Section - Cover Image and Price */}
        <div className="flex-shrink-0 w-full md:w-1/3 flex flex-col items-center">
          <img
            src={book.coverImageUrl[0]}
            alt={`Cover of ${book.title}`}
            className="rounded-lg shadow-md max-w-xs w-full object-cover"
          />
          <div className="mt-4 text-2xl font-bold text-gray-800">
            ${book.price}
          </div>
          {book.samplePdfUrl && (
            <a
              href={book.samplePdfUrl[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              View Sample PDF
            </a>
          )}
        </div>

        {/* Right Section - Book Details */}
        <div className="flex-grow w-full md:w-2/3">
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
            {book.title}
          </h1>
          <p className="text-xl text-gray-600 mt-2">by {book.author}</p>

          <div className="mt-6 space-y-4 text-gray-700">
            <div>
              <span className="font-semibold">Book Id:</span> {book.id}
            </div>
            <div>
              <span className="font-semibold">Language:</span> {book.language}
            </div>
            <div>
              <span className="font-semibold">Genre:</span> {book.genre}
            </div>
            <div>
              <span className="font-semibold">Published Date:</span> {book.publishedDate}
            </div>
            {book.publisher && (
              <div>
                <span className="font-semibold">Publisher:</span> {book.publisher}
              </div>
            )}
            <div>
              <span className="font-semibold">Number of Pages:</span> {book.numberOfPages}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2">Description</h2>
            <p className="mt-4 leading-relaxed text-gray-700">{book.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;