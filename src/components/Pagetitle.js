import React,{Component} from 'react';

class Pagetitle extends Component {
    render() {
        const {title} = this.props;
        return (
            <div className="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
                <h2 className="fw-700 mb-0 mt-0 font-md text-grey-900 d-flex align-items-center">{title}
                  </h2>
            </div>            
        );
    }
}

export default Pagetitle;


