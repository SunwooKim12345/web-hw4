const SearchPannelAndTextArea = () => {


    return ( 
        <div id="content-body" className="content-body grid-container-02">
            <div className="note-list">
                <div className="search-panel grid-container-03">
                    <div className="v-align-left">
                        <span className="fa fa-search"></span>
                    </div>
                    <div className="v-align-right">
                        <form>
                            <textarea className="text-box"></textarea>
                        </form>
                    </div>				
                </div>  
            </div>

            <div className="edit-text-area">
            </div>  
        </div>
    );
}

export default SearchPannelAndTextArea;

