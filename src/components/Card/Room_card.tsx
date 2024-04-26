import { ExpandAltOutlined } from '@ant-design/icons';
import { Button } from 'antd';

type Props = {
    name : string;
    contect? : string;
    size? : string;
    accommodate? : number;
    food? : boolean;
    view : {
      sea : boolean;
      forest : boolean;
    }
    image? : string;
    price : number;
}

const Room_card = (props: Props) => {


  return (
    <div className=' grid grid-cols-3 box-content h-64 w-208 border-4 text-primary-blue-600 content-center '>
      <div className=' w-full col-span-1 items-center content-center last:'>
        <img src={props.image} className=' w-full ' alt=""/>
      </div>
      <div className=' w-full col-span-2 row-span-1 p-3 grid grid-cols-2 grid-rows-8'>
        <div className=' w-full col-span-2 '>
          <span className=' text-2xl '>{props.name}</span>
        </div>
        <div className=' w-full col-span-2 row-span-2 '>
          <span className=' text-sm '>contect<br/>{props.contect}</span>
        </div>
        <div className=' w-full row-span-5 col-span-1 grid grid-rows-5 '>
          <div className=' text-base  '>
            <ExpandAltOutlined className=' pr-1'></ExpandAltOutlined>
            contect of room
          </div>
          <div><span className=' text-base '>Bed : {props.contect}</span></div>
          <div><span className=' text-base '>For {props.accommodate}</span></div>
          <div>{ props.view.sea ? <span className=' text-base '>sea view</span> : null}</div>
          <div>{ props.view.forest ? <span className=' text-base '>forest view</span> : null}</div>
        </div>
        <div className=' w-full row-span-3 col-span-1 text-center content-end '>
          <span className=' text-3xl font-bold '>Bath {props.price}</span>
        </div>
        <div className=' w-full row-span-3 col-span-1 text-center '>
          <Button className=" mx-1 bg-primary-blue-600 text-white ">Booking</Button>
        </div>
      </div>
        
    </div>
  )
}

export default Room_card