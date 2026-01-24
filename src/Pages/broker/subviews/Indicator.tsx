
export default function Indicator() {
    return (
        <>
            <div className='bg-blue-200 rounded-[10px] w-[25%] h-[8em] gap-3 pl-[10px]'>
                <div className="flex items-center justify-end">
                    <img className="w-[30px] h-[30px]" src={""} alt="" />
                    <p className="font-semibold text-white">+3.6%</p>
                </div>
                <div className='rounded-full border w-[2em] h-[2em] flex items-center justify-center bg-blue-900'>
                    <img className='w-[80%]' src={""} alt="" />
                </div>
                <div>
                    <p className='text-[1.3rem] text-black font-bold'>1K</p>
                    <h2 className='font-semibold text-gray-500 -mt-[3px]'>Toatal Places</h2>
                </div>
            </div>
            <div className='bg-orange-200 rounded-[10px]  w-[25%] h-[8em] gap-3 pl-[10px]'>
                <div className="flex items-center justify-end">
                    <img className="w-[30px] h-[30px]" src={""} alt="" />
                    <p className="font-semibold text-white">+2.8%</p>
                </div>
                <div className='rounded-full border w-[2em] h-[2em] flex items-center justify-center bg-orange-600'>
                    <img className='w-[80%]' src={""} alt="" />
                </div>
                <div>
                    <p className='text-[1.3rem] text-black font-bold'>1K</p>
                    <h2 className='font-semibold text-gray-500 -mt-[3px]'>Toatal Others</h2>
                </div>
            </div>
            <div className='bg-pink-200 rounded-[10px]  w-[25%] h-[8em] gap-3 pl-[10px]'>
                <div className="flex items-center justify-end">
                    <img className="w-[30px] h-[30px]" src={""} alt="" />
                    <p className="font-semibold text-white">+1.8%</p>
                </div>
                <div className='rounded-full border w-[2em] h-[2em] flex items-center justify-center bg-pink-600'>
                    <img className='w-[80%]' src={""} alt="" />
                </div>
                <div>
                    <p className='text-[1.3rem] text-black font-bold'>1K</p>
                    <h2 className='font-semibold text-gray-500 -mt-[3px]'>Total Order</h2>
                </div>
            </div>
            <div className='bg-purple-200 rounded-[15px]  w-[25%]  h-[8em] gap-3 pl-[10px]'>
                <div className="flex items-center justify-end">
                    <img className="w-[30px] h-[30px]" src={""} alt="" />
                    <p className="font-semibold text-white">+2.0%</p>
                </div>
                <div className='rounded-full border w-[2em] h-[2em] flex items-center justify-center bg-purple-700'>
                    <img className='w-[80%]' src={""} alt="" />
                </div>
                <div>
                    <p className='text-[1.3rem] text-black font-bold'>1K</p>
                    <h2 className='font-semibold text-gray-500 -mt-[3px]'>Toal Income</h2>
                </div>
            </div>
        </>
    )
}
