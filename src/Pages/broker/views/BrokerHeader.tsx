
import profilepic from '../../../assets/Logo/diyadahara.png'
import setting from '../../../assets/Dashboard/settings.png'
import notify from '../../../assets/Dashboard/bell.png'
import search from '../../../assets/Dashboard/search (1).png'

export default function BrokerHeader() {
    return (
        <div className='header_main_wrapper h-[4em] bg-white rounded-tr-2xl flex items-center justify-between px-[15px]'>

            <div>
                <h1 className='text-[1.8rem] font-semibold text-gray-600'>Overview</h1>
            </div>
            <div className='flex gap-[15px] items-center'>
                <div className='hidden md:flex'>
                    <div className='border flex gap-3 w-[15em] p-[5px] rounded-[15px]'>
                        <img className='w-[30px]' src={search} alt="" />
                        <input className='' type="search" name="" placeholder='Search' />
                    </div>
                </div>
                <div className='hidden md:flex items-center gap-3'>
                    <div>
                        <div className='border w-[2.5em] rounded-full h-[2.5em] flex items-center justify-center'>
                            <img className='w-[80%] h-[80%]' src={notify} alt="" />
                        </div>
                    </div>
                    <div>
                        <div className='border w-[2.5em] rounded-full h-[2.5em] flex items-center justify-center'>
                            <img className='w-[80%] h-[80%]' src={setting} alt="" />
                        </div>
                    </div>
                    <div>
                        <div className='border-[3px] border-blue-500 w-[3.5em] rounded-full h-[3.5em] flex items-center justify-center'>
                            <img className='w-[70%] h-[70%]' src={profilepic} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
