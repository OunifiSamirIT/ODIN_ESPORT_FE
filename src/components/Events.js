import React,{Component} from 'react';

const eventsList = [
    {
        date: '13',
        month:'APR',
        status:'bg-warning',
        name: 'Meeting with clients',
        location: '41 madison ave, floor 24 new work, NY 10010',
    },
    {
        date: '22',
        month:'APR',
        status:'bg-primary',
        name: 'Developer Programe',
        location: '41 madison ave, floor 24 new work, NY 10010',
    },
    {
        date: '30',
        month:'APR',
        status:'bg-success',
        name: 'Aniversary Event',
        location: '41 madison ave, floor 24 new work, NY 10010',
    },
]

class Events extends Component {
    render() {
        return (
            <div className="card w-100 shadow-xss mt-3 rounded-md border-0 mb-3">
               <div className="flex flex-col mt-6 w-full bg-white rounded-md shadow-sm">
      <div className="flex gap-5 justify-between px-6 pt-4 max-md:px-5">
        <div className="text-xl font-bold text-zinc-900">
          Camps qui pourraient vous intéresser
        </div>
        <div className="self-end mt-10 text-sm font-medium text-blue-600 underline">
          Voir Tout
        </div>
      </div>
      <div className="flex flex-col flex-wrap content-start p-6 mt-8 w-full bg-white rounded-xl max-md:px-5">
        <div className="flex gap-4 justify-between text-xs font-light text-zinc-900">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/afba0081bd452f5edf4903c6f281eb86e12dc80fcd2e7f674daa918947ea4263?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/afba0081bd452f5edf4903c6f281eb86e12dc80fcd2e7f674daa918947ea4263?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/afba0081bd452f5edf4903c6f281eb86e12dc80fcd2e7f674daa918947ea4263?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/afba0081bd452f5edf4903c6f281eb86e12dc80fcd2e7f674daa918947ea4263?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/afba0081bd452f5edf4903c6f281eb86e12dc80fcd2e7f674daa918947ea4263?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/afba0081bd452f5edf4903c6f281eb86e12dc80fcd2e7f674daa918947ea4263?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/afba0081bd452f5edf4903c6f281eb86e12dc80fcd2e7f674daa918947ea4263?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/afba0081bd452f5edf4903c6f281eb86e12dc80fcd2e7f674daa918947ea4263?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
            className="self-start w-20 aspect-[0.69]"
          />
          <div className="flex flex-col flex-1">
            <div className="text-base font-semibold whitespace-nowrap">
              Summer Camp 2024
            </div>
            <div className="flex gap-2 self-start mt-1 whitespace-nowrap">
              <div className="grow">21 Jul 2024</div>
              <div>-</div>
              <div className="grow">21 Août 2024</div>
            </div>
            <div className="self-start">Tunisie</div>
            <div className="mt-2 text-xs">
              Experience an action-packed summer at our premier football camp!
              Against the backdrop of state-of-the-art facilities and expert
              coaching staff, immerse yourself in the world's most beloved
              sport...
            </div>
          </div>
        </div>
        <div className="justify-center items-center px-16 py-2 mt-4 text-base font-medium text-white whitespace-nowrap bg-blue-600 rounded-[30px] max-md:px-5">
          En Savoir Plus
        </div>
      </div>
      <div className="flex flex-col flex-wrap content-start p-6 mt-4 w-full bg-white rounded-xl max-md:px-5">
        <div className="flex gap-4 justify-between text-xs font-light text-zinc-900">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/69e08a793ccf1b503d8f9efebd76ac4d2588adba36aec6206458bf351451150b?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/69e08a793ccf1b503d8f9efebd76ac4d2588adba36aec6206458bf351451150b?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/69e08a793ccf1b503d8f9efebd76ac4d2588adba36aec6206458bf351451150b?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/69e08a793ccf1b503d8f9efebd76ac4d2588adba36aec6206458bf351451150b?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/69e08a793ccf1b503d8f9efebd76ac4d2588adba36aec6206458bf351451150b?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/69e08a793ccf1b503d8f9efebd76ac4d2588adba36aec6206458bf351451150b?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/69e08a793ccf1b503d8f9efebd76ac4d2588adba36aec6206458bf351451150b?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/69e08a793ccf1b503d8f9efebd76ac4d2588adba36aec6206458bf351451150b?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
            className="self-start w-20 aspect-[0.69]"
          />
          <div className="flex flex-col flex-1">
            <div className="text-base font-semibold whitespace-nowrap">
              Winter Camp 2024
            </div>
            <div className="flex gap-2 self-start mt-1 whitespace-nowrap">
              <div className="grow">12 Sept 2024</div>
              <div>-</div>
              <div className="grow">21 Oct 2024</div>
            </div>
            <div className="self-start">France</div>
            <div className="mt-2 text-xs">
              Experience an action-packed summer at our premier football camp!
              Against the backdrop of state-of-the-art facilities and expert
              coaching staff, immerse yourself in the world's most beloved
              sport...
            </div>
          </div>
        </div>
        <div className="justify-center items-center px-16 py-2 mt-4 text-base font-medium text-white whitespace-nowrap bg-blue-600 rounded-[30px] max-md:px-5">
          En Savoir Plus
        </div>
      </div>
      <div className="flex flex-col flex-wrap content-start p-6 mt-4 w-full bg-white rounded-xl max-md:px-5">
        <div className="flex gap-4 justify-between text-xs font-light text-zinc-900">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/afba0081bd452f5edf4903c6f281eb86e12dc80fcd2e7f674daa918947ea4263?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/afba0081bd452f5edf4903c6f281eb86e12dc80fcd2e7f674daa918947ea4263?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/afba0081bd452f5edf4903c6f281eb86e12dc80fcd2e7f674daa918947ea4263?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/afba0081bd452f5edf4903c6f281eb86e12dc80fcd2e7f674daa918947ea4263?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/afba0081bd452f5edf4903c6f281eb86e12dc80fcd2e7f674daa918947ea4263?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/afba0081bd452f5edf4903c6f281eb86e12dc80fcd2e7f674daa918947ea4263?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/afba0081bd452f5edf4903c6f281eb86e12dc80fcd2e7f674daa918947ea4263?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/afba0081bd452f5edf4903c6f281eb86e12dc80fcd2e7f674daa918947ea4263?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
            className="self-start w-20 aspect-[0.69]"
          />
          <div className="flex flex-col flex-1">
            <div className="text-base font-semibold whitespace-nowrap">
              Summer Camp 2024
            </div>
            <div className="flex gap-2 self-start mt-1 whitespace-nowrap">
              <div className="grow">21 Jul 2024</div>
              <div>-</div>
              <div className="grow">21 Août 2024</div>
            </div>
            <div className="self-start">Tunisie</div>
            <div className="mt-2 text-xs">
              Experience an action-packed summer at our premier football camp!
              Against the backdrop of state-of-the-art facilities and expert
              coaching staff, immerse yourself in the world's most beloved
              sport...
            </div>
          </div>
        </div>
        <div className="justify-center items-center px-16 py-2 mt-4 text-base font-medium text-white whitespace-nowrap bg-blue-600 rounded-[30px] max-md:px-5">
          En Savoir Plus
        </div>
      </div>
    </div>
            </div>
        );
    }
}

export default Events;