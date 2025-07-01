/*
The Navigation Bar at the top of the website
*/

export function NavBar() {

    function navButtons(title, callBack) {
        return <button 
          onClick={callBack}
          style={{border: 'none', background: 'none', fontSize: '2rem', padding: '1rem', marginLeft: '1rem', marginRight: '1rem'}}
          
        >{title}</button>
    }

    function handleAllBooksNav() {
        window.location.href = '/books/all-books';
    }

    function handleAddBooksNav() {
        window.location.href = '/books/add-books';
    }

    function handleSearchBooksNav() {
        window.location.href = '/books/search';
    }

    return (
        <nav>
            <div style={{display: 'flex', justifyContent: 'center', background: '#ede8d0'}}>
            {navButtons("All Books", handleAllBooksNav)}
            {navButtons("Search for Books", handleSearchBooksNav)}
            {navButtons("Recent Reviews", null)}
            {navButtons("Add a Book", handleAddBooksNav)}
            </div>
        </nav>
    );
}
