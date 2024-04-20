import React from 'react'

function Searchpage() {
    return (
        <div className='bg-slate-600 '>
            <form className="search-form ">
                <div className="form-group searchbox mb-0 border-0 p-1">
                    <input type="text" className="form-control border-0" placeholder="Search..." />
                    <i className="input-icon">
                        <ion-icon name="search-outline" role="img" className="md hydrated" aria-label="search outline"></ion-icon>
                    </i>
                    <span className="ms-1 mt-1 d-inline-block close searchbox-close">
                        <i className="ti-close font-xs" ></i>
                    </span>
                </div>
            </form>
        </div>
    )
}

export default Searchpage