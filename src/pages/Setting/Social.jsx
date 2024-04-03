import React, { useState } from "react";
const Social = () => {

 const [facebook , setFacebook] = useState();
 const [instagram,setInstgram] = useState();
 const [linkedIn,setLinkedIn] = useState();
 const [twitter,setTwitter] = useState();
 const [tiktok,setTiktok] = useState();



    return (
        <div className="flex flex-col px-8 py-9 text-lg bg-white rounded-xl text-zinc-900 max-md:px-5 max-md:max-w-full">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <div className="col-span-1 flex flex-col basis-0 text-zinc-900">
                    <div className="flex gap-4 justify-between px-4 text-lg">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/610ff97783601126cf82626b726a5214ac720356e2a6880017639eddd02926fb?"
                            className="aspect-square w-[25px]"
                        />
                        <div className="grow">Facebook</div>
                    </div>
                    <input value={facebook} onChange={(e) => setFacebook(e.target.value)} placeholder="www.facebook.com/joeyleblanc" className="justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5" />
                </div>
                <div className="col-span-1 flex flex-col basis-0 text-zinc-900">
                    <div className="flex gap-4 justify-between px-4 text-lg">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/fcef9f58670f22c90a13162086a1adaccd2a9caa430692a705a3c8de859baf70?"
                            className="aspect-square w-[25px]"
                        />
                        <div className="grow">Instagram</div>
                    </div>
                    <input value={instagram} onChange={(e) => setFacebook(e.target.value)} placeholder="www.facebook.com/joeyleblanc" className="justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5" />
                </div>
                <div className="col-span-1 flex flex-col basis-0 text-zinc-900">
                    <div className="flex gap-4 justify-between px-4 text-lg">
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_617_46516)">
                                <circle cx="12.5" cy="12.5" r="12.5" fill="white" />
                                <path d="M7.14648 6.41406L16.3923 18.5026H17.809L8.66836 6.41406H7.14648Z" fill="#1D1E21" />
                                <path d="M12.5 0C5.59687 0 0 5.59687 0 12.5C0 19.4031 5.59687 25 12.5 25C19.4031 25 25 19.4031 25 12.5C25 5.59687 19.4031 0 12.5 0ZM15.6906 20.0333L11.6594 14.7677L7.05312 20.0333H4.49271L10.4646 13.2063L4.16667 4.96667H9.43958L13.0792 9.78021L17.2906 4.96667H19.8479L14.2635 11.3479L20.8333 20.0323L15.6906 20.0333Z" fill="#1D1E21" />
                            </g>
                            <defs>
                                <clipPath id="clip0_617_46516">
                                    <rect width="25" height="25" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        <div className="grow">Twitter</div>
                    </div>
                    <input value={twitter} onChange={(e) => setTwitter(e.target.value)} placeholder="www.facebook.com/joeyleblanc" className="justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5" />
                </div>
                <div className="col-span-1 flex flex-col basis-0 text-zinc-900">
                    <div className="flex gap-4 justify-between px-4 text-lg">
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24.9993 12.5004C24.9993 18.8135 20.3193 24.0326 14.2401 24.8798C13.6714 24.959 13.0899 25 12.4996 25C11.818 25 11.1493 24.9453 10.4972 24.8402C4.54611 23.8822 0 18.7214 0 12.4996C0 5.59626 5.59626 0 12.4996 0C19.403 0 24.9993 5.59626 24.9993 12.4996V12.5004Z" fill="#1D1E21" />
                            <path d="M18.6181 9.00229V11.3905C18.1999 11.3502 17.6587 11.2552 17.0576 11.0349C16.2738 10.7477 15.6901 10.3547 15.3086 10.0503V14.8785L15.2992 14.8634C15.3057 14.9592 15.3086 15.0563 15.3086 15.1549C15.3086 17.5532 13.358 19.5045 10.959 19.5045C8.55996 19.5045 6.60938 17.5525 6.60938 15.1549C6.60938 12.7574 8.55996 10.8046 10.959 10.8046C11.1936 10.8046 11.424 10.8233 11.6492 10.8593V13.2137C11.4326 13.136 11.2008 13.0942 10.959 13.0942C9.82317 13.0942 8.89826 14.0184 8.89826 15.1549C8.89826 16.2915 9.82317 17.2157 10.959 17.2157C12.0948 17.2157 13.0197 16.2907 13.0197 15.1549C13.0197 15.1125 13.019 15.07 13.0161 15.0275V5.64453H15.4036C15.4122 5.84679 15.4209 6.05049 15.4288 6.25274C15.4446 6.65078 15.5864 7.03298 15.8333 7.34608C16.1234 7.71389 16.5509 8.14144 17.1527 8.48261C17.7155 8.80147 18.2438 8.93823 18.6181 9.00301V9.00229Z" fill="white" />
                        </svg>

                        <div className="grow">Tiktok</div>
                    </div>
                    <input value={tiktok} onChange={(e) => setTiktok(e.target.value)} placeholder="www.facebook.com/joeyleblanc" className="justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5" />
                </div>
                <div className="col-span-1 flex flex-col basis-0 text-zinc-900">
                    <div className="flex gap-4 justify-between px-4 text-lg">
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24.9993 12.5004C24.9993 18.8135 20.3193 24.0326 14.2401 24.8798C13.6714 24.959 13.0898 25 12.4996 25C11.818 25 11.1493 24.9453 10.4972 24.8402C4.54611 23.8822 0 18.7214 0 12.4996C0 5.59626 5.59626 0 12.4996 0C19.403 0 24.9993 5.59626 24.9993 12.4996V12.5004Z" fill="#1D1E21" />
                            <path d="M6.08058 8.27762C5.74733 7.96811 5.58105 7.58519 5.58105 7.12958C5.58105 6.67396 5.74733 6.27376 6.08058 5.96426C6.41384 5.65475 6.84282 5.5 7.36898 5.5C7.89513 5.5 8.30685 5.65475 8.63938 5.96426C8.97264 6.27376 9.13891 6.66244 9.13891 7.12958C9.13891 7.59671 8.97264 7.96811 8.63938 8.27762C8.30613 8.58712 7.8829 8.74188 7.36898 8.74188C6.85506 8.74188 6.41384 8.58712 6.08058 8.27762ZM8.8582 10.0526V19.5371H5.86177V10.0526H8.8582Z" fill="#FEFFFC" />
                            <path d="M18.8344 10.9921C19.4872 11.7011 19.814 12.6749 19.814 13.9144V19.3732H16.9673V14.2994C16.9673 13.6747 16.8053 13.1888 16.4814 12.8426C16.1575 12.4964 15.7221 12.3237 15.175 12.3237C14.628 12.3237 14.1926 12.4971 13.8687 12.8426C13.5448 13.1888 13.3828 13.6747 13.3828 14.2994V19.3732H10.5195V10.0297H13.3828V11.2692C13.6729 10.856 14.0637 10.53 14.5553 10.2896C15.0462 10.0499 15.599 9.92969 16.213 9.92969C17.307 9.92969 18.1808 10.2845 18.8337 10.9928L18.8344 10.9921Z" fill="#FEFFFC" />
                        </svg>
                        <div className="grow">LinkedIn</div>
                    </div>
                    <input value={linkedIn} onChange={(e) => setLinkedIn(e.target.value)} placeholder="www.facebook.com/joeyleblanc" className="justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5" />
                </div>
            </div>
            <div className="flex gap-5 justify-between py-2 mt-6 mr-4 w-full text-base font-medium whitespace-nowrap max-md:flex-wrap max-md:mr-2.5 max-md:max-w-full">
                <div className="flex gap-2 justify-between px-8 py-2 text-blue-600 border-2 border-solid border-[color:var(--Accent,#2E71EB)] rounded-[30px] max-md:px-5">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/9e237a106a6aae9aaedb87131a5b6a9cefc6631b6b0b800569f8639d3cbb6941?"
                        className="w-5 aspect-square"
                    />
                    <div className="grow">Annuler</div>
                </div>
                <div className="flex gap-2 justify-between px-8 py-2 text-white bg-blue-600 rounded-[30px] max-md:px-5">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/810cd337099c18a7e6b11929296189496595f751eeaf9b41ac7fbc60598d6f03?"
                        className="w-5 aspect-square"
                    />
                    <button type="submit" className="grow">Confirmer</button>
                </div>
            </div>
        </div>
    )
}

export default Social