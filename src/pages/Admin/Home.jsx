import React, {useState } from "react";

import AdminHeader from './Components/AdminHeader';
import Leftnav from '../../components/Leftnav';
import Rightchat from '../../components/Rightchat';
import Appfooter from '../../components/Appfooter';
import Popupchat from '../../components/Popupchat';
import Chart from "react-apexcharts";

import Friends from '../../components/Friends';
import Contacts from '../../components/Contacts';
import Group from '../../components/Group';
import Events from '../../components/Events';
import Createpost from '../../components/Createpost';
import Memberslider from '../../components/Memberslider';
import Friendsilder from '../../components/Friendsilder';
import Storyslider from '../../components/Storyslider';
import Postview from '../../components/Postview';
import Load from '../../components/Load';
import Profilephoto from '../../components/Profilephoto';



const Home = () => {
    const [chartData, setChartData] = useState({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May' ,'Jun', 'Jul', 'Aug', 'Sep', 'Oct' , 'Nov', 'Dec'],
        series: [{
            name: '',
            data: [35, 66, 34, 56, 18 ,35, 66, 34, 56, 18 , 56, 18]
        },{
            name: '',
            data: [12, 34, 12, 11, 7 ,12, 34, 12, 11, 7 , 11, 7]
        }],
        options: {
            chart: {
                type: 'bar',
                height: 250,
                stacked: true,
                toolbar: {
                    show: false
                },    
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }],
            plotOptions: {
                bar: {
                    horizontal: false,
                },
            },
            legend: {
                show: false
            },
            fill: {
                opacity: 1
            },
        },
    });

        return (
            <> 
                <AdminHeader />

                <div className="main-content right-chat-active">
                    <div className="middle-sidebar-bottom">
                        <div className="middle-sidebar-left pe-0">
                            <div className="row">
                                <div className="col-lg-3 pe-2">
                                    <div className="card w-100 border-0 shadow-none p-4 rounded-xxl mb-3" style={{background:`#e5f6ff`}}>
                                        <div className="card-body d-flex p-0">
                                            <i className="btn-round-lg d-inline-block me-3 bg-primary-gradiant feather-home font-md text-white"></i>
                                            <h4 className="text-primary font-xl fw-700">2.3M <span className="fw-500 mt-0 d-block text-grey-500 font-xssss">day visiter</span></h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 pe-2 ps-2">
                                    <div className="card w-100 border-0 shadow-none p-4 rounded-xxl mb-3" style={{background:`#f6f3ff`}}>
                                        <div className="card-body d-flex p-0">
                                            <i className="btn-round-lg d-inline-block me-3 bg-secondary feather-lock font-md text-white"></i>
                                            <h4 className="text-secondary font-xl fw-700">44.6K <span className="fw-500 mt-0 d-block text-grey-500 font-xssss">total user</span></h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 pe-2 ps-2">
                                    <div className="card w-100 border-0 shadow-none p-4 rounded-xxl mb-3" style={{background:`#e2f6e9`}}>
                                        <div className="card-body d-flex p-0">
                                            <i className="btn-round-lg d-inline-block me-3 bg-success feather-command font-md text-white"></i>
                                            <h4 className="text-success font-xl fw-700">603 <span className="fw-500 mt-0 d-block text-grey-500 font-xssss">monthly sale</span></h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 ps-2">
                                    <div className="card w-100 border-0 shadow-none p-4 rounded-xxl mb-3" style={{background:`#fff0e9`}}>
                                        <div className="card-body d-flex p-0">
                                            <i className="btn-round-lg d-inline-block me-3 bg-warning feather-shopping-bag font-md text-white"></i>
                                            <h4 className="text-warning font-xl fw-700">3M <span className="fw-500 mt-0 d-block text-grey-500 font-xssss">day visiter</span></h4>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-12 mb-3">
                                <div className="card w-100 p-3 border-0 mb-3 rounded-xxl bg-lightblue2 shadow-none overflow-hidden">
                                    <Chart
                                    options={chartData.options}
                                    series={chartData.series}
                                    type="bar"
                                    width="100%"
                                    />
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Popupchat />
                <Appfooter /> 
            </>
        );
    }
export default Home;