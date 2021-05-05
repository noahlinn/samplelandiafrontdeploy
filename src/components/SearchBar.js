const SearchBar = (props) => {


    return (
        <form className="search-form" onSubmit={props.handleSubmit}>
            <label htmlFor="email" />
            <input className="search-query"value={props.query.query} onChange={(e) => props.setQuery({ ...props.query, query: e.target.value })} />
            <input className="submit-search"type="submit" value="Search Samples!"/>
            

        </form>
    )
}
export default SearchBar