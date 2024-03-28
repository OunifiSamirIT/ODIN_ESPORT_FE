import React, { useEffect, useState } from "react";

import AdminHeader from './Components/AdminHeader';
import { Dropdown, DropdownItem } from './Components/Dropdown';
import Appfooter from '../../components/Appfooter';
import Popupchat from '../../components/Popupchat';
import Pagetitle from '../../components/Pagetitle';
import { Config } from "../../config";
const User = () => {

    const [users, setUsers] = useState([]);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${Config.LOCAL_URL}/api/user`);
                const result = await response.json();

                setUsers(result.rows);

                console.log(users);
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        };
        fetchUsers()
    }, [])
    return (
        <>
        
            <AdminHeader />
            <div className="main-content right-chat-active">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left pe-0">
                        <div className="row">
                            <div className="col-xl-12">
                                <a href="/admin/users/create" className="font-xsssss fw-700 ps-3 pe-3 lh-32 float-right mt-4 mb-4 text-uppercase rounded-3 ls-2 bg-info d-inline-block text-white me-1">Create New User</a>
                            </div>
                            <div className="col-xl-12">

                                <div className="row ps-2 pe-2">
                                    <Pagetitle title="Users" />
                                    
                                    {users.map((value, index) => (
                                        <div key={index} className="col-md-4 col-sm-4 pe-2 ps-2">
                                            <div className="card d-block w-100 h-100 shadow-xss rounded-xxl border-0 mb-3 mt-3 pb-3">
                                                <div className="card-body d-block pt-4 text-center">
                                                    <h4 className="font-xs ls-1 fw-700 text-grey-900">{value.nom}<span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">@surfiyazakir22</span></h4>
                                                </div>
                                                <div className="card-body d-flex align-items-center ps-4 pe-4 pt-0">
                                                    <h4 className="font-xsssss text-center text-grey-500 fw-600 ms-2 me-2"><b className="text-grey-900 mb-1 font-xss fw-700 d-inline-block ls-3 text-dark">Role </b> {value.profil}</h4>
                                                    <h4 className="font-xsssss text-center text-grey-500 fw-600 ms-2 me-2"><b className="text-grey-900 mb-1 font-xss fw-700 d-inline-block ls-3 text-dark">Country</b>{value.nationality}</h4>
                                                    <h4 className="font-xsssss text-center text-grey-500 fw-600 ms-2 me-2"><b className="text-grey-900 mb-1 font-xss fw-700 d-inline-block ls-3 text-dark">Age</b></h4>
                                                </div>
                                                <div className="card-body d-flex align-items-center justify-content-center ps-4 pe-4 pt-0">
                                                    <a href="/defaultmember" className="bg-success p-3 z-index-1 rounded-3 text-white font-xsssss text-uppercase fw-700 ls-3">View Profile</a>
                                                    <a href="/defaultemailbox" className="bg-greylight btn-round-lg ms-2 rounded-3 text-grey-700"><i className="feather-mail font-md"></i></a>
                                                    <div className="position-relative bg-greylight theme-white-bg btn-round-lg rounded-3 text-grey-700 ml-2">
                                                     <Dropdown title="Select an option">
                                                         <DropdownItem href={'/admin/users/edit/' + value.id}>
                                                           <div className="flex items-center  px-5"><i className="feather-edit font-md mr-2"></i> <p>Edit</p></div>
                                                         </DropdownItem>
                                                         <DropdownItem href="/option1">
                                                           <div className="flex items-center   px-5"><i className="feather-trash font-md mr-2 "></i> <p>Delete</p></div>
                                                         </DropdownItem>
                                                    </Dropdown>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default User;