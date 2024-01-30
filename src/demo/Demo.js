import React,{Component} from 'react';

import './demo.css';
import Hero from "../assets/hero.jpg"
import Hero2 from "../assets/ball.png"
import Hero3 from "../assets/BA.jpg"
import Hero4 from "../assets/ODIN.png"
const newDemoList = [
    {
        imageUrl: 'home.jpg',
        title: 'Home',
        url: 'home'
    },
    {
        imageUrl: 'badge.jpg',
        title: 'Badge',
        url: 'defaultbadge'
    },
    {
        imageUrl: 'member.jpg',
        title: 'Member',
        url: 'defaultmember'
    },
    {
        imageUrl: 'story.jpg',
        title: 'Storie',
        url: 'defaultstorie'
    },
    
    {
        imageUrl: 'group.jpg',
        title: 'Group',
        url: 'defaultgroup'
    },
    {
        imageUrl: 'group-page.jpg',
        title: 'Group Page',
        url: 'grouppage'
    },
    {
        imageUrl: 'user.jpg',
        title: 'User',
        url: 'userpage'
    },
    {
        imageUrl: 'author.jpg',
        title: 'Group',
        url: 'authorpage'
    },
    {
        imageUrl: 'email.jpg',
        title: 'Email',
        url: 'defaultemailbox'
    },
    {
        imageUrl: 'email-open.jpg',
        title: 'Email Open',
        url: 'defaultemailopen'
    },
    {
        imageUrl: 'message.jpg',
        title: 'Message',
        url: 'defaultmessage'
    },
    {
        imageUrl: 'job.jpg',
        title: 'Job',
        url: 'defaultjob'
    },
    {
        imageUrl: 'hotel.jpg',
        title: 'Hotel',
        url: 'defaulthotel'
    },
    {
        imageUrl: 'hotel-open.jpg',
        title: 'Hotel Page',
        url: 'defaulthoteldetails'
    },
    {
        imageUrl: 'event.jpg',
        title: 'Event',
        url: 'defaultevent'
    },
    {
        imageUrl: 'live.jpg',
        title: 'Live',
        url: 'defaultlive'
    },
    {
        imageUrl: 'noti.jpg',
        title: 'Notification',
        url: 'defaultnotification'
    },
    {
        imageUrl: 'video.jpg',
        title: 'Video',
        url: 'defaultvideo'
    },
    {
        imageUrl: 'analytics.jpg',
        title: 'Analytics',
        url: 'defaultanalytics'
    },
    
    {
        imageUrl: 'shop-3.jpg',
        title: 'Shop One',
        url: 'shop1'
    },
    {
        imageUrl: 'shop-1.jpg',
        title: 'Shop two',
        url: 'shop2'
    },
    
    {
        imageUrl: 'cart.jpg',
        title: 'Cart',
        url: 'cart'
    },
    {
        imageUrl: 'checkout.jpg',
        title: 'Checkout',
        url: 'checkout'
    },
    {
        imageUrl: 'single-product.jpg',
        title: 'Single Product 2',
        url: 'singleproduct'
    },
    {
        imageUrl: 'login.jpg',
        title: 'Login',
        url: 'login'
    },
    {
        imageUrl: 'register.jpg',
        title: 'Register',
        url: 'register'
    },
    {
        imageUrl: 'forgot.jpg',
        title: 'Forgot',
        url: 'forgot'
    },
    {
        imageUrl: 'coming-soon.jpg',
        title: 'Coming Soon',
        url: 'comingsoon'
    },
    {
        imageUrl: '404.jpg',
        title: '404',
        url: 'notfound'
    },
    {
        imageUrl: 'help-box.jpg',
        title: 'Help',
        url: 'helpbox'
    },
    {
        imageUrl: 'd-17.jpg',
        title: 'Settings',
        url: 'defaultsettings'
    },
    {
        imageUrl: 'd-15.jpg',
        title: 'Contact',
        url: 'contactinformation'
    },
    {
        imageUrl: 'd-16.jpg',
        title: 'Account',
        url: 'accountinformation'
    },
    {
        imageUrl: 'd-19.jpg',
        title: 'Payment',
        url: 'payment'
    },
    {
        imageUrl: 'd-18.jpg',
        title: 'Password',
        url: 'password'
    },
    {
        imageUrl: 'd-20.jpg',
        title: 'Social',
        url: 'socialaccount'
    },

]


class Demo extends Component {
    render() {
        return (
            <div>

            <div className="header-wrapper demo-style">
                <div className="container max-container">
                    <div className="row">
                        <div className="col-lg-2 col-md-6 col-sm-3 col-xs-6"><a href="/" className="logo"><span className="d-inline-block text-gray-900 fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">ODIN E-SPORT </span> </a></div>
                        
                        <div className="col-lg-10 col-md-12 col-sm-6 col-xs-12 text-right">
                        <a href="/" className="btn btn-lg text-white rounded-xl text-uppercase">Contact</a>
    <a href="/" className="btn btn-lg btn-primary rounded-xl text-uppercase">Seconnecter</a>
 <span>   </span>   <a href="/" className="btn btn-lg btn-secondary rounded-xl text-uppercase">Register</a>
</div>
                        
                    </div>
                </div>
            </div>

            <img className="banner-wrapper vh-100 w-full bscover demo-style"
    src={Hero}
    alt="Hero Image"
/>
                <div className="banner-content">
                    <div className="container max-container">
                        <div className="row">
                            <div className="col-lg-5 col-md-6 col-sm-8">
                                <h2 className="title-text mb-5 mt-5"><b>ELEVATE YOUR GAME, SEIZE YOUR FUTURE</b></h2>
                                <h2 className="d-inline-block mr-3">Connect with top football scouts and trainers, showcase your skills, and take the next step in your soccer journey. Your future in football starts here.</h2>
                                
                                <div className="clearfix"></div>
                                <a href="#demo" className="btn btn-lg btn-primary rounded-xl mr-4 text-uppercase mt-5">Start Your Journey Now!</a>


                                <div className="icon-scroll pos-bottom-center icon-white"></div>
                            </div>
                            
                        </div>
                    </div>
                </div>

            <div className="section pb100 pt50 demo-style bg-slate-100" id="feature">
            <div className="w-[1184px] h-[424px] m-6 py-10 justify-center items-center gap-[117px] inline-flex">
  <div className="flex-col justify-start items-start gap-10 inline-flex">
    <div className="flex-col justify-start items-start gap-2 flex">
      <div className="text-zinc-900 text-[42px] font-bold font-serif">Unlocking Football Dreams</div>
      <div className="text-zinc-900 text-2xl font-light font-serif">A Comprehensive Experience for All</div>
    </div>
    <div className="w-[588px] h-[137px] text-zinc-900 text-lg font-normal font-serif">ODIN E-SPORT offers a comprehensive experience for all stakeholders in the football ecosystem, from young talents to player agents, coaches, and football clubs. Whether you're a young talent seeking to shine or a football professional looking for the next star, our platform is the place where dreams come true and opportunities materialize.</div>
    <div className="px-8 py-2 bg-blue-600 rounded-[30px] justify-center items-center gap-2 inline-flex">
      <div className="text-white text-base font-medium font-serif">Primary Button</div>
    </div>
  </div>
  <div className="w-[479px] h-[335.26px] relative">
    {/* <img className="w-[77px] h-[77px] left-[402px] top-0 absolute rounded-[20px]" src={} /> */}
    <div className="w-[402.12px] h-[230.26px] left-0 top-[105px] absolute">
      <img className="w-[413px] h-[239px] left-[-11px] top-[-2px] absolute rounded-[20px]" src={Hero2} />
    </div>
  </div>
</div>
            </div>

            <div className="w-[1184px] h-[712px] m-14 py-14 justify-center items-end gap-[101px] inline-flex">
  <div className="flex-col justify-start items-start gap-8 inline-flex">
    <img className="w-[161px] h-[161px]" src={Hero3} />
    <div className="flex-col justify-start items-start gap-4 flex">
      <div className="text-black text-[42px] font-bold font-serif">How can we help?</div>
      <div className="w-[503px] text-black text-xl font-normal font-serif">Feel free to ask questions or share feedback about Odin Esport, the premier community for football players and entities. Your input is vital <br/>as we cultivate an inclusive space for football professionals worldwide.</div>
    </div>
    <div className="w-[100px] h-[47.68px] relative" />
  </div>
  <div className="w-[580px] h-[600px] px-[101px] py-2 bg-white rounded-[30px] flex-col justify-center items-start gap-8 inline-flex">
    <div className="w-[242px] text-black text-[42px] font-bold font-serif">Contact Us</div>
    <div className="flex-col justify-start items-center gap-6 flex">
      <div className="flex-col justify-start items-start gap-4 flex">
        <div className="text-zinc-900 text-lg font-normal font-serif">Full Name</div>
        <div className="w-[378px] px-4 py-2 rounded-[20px] border border-zinc-900 justify-start items-center gap-2 inline-flex">
          <div className="opacity-70 text-zinc-900 text-base font-normal font-serif">Full Name</div>
        </div>
      </div>
      <div className="flex-col justify-start items-start gap-4 flex">
        <div className="text-zinc-900 text-lg font-normal font-serif">Email</div>
        <div className="w-[378px] px-4 py-2 rounded-[20px] border border-zinc-900 justify-start items-center gap-2 inline-flex">
          <div className="opacity-70 text-zinc-900 text-base font-normal font-serif">Email</div>
        </div>
      </div>
      <div className="flex-col justify-start items-start gap-4 flex">
        <div className="text-zinc-900 text-lg font-normal font-serif">Message</div>
        <div className="w-[378px] h-[150px] p-6 rounded-[20px] border border-zinc-900 justify-start items-start gap-2 inline-flex">
          <div className="opacity-70 text-zinc-900 text-base font-normal font-serif">Message...</div>
        </div>
      </div>
      <div className="w-[378px] px-8 py-2 bg-blue-600 rounded-[30px] justify-center items-center gap-2 inline-flex">
        <div className="text-white text-base font-medium font-serif">Envoyer</div>
      </div>
    </div>
  </div>
</div>
<div className="w-[1280px] h-48 py-6 bg-blue-600 flex-col justify-center items-center gap-6 inline-flex">
  <div className="w-[1183.74px] py-2 justify-between items-center inline-flex">
    <div className="w-[653.74px] h-[52.61px] flex-col justify-center items-start gap-2.5 inline-flex">
      <div className="w-[143.73px] h-[100.61px] relative">
        <img className='mb-10' src={Hero4}/>
      </div>
    </div>
    <div className="py-4 justify-center items-center gap-6 flex">
    
      <div className="justify-center items-center gap-4 flex">
        <div className="w-[25px] h-[25px] relative">
        </div>
        <div className="w-[25px] h-[25px] relative">
          <div className="w-[15.67px] h-[15.01px] left-[4.66px] top-[5px] absolute">
          </div>
        </div>
        <div className="w-[25px] h-[25px] relative">
        </div>
        <div className="w-[25px] h-[25px] relative">
        </div>
        <div className="w-[25px] h-[25px] relative">
          <div className="w-[13.53px] h-[15.78px] left-[5.74px] top-[4.61px] absolute">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="flex-col justify-start items-start flex">
    <div className="w-[1184px] h-[0px] border border-white">


    </div>
    <div className="w-[1184px] justify-between items-center inline-flex">
      <div className="text-white text-xs font-normal font-['Sora']">All Rights Reserved © 2024 Odin Esport</div>
      <div className="flex-col justify-start items-start gap-6 inline-flex">
        <div className="px-8 py-2 rounded-[30px] justify-center items-center gap-2 inline-flex">
          <div className="text-white text-base font-medium font-['Sora'] underline">Privacy Policy</div>
        </div>
      </div>
    </div>
  </div>
</div>          


           

             
            </div>
        );
    }
}

export default Demo;